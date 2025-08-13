import { api } from "@/api/api";
import { endpoints } from "@/api/endpoints";
import type { Role } from "@/types/AuthType";
import type { UserType } from "@/types/UserType";

export const getUsers = async (role: Role, page: number) => {
  const response = await api.get(
    `${endpoints.admin.users}?role=${role}&page=${page}`,
  );
  return response.data;
};

export const addUser = async (data: UserType) => {
  const response = await api.post(endpoints.admin.users, data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return response.data;
};

// export const updateCast = async (data: CastInputType, id: number) => {
//   const response = await api.put(`${endpoints.admin.casts}/${id}`, data, {
//     headers: {
//       "Content-Type": "multipart/form-data",
//     },
//   });
//   return response.data;
// };

export const deleteUser = async (id: number) => {
  const response = await api.delete(`${endpoints.admin.users}/${id}`);
  return response.data;
};
