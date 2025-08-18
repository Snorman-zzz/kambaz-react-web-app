import { Link, useNavigate } from "react-router-dom";
import { Form, Button } from "react-bootstrap";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { setCurrentUser } from "./reducer";
import * as client from "./client";

export default function Signin() {
    const [credentials, setCredentials] = useState<{ username: string; password: string }>({ username: "", password: "" });
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [error, setError] = useState<string | null>(null);
    const signin = async () => {
        setError(null);
        try {
            const user = await client.signin(credentials);
            if (!user) {
                setError("Invalid username or password");
                return;
            }
            dispatch(setCurrentUser(user));
            navigate("/Kambaz/Dashboard");
        } catch (e) {
            setError("Signin failed. Please try again later.");
        }
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
                {error && (
                    <div className="text-danger mb-2" role="alert">{error}</div>
                )}
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
