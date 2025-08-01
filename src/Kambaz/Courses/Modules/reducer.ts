import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

// Define interfaces for lessons and modules
interface Lesson {
  _id: string;
  name: string;
  description?: string;
  module: string;
}

interface Module {
  _id: string;
  name: string;
  description?: string;
  course: string;
  lessons?: Lesson[];
  editing?: boolean;
}

interface ModulesState {
  modules: Module[];
}

const initialState: ModulesState = {
  modules: [],
};

const modulesSlice = createSlice({
  name: "modules",
  initialState,
  reducers: {
    setModules: (state, action) => {
      state.modules = action.payload;
    },
    addModule: (
      state,
      { payload }: PayloadAction<{ name: string; course: string }>
    ) => {
      const newModule: Module = {
        _id: crypto.randomUUID(),
        lessons: [],
        name: payload.name,
        course: payload.course,
        description: "",
      };
      state.modules.push(newModule);
    },
    deleteModule: (state, { payload: moduleId }: PayloadAction<string>) => {
      state.modules = state.modules.filter((m) => m._id !== moduleId);
    },
    updateModule: (state, { payload: module }: PayloadAction<Partial<Module> & { _id: string }>) => {
      state.modules = state.modules.map((m) =>
        m._id === module._id ? { ...m, ...module } : m
      );
    },
    editModule: (state, { payload: moduleId }: PayloadAction<string>) => {
      state.modules = state.modules.map((m) =>
        m._id === moduleId ? { ...m, editing: true } : m
      );
    },
  },
});

export const { addModule, deleteModule, updateModule, editModule, setModules } =
  modulesSlice.actions;
export default modulesSlice.reducer;