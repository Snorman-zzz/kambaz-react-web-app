import axios from "axios";

const REMOTE = import.meta.env.VITE_REMOTE_SERVER || "http://localhost:4000";
const ENROLL_URL = `${REMOTE}/api/enrollments`;
const USER_URL = `${REMOTE}/api/users`;

export interface Enrollment {
  user: string;
  course: string;
}

export const fetchEnrollmentsForUser = async (uid: string) => {
  const { data } = await axios.get<Enrollment[]>(`${USER_URL}/${uid}/enrollments`);
  return data;
};

export const enroll = async (record: Enrollment) => {
  const { data } = await axios.post<Enrollment>(ENROLL_URL, record);
  return data;
};

export const unenroll = async (record: Enrollment) => {
  await axios.delete(ENROLL_URL, { data: record });
};
