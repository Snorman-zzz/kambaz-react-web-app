import { Link } from "react-router-dom";
import { Row, Col, Card, Button, Form } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { setCourses, type Course } from "./Courses/reducer";
import * as coursesClient from "./Courses/client";
import { enrollCourse, unenrollCourse, setEnrollments } from "./Courses/enrollmentsReducer";
import * as enrollmentsClient from "./Courses/enrollmentsClient";
import React from "react";

interface RootState {
  accountReducer: {
    currentUser: { _id: string } | null;
  };
  coursesReducer: { courses: Course[] };
  enrollmentsReducer: { enrollments: { user: string; course: string }[] };
}

export default function Dashboard() {
    const { currentUser } = useSelector((state: RootState) => state.accountReducer);
    const { courses } = useSelector((state: RootState) => state.coursesReducer);
    const dispatch = useDispatch();
    const { enrollments } = useSelector((state: RootState) => state.enrollmentsReducer);

    const [courseForm, setCourseForm] = React.useState<Course>({ _id: "temp", name: "New Course", description: "New Description" });
    const [showAll, setShowAll] = React.useState(false);

    const userId = currentUser?._id;
    React.useEffect(() => {
      coursesClient.fetchAllCourses().then((data) => dispatch(setCourses(data)));
    }, [dispatch]);
    React.useEffect(() => {
      if (currentUser) {
        enrollmentsClient
          .fetchEnrollmentsForUser(currentUser._id)
          .then((data) => dispatch(setEnrollments(data)));
      }
    }, [currentUser, dispatch]);

    const enrolledSet = new Set(enrollments.filter(e=> e.user===userId).map(e=>e.course));

    // The server already returns courses filtered by the current user's enrollments
    const filteredCourses = courses;
    return (
        <div id="wd-dashboard" className="pt-3">
            <h1 id="wd-dashboard-title">Dashboard</h1>
            <hr/>
            <h5>New Course
                <button className="btn btn-info float-end me-2" onClick={()=>setShowAll(!showAll)}>
                   {showAll?"My Enrollments":"All Enrollments"}
                </button>
                <button className="btn btn-primary float-end"
                        id="wd-add-new-course-click"
                        onClick={() => {
                          coursesClient
                            .createCourse({ name: courseForm.name, description: courseForm.description })
                            .then(() => coursesClient.fetchAllCourses())
                            .then((data) => dispatch(setCourses(data)));
                        }}> Add </button>
                <button className="btn btn-warning float-end me-2"
                        onClick={async () => {
                          await coursesClient.updateCourse(courseForm);
                          const data = await coursesClient.fetchAllCourses();
                          dispatch(setCourses(data));
                        }} id="wd-update-course-click">
                    Update
                </button>
            </h5>
            <Form.Control value={courseForm.name} className="mb-2"
                          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setCourseForm({ ...courseForm, name: e.target.value }) } />

            <Form.Control as="textarea" value={courseForm.description} rows={3}
                         onChange={(e: React.ChangeEvent<HTMLInputElement>) => setCourseForm({ ...courseForm, description: e.target.value }) } />
            <hr/>
            <h2 id="wd-dashboard-published">Published Courses ({filteredCourses.length})</h2>
            <hr/>
            <div id="wd-dashboard-courses">
                <Row xs={1} sm={2} md={3} lg={4} className="g-4 justify-content-start">
                    {filteredCourses.map((course) => (
                        <Col key={course._id} xs="auto" className="wd-dashboard-course" style={{width: "340px"}}>
                            <Card className="h-100">
                                <Link
                                    to={`/Kambaz/Courses/${course._id}/Home`}
                                    className="wd-dashboard-course-link text-decoration-none text-dark">
                                    <Card.Img src=
                                                  "/images/reactjs.jpg" variant=
                                                  "top" width=
                                                  "100%" height={160}/>
                                </Link>
                                <Card.Body className="d-flex flex-column">
                                    <Link
                                        to={`/Kambaz/Courses/${course._id}/Home`}
                                        className="text-decoration-none text-dark">
                                        <Card.Title className="wd-dashboard-course-title text-nowrap overflow-hidden">
                                            {course.name}
                                        </Card.Title>
                                        <Card.Text
                                            className="wd-dashboard-course-description overflow-hidden"
                                            style={{height: "100px"}}>
                                            {course.description}
                                        </Card.Text>
                                    </Link>
                                    <div className="mt-auto">
                                        <div className="d-flex justify-content-between">
                                          <Link
                                            to={`/Kambaz/Courses/${course._id}/Home`}
                                            className="btn btn-primary flex-fill me-2"
                                          >
                                            Go
                                          </Link>
                                          <Button
                                            variant="warning"
                                            id="wd-edit-course-click"
                                            className="me-2"
                                            onClick={(event) => {
                                              event.preventDefault();
                                              setCourseForm(course);
                                            }}
                                          >
                                            Edit
                                          </Button>
                                          <Button
                                            variant={enrolledSet.has(course._id)?"danger":"success"}
                                             className="me-2"
                                             onClick={async (event)=>{
                                               event.preventDefault();
                                               if(!currentUser) {
                                                 alert("Please sign in to enroll in courses.");
                                                 return;
                                               }
                                               
                                               console.log("=== ENROLLMENT DEBUG ===");
                                               console.log("User ID:", userId);
                                               console.log("Course ID:", course._id);
                                               console.log("Current User:", currentUser);
                                               console.log("Current enrolled set:", enrolledSet);
                                               console.log("Is enrolled:", enrolledSet.has(course._id));
                                               console.log("Current enrollments state:", enrollments);
                                               
                                               try {
                                                 if(enrolledSet.has(course._id)){
                                                   console.log("Attempting to unenroll...");
                                                   const result = await enrollmentsClient.unenroll({user: userId!, course: course._id});
                                                   console.log("Unenroll API result:", result);
                                                   dispatch(unenrollCourse({user: userId!, course: course._id}));
                                                   console.log("Unenroll action dispatched");
                                                 }else{
                                                   console.log("Attempting to enroll...");
                                                   const rec = await enrollmentsClient.enroll({user: userId!, course: course._id});
                                                   console.log("Enroll API result:", rec);
                                                   dispatch(enrollCourse(rec));
                                                   console.log("Enroll action dispatched");
                                                 }
                                               } catch (error: any) {
                                                 console.error("Enrollment operation failed:", error);
                                                 console.error("Error response:", error.response?.data);
                                                 if (error.response?.status === 401) {
                                                   alert("Authentication session expired. Please sign in again.");
                                                   window.location.href = "/Kambaz/Account/Signin";
                                                 } else {
                                                   alert(error.response?.data?.message || "Enrollment operation failed. Please try again.");
                                                 }
                                               }
                                             }}
                                          >
                                            {enrolledSet.has(course._id)?"Unenroll":"Enroll"}
                                          </Button>
                                          <Button
                                            variant="danger"
                                            id="wd-delete-course-click"
                                            onClick={async (event) => {
                                              event.preventDefault();
                                              await coursesClient.deleteCourse(course._id);
                                              const data = await coursesClient.fetchAllCourses();
                                              dispatch(setCourses(data));
                                            }}
                                          >
                                            Delete
                                          </Button>
                                        </div>
                                    </div>
                                </Card.Body>
                            </Card>
                        </Col>
                    ))}
                </Row>
            </div>
        </div>
    );
}

    