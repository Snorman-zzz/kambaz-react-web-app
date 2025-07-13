import { ListGroup } from "react-bootstrap";
import { Link, useLocation } from "react-router-dom";

export default function AccountNavigation() {
    const { pathname } = useLocation();
    const links = [
        { to: "/Kambaz/Account/Signin", label: "Signin" },
        { to: "/Kambaz/Account/Signup", label: "Signup" },
        { to: "/Kambaz/Account/Profile", label: "Profile" },
    ];
    return (
        <ListGroup className="wd fs-4 rounded-0">
            {links.map(l => (
                <ListGroup.Item key={l.to} as={Link} to={l.to}
                                className={`border-0 ${pathname.startsWith(l.to) ? "active" : "text-danger"}`}>
                    {l.label}
                </ListGroup.Item>
            ))}
        </ListGroup>
    );
} 