export type CastType = {
  id: number;
  name: string;
  role: string;
  imageUrl: string | null;
};

export type CastInputType = {
  name: string;
  role: string;
  image: File | null;
};

export type CastSelectionType = {
  id: number;
  name: string;
  role: string;
  imageUrl: string | null;
};
