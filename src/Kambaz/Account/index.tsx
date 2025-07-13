import Signin from "./Signin";
import {Navigate, Route, Routes} from "react-router-dom";
import Profile from "./Profile.tsx";
import Signup from "./Signup.tsx";
import AccountNavigation from "./Navigation";
export default function Account() {
    return (
        <div id="wd-account-screen" className="d-flex p-3">
            <div className="me-5 d-none d-md-block">
                <AccountNavigation />
            </div>
            <div className="flex-fill" style={{ maxWidth: "400px" }}>
                <Routes>
                    <Route path="/" element={<Navigate to="/Kambaz/Account/Signin"/>}/>
                    <Route path="/Signin" element={<Signin/>}/>
                    <Route path="/Profile" element={<Profile/>}/>
                    <Route path="/Signup" element={<Signup/>}/>
                </Routes>
            </div>
        </div>
    );
}
