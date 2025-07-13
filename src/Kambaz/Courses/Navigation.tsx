import { Link } from "react-router-dom";
import { ListGroup } from "react-bootstrap";
import { useLocation } from "react-router-dom";
export default function CourseNavigation() {
    const location = useLocation();
    const links = [
        { to: "/Kambaz/Courses/1234/Home", id: "wd-course-home-link", label: "Home" },
        { to: "/Kambaz/Courses/1234/Modules", id: "wd-course-modules-link", label: "Modules" },
        { to: "/Kambaz/Courses/1234/Piazza", id: "wd-course-piazza-link", label: "Piazza" },
        { to: "/Kambaz/Courses/1234/Zoom", id: "wd-course-zoom-link", label: "Zoom" },
        { to: "/Kambaz/Courses/1234/Assignments", id: "wd-course-assignments-link", label: "Assignments" },
        { to: "/Kambaz/Courses/1234/Quizzes", id: "wd-course-quizzes-link", label: "Quizzes" },
        { to: "/Kambaz/Courses/1234/People", id: "wd-course-people-link", label: "People" },
    ];

    return (
        <ListGroup id="wd-courses-navigation" className="wd fs-5 rounded-0">
            {links.map(({ to, id, label }) => (
                <ListGroup.Item
                    key={id}
                    as={Link}
                    to={to}
                    id={id}
                    className={`border-0 ${location.pathname.startsWith(to) ? "active" : "text-danger"}`}
                >
                    {label}
                </ListGroup.Item>
            ))}
        </ListGroup>
    );
}