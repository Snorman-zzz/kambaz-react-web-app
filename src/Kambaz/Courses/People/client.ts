import axios from "axios";

const REMOTE = import.meta.env.VITE_REMOTE_SERVER;
const USERS_API = `${REMOTE}/api/users`;

export interface User {
  _id: string;
  firstName: string;
  lastName: string;
  loginId: string;
  section: string;
  role: string;
  lastActivity: string;
  totalActivity: string;
  username?: string;
  email?: string;
}

export const findAllUsers = async () => {
  const { data } = await axios.get<User[]>(USERS_API);
  return data;
};

export const findUserById = async (userId: string) => {
  const { data } = await axios.get<User>(`${USERS_API}/${userId}`);
  return data;
};

export const createUser = async (user: Omit<User, "_id">) => {
  const { data } = await axios.post<User>(USERS_API, user);
  return data;
};

export const updateUser = async (userId: string, updates: Partial<User>) => {
  const { data } = await axios.put<User>(`${USERS_API}/${userId}`, updates);
  return data;
};

export const deleteUser = async (userId: string) => {
    const response = await axios.delete( `${USERS_API}/${userId}` );
    return response.data;
};
