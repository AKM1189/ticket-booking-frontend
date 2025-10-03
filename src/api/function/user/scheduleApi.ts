import { api } from "@/api/api";
import { endpoints } from "@/api/endpoints";

export const getSchedules = async (movieId: string, showDate: string) => {
  const response = await api.get(`${endpoints.user.movies}/shows`, {
    params: {
      movieId,
      showDate,
    },
  });
  return response.data;
};

export const getScheduleDetail = async (scheduleId: number) => {
  const response = await api.get(`${endpoints.user.schedules}/${scheduleId}`);
  return response.data;
};
