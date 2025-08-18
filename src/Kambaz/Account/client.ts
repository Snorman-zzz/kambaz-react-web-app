import { axiosWithCredentials, REMOTE_SERVER } from "../client";

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

export const USERS_API = `${REMOTE_SERVER}/api/users`;

export const findMyCourses = async () => {
    const { data } = await axiosWithCredentials.get(`${USERS_API}/current/courses`);
    return data;
};

export const signin = async (credentials: Credentials) => {
    try {
        const response = await axiosWithCredentials.post(`${USERS_API}/signin`, credentials);
        return response.data;
    } catch (e: any) {
        if (e?.response?.status === 401) {
            return null;
        }
        throw e;
    }
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

export const findAllUsers = async () => {
    const response = await axiosWithCredentials.get(USERS_API);
    return response.data;
};

export const findUsersByRole = async (role: string) => {
    const response = await axiosWithCredentials.get(`${USERS_API}/role/${role}`);
    return response.data;
};

export const findUsersByPartialName = async (name: string) => {
    const response = await axiosWithCredentials.get(`${USERS_API}/name/${name}`);
    return response.data;
};

export const createUser = async (user: User) => {
    const response = await axiosWithCredentials.post(USERS_API, user);
    return response.data;
};

export const findUserById = async (userId: string) => {
    const response = await axiosWithCredentials.get(`${USERS_API}/${userId}`);
    return response.data;
};

export const deleteUser = async (userId: string) => {
    const response = await axiosWithCredentials.delete(`${USERS_API}/${userId}`);
    return response.data;
};

export const findCoursesForUser = async (userId: string) => {
    const response = await axiosWithCredentials.get(`${USERS_API}/${userId}/courses`);
    return response.data;
};

export const enrollIntoCourse = async (userId: string, courseId: string) => {
    const response = await axiosWithCredentials.post(`${USERS_API}/${userId}/courses/${courseId}`);
    return response.data;
};

export const unenrollFromCourse = async (userId: string, courseId: string) => {
    const response = await axiosWithCredentials.delete(`${USERS_API}/${userId}/courses/${courseId}`);
    return response.data;
};

