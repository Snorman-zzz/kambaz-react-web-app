import { useNavigate } from "react-router-dom";
import { Form, Button, FormControl } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { setCurrentUser } from "./reducer";
import * as client from "./client"

interface User {
  _id: string;
  username: string;
  password: string;
  firstName?: string;
  lastName?: string;
  dob?: string;
  email?: string;
  role?: string;
}

interface RootState {
  accountReducer: {
    currentUser: User | null;
  };
}

export default function Profile() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { currentUser } = useSelector((state: RootState) => state.accountReducer);

  const updateProfile = async () => {
    const updatedProfile = await client.updateUser(profile);
    dispatch(setCurrentUser(updatedProfile));
  };

  const [profile, setProfile] = useState<User | null>(null);

  useEffect(() => {
    if (!currentUser) {
      navigate("/Kambaz/Account/Signin");
    } else {
      setProfile(currentUser);
    }
  }, [currentUser, navigate]);

  const signout = async () => {
    await client.signout();
    dispatch(setCurrentUser(null));
    navigate("/Kambaz/Account/Signin");
  };

  if (!profile) return null; // redirecting

  return (
    <div id="wd-profile-screen">
      <h1 className="mb-4">Profile</h1>
      <Form>
        <FormControl
            defaultValue={profile.username}
            placeholder="username"
            className="mb-3"
            id="wd-username"
            onChange={(e) => setProfile({...profile, username: e.target.value})}
        />
        <FormControl
            defaultValue={profile.password}
            placeholder="password"
            type="password"
            className="mb-3"
            id="wd-password"
            onChange={(e) => setProfile({...profile, password: e.target.value})}
        />
        <FormControl
            defaultValue={profile.firstName}
            placeholder="First Name"
            className="mb-3"
            id="wd-firstname"
            onChange={(e) => setProfile({...profile, firstName: e.target.value})}
        />
        <FormControl
            defaultValue={profile.lastName}
            placeholder="Last Name"
            className="mb-3"
            id="wd-lastname"
            onChange={(e) => setProfile({...profile, lastName: e.target.value})}
        />
        <FormControl
            defaultValue={profile.dob}
            type="date"
            className="mb-3"
            id="wd-dob"
            onChange={(e) => setProfile({...profile, dob: e.target.value})}
        />
        <FormControl
            defaultValue={profile.email}
            type="email"
            className="mb-3"
            id="wd-email"
            onChange={(e) => setProfile({...profile, email: e.target.value})}
        />
        <Form.Select
            defaultValue={profile.role}
            className="mb-4"
            id="wd-role"
            onChange={(e) => setProfile({...profile, role: e.target.value})}
        >
          <option value="USER">User</option>
          <option value="ADMIN">Admin</option>
          <option value="FACULTY">Faculty</option>
          <option value="STUDENT">Student</option>
        </Form.Select>
        <button onClick={updateProfile} className="btn btn-primary w-100 mb-2"> Update</button>
        <Button
            variant="danger"
            className="w-100"
            id="wd-signout-btn"
            onClick={signout}
        >
          Sign out
        </Button>
      </Form>
    </div>
  );
}