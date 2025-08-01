import { Link, useNavigate } from "react-router-dom";
import { Form, Button } from "react-bootstrap";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { setCurrentUser } from "./reducer";
import * as client from "./client";

export default function Signin() {
    const [credentials, setCredentials] = useState<{ username?: string; password?: string }>({});
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const signin = async () => {
        const user = await client.signin(credentials);
        if (!user) return;
        dispatch(setCurrentUser(user));
        navigate("/Kambaz/Dashboard");
    };

    return (
        <div id="wd-signin-screen">
            <h1 className="mb-4">Signin</h1>
            <Form>
                <Form.Control
                    id="wd-username"
                    placeholder="username"
                    className="mb-3"
                    defaultValue={credentials.username}
                    onChange={(e) =>
                        setCredentials({ ...credentials, username: e.target.value })
                    }
                />
                <Form.Control
                    id="wd-password"
                    placeholder="password"
                    type="password"
                    className="mb-3"
                    defaultValue={credentials.password}
                    onChange={(e) =>
                        setCredentials({ ...credentials, password: e.target.value })
                    }
                />
                <Button
                    id="wd-signin-btn"
                    variant="primary"
                    className="w-100 mb-3"
                    onClick={signin}
                >
                    Signin
                </Button>
            </Form>
            <Link id="wd-signup-link" to="/Kambaz/Account/Signup">
                Signup
            </Link>
        </div>
    );
}
