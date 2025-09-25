import type React from "react";
import type { GenreType } from "./GenreTypes";

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
  title: string;
  description: string;
  duration: string;
  genres: GenreType[];
  language: string[];
  subtitle: string[];
  experience: string[];
  releaseDate: string | null;
  rating: string;
  status: string;
  poster: ImageType;
  photos: ImageType[];
  trailerId: string;
  casts: CastType[];
};

export type MovieInputType = {
  title: string;
  description: string;
  duration: number | null;
  genres: string[];
  language: string[];
  subtitle: string[];
  experience: string[];
  releaseDate: string | null;
  poster: File | null;
  photos: File[];
  trailerId: string;
  casts: number[];
};

export type MovieDetailType = {
  id: number;
  title: string;
  duration: string;
  genres: GenreType[];
  language: string[];
  releaseDate: string;
  rating: string;
  status: string;
  poster: ImageType;
  trailerId: string;
  subtitle: string[];
  casts: CastType[];
  images: string[];
  reviews: ReviewType[];
};

export type ImageType = {
  id: number;
  url: string;
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

export type HomeMoviesType = {
  id: number;
  title: string;
  description: string;
  duration: number | null;
  rating: string;
  language: string[];
  subtitle: string[];
  experience: string[];
  releaseDate: string | null;
  poster: ImageType | null;
  trailerId: string;
  reviews: ReviewType[];
};
