import { Link } from "react-router-dom";
import { Form, Button } from "react-bootstrap";

export default function Signin() {
    return (
        <div id="wd-signin-screen">
            <h1 className="mb-4">Signin</h1>
            <Form>
                <Form.Control id="wd-username" placeholder="username" className="mb-3" />
                <Form.Control id="wd-password" placeholder="password" type="password" className="mb-3" />
                <Button as={Link as any} to="/Kambaz/Account/Profile" id="wd-signin-btn" variant="primary" className="w-100 mb-3">
                    Signin
                </Button>
            </Form>
            <Link id="wd-signup-link" to="/Kambaz/Account/Signup">Signup</Link>
        </div>
    );
}
