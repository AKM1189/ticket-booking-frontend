import { api } from "@/api/api";
import { endpoints } from "@/api/endpoints";

export const getAboutInfo = async () => {
  const response = await api.get(`${endpoints.user.about}`);
  return response.data;
};
