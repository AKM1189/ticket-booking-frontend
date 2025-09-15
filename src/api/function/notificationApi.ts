import { api } from "@/api/api";
import { endpoints } from "@/api/endpoints";

export const getNotifications = async (page: number, type: string) => {
  const response = await api.get(
    `${endpoints.admin.notifications}/${type}?page=${page}`,
  );
  return response.data;
};

export const readNoti = async (id: number) => {
  const response = await api.patch(endpoints.admin.notifications + "/" + id);
  return response.data;
};

export const readAllNoti = async () => {
  const response = await api.patch(endpoints.admin.notifications + "/all");
  return response.data;
};
