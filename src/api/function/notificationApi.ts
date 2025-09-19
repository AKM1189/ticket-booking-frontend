import { api } from "@/api/api";
import { endpoints } from "@/api/endpoints";

export const getNotifications = async (page: number) => {
  const response = await api.get(
    `${endpoints.admin.notifications}?page=${page}`,
  );
  return response.data;
};

export const readNoti = async (id: number) => {
  const response = await api.post(endpoints.admin.notifications + "/" + id);
  return response.data;
};

export const readAllNoti = async () => {
  const response = await api.post(endpoints.admin.notifications + "/all");
  return response.data;
};
