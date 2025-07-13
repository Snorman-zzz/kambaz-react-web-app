import { Link } from "react-router-dom";
import { Form, Button } from "react-bootstrap";

export default function Signup() {
    return (
        <div id="wd-signup-screen">
            <h1 className="mb-4">Signup</h1>
            <Form>
                <Form.Control placeholder="username" className="mb-3" />
                <Form.Control placeholder="password" type="password" className="mb-3" />
                <Form.Control placeholder="verify password" type="password" className="mb-3" />
                <Button as={Link as any} to="/Kambaz/Account/Profile" variant="primary" className="w-100 mb-3">
                    Signup
                </Button>
            </Form>
            <Link to="/Kambaz/Account/Signin">Signin</Link>
        </div>
    );
}
