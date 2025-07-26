import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import enrollmentsData from "../Database/enrollments.json";

export interface Enrollment {
  user: string;
  course: string;
}

interface EnrollmentsState {
  enrollments: Enrollment[];
}

const initialState: EnrollmentsState = {
  enrollments: enrollmentsData as Enrollment[],
};

const enrollmentsSlice = createSlice({
  name: "enrollments",
  initialState,
  reducers: {
    enrollCourse: (
      state,
      { payload }: PayloadAction<Enrollment>
    ) => {
      const exists = state.enrollments.some(
        (e) => e.user === payload.user && e.course === payload.course
      );
      if (!exists) state.enrollments.push(payload);
    },
    unenrollCourse: (
      state,
      { payload }: PayloadAction<Enrollment>
    ) => {
      state.enrollments = state.enrollments.filter(
        (e) => !(e.user === payload.user && e.course === payload.course)
      );
    },
  },
});

export const { enrollCourse, unenrollCourse } = enrollmentsSlice.actions;
export default enrollmentsSlice.reducer; 