import type React from "react";

export type LabelType = {
  id: number;
  label: string;
};

export type FilterListType = {
  lang: LabelType[];
  exp: LabelType[];
  genre: LabelType[];
};

export type MovieType = {
  id: number;
  name: string;
  duration: string;
  genres: LabelType[];
  releaseDate: string;
  rating: string;
  status: string;
  posterUrl: string;
  trailerId: string;
};

export type MovieDetailType = {
  id: number;
  name: string;
  duration: string;
  genres: LabelType[];
  languages: string[];
  releaseDate: string;
  rating: string;
  status: string;
  posterUrl: string;
  trailerId: string;
  subtitle: string[];
  casts: CastType[];
  images: string[];
  reviews: ReviewType[];
};

export type CastType = {
  id: number;
  name: string;
  role: string;
  imageUrl: string | null;
};

export type TabType = {
  id: number;
  label: string;
  component: React.ReactNode;
};

export type ReviewType = {
  id: number;
  username: string;
  rating: string;
  review: string;
  reviewedDate: string;
};

export enum SortType {
  showing = "Now Showing",
  comingSoon = "Coming Soon",
  trending = "Trending",
}
