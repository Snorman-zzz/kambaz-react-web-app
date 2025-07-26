import { Form, Row, Col } from "react-bootstrap";
import { useParams, Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { addAssignment, updateAssignment } from "./reducer";
import * as db from "../../Database";
import React from "react";
import type { Assignment } from "./reducer";

interface RootState {
  assignmentsReducer: {
    assignments: Assignment[];
  };
  accountReducer: {
    currentUser: { role?: string } | null;
  };
}

export default function AssignmentEditor() {
    const { cid, aid } = useParams();
    const { assignments } = useSelector((state: RootState) => state.assignmentsReducer);
    const { currentUser } = useSelector((state: RootState) => state.accountReducer);
    const isFaculty = currentUser?.role === "FACULTY";
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const existing = assignments.find((a) => a._id === aid);
    const initial: Assignment = existing ?? {
      _id: "new",
      title: "New Assignment",
      course: cid ?? "",
      description: "",
      points: 100,
    } as Assignment;

    const [assignment, setAssignment] = React.useState<Assignment>(initial);

    if (!isFaculty) {
      return <p>Unauthorized.</p>;
    }

    return (
        <Form id="wd-assignments-editor" className="pt-2">
            <Form.Group className="mb-3" controlId="wd-name">
                <Form.Label>Assignment Name</Form.Label>
                <Form.Control defaultValue={assignment.title} />
            </Form.Group>

            <Form.Group className="mb-4" controlId="wd-description">
                <Form.Control as="textarea" rows={7} style={{ background: "#fafafa", borderColor: "#ddd" }} defaultValue={assignment.description ?? ""} />
            </Form.Group>

            <Row className="mb-3 align-items-center">
                <Col md={3} className="text-end">
                    <Form.Label className="mb-0">Points</Form.Label>
                </Col>
                <Col md={9}>
                    <Form.Group controlId="wd-points">
                        <Form.Control type="number" defaultValue={assignment.points ?? 100} style={{ maxWidth: "200px" }} />
                    </Form.Group>
                </Col>
            </Row>

            <Row className="mb-3 align-items-center">
                <Col md={3} className="text-end">
                    <Form.Label className="mb-0">Assignment Group</Form.Label>
                </Col>
                <Col md={9}>
                    <Form.Group controlId="wd-group">
                        <Form.Select defaultValue="ASSIGNMENTS" style={{ maxWidth: "250px" }}>
                            <option value="ASSIGNMENTS">ASSIGNMENTS</option>
                            <option value="QUIZZES">QUIZZES</option>
                            <option value="EXAMS">EXAMS</option>
                            <option value="PROJECT">PROJECT</option>
                        </Form.Select>
                    </Form.Group>
                </Col>
            </Row>

            <Row className="mb-3 align-items-center">
                <Col md={3} className="text-end"><Form.Label className="mb-0">Display Grade as</Form.Label></Col>
                <Col md={9}>
                    <Form.Group controlId="wd-display-grade-as">
                        <Form.Select defaultValue="Percentage" style={{ maxWidth: "250px" }}>
                            <option>Percentage</option>
                            <option>Points</option>
                            <option>Complete/Incomplete</option>
                        </Form.Select>
                    </Form.Group>
                </Col>
            </Row>

            {/* Submission Type container */}
            <div className="border p-3 mb-4" style={{ maxWidth: "650px" }}>
                <Row className="align-items-center mb-3">
                    <Col md={3} className="text-end"><Form.Label className="mb-0">Submission Type</Form.Label></Col>
                    <Col md={9}>
                        <Form.Select defaultValue="Online" style={{ maxWidth: "250px" }}>
                            <option>Online</option>
                            <option>No Submission</option>
                            <option>On Paper</option>
                        </Form.Select>
                    </Col>
                </Row>
                <fieldset>
                    <legend className="fs-6 fw-bold">Online Entry Options</legend>
                    <Form.Check type="checkbox" label="Text Entry" id="wd-text-entry" className="mb-1" />
                    <Form.Check type="checkbox" label="Website URL" id="wd-website-url" defaultChecked className="mb-1" />
                    <Form.Check type="checkbox" label="Media Recordings" id="wd-media-recordings" className="mb-1" />
                    <Form.Check type="checkbox" label="Student Annotation" id="wd-student-annotation" className="mb-1" />
                    <Form.Check type="checkbox" label="File Uploads" id="wd-file-upload" />
                </fieldset>
            </div>

            {/* Assign container */}
            <div className="border p-3 mb-4" style={{ maxWidth: "650px" }}>
                <Row className="mb-3 align-items-center">
                    <Col md={3} className="text-end"><Form.Label className="mb-0">Assign To</Form.Label></Col>
                    <Col md={9}>
                        <Form.Control defaultValue="Everyone" />
                    </Col>
                </Row>
                <Row className="mb-3 align-items-center">
                    <Col md={3} className="text-end"><Form.Label className="mb-0">Due</Form.Label></Col>
                    <Col md={9}>
                        <Form.Control type="date" defaultValue={assignment.due ?? ""} style={{ maxWidth: "250px" }} />
                    </Col>
                </Row>
                <Row className="align-items-center">
                    <Col md={3} className="text-end"><Form.Label className="mb-0">Available from / Until</Form.Label></Col>
                    <Col md={9}>
                        <div className="d-flex" style={{ maxWidth: "350px" }}>
                            <Form.Control type="date" defaultValue={assignment.available ?? ""} className="me-2" />
                            <Form.Control type="date" defaultValue={assignment.due ?? ""} />
                        </div>
                    </Col>
                </Row>
            </div>

            <div className="d-flex justify-content-end gap-2 mt-4">
                <Link to={`/Kambaz/Courses/${assignment.course}/Assignments`} id="wd-cancel" className="btn btn-secondary">Cancel</Link>
                <button
                  type="button"
                  id="wd-save"
                  className="btn btn-danger"
                  onClick={() => {
                    if (assignment._id === "new") {
                      const { _id, ...rest } = assignment;
                      dispatch(addAssignment({ ...rest } as Omit<Assignment, "_id">));
                    } else {
                      dispatch(updateAssignment(assignment));
                    }
                    navigate(`/Kambaz/Courses/${cid}/Assignments`);
                  }}
                >
                  Save
                </button>
            </div>
        </Form>
    );
}
