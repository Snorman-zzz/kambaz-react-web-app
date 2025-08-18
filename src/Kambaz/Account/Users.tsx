import { useState, useEffect } from "react";
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
    const { uid } = useParams();
    const fetchUsers = async () => {
        const users = await client.findAllUsers();
        setUsers(users);
    };
    useEffect(() => {
        fetchUsers();
    }, [uid]);
    return (
        <div>
            <h3>Users</h3>
            <PeopleTable users={users} />
        </div>
    );}
