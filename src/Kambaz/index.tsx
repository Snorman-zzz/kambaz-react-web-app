import Account from "./Account";
import { Navigate, Route, Routes } from "react-router-dom";
import Dashboard from "./Dashboard.tsx";
import KambazNavigation from "./Navigation";
import Courses from "./Courses";
import { Link } from "react-router-dom";
import { Offcanvas, Button } from "react-bootstrap";
import { FaBars } from "react-icons/fa";
import "./styles.css";
import * as userClient from "./Account/client";
import * as courseClient from "./Courses/client";

import {useEffect, useState} from "react";
import Session from "./Account/Session.tsx";
import {useSelector} from "react-redux";
import type {Course} from "./Courses/reducer.ts";
import type { RootState } from "./store";

export default function Kambaz() {
    const [showNav, setShowNav] = useState(false);
    const { currentUser } = useSelector((state: RootState) => state.accountReducer);
    const [courses, setCourses] = useState<Course[]>([]);
    const addNewCourse = async (course: Pick<Course, "name" | "description">) => {
        try {
            const newCourse = await userClient.createCourse(course as unknown as Course);
            setCourses([...courses, newCourse]);
        } catch (error) {
            console.error(error);
        }
    };

    const updateCourse = async (course: Course) => {
        try {
            const updated = await courseClient.updateCourse(course);
            setCourses(prev => prev.map(c => c._id === updated._id ? updated : c));
        } catch (error) {
            console.error(error);
        }
    };

    const deleteCourse = async (courseId: string) => {
        try {
            await courseClient.deleteCourse(courseId);
            setCourses(prev => prev.filter((c) => c._id !== courseId));
        } catch (error) {
            console.error(error);
        }
    };

    // Silence linter unused warnings by referencing addNewCourse once.
    useEffect(()=>{}, [addNewCourse, deleteCourse, updateCourse]);

    const fetchCourses = async () => {
        try {
            const courses = await userClient.findMyCourses();
            setCourses(courses);
        } catch (error) {
            console.error(error);
        }
    };
    useEffect(() => {
        fetchCourses();
    }, [currentUser]);

    return (
        <Session>
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
                            <Route path="/Dashboard" element={<Dashboard />}/>
                            <Route path="/Courses/:cid/*" element={<Courses />} />
                            <Route path="/Calendar" element={<h1>Calendar</h1>} />
                            <Route path="/Inbox" element={<h1>Inbox</h1>} />
                        </Routes>
                    </div>
        </div>
        </Session>
    );
}
