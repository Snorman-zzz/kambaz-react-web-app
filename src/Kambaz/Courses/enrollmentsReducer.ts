import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

interface Enrollment {
  user: string;
  course: string;
  _id?: string;
}

interface EnrollmentsState {
  enrollments: Enrollment[];
}

const initialState: EnrollmentsState = {
  enrollments: [],
};

const enrollmentsSlice = createSlice({
  name: "enrollments",
  initialState,
  reducers: {
    setEnrollments: (state, { payload }: PayloadAction<Enrollment[]>) => {
      state.enrollments = payload;
    },
    enrollCourse: (state, { payload }: PayloadAction<Enrollment>) => {
      // prevent duplicates
      if (!state.enrollments.some((e) => e.user === payload.user && e.course === payload.course)) {
        state.enrollments.push(payload);
      }
    },
    unenrollCourse: (state, { payload }: PayloadAction<Enrollment>) => {
      state.enrollments = state.enrollments.filter(
        (e) => !(e.user === payload.user && e.course === payload.course)
      );
    },
  },
});

export const { setEnrollments, enrollCourse, unenrollCourse } = enrollmentsSlice.actions;
export default enrollmentsSlice.reducer; 