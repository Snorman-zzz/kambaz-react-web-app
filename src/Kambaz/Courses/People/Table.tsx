import { Table, Button, Modal, Form } from "react-bootstrap";
import { FaUserCircle, FaEdit, FaTrash, FaPlus } from "react-icons/fa";
import { useSelector } from "react-redux";
import * as usersClient from "./client";
import React from "react";
import { Link } from "react-router-dom";
import PeopleDetails from "./Details";

interface User {
    _id: string;
    firstName: string;
    lastName: string;
    loginId: string;
    section: string;
    role: string;
    lastActivity: string;
    totalActivity: string;
}

interface RootState {
    accountReducer: { currentUser: { role?: string } | null };
}

interface PeopleTableProps {
    users?: User[];
    fetchUsers?: () => void;
}

export default function PeopleTable({ users = [], fetchUsers = () => {} }: PeopleTableProps) {
    const { currentUser } = useSelector((state: RootState) => state.accountReducer);
    const [showModal, setShowModal] = React.useState(false);
    const [editingUser, setEditingUser] = React.useState<User | null>(null);
    const [deleteUserId, setDeleteUserId] = React.useState<string | null>(null);
    const [form, setForm] = React.useState({
        firstName: "",
        lastName: "",
        loginId: "",
        section: "",
        role: "STUDENT",
        username: "",
        email: ""
    });
    const [formErrors, setFormErrors] = React.useState<{[key: string]: string}>({});
    const [isSubmitting, setIsSubmitting] = React.useState(false);

    const canEdit = currentUser?.role === "FACULTY" || currentUser?.role === "ADMIN";

    const validateForm = () => {
        const errors: {[key: string]: string} = {};
        
        if (!form.firstName.trim()) errors.firstName = "First name is required";
        if (!form.lastName.trim()) errors.lastName = "Last name is required";
        if (!form.username.trim()) errors.username = "Username is required";
        if (!form.email.trim()) errors.email = "Email is required";
        else if (!/\S+@\S+\.\S+/.test(form.email)) errors.email = "Email is invalid";
        if (!form.loginId.trim()) errors.loginId = "Login ID is required";
        if (!form.section.trim()) errors.section = "Section is required";
        
        setFormErrors(errors);
        return Object.keys(errors).length === 0;
    };

    const handleSave = async () => {
        if (!validateForm()) return;
        
        setIsSubmitting(true);
        try {
            if (editingUser) {
                await usersClient.updateUser(editingUser._id, form);
            } else {
                await usersClient.createUser({
                    ...form,
                    password: "password123", // Default password for new users
                    lastActivity: "2024-01-01",
                    totalActivity: "00:00:00"
                });
            }
            setShowModal(false);
            setEditingUser(null);
            setForm({
                firstName: "",
                lastName: "",
                loginId: "",
                section: "",
                role: "STUDENT",
                username: "",
                email: ""
            });
            setFormErrors({});
            fetchUsers();
        } catch (error: any) {
            console.error("Error saving user:", error);
            if (error.response?.status === 400 && error.response?.data?.message?.includes("username")) {
                setFormErrors({ username: "Username already exists" });
            }
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleDelete = async () => {
        if (deleteUserId) {
            try {
                await usersClient.deleteUser(deleteUserId);
                setDeleteUserId(null);
                fetchUsers();
            } catch (error) {
                console.error("Error deleting user:", error);
            }
        }
    };

    return (
        <div id="wd-people-table" className="pt-3">
            {/* Details sidebar */}
            <PeopleDetails fetchUsers={fetchUsers} />
            {canEdit && (
                <div className="mb-3">
                    <Button variant="primary" onClick={() => setShowModal(true)}>
                        <FaPlus className="me-2" />Add User
                    </Button>
                </div>
            )}
            <Table striped>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Login ID</th>
                        <th>Section</th>
                        <th>Role</th>
                        <th>Last Activity</th>
                        <th>Total Activity</th>
                        {canEdit && <th>Actions</th>}
                    </tr>
                </thead>
                <tbody>
                    {users.map((user) => (
                            <tr key={user._id}>
                                <td className="wd-full-name text-nowrap">
                                    <Link to={`/Kambaz/Account/Users/${user._id}`} className="text-decoration-none">
                                        <FaUserCircle className="me-2 fs-1 text-secondary" />
                                        <span className="wd-first-name">{user.firstName}</span>{" "}
                                        <span className="wd-last-name">{user.lastName}</span>
                                    </Link>
                                </td>
                                <td className="wd-login-id">{user.loginId}</td>
                                <td className="wd-section">{user.section}</td>
                                <td className="wd-role">{user.role}</td>
                                <td className="wd-last-activity">{user.lastActivity}</td>
                                <td className="wd-total-activity">{user.totalActivity}</td>
                                {canEdit && (
                                    <td>
                                        <Button
                                            variant="outline-primary"
                                            size="sm"
                                            className="me-2"
                                            onClick={() => {
                                                setEditingUser(user);
                                                                                setForm({
                                    firstName: user.firstName,
                                    lastName: user.lastName,
                                    loginId: user.loginId,
                                    section: user.section,
                                    role: user.role,
                                    username: (user as any).username || "",
                                    email: (user as any).email || ""
                                });
                                                setShowModal(true);
                                            }}
                                        >
                                            <FaEdit />
                                        </Button>
                                        <Button
                                            variant="outline-danger"
                                            size="sm"
                                            onClick={() => setDeleteUserId(user._id)}
                                        >
                                            <FaTrash />
                                        </Button>
                                    </td>
                                )}
                            </tr>
                        ))}
                </tbody>
            </Table>

            {/* User Modal */}
            <Modal show={showModal} onHide={() => setShowModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>{editingUser ? "Edit User" : "Add User"}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group className="mb-3">
                            <Form.Label>First Name</Form.Label>
                            <Form.Control
                                value={form.firstName}
                                onChange={(e) => setForm({ ...form, firstName: e.target.value })}
                                isInvalid={!!formErrors.firstName}
                            />
                            <Form.Control.Feedback type="invalid">
                                {formErrors.firstName}
                            </Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Last Name</Form.Label>
                            <Form.Control
                                value={form.lastName}
                                onChange={(e) => setForm({ ...form, lastName: e.target.value })}
                                isInvalid={!!formErrors.lastName}
                            />
                            <Form.Control.Feedback type="invalid">
                                {formErrors.lastName}
                            </Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Login ID</Form.Label>
                            <Form.Control
                                value={form.loginId}
                                onChange={(e) => setForm({ ...form, loginId: e.target.value })}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Section</Form.Label>
                            <Form.Control
                                value={form.section}
                                onChange={(e) => setForm({ ...form, section: e.target.value })}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Role</Form.Label>
                            <Form.Select
                                value={form.role}
                                onChange={(e) => setForm({ ...form, role: e.target.value })}
                            >
                                <option value="STUDENT">Student</option>
                                <option value="FACULTY">Faculty</option>
                                <option value="TA">TA</option>
                            </Form.Select>
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Username</Form.Label>
                            <Form.Control
                                value={form.username}
                                onChange={(e) => setForm({ ...form, username: e.target.value })}
                                isInvalid={!!formErrors.username}
                            />
                            <Form.Control.Feedback type="invalid">
                                {formErrors.username}
                            </Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Email</Form.Label>
                            <Form.Control
                                value={form.email}
                                onChange={(e) => setForm({ ...form, email: e.target.value })}
                                isInvalid={!!formErrors.email}
                            />
                            <Form.Control.Feedback type="invalid">
                                {formErrors.email}
                            </Form.Control.Feedback>
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowModal(false)}>
                        Cancel
                    </Button>
                    <Button variant="primary" onClick={handleSave} disabled={isSubmitting}>
                        {isSubmitting ? "Saving..." : "Save"}
                    </Button>
                </Modal.Footer>
            </Modal>

            {/* Delete Confirmation Modal */}
            <Modal show={!!deleteUserId} onHide={() => setDeleteUserId(null)}>
                <Modal.Header closeButton>
                    <Modal.Title>Delete User</Modal.Title>
                </Modal.Header>
                <Modal.Body>Are you sure you want to delete this user?</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setDeleteUserId(null)}>
                        Cancel
                    </Button>
                    <Button variant="danger" onClick={handleDelete}>
                        Delete
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
} 