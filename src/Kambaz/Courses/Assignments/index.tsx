import { Button, InputGroup, FormControl, ListGroup, Badge } from "react-bootstrap";
import { FaSearch, FaPlus, FaFileAlt } from "react-icons/fa";
import { BsGripVertical, BsThreeDotsVertical, BsChevronDown } from "react-icons/bs";
import GreenCheckmark from "../Modules/GreenCheckmark";

export default function Assignments() {
    const assignments = [
        {
            id: 123,
            title: "A1 – ENV + HTML",
            due: "May 13 at 11:59pm",
            available: "May 6 at 12:00am"
        },
        {
            id: 124,
            title: "A2 – CSS + BOOTSTRAP",
            due: "May 20 at 11:59pm",
            available: "May 13 at 12:00am"
        },
        {
            id: 125,
            title: "A3 – REACT + ROUTER",
            due: "May 27 at 11:59pm",
            available: "May 20 at 12:00am"
        }
    ];

    return (
        <div id="wd-assignments" className="pt-2">
            {/* Controls */}
            <div className="d-flex justify-content-between align-items-start mb-3 flex-wrap">
                <InputGroup style={{ maxWidth: "350px" }} className="me-auto mb-2 mb-md-0">
                    <InputGroup.Text className="bg-light"><FaSearch /></InputGroup.Text>
                    <FormControl placeholder="Search..." id="wd-search-assignment" />
                </InputGroup>
                <div>
                    <Button variant="secondary" size="sm" className="me-2 px-3" id="wd-add-assignment-group">
                        <FaPlus className="me-1" />Group
                    </Button>
                    <Button variant="danger" size="sm" className="px-3" id="wd-add-assignment">
                        <FaPlus className="me-1" />Assignment
                    </Button>
                </div>
            </div>

            <ListGroup id="wd-assignment-list" className="rounded-0 border-0">
                {/* Header row */}
                <ListGroup.Item className="d-flex align-items-center bg-light fw-bold border-0">
                    <BsChevronDown className="me-3" /> ASSIGNMENTS
                    <Badge bg="light" className="ms-2 text-muted fw-normal">40% of Total</Badge>
                    <Button variant="light" size="sm" className="ms-auto"><FaPlus /></Button>
                </ListGroup.Item>

                {assignments.map(a => (
                    <ListGroup.Item key={a.id} className="wd-assignment-item p-3 border-top">
                        <div className="d-flex align-items-start">
                            <BsGripVertical className="me-3 fs-5" />
                            <FaFileAlt className="me-3 fs-5 text-success" />
                            <div className="flex-fill">
                                <a href={`#/Kambaz/Courses/1234/Assignments/${a.id}`} className="fw-bold text-decoration-none">
                                    {a.title}
                                </a>
                                <br />
                                <small className="text-muted">
                                    Multiple Modules | Not available until {a.available} | <strong>Due</strong> {a.due} | 100 pts
                                </small>
                            </div>
                            <div className="ms-2 pt-1 d-flex align-items-start">
                                <GreenCheckmark />
                                <BsThreeDotsVertical className="fs-4 text-muted" />
                            </div>
                        </div>
                    </ListGroup.Item>
                ))}
            </ListGroup>
        </div>
    );
}
