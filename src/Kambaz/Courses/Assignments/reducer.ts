import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import assignmentsData from "../../Database/assignments.json";

export interface Assignment {
  _id: string;
  title: string;
  description?: string;
  course: string;
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
      { payload }: PayloadAction<Omit<Assignment, "_id">>
    ) => {
      state.assignments.push({ ...payload, _id: crypto.randomUUID() }); // eslint-disable-line no-undef
    },
    deleteAssignment: (state, { payload: id }: PayloadAction<string>) => {
      state.assignments = state.assignments.filter((a) => a._id !== id);
    },
    updateAssignment: (state, { payload }: PayloadAction<Assignment>) => {
      state.assignments = state.assignments.map((a) =>
        a._id === payload._id ? payload : a
      );
    },
  },
});

export const { addAssignment, deleteAssignment, updateAssignment } =
  assignmentsSlice.actions;
export default assignmentsSlice.reducer; 