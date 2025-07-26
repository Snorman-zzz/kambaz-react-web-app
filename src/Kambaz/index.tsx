import Account from "./Account";
import { Navigate, Route, Routes } from "react-router-dom";
import ProtectedRoute from "./Account/ProtectedRoute";
import Dashboard from "./Dashboard.tsx";
import KambazNavigation from "./Navigation";
import Courses from "./Courses";
import { Link } from "react-router-dom";
import { Offcanvas, Button } from "react-bootstrap";
import { FaBars } from "react-icons/fa";
import "./styles.css";

import { useState } from "react";

export default function Kambaz() {
    const [showNav, setShowNav] = useState(false);

    return (
        <div id="wd-kambaz">
            <Button variant="link" className="d-md-none text-white position-fixed top-0 start-0 z-3" onClick={() => setShowNav(true)}>
                <FaBars className="fs-2" />
            </Button>

            <Offcanvas show={showNav} onHide={() => setShowNav(false)} responsive="md" className="bg-white">
                <Offcanvas.Header closeButton>
                    <Offcanvas.Title>Navigation</Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body>
                    <KambazNavigation />
                </Offcanvas.Body>
            </Offcanvas>

            <KambazNavigation/>
            <div className="wd-main-content-offset p-3">
                <Link to="/Labs" id="wd-labs-link">Back to Labs Exercises</Link>
                        <Routes>
                            <Route path="/" element={<Navigate to="Dashboard" />} />
                            <Route path="Account/*" element={<Account />} />
                            <Route path="Dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
                            <Route path="Courses/:cid/*" element={<ProtectedRoute><Courses /></ProtectedRoute>} />
                            <Route path="Calendar" element={<h1>Calendar</h1>} />
                            <Route path="Inbox" element={<h1>Inbox</h1>} />
                        </Routes>
                    </div>
        </div>
    );
}
