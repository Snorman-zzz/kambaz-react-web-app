import { useEffect, useState } from "react";
import { FormControl, Form } from "react-bootstrap";
import { FaUserCircle, FaCheck } from "react-icons/fa";
import { FaPencil } from "react-icons/fa6";
import { IoCloseSharp } from "react-icons/io5";
import { useParams, useNavigate } from "react-router";
import * as client from "../../Account/client";
import type { User as CourseUser } from "./client";
interface PeopleDetailsProps { fetchUsers: () => void; }
export default function PeopleDetails({ fetchUsers }: PeopleDetailsProps) {
    const { uid} = useParams();
    const [user, setUser] = useState<CourseUser>({} as CourseUser);
    const navigate = useNavigate();
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [roleField, setRoleField] = useState<string>("");
    const [editing, setEditing] = useState(false);
    // Deletes the current user and refreshes list in parent
    const deleteUser = async (id?: string) => {
        if (!id) return;
        await client.deleteUser(id);
        // notify parent to refresh users list
        fetchUsers();
        navigate(-1);
    };

    // Begin editing of user fields
    const startEditing = () => {
        setName(`${user.firstName ?? ""} ${user.lastName ?? ""}`.trim());
        setEmail(user.email || "");
        setRoleField(user.role || "STUDENT");
        setEditing(true);
    };

    // Save updated user information
    const saveUser = async () => {
        const trimmed = name.trim();
        let firstName = user.firstName;
        let lastName = user.lastName;
        if (trimmed) {
            const parts = trimmed.split(" ");
            firstName = parts[0];
            lastName = parts.slice(1).join(" ") || "";
        }
        const updatedUser = { ...user, firstName, lastName, email, role: roleField };
        await client.updateUser(updatedUser);
        setUser(updatedUser);
        setEditing(false);
        fetchUsers();
        navigate(-1);
    };
    const fetchUser = async () => {
        if (!uid) return;
        const user = await client.findUserById(uid);
        setUser(user);
    };
    useEffect(() => {
        if (uid) fetchUser();
    }, [uid]);
    if (!uid) return null;
    return (
        <div className="wd-people-details position-fixed top-0 end-0 bottom-0 bg-white p-4 shadow w-25">
            <button onClick={() => navigate(-1)} className="btn position-fixed end-0 top-0 wd-close-details">
                <IoCloseSharp className="fs-1" />
            </button>
            <div className="text-center mt-2">
                <FaUserCircle className="text-secondary me-2 fs-1" />
            </div>
            <hr />
            {/* Editable Name */}
            <div className="text-danger fs-4">
                {!editing && (
                    <FaPencil
                        onClick={() => startEditing()}
                        className="float-end fs-5 mt-2 wd-edit"
                    />
                )}
                {editing && (
                    <FaCheck
                        onClick={saveUser}
                        className="float-end fs-5 mt-2 me-2 wd-save"
                    />
                )}
                {!editing && (
                    <div className="wd-name" onClick={() => startEditing()}>
                        {user.firstName} {user.lastName}
                    </div>
                )}
                {editing && (
                    <FormControl
                        className="w-75 wd-edit-name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        onKeyDown={(e) => {
                            if (e.key === "Enter") {
                                saveUser();
                            }
                        }}
                    />
                )}
            </div>

            {/* Email (editable) */}
            <div className="mt-3">
                {!editing && (
                    <>
                        <b>Email:</b> <span className="wd-email">{user.email}</span>
                    </>
                )}
                {editing && (
                    <>
                        <b>Email:</b>{" "}
                        <FormControl
                            type="email"
                            className="w-75 d-inline-block ms-2 wd-edit-email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </>
                )}
            </div>

            {/* Role (editable) */}
            <div className="mt-3">
                {!editing && (
                    <>
                        <b>Roles:</b> <span className="wd-roles">{user.role}</span>
                    </>
                )}
                {editing && (
                    <>
                        <b>Roles:</b>{" "}
                        <Form.Select
                            className="w-auto d-inline-block ms-2 wd-edit-role"
                            value={roleField}
                            onChange={(e) => setRoleField(e.target.value)}
                        >
                            <option value="STUDENT">STUDENT</option>
                            <option value="TA">TA</option>
                            <option value="FACULTY">FACULTY</option>
                            <option value="ADMIN">ADMIN</option>
                        </Form.Select>
                    </>
                )}
            </div>

            {/* Static info */}
            <div className="mt-3">
                <b>Login ID:</b> <span className="wd-login-id">{user.loginId}</span> <br />
                <b>Section:</b> <span className="wd-section">{user.section}</span> <br />
                <b>Total Activity:</b> <span className="wd-total-activity">{user.totalActivity}</span>
            </div>
            <hr />
            <div className="d-flex justify-content-between">
                <button
                    onClick={() => navigate(-1)}
                    className="btn btn-secondary wd-cancel"
                >
                    Cancel
                </button>
                <button
                    onClick={() => deleteUser(uid)}
                    className="btn btn-danger wd-delete"
                >
                    Delete
                </button>
            </div>
        </div>
    );
}