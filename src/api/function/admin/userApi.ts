import { api } from "@/api/api";
import { endpoints } from "@/api/endpoints";
import type { Role } from "@/types/AuthType";
import type { UserInputType } from "@/types/UserType";

export const getUsers = async (search?: string, role?: Role, page?: number) => {
  const response = await api.get(
    `${endpoints.admin.users}?search=${search}&role=${role}&page=${page}`,
  );
  return response.data;
};

export const addUser = async (data: UserInputType) => {
  const response = await api.post(endpoints.admin.users, data);
  return response.data;
};

export const updateUser = async (data: UserInputType, id: number) => {
  const response = await api.put(`${endpoints.admin.users}/${id}`, data);
  return response.data;
};

export const deactivateUser = async (id: number) => {
  const response = await api.delete(`${endpoints.admin.users}/${id}`);
  return response.data;
};
