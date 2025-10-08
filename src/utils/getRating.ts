export const getRating = (rating: string) => {
  return parseInt(rating) === 0 ? "N/A" : rating;
};
