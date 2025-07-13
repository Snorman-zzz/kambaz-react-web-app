import { Table } from "react-bootstrap";
import { FaUserCircle } from "react-icons/fa";

export default function PeopleTable() {
    return (
        <div id="wd-people-table" className="pt-3">
            <Table striped>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Login ID</th>
                        <th>Section</th>
                        <th>Role</th>
                        <th>Last Activity</th>
                        <th>Total Activity</th>
                    </tr>
                </thead>
                <tbody>
                    {[
                        {
                            first: "Tony",
                            last: "Stark",
                            id: "001234561S",
                            section: "S101",
                            role: "STUDENT",
                            lastActivity: "2020-10-01",
                            total: "10:21:32"
                        },
                        {
                            first: "Bruce",
                            last: "Wayne",
                            id: "001234562S",
                            section: "S101",
                            role: "STUDENT",
                            lastActivity: "2020-11-02",
                            total: "15:32:43"
                        },
                        {
                            first: "Steve",
                            last: "Rogers",
                            id: "001234563S",
                            section: "S101",
                            role: "STUDENT",
                            lastActivity: "2020-10-02",
                            total: "23:32:43"
                        },
                        {
                            first: "Natasha",
                            last: "Romanoff",
                            id: "001234564S",
                            section: "S101",
                            role: "TA",
                            lastActivity: "2020-11-05",
                            total: "13:23:34"
                        }
                    ].map(user => (
                        <tr key={user.id}>
                            <td className="wd-full-name text-nowrap">
                                <FaUserCircle className="me-2 fs-1 text-secondary" />
                                <span className="wd-first-name">{user.first}</span>{" "}
                                <span className="wd-last-name">{user.last}</span>
                            </td>
                            <td className="wd-login-id">{user.id}</td>
                            <td className="wd-section">{user.section}</td>
                            <td className="wd-role">{user.role}</td>
                            <td className="wd-last-activity">{user.lastActivity}</td>
                            <td className="wd-total-activity">{user.total}</td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </div>
    );
} 