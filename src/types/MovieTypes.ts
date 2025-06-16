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
