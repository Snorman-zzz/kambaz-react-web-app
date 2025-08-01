import axios from "axios";
import type { Assignment } from "./reducer";

const REMOTE = import.meta.env.VITE_REMOTE_SERVER;
const COURSES = `${REMOTE}/api/courses`;
const ASSIGN = `${REMOTE}/api/assignments`;

export const findAssignmentsForCourse = async (cid: string) => {
  const { data } = await axios.get<Assignment[]>(`${COURSES}/${cid}/assignments`);
  return data;
};

export const createAssignmentForCourse = async (
  cid: string,
  assignment: Omit<Assignment, "_id" | "course">
) => {
  const { data } = await axios.post<Assignment>(
    `${COURSES}/${cid}/assignments`,
    assignment
  );
  return data;
};

export const updateAssignment = async (assignment: Assignment) => {
  const { data } = await axios.put<Assignment>(
    `${ASSIGN}/${assignment._id}`,
    assignment
  );
  return data;
};

export const deleteAssignment = async (aid: string) => {
  await axios.delete(`${ASSIGN}/${aid}`);
};
