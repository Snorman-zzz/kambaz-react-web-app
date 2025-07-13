import { Link } from "react-router-dom";
import { Form, Button, Row } from "react-bootstrap";
export default function Profile() {
    return (
        <div id="wd-profile-screen">
            <h1 className="mb-4">Profile</h1>
            <Form>
                <Form.Control defaultValue="alice" placeholder="username" className="mb-3" />
                <Form.Control defaultValue="123" type="password" placeholder="password" className="mb-3" />
                <Row className="mb-3 g-3">
                    <div className="col">
                        <Form.Control defaultValue="Alice" placeholder="First Name" />
                    </div>
                    <div className="col">
                        <Form.Control defaultValue="Wonderland" placeholder="Last Name" />
                    </div>
                </Row>
                <Form.Control type="date" defaultValue="2000-01-01" className="mb-3" />
                <Form.Control type="email" defaultValue="alice@wonderland" className="mb-3" />
                <Form.Select defaultValue="USER" className="mb-4">
                    <option value="USER">User</option>
                    <option value="ADMIN">Admin</option>
                    <option value="FACULTY">Faculty</option>
                    <option value="STUDENT">Student</option>
                </Form.Select>
                <Button as={Link as any} to="/Kambaz/Account/Signin" variant="danger" className="w-100">Signout</Button>
            </Form>
        </div>
    );
}