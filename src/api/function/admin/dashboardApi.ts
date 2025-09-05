import { api } from "@/api/api";
import { endpoints } from "@/api/endpoints";

export const getCardInfo = async () => {
  const response = await api.get(endpoints.admin.cardInfo);
  return response.data;
};

export const getUpcomingSchedule = async () => {
  const response = await api.get(endpoints.admin.upcomingSchedules);
  return response.data;
};
