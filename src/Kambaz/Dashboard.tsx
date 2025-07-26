import { Link } from "react-router-dom";
import { Row, Col, Card, Button, Form } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { addCourse, deleteCourse, updateCourse, type Course as CourseType } from "./Courses/reducer";
import { enrollCourse, unenrollCourse } from "./Courses/enrollmentsReducer";
// Database import removed – enrollments now from Redux
import { useState } from "react";

interface RootState {
  coursesReducer: { courses: CourseType[] };
  accountReducer: { currentUser: { _id: string; role?: string } | null };
  enrollmentsReducer: { enrollments: { user: string; course: string }[] };
}

export default function Dashboard() {
    const dispatch = useDispatch();
    const { courses } = useSelector((state: RootState) => state.coursesReducer);
    const { enrollments } = useSelector((state: RootState) => state.enrollmentsReducer);
    const { currentUser } = useSelector((state: RootState) => state.accountReducer);
    const isFaculty = currentUser?.role === "FACULTY";

    const [course, setCourse] = useState<CourseType>({ _id: "0", name: "New Course", description: "New Description" });

    const [showAll, setShowAll] = useState(false);

    const userEnrollments = (cid: string) =>
      enrollments.some((e) => e.user === currentUser?._id && e.course === cid);

    const filteredCourses = currentUser
      ? showAll
        ? courses
        : courses.filter((c) => userEnrollments(c._id))
      : [];

    const toggleEnrollView = () => setShowAll(!showAll);

    const addNewCourse = () => dispatch(addCourse({ name: course.name, description: course.description }));
    const doUpdateCourse = () => dispatch(updateCourse(course));
    const doDelete = (id: string) => dispatch(deleteCourse(id));

    return (
        <div id="wd-dashboard" className="pt-3">
            <div className="d-flex justify-content-between align-items-center">
              <h1 id="wd-dashboard-title">Dashboard</h1>
              <Button variant="primary" onClick={toggleEnrollView} className="ms-auto">
                {showAll ? "My Enrollments" : "All Courses"}
              </Button>
            </div>
            <hr/>
            {isFaculty && (
                <>
                <h5>New Course
                    <button className="btn btn-primary float-end"
                            id="wd-add-new-course-click"
                            onClick={addNewCourse}> Add </button>
                    <button className="btn btn-warning float-end me-2"
                            onClick={doUpdateCourse} id="wd-update-course-click">
                        Update
                    </button>
                </h5>
                <Form.Control value={course.name} className="mb-2"
                              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setCourse({ ...course, name: e.target.value }) } />

                <Form.Control as="textarea" value={course.description} rows={3}
                             onChange={(e: React.ChangeEvent<HTMLInputElement>) => setCourse({ ...course, description: e.target.value }) } />
                <hr/>
                </>
            )}
            <h2 id="wd-dashboard-published">Published Courses ({filteredCourses.length})</h2>
            <hr/>
            <div id="wd-dashboard-courses">
                <Row xs={1} sm={2} md={3} lg={4} className="g-4 justify-content-start">
                    {filteredCourses.map((course) => (
                        <Col key={course._id} xs="auto" className="wd-dashboard-course" style={{width: "300px"}}>
                            <Card className="h-100">
                                <Link
                                    to={`/Kambaz/Courses/${course._id}/Home`}
                                    className="wd-dashboard-course-link text-decoration-none text-dark">
                                    <Card.Img src=
                                                  "/images/reactjs.jpg" variant=
                                                  "top" width=
                                                  "100%" height={160}/>
                                    <Card.Body>
                                        <Card.Title className="wd-dashboard-course-title text-nowrap overflow-hidden">
                                            {course.name}
                                        </Card.Title>
                                        <Card.Text
                                            className="wd-dashboard-course-description overflow-hidden"
                                            style={{height: "100px"}}>
                                            {course.description}
                                        </Card.Text>
                                        <Button variant="primary">Go</Button>
                                        {currentUser && (
                                          userEnrollments(course._id) ? (
                                            <Button
                                              variant="danger"
                                              className="ms-2"
                                              onClick={(e) => {
                                                e.preventDefault();
                                                dispatch(
                                                  unenrollCourse({
                                                    user: currentUser._id,
                                                    course: course._id,
                                                  })
                                                );
                                              }}
                                            >
                                              Unenroll
                                            </Button>
                                          ) : (
                                            <Button
                                              variant="success"
                                              className="ms-2"
                                              onClick={(e) => {
                                                e.preventDefault();
                                                dispatch(
                                                  enrollCourse({
                                                    user: currentUser._id,
                                                    course: course._id,
                                                  })
                                                );
                                              }}
                                            >
                                              Enroll
                                            </Button>
                                          )
                                        )}
                                        {isFaculty && (
                                            <button onClick={(event) => {
                                                event.preventDefault();
                                                doDelete(course._id);
                                            }} className="btn btn-danger float-end"
                                                    id="wd-delete-course-click">
                                                Delete
                                            </button>
                                        )}
                                    </Card.Body>
                                </Link>
                            </Card>
                        </Col>
                    ))}
                </Row>
            </div>
        </div>
    );
}

    