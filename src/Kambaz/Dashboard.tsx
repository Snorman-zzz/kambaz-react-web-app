import { Link } from "react-router-dom";
import { Row, Col, Card, Button } from "react-bootstrap";

export default function Dashboard() {
    const courses = [
        {
            id: "1234",
            title: "CS1234 React JS",
            img: "/images/reactjs.jpg",
            desc: "Full Stack software developer"
        },
        {
            id: "2345",
            title: "CS2345 Node JS",
            img: "/images/reactjs.jpg",
            desc: "Server-side JavaScript"
        },
        {
            id: "3456",
            title: "CS3456 MongoDB",
            img: "/images/reactjs.jpg",
            desc: "NoSQL Databases"
        },
        {
            id: "4567",
            title: "CS4567 HTML5",
            img: "/images/reactjs.jpg",
            desc: "Markup Fundamentals"
        },
        {
            id: "5678",
            title: "CS5678 CSS3",
            img: "/images/reactjs.jpg",
            desc: "Styling Web Pages"
        },
        {
            id: "6789",
            title: "CS6789 Algorithms",
            img: "/images/reactjs.jpg",
            desc: "Problem Solving"
        },
        {
            id: "7890",
            title: "CS7890 Data Structures",
            img: "/images/reactjs.jpg",
            desc: "Organizing Data"
        },
    ];

    return (
        <div id="wd-dashboard" className="pt-3">
            <h1 id="wd-dashboard-title">Dashboard</h1> <hr />
            <h2 id="wd-dashboard-published">Published Courses ({courses.length})</h2> <hr />
            <div id="wd-dashboard-courses">
                <Row xs={1} sm={2} md={3} lg={4} className="g-4 justify-content-start">
                    {courses.map((course) => (
                        <Col key={course.id} xs="auto" className="wd-dashboard-course" style={{ width: "300px" }}>
                            <Card className="h-100">
                                <Link
                                    to={`/Kambaz/Courses/${course.id}/Home`}
                                    className="wd-dashboard-course-link text-decoration-none text-dark">
                                    <Card.Img variant="top" src={course.img} width="100%" height={160} />
                                    <Card.Body>
                                        <Card.Title className="wd-dashboard-course-title text-nowrap overflow-hidden">
                                            {course.title}
                                        </Card.Title>
                                        <Card.Text
                                            className="wd-dashboard-course-description overflow-hidden"
                                            style={{ height: "100px" }}>
                                            {course.desc}
                                        </Card.Text>
                                        <Button variant="primary">Go</Button>
                                    </Card.Body>
                                </Link>
                            </Card>
                        </Col>
                    ))}
                </Row>
            </div>
        </div>
    );}

    