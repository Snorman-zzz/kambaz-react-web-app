import axios from "axios";

export const REMOTE_SERVER = import.meta.env.VITE_REMOTE_SERVER || "http://localhost:4000";

export const axiosWithCredentials = axios.create({ withCredentials: true });