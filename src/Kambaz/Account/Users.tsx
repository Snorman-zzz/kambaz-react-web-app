import { useState, useEffect } from "react";
import { FormControl } from "react-bootstrap";
import { FaPlus } from "react-icons/fa";
import { useParams } from "react-router";
import PeopleTable from "../Courses/People/Table";
import * as client from "./client";

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

export default function Users() {
    const [users, setUsers] = useState<User[]>([]);
    const [role, setRole] = useState<string>("");             // Track selected role
    const [name, setName] = useState<string>("");           // Track name search
    const { uid } = useParams();

    // Retrieves all users from server
    const fetchUsers = async () => {
        const users = await client.findAllUsers();
        setUsers(users);
    };

    // Handles change in role dropdown and fetches filtered users
    const filterUsersByRole = async (selectedRole: string) => {
        setRole(selectedRole);
        if (selectedRole) {
            let users = await client.findUsersByRole(selectedRole);
            // If a name filter is also applied, further filter locally on the client
            if (name) {
                const lowered = name.toLowerCase();
                users = users.filter(
                    (u: User) =>
                        u.firstName.toLowerCase().includes(lowered) ||
                        u.lastName.toLowerCase().includes(lowered)
                );
            }
            setUsers(users);
        } else {
            // No role filter. Apply name filter if present, otherwise fetch all
            if (name) {
                filterUsersByName(name);
            } else {
                fetchUsers();
            }
        }
    };

    // Handles change in name input and fetches users matching the name
    const filterUsersByName = async (partialName: string) => {
        setName(partialName);
        if (partialName) {
            let users = await client.findUsersByPartialName(partialName);
            // If role filter is also applied, further filter locally
            if (role) {
                users = users.filter((u: User) => u.role === role);
            }
            setUsers(users);
        } else {
            // Name cleared. Apply role filter if present
            if (role) {
                filterUsersByRole(role);
            } else {
                fetchUsers();
            }
        }
    };

    useEffect(() => {
        fetchUsers();
    }, [uid]);

    // Create new user with default data
    const createUser = async () => {
        try {
            const newUser = await client.createUser({
                firstName: "New",
                lastName: `User${users.length + 1}`,
                username: `newuser${Date.now()}`,
                password: "password123",
                email: `email${users.length + 1}@neu.edu`,
                section: "S101",
                role: "STUDENT",
            });
            setUsers([...users, newUser]);
        } catch (error) {
            console.error("Error creating user:", error);
        }
    };


    return (
        <div>
            <h3 className="d-inline">Users</h3>
            <button
                onClick={createUser}
                className="btn btn-danger float-end mb-3 wd-add-people"
            >
                <FaPlus className="me-2" /> People
            </button>

            {/* Name search input */}
            <FormControl
                placeholder="Search people"
                className="float-start w-25 me-2 wd-filter-by-name mb-3"
                value={name}
                onChange={(e) => filterUsersByName(e.target.value)}
            />

            {/* Role filter dropdown */}
            <select
                value={role}
                onChange={(e) => filterUsersByRole(e.target.value)}
                className="form-select float-start w-25 wd-select-role mb-3"
            >
                <option value="">All Roles</option>
                <option value="STUDENT">Students</option>
                <option value="TA">Assistants</option>
                <option value="FACULTY">Faculty</option>
                <option value="ADMIN">Administrators</option>
            </select>

            <PeopleTable 
                users={users} 
                fetchUsers={() => {
                    // If filters are applied, maintain them
                    if (name && role) {
                        filterUsersByName(name);
                    } else if (role) {
                        filterUsersByRole(role);
                    } else if (name) {
                        filterUsersByName(name);
                    } else {
                        fetchUsers();
                    }
                }} 
            />
        </div>
    );}
