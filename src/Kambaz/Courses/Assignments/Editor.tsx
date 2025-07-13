import { Form, Button, Row, Col } from "react-bootstrap";

export default function AssignmentEditor() {
    return (
        <Form id="wd-assignments-editor" className="pt-2">
            <Form.Group className="mb-3" controlId="wd-name">
                <Form.Label>Assignment Name</Form.Label>
                <Form.Control defaultValue="A1 – ENV + HTML" />
            </Form.Group>

            <Form.Group className="mb-4" controlId="wd-description">
                <Form.Control as="textarea" rows={7} style={{ background: "#fafafa", borderColor: "#ddd" }} defaultValue={
`The assignment is available online
Submit a link to the landing page of your Web application running on Netlify.

The landing page should include the following:
  • Your full name and section
  • Links to each of the lab assignments
  • Link to the Kanbas application
  • Links to all relevant source code repositories

The Kanbas application should include a link to navigate back to the landing page.`} />
            </Form.Group>

            <Row className="mb-3 align-items-center">
                <Col md={3} className="text-end">
                    <Form.Label className="mb-0">Points</Form.Label>
                </Col>
                <Col md={9}>
                    <Form.Group controlId="wd-points">
                        <Form.Control type="number" defaultValue={100} style={{ maxWidth: "200px" }} />
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
                        <Form.Control type="date" defaultValue="2024-05-13" style={{ maxWidth: "250px" }} />
                    </Col>
                </Row>
                <Row className="align-items-center">
                    <Col md={3} className="text-end"><Form.Label className="mb-0">Available from / Until</Form.Label></Col>
                    <Col md={9}>
                        <div className="d-flex" style={{ maxWidth: "350px" }}>
                            <Form.Control type="date" defaultValue="2024-05-06" className="me-2" />
                            <Form.Control type="date" defaultValue="2024-05-20" />
                        </div>
                    </Col>
                </Row>
            </div>

            <div className="d-flex justify-content-end gap-2 mt-4">
                <Button variant="secondary" id="wd-cancel">Cancel</Button>
                <Button variant="danger" id="wd-save">Save</Button>
            </div>
        </Form>
    );
}
