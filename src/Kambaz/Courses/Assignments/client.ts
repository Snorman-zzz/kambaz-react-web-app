import type { Assignment } from "./reducer";
import { axiosWithCredentials, REMOTE_SERVER } from "../../client";

const COURSES = `${REMOTE_SERVER}/api/courses`;
const ASSIGN = `${REMOTE_SERVER}/api/assignments`;

export const findAssignmentsForCourse = async (cid: string) => {
  const { data } = await axiosWithCredentials.get<Assignment[]>(`${COURSES}/${cid}/assignments`);
  return data;
};

export const createAssignmentForCourse = async (
  cid: string,
  assignment: Omit<Assignment, "_id" | "course">
) => {
  const { data } = await axiosWithCredentials.post<Assignment>(
    `${COURSES}/${cid}/assignments`,
    assignment
  );
  return data;
};

export const updateAssignment = async (assignment: Assignment) => {
  const { data } = await axiosWithCredentials.put<Assignment>(
    `${ASSIGN}/${assignment._id}`,
    assignment
  );
  return data;
};

export const deleteAssignment = async (aid: string) => {
  await axiosWithCredentials.delete(`${ASSIGN}/${aid}`);
};
