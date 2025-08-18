import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

export interface Course {
  _id: string;
  name: string;
  description: string;
}

interface CoursesState {
  courses: Course[];
}

const initialState: CoursesState = {
  courses: [],
};

const coursesSlice = createSlice({
  name: "courses",
  initialState,
  reducers: {
    addCourse: (
      state,
      { payload }: PayloadAction<{ name: string; description: string }>
    ) => {
      const newCourse: Course = {
        _id: crypto.randomUUID(), // eslint-disable-line no-undef
        name: payload.name,
        description: payload.description,
      };
      state.courses.push(newCourse);
    },
    deleteCourse: (state, { payload }: PayloadAction<string>) => {
      state.courses = state.courses.filter((c) => c._id !== payload);
    },
    updateCourse: (state, { payload }: PayloadAction<Course>) => {
      state.courses = state.courses.map((c) =>
        c._id === payload._id ? { ...c, ...payload } : c
      );
    },
    setCourses: (state, { payload }: PayloadAction<Course[]>) => {
      state.courses = payload;
    },
  },
});

export const { addCourse, deleteCourse, updateCourse, setCourses } = coursesSlice.actions;
export default coursesSlice.reducer; 