import { ListGroup } from "react-bootstrap";
import { Link, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

interface RootState {
  accountReducer: {
    currentUser: {
      role?: string;
    } | null;
  };
}

export default function AccountNavigation() {
  const { currentUser } = useSelector((state: RootState) => state.accountReducer);
  const { pathname } = useLocation();

  const allLinks: Record<string, string> = {
    Signin: "/Kambaz/Account/Signin",
    Signup: "/Kambaz/Account/Signup",
    Profile: "/Kambaz/Account/Profile",
    Users: "/Kambaz/Account/Users",
  };

  const visiblePages = currentUser ? ["Profile"] : ["Signin", "Signup"];

  return (
    <ListGroup className="wd fs-4 rounded-0">
      {visiblePages.map((label) => {
        const to = allLinks[label];
        return (
          <ListGroup.Item
            key={to}
            as={Link}
            to={to}
            className={`border-0 ${pathname.startsWith(to) ? "active" : "text-danger"}`}
          >
            {label}
          </ListGroup.Item>
        );
      })}
      {currentUser && currentUser.role === "ADMIN" && (
        <ListGroup.Item
          as={Link}
          to="/Kambaz/Account/Users"
          className={`border-0 ${pathname.startsWith("/Kambaz/Account/Users") ? "active" : "text-danger"}`}
        >
          Users
        </ListGroup.Item>
      )}
    </ListGroup>
  );
} 