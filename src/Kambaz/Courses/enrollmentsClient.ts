import { axiosWithCredentials, REMOTE_SERVER } from "../client";

const ENROLL_URL = `${REMOTE_SERVER}/api/enrollments`;
const USER_URL = `${REMOTE_SERVER}/api/users`;

export interface Enrollment {
  user: string;
  course: string;
  _id?: string;
}

export const fetchEnrollmentsForUser = async (uid: string) => {
  const { data } = await axiosWithCredentials.get<Enrollment[]>(`${USER_URL}/${uid}/enrollments`);
  return data;
};

export const enroll = async (record: Enrollment) => {
  const { data } = await axiosWithCredentials.post<Enrollment>(ENROLL_URL, record);
  return data;
};

export const unenroll = async (record: Enrollment) => {
  const { data } = await axiosWithCredentials.delete(ENROLL_URL, { data: record });
  return data;
};

export const fetchAllEnrollments = async () => {
  const { data } = await axiosWithCredentials.get<Enrollment[]>(ENROLL_URL);
  return data;
};

export const fetchEnrollmentsForCourse = async (courseId: string) => {
  const { data } = await axiosWithCredentials.get<Enrollment[]>(`${REMOTE_SERVER}/api/courses/${courseId}/enrollments`);
  return data;
};
