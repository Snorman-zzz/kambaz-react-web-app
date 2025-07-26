import { Button, InputGroup, FormControl, ListGroup, Badge, Modal } from "react-bootstrap";
import { FaSearch, FaPlus, FaFileAlt } from "react-icons/fa";
import { BsGripVertical, BsChevronDown } from "react-icons/bs";
import { FaTrash } from "react-icons/fa";
import GreenCheckmark from "../Modules/GreenCheckmark";
import { useParams, Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { deleteAssignment, type Assignment } from "./reducer";
import React from "react";

interface RootState {
  assignmentsReducer: { assignments: Assignment[] };
  accountReducer: { currentUser: { role?: string } | null };
}

export default function Assignments() {
    const { cid } = useParams(); // course id from the URL, may be undefined when viewing all courses

    const { assignments } = useSelector((state: RootState) => state.assignmentsReducer);
    const { currentUser } = useSelector((state: RootState) => state.accountReducer);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [deleteId, setDeleteId] = React.useState<string | null>(null);

    const filteredByCourse = assignments.filter((a) => !cid || a.course === cid);
    const visible = filteredByCourse.length > 0 ? filteredByCourse : assignments;

    const canEdit = !currentUser || currentUser.role === "FACULTY" || currentUser.role === "ADMIN";

    return (
        <div id="wd-assignments" className="pt-2">
            {/* Controls */}
            <div className="d-flex justify-content-between align-items-start mb-3 flex-wrap">
                <InputGroup style={{ maxWidth: "350px" }} className="me-auto mb-2 mb-md-0">
                    <InputGroup.Text className="bg-light"><FaSearch /></InputGroup.Text>
                    <FormControl placeholder="Search..." id="wd-search-assignment" />
                </InputGroup>
                {canEdit && (
                  <div>
                    <Button
                      variant="secondary"
                      size="sm"
                      className="me-2 px-3"
                      id="wd-add-assignment-group"
                      disabled
                    >
                      <FaPlus className="me-1" />Group
                    </Button>
                    <Button
                      variant="danger"
                      size="sm"
                      className="px-3"
                      id="wd-add-assignment"
                      onClick={() => {
                        if (cid) {
                          navigate(`/Kambaz/Courses/${cid}/Assignments/new`);
                        }
                      }}
                    >
                      <FaPlus className="me-1" />Assignment
                    </Button>
                  </div>
                )}
            </div>

            <ListGroup id="wd-assignment-list" className="rounded-0 border-0">
                {/* Header row */}
                <ListGroup.Item className="d-flex align-items-center bg-light fw-bold border-0">
                    <BsChevronDown className="me-3" /> ASSIGNMENTS
                    <Badge bg="light" className="ms-2 text-muted fw-normal">40% of Total</Badge>
                    {canEdit && <Button variant="light" size="sm" className="ms-auto"><FaPlus /></Button>}
                </ListGroup.Item>

                {visible.map(a => (
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
                            <div className="ms-2 pt-1 d-flex align-items-start">
                                <GreenCheckmark />
                                {canEdit ? (
                                  <FaTrash
                                    className="fs-5 text-danger"
                                    onClick={() => setDeleteId(a._id)}
                                    style={{ cursor: "pointer" }}
                                  />
                                ) : null}
                            </div>
                        </div>
                    </ListGroup.Item>
                ))}

                 {/* Delete confirmation modal */}
                 <Modal show={!!deleteId} onHide={() => setDeleteId(null)} centered>
                   <Modal.Header closeButton>
                     <Modal.Title>Delete Assignment</Modal.Title>
                   </Modal.Header>
                   <Modal.Body>Are you sure you want to delete this assignment?</Modal.Body>
                   <Modal.Footer>
                     <Button variant="secondary" onClick={() => setDeleteId(null)}>
                       Cancel
                     </Button>
                     <Button
                       variant="danger"
                       onClick={() => {
                         if (deleteId) dispatch(deleteAssignment(deleteId));
                         setDeleteId(null);
                       }}
                     >
                       Delete
                     </Button>
                   </Modal.Footer>
                 </Modal>
            </ListGroup>
        </div>
    );
}
