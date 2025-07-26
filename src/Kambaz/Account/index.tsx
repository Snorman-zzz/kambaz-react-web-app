import Signin from "./Signin";
import { Navigate, Route, Routes } from "react-router-dom";
import Profile from "./Profile.tsx";
import Signup from "./Signup.tsx";
import AccountNavigation from "./Navigation";
import { useSelector } from "react-redux";

interface RootState {
  accountReducer: {
    currentUser: unknown | null;
  };
}
export default function Account() {
    const { currentUser } = useSelector((state: RootState) => state.accountReducer);
    return (
        <div id="wd-account-screen" className="d-flex p-3">
            <div className="me-5 d-none d-md-block">
                <AccountNavigation />
            </div>
            <div className="flex-fill" style={{ maxWidth: "400px" }}>
                <Routes>
                    <Route
                      path="/"
                      element={
                        <Navigate
                          to={
                            currentUser
                              ? "/Kambaz/Account/Profile"
                              : "/Kambaz/Account/Signin"
                          }
                        />
                      }
                    />
                    <Route path="/Signin" element={<Signin/>}/>
                    <Route path="/Profile" element={<Profile/>}/>
                    <Route path="/Signup" element={<Signup/>}/>
                </Routes>
            </div>
        </div>
    );
}
