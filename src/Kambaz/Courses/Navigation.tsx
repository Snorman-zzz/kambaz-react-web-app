import { Link, useLocation, useParams } from "react-router-dom";
import { ListGroup } from "react-bootstrap";

export default function CourseNavigation() {
    const { cid } = useParams<{ cid: string }>();
    const location = useLocation();

    // Labels used for the navigation
    const links = [
        "Home",
        "Modules",
        "Piazza",
        "Zoom",
        "Assignments",
        "Quizzes",
        "Grades",
        "People",
    ];

    return (
        <ListGroup id="wd-courses-navigation" className="wd fs-5 rounded-0">
            {links.map((label) => {
                const path = `/Kambaz/Courses/${cid}/${label}`;
                const id = `wd-course-${label.toLowerCase()}-link`;
                const active = location.pathname.startsWith(path);

                return (
                    <ListGroup.Item
                        key={id}
                        as={Link}
                        to={path}
                        id={id}
                        className={`border-0 ${active ? "active" : "text-danger"}`}
                    >
                        {label}
                    </ListGroup.Item>
                );
            })}
        </ListGroup>
    );
}