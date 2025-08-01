import axios from "axios";

interface Credentials {
    username: string;
    password: string;
}

interface User {
    _id?: string;
    username?: string;
    password?: string;
    [key: string]: string | undefined; // Allow additional string properties
}

const axiosWithCredentials = axios.create({ withCredentials: true });
export const REMOTE_SERVER = import.meta.env.VITE_REMOTE_SERVER;
export const USERS_API = `${REMOTE_SERVER}/api/users`;

export const findMyCourses = async () => {
    const { data } = await axiosWithCredentials.get(`${USERS_API}/current/courses`);
    return data;
};

export const signin = async (credentials: Credentials) => {
    const response = await axiosWithCredentials.post( `${USERS_API}/signin`, credentials );
    return response.data;
};

export const profile = async () => {
    const response = await axiosWithCredentials.post(`${USERS_API}/profile`);
    return response.data;
};

export const signup = async (user: User) => {
    const response = await axiosWithCredentials.post(`${USERS_API}/signup`, user);
    return response.data;
};

export const updateUser = async (user: User) => {
    const response = await axiosWithCredentials.put(`${USERS_API}/${user._id}`, user);
    return response.data;
};

export const signout = async () => {
    const response = await axiosWithCredentials.post(`${USERS_API}/signout`);
    return response.data;
};

import type { Course } from "../Courses/reducer";

export const createCourse = async (course: Course) => {
    const { data } = await axiosWithCredentials.post(`${USERS_API}/current/courses`, course);
    return data;
};
