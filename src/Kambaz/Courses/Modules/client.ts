import { axiosWithCredentials, REMOTE_SERVER } from "../../client";

interface Module {
  _id: string;
  name: string;
  description?: string;
  course?: string;
}

const MODULES_API = `${REMOTE_SERVER}/api/modules`;

export const updateModule = async (module: Module) => {
  const { data } = await axiosWithCredentials.put(`${MODULES_API}/${module._id}`, module);
  return data;
};

export const deleteModule = async (moduleId: string) => {
  const response = await axiosWithCredentials.delete(`${MODULES_API}/${moduleId}`);
  return response.data;
};