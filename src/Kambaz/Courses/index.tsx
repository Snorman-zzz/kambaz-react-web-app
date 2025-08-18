import CourseNavigation from "./Navigation.tsx";
import { Navigate, Route, Routes, useLocation, useParams } from "react-router-dom";
import Modules from "./Modules";
import Home from "./Home";
import Assignments from "./Assignments";
import AssignmentEditor from "./Assignments/Editor.tsx";
import { FaBars } from "react-icons/fa";
import { Offcanvas, Button } from "react-bootstrap";
import { useState } from "react";
import { useSelector } from "react-redux";
import type { Course } from "./reducer";
import PeopleTable from "./People/Table";
import * as coursesClient from "./client";
import React from "react";

export default function Courses() {
    const [showCourseNav, setShowCourseNav] = useState(false);
    const { cid } = useParams();
    const { courses } = useSelector((state: { coursesReducer: { courses: Course[] } }) => state.coursesReducer);
    const course = courses.find((c) => c._id === cid);
    const [people, setPeople] = React.useState<any[]>([]);
    React.useEffect(() => {
        const load = async () => {
            if (!cid) return;
            const users = await coursesClient.findUsersForCourse(cid);
            setPeople(users);
        };
        load();
    }, [cid]);
    const { pathname } = useLocation();
    return (
        <div id="wd-courses">
            <div className="d-flex align-items-center justify-content-between pt-2">
                <Button variant="link" className="d-md-none text-dark" onClick={() => setShowCourseNav(true)}>
                    <FaBars className="fs-3" />
                </Button>
                <h2 className="text-danger flex-fill text-center m-0">{course?.name} &gt; {pathname.split("/")[4]}</h2>
                <span className="d-md-none" style={{ width: "40px" }}></span>
            </div>
            <hr/>

            <Offcanvas show={showCourseNav} onHide={() => setShowCourseNav(false)} placement="top" className="h-auto">
                <Offcanvas.Header closeButton />
                <Offcanvas.Body>
                    <CourseNavigation />
                </Offcanvas.Body>
            </Offcanvas>
            <div className="d-flex">
                <div className="d-none d-md-block">
                    <CourseNavigation/>
                </div>
                <div className="flex-fill">
                    <Routes>
                        <Route path="/" element={<Navigate to="Home"/>}/>
                        <Route path="Home" element={<Home/>}/>
                        <Route path="Modules" element={<Modules/>}/>
                        <Route path="Assignments" element={<Assignments/>}/>
                        <Route path="Assignments/:aid" element={<AssignmentEditor/>}/>
                        <Route path="Piazza" element={<h2>Piazza</h2>}/>
                        <Route path="Zoom" element={<h2>Zoom</h2>}/>
                        <Route path="Quizzes" element={<h2>Quizzes</h2>}/>
                        <Route path="Grades" element={<h2>Grades</h2>}/>
                        <Route path="People" element={<PeopleTable users={people} />} />
                    </Routes>
                </div>
            </div>
        </div>

    );
}
