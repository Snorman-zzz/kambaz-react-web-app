import { Button, FormControl } from "react-bootstrap";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setCurrentUser } from "./reducer";

interface RootState {
  accountReducer: {
    currentUser: User | null;
  };
}

interface User {
  _id: string;
  username: string;
  password: string;
  firstName?: string;
  lastName?: string;
  email?: string;
  dob?: string;
  role?: string;
}

export default function Profile() {
  const { currentUser } = useSelector((state: RootState) => state.accountReducer);
  const [profile, setProfile] = useState<User>(() =>
    currentUser ?? { _id: "", username: "", password: "" }
  );
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (!currentUser) {
      navigate("/Kambaz/Account/Signin");
    } else {
      setProfile(currentUser);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentUser]);

  const signout = () => {
    dispatch(setCurrentUser(null));
    navigate("/Kambaz/Account/Signin");
  };

  if (!currentUser) return null; // navigation will handle redirect

  return (
    <div id="wd-profile-screen">
      <h1 className="mb-4">Profile</h1>
      <div style={{ maxWidth: "400px" }}>
        <FormControl
          defaultValue={profile?.username}
          placeholder="username"
          className="mb-2"
          id="wd-username"
          onChange={(e) => setProfile((p) => ({ ...p, username: e.target.value }))}
        />
        <FormControl
          defaultValue={profile?.password}
          type="password"
          placeholder="password"
          className="mb-2"
          id="wd-password"
          onChange={(e) => setProfile((p) => ({ ...p, password: e.target.value }))}
        />
        <FormControl
          defaultValue={profile?.firstName}
          placeholder="First Name"
          className="mb-2"
          id="wd-firstname"
          onChange={(e) => setProfile((p) => ({ ...p, firstName: e.target.value }))}
        />
        <FormControl
          defaultValue={profile?.lastName}
          placeholder="Last Name"
          className="mb-2"
          id="wd-lastname"
          onChange={(e) => setProfile((p) => ({ ...p, lastName: e.target.value }))}
        />
        <FormControl
          type="date"
          defaultValue={profile?.dob}
          className="mb-2"
          id="wd-dob"
          onChange={(e) => setProfile((p) => ({ ...p, dob: e.target.value }))}
        />
        <FormControl
          type="email"
          defaultValue={profile?.email}
          className="mb-2"
          id="wd-email"
          onChange={(e) => setProfile((p) => ({ ...p, email: e.target.value }))}
        />
        <select
          className="form-control mb-3"
          id="wd-role"
          defaultValue={profile?.role}
          onChange={(e) => setProfile((p) => ({ ...p, role: e.target.value }))}
        >
          <option value="USER">User</option>
          <option value="ADMIN">Admin</option>
          <option value="FACULTY">Faculty</option>
          <option value="STUDENT">Student</option>
        </select>
        <Button
          variant="danger"
          className="w-100"
          id="wd-signout-btn"
          onClick={signout}
        >
          Sign out
        </Button>
      </div>
    </div>
  );
}