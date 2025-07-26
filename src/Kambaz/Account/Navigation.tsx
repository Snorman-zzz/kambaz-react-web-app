import { ListGroup } from "react-bootstrap";
import { Link, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

interface RootState {
  accountReducer: {
    currentUser: unknown | null;
  };
}

export default function AccountNavigation() {
  const { pathname } = useLocation();
  const { currentUser } = useSelector((state: RootState) => state.accountReducer);

  const links = currentUser
    ? [{ to: "/Kambaz/Account/Profile", label: "Profile" }]
    : [
        { to: "/Kambaz/Account/Signin", label: "Signin" },
        { to: "/Kambaz/Account/Signup", label: "Signup" },
      ];

  return (
    <ListGroup className="wd fs-4 rounded-0">
      {links.map((l) => (
        <ListGroup.Item
          key={l.to}
          as={Link}
          to={l.to}
          className={`border-0 ${pathname.startsWith(l.to) ? "active" : "text-danger"}`}
        >
          {l.label}
        </ListGroup.Item>
      ))}
    </ListGroup>
  );
} 