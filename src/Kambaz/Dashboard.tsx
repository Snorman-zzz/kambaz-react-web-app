import { Link } from "react-router-dom";
import { Row, Col, Card, Button, Form } from "react-bootstrap";
import { useSelector } from "react-redux";
import * as db from "./Database";

interface Course { _id: string; name: string; description: string }

interface User { _id: string; role?: string; }
interface RootState {
  accountReducer: {
    currentUser: User | null;
  };
}

interface DashboardProps {
    courses: Course[];
    course: Course;
    setCourse: (c: Course) => void;
    addNewCourse: () => void;
    deleteCourse: (id: string) => void;
    updateCourse: () => void;
}

export default function Dashboard({ courses, course, setCourse, addNewCourse, deleteCourse, updateCourse }: DashboardProps) {
    const { currentUser } = useSelector((state: RootState) => state.accountReducer);
    const { enrollments } = db;

    const filteredCourses = currentUser
        ? courses.filter((c) =>
            enrollments.some(
                (e: { user: string; course: string }) => e.user === currentUser._id && e.course === c._id
          ))
        : [];

    const isFaculty = currentUser?.role === 'FACULTY';

    return (
        <div id="wd-dashboard" className="pt-3">
            <h1 id="wd-dashboard-title">Dashboard</h1>
            <hr/>
            {isFaculty && (
                <>
                <h5>New Course
                    <button className="btn btn-primary float-end"
                            id="wd-add-new-course-click"
                            onClick={addNewCourse}> Add </button>
                    <button className="btn btn-warning float-end me-2"
                            onClick={updateCourse} id="wd-update-course-click">
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
                                        {isFaculty && (
                                            <button
                                                onClick={(event) => {
                                                    event.preventDefault();
                                                    deleteCourse(course._id);
                                                }}
                                                className="btn btn-danger float-end"
                                                id="wd-delete-course-click"
                                            >
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

    