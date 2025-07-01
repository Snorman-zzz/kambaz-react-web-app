import Account from "./Account";
import {Navigate, Route, Routes} from "react-router-dom";
import Dashboard from "./Dashboard.tsx";
import KambazNavigation from "./Navigation";
import Courses from "./Courses";
import { Link } from "react-router-dom";

export default function Kambaz() {
    return (
        <div id="wd-kambaz">
            <Link to="/Labs" id="wd-labs-link">Back to Labs Exercises</Link>
            <table>
                <tr>
                    <td valign="top">
                        <KambazNavigation/>
                    </td>
                    <td valign="top">
                        <Routes>
                            <Route path="/" element={<Navigate to="/Kambaz/Account"/>}/>
                            <Route path="/Account/*" element={<Account/>}/>
                            <Route path="/Dashboard" element={<Dashboard/>}/>
                            <Route path="/Courses/:cid/*" element={<Courses />} />
                            <Route path="/Calendar" element={<h1>Calendar</h1>} />
                            <Route path="/Inbox" element={<h1>Inbox</h1>} />
                        </Routes>
                    </td>
                </tr>
            </table>
        </div>
    );
}
