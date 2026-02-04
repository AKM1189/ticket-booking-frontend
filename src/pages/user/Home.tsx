import { useEffect } from "react";
import HomeCarousel from "@/components/user/home/HomeCarousel";
import HomeMovies from "@/components/user/home/HomeMovies";
import MovieSearchCard from "@/components/user/home/MovieSearchCard";
import { useMovieStore } from "@/store/useMovieStore";
import {
  useAvailableMovieQuery,
  useComingMovieQuery,
  useShowingMovieQuery,
} from "@/api/query/user/movieQuery";

const Home = () => {
  const { setMovies } = useMovieStore();

  const { data: showingMovies } = useShowingMovieQuery();
  const { data: availableMovies } = useAvailableMovieQuery();
  const { data: comingMovies } = useComingMovieQuery();

  useEffect(() => {
    setMovies(showingMovies?.data, "showing");
  }, [showingMovies]);

  useEffect(() => {
    setMovies(availableMovies?.data, "available");
  }, [availableMovies]);

  useEffect(() => {
    setMovies(comingMovies?.data, "coming");
  }, [comingMovies]);

  return (
    <div className="">
      <div className="relative w-full min-h-[650px]">
        <HomeCarousel />
      </div>
      <div className="sm:px-[50px] xl:px-[150px]">
        <div className="relative h-[120px] bg-background flex flex-col justify-center">
          <MovieSearchCard />
        </div>
        <div className="my-[200px] max-md:mt-[600px] mt-[200px] max-sm:px-5">
          <HomeMovies />
        </div>
      </div>
    </div>
  );
};

export default Home;
