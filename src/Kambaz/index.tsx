import Account from "./Account";
import { Navigate, Route, Routes } from "react-router-dom";
import Dashboard from "./Dashboard.tsx";
import KambazNavigation from "./Navigation";
import Courses from "./Courses";
import { Link } from "react-router-dom";
import { Offcanvas, Button } from "react-bootstrap";
import { FaBars } from "react-icons/fa";
import "./styles.css";

import { useState } from "react";
import * as db from "./Database";

interface Course { _id: string; name: string; description: string }

export default function Kambaz() {
    const [showNav, setShowNav] = useState(false);

    const [courses, setCourses] = useState<Course[]>(db.courses as Course[]);
    const [course, setCourse] = useState<Course>({
        _id: "0",
        name: "New Course",
        description: "New Description"
    });

    const addNewCourse = () => {
        const newCourse: Course = { ...course, _id: crypto.randomUUID() };
        setCourses([...courses, newCourse]);
    };

    const deleteCourse = (id: string) => {
        setCourses(courses.filter((c) => c._id !== id));
    };

    const updateCourse = () => {
        setCourses(courses.map((c) => (c._id === course._id ? course : c)));
    };

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
                            <Route path="/" element={<Navigate to="/Kambaz/Account"/>}/>
                            <Route path="/Account/*" element={<Account/>}/>
                            <Route path="/Dashboard" element={<Dashboard
                                courses={courses}
                                course={course}
                                setCourse={setCourse}
                                addNewCourse={addNewCourse}
                                deleteCourse={deleteCourse}
                                updateCourse={updateCourse}
                            />}/>
                            <Route path="/Courses/:cid/*" element={<Courses courses={courses} />} />
                            <Route path="/Calendar" element={<h1>Calendar</h1>} />
                            <Route path="/Inbox" element={<h1>Inbox</h1>} />
                        </Routes>
                    </div>
        </div>
    );
}
