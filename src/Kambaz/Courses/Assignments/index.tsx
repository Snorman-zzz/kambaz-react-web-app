import { Button, InputGroup, FormControl, ListGroup, Badge } from "react-bootstrap";
import { FaSearch, FaPlus, FaFileAlt, FaTrash } from "react-icons/fa";
import { BsGripVertical, BsThreeDotsVertical, BsChevronDown } from "react-icons/bs";
import GreenCheckmark from "../Modules/GreenCheckmark";
import { useParams, Link, useNavigate } from "react-router-dom";
import * as db from "../../Database";
import { useSelector, useDispatch } from "react-redux";
import { addAssignment, deleteAssignment } from "./reducer";

interface Assignment {
  _id: string;
  title: string;
  course: string;
  available?: string;
  due?: string;
  points?: number;
}

interface RootState {
  assignmentsReducer: {
    assignments: Assignment[];
  };
  accountReducer: {
    currentUser: { role?: string } | null;
  };
}

export default function Assignments() {
    const { cid } = useParams();
    const { assignments } = useSelector((state: RootState) => state.assignmentsReducer);
    const { currentUser } = useSelector((state: RootState) => state.accountReducer);
    const isFaculty = currentUser?.role === "FACULTY";
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const filtered = assignments.filter((a) => !cid || a.course === cid);

    return (
        <div id="wd-assignments" className="pt-2">
            {/* Controls */}
            <div className="d-flex justify-content-between align-items-start mb-3 flex-wrap">
                <InputGroup style={{ maxWidth: "350px" }} className="me-auto mb-2 mb-md-0">
                    <InputGroup.Text className="bg-light"><FaSearch /></InputGroup.Text>
                    <FormControl placeholder="Search..." id="wd-search-assignment" />
                </InputGroup>
                {isFaculty && (
                <div>
                    <Button variant="secondary" size="sm" className="me-2 px-3" id="wd-add-assignment-group">
                        <FaPlus className="me-1" />Group
                    </Button>
                    {isFaculty && (
                    <Button
                      variant="danger"
                      size="sm"
                      className="px-3"
                      id="wd-add-assignment"
                      onClick={() => navigate(`/Kambaz/Courses/${cid}/Assignments/new`)}
                    >
                        <FaPlus className="me-1" />Assignment
                    </Button>)}
                </div>
                )}
            </div>

            <ListGroup id="wd-assignment-list" className="rounded-0 border-0">
                {/* Header row */}
                <ListGroup.Item className="d-flex align-items-center bg-light fw-bold border-0">
                    <BsChevronDown className="me-3" /> ASSIGNMENTS
                    <Badge bg="light" className="ms-2 text-muted fw-normal">40% of Total</Badge>
                    {isFaculty && <Button variant="light" size="sm" className="ms-auto"><FaPlus /></Button>}
                </ListGroup.Item>

                {filtered.map(a => (
                    <ListGroup.Item key={a._id} className="wd-assignment-item p-3 border-top">
                        <div className="d-flex align-items-start">
                            <BsGripVertical className="me-3 fs-5" />
                            <FaFileAlt className="me-3 fs-5 text-success" />
                            <div className="flex-fill">
                                <Link to={`/Kambaz/Courses/${a.course}/Assignments/${a._id}`} className="fw-bold text-decoration-none">
                                    {a.title}
                                </Link>
                                <br />
                                <small className="text-muted">
                                    Multiple Modules
                                    {a.available && <> | Not available until {a.available}</>} |
                                    {a.due && <> <strong>Due</strong> {a.due}</>} |
                                    {a.points ?? 100} pts
                                </small>
                            </div>
                            {isFaculty && (
                            <div className="ms-2 pt-1 d-flex align-items-start">
                                <GreenCheckmark />
                                <BsThreeDotsVertical className="fs-4 text-muted" />
                            </div>
                            )}
                            {isFaculty && (
                              <Button
                                variant="link"
                                className="text-danger p-0 ms-2"
                                onClick={() => {
                                  if (window.confirm("Delete assignment?")) {
                                    dispatch(deleteAssignment(a._id));
                                  }
                                }}
                              >
                                <FaTrash />
                              </Button>
                            )}
                        </div>
                    </ListGroup.Item>
                ))}
            </ListGroup>
        </div>
    );
}
