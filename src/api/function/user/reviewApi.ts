import { api } from "@/api/api";
import { endpoints } from "@/api/endpoints";
import type { ReviewInputType } from "@/types/MovieTypes";

export const addReview = async (data: ReviewInputType) => {
  const response = await api.post(endpoints.user.reviews, data);
  return response.data;
};

export const updateReview = async (data: ReviewInputType, id: number) => {
  const response = await api.put(`${endpoints.user.reviews}/${id}`, data);
  return response.data;
};

export const deleteReview = async (id: number) => {
  const response = await api.delete(`${endpoints.user.reviews}/${id}`);
  return response.data;
};
