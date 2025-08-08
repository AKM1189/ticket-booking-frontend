import { api } from "@/api/api";
import { endpoints } from "@/api/endpoints";
import type { CastInputType } from "@/types/CastTypes";

export const getCasts = async () => {
  const response = await api.get(endpoints.admin.casts);
  return response.data;
};

export const addCast = async (data: CastInputType) => {
  const response = await api.post(endpoints.admin.casts, data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return response.data;
};

export const updateCast = async (data: CastInputType, id: number) => {
  const response = await api.put(`${endpoints.admin.casts}/${id}`, data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return response.data;
};

export const deleteCast = async (id: number) => {
  const response = await api.delete(`${endpoints.admin.casts}/${id}`);
  return response.data;
};
