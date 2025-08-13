import type React from "react";
import type { GenreType } from "./GenreTypes";
import type { CastSelectionType } from "./CastTypes";

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
  genres: string[];
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
  status: string;
  poster: File | null;
  photos: File[];
  trailerId: string;
  casts: number[];
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
