import { api } from "@/api/api";
import { endpoints } from "@/api/endpoints";
import type { ScheduleInputType } from "@/types/ScheduleTypes";

export const getSchedule = async () => {
  const response = await api.get(endpoints.admin.schedules);
  return response.data;
};

export const getSchedulesByShow = async (
  movieId: string,
  theatreId: string,
  screenId: string,
  showDate: string,
  showTime: string,
) => {
  const response = await api.get(
    endpoints.admin.schedulesByShow +
      `?movieId=${movieId}&theatreId=${theatreId}&screenId=${screenId}&showDate=${showDate}&showTime=${showTime}`,
  );
  return response.data;
};

export const getShowDates = async (
  movieId: string,
  theatreId: string,
  screenId: string,
) => {
  const response = await api.get(
    endpoints.admin.showDates +
      `?movieId=${movieId}&theatreId=${theatreId}&screenId=${screenId}`,
  );
  return response.data;
};

export const getShowTimes = async (
  movieId: string,
  theatreId: string,
  screenId: string,
  showDate: string,
) => {
  const response = await api.get(
    endpoints.admin.showTimes +
      `?movieId=${movieId}&theatreId=${theatreId}&screenId=${screenId}&showDate=${showDate}`,
  );
  return response.data;
};

export const addSchedule = async (data: ScheduleInputType) => {
  const response = await api.post(endpoints.admin.schedules, data);
  return response.data;
};

export const updateSchedule = async (data: ScheduleInputType, id: number) => {
  const response = await api.put(`${endpoints.admin.schedules}/${id}`, data);
  return response.data;
};

export const deleteSchedule = async (id: number) => {
  const response = await api.delete(`${endpoints.admin.schedules}/${id}`);
  return response.data;
};
