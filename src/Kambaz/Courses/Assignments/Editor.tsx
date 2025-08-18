import { Form, Row, Col, Button } from "react-bootstrap";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { addAssignment, updateAssignment, type Assignment } from "./reducer";
import * as assignmentsClient from "./client";
import React from "react";

export default function AssignmentEditor() {
  const { cid, aid } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { assignments } = useSelector(
    (state: { assignmentsReducer: { assignments: Assignment[] } }) =>
      state.assignmentsReducer
  );

  const existing = aid && aid !== "new" ? assignments.find((a) => a._id === aid) : undefined;

  const isNew = !existing || aid === "new";

  const [form, setForm] = React.useState<Assignment>(
    existing ?? {
      _id: "temp",
      title: "New Assignment",
      course: cid ?? "",
      description: "",
      points: 100,
    }
  );

  const handleSave = async () => {
    if (!cid) return;
    if (isNew) {
      const saved = await assignmentsClient.createAssignmentForCourse(cid, {
        title: form.title,
        description: form.description,
        points: form.points,
        available: form.available,
        due: form.due,
      });
      dispatch(addAssignment(saved));
    } else {
      const updated = await assignmentsClient.updateAssignment(form);
      dispatch(updateAssignment(updated));
    }
    navigate(`/Kambaz/Courses/${cid}/Assignments`);
  };

  const handleCancel = () => {
    navigate(`/Kambaz/Courses/${cid}/Assignments`);
  };

    return (
        <Form id="wd-assignments-editor" className="pt-2">
            <Form.Group className="mb-3" controlId="wd-name">
                <Form.Label>Assignment Name</Form.Label>
                <Form.Control value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} />
            </Form.Group>

            <Form.Group className="mb-4" controlId="wd-description">
                <Form.Control as="textarea" rows={7} style={{ background: "#fafafa", borderColor: "#ddd" }} value={form.description ?? ""} onChange={(e) => setForm({ ...form, description: e.target.value })} />
            </Form.Group>

            <Row className="mb-3 align-items-center">
                <Col md={3} className="text-end">
                    <Form.Label className="mb-0">Points</Form.Label>
                </Col>
                <Col md={9}>
                    <Form.Group controlId="wd-points">
                        <Form.Control type="number" value={form.points ?? 100} style={{ maxWidth: "200px" }} onChange={(e) => setForm({ ...form, points: Number(e.target.value) })} />
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
                        <Form.Control type="date" value={form.due ?? ""} style={{ maxWidth: "250px" }} onChange={(e) => setForm({ ...form, due: e.target.value })} />
                    </Col>
                </Row>
                <Row className="align-items-center">
                    <Col md={3} className="text-end"><Form.Label className="mb-0">Available from / Until</Form.Label></Col>
                    <Col md={9}>
                        <div className="d-flex" style={{ maxWidth: "350px" }}>
                            <Form.Control type="date" value={form.available ?? ""} className="me-2" onChange={(e) => setForm({ ...form, available: e.target.value })} />
                            <Form.Control type="date" value={form.due ?? ""} onChange={(e) => setForm({ ...form, due: e.target.value })} />
                        </div>
                    </Col>
                </Row>
            </div>

            <div className="d-flex justify-content-end gap-2 mt-4">
                <Button id="wd-cancel" className="btn btn-secondary" onClick={handleCancel}>Cancel</Button>
                <Button id="wd-save" className="btn btn-danger" onClick={handleSave}>Save</Button>
            </div>
        </Form>
    );
}
