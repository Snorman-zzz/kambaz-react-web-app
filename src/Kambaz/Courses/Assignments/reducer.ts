import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import assignmentsData from "../../Database/assignments.json";

export interface Assignment {
  _id: string;
  title: string;
  course: string;
  description?: string;
  points?: number;
  available?: string;
  due?: string;
}

interface AssignmentsState {
  assignments: Assignment[];
}

const initialState: AssignmentsState = {
  assignments: assignmentsData as Assignment[],
};

const assignmentsSlice = createSlice({
  name: "assignments",
  initialState,
  reducers: {
    addAssignment: (
      state,
      { payload }: PayloadAction<Partial<Omit<Assignment, "_id">> & { course: string }>
    ) => {
      const newAssignment: Assignment = {
        _id: crypto.randomUUID(), // eslint-disable-line no-undef
        title: payload.title ?? "New Assignment",
        course: payload.course,
        description: payload.description ?? "",
        points: payload.points ?? 100,
        available: payload.available,
        due: payload.due,
      };
      state.assignments.push(newAssignment);
    },
    deleteAssignment: (state, { payload }: PayloadAction<string>) => {
      state.assignments = state.assignments.filter((a) => a._id !== payload);
    },
    updateAssignment: (state, { payload }: PayloadAction<Assignment>) => {
      state.assignments = state.assignments.map((a) =>
        a._id === payload._id ? { ...a, ...payload } : a
      );
    },
  },
});

export const { addAssignment, deleteAssignment, updateAssignment } = assignmentsSlice.actions;
export default assignmentsSlice.reducer; 