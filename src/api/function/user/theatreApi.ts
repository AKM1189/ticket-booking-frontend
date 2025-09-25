import { api } from "@/api/api";
import { endpoints } from "@/api/endpoints";

export const getShowingTheatres = async () => {
  const response = await api.get(`${endpoints.user.theatres}/showing`);
  return response.data;
};
