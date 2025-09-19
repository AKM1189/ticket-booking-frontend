import { useState } from "react";
import HomeCarousel from "@/components/user/home/HomeCarousel";
import HomeMovies from "@/components/user/home/HomeMovies";
import MovieSearchCard from "@/components/user/home/MovieSearchCard";

const Home = () => {
  const [selectedMovie, setSelectedMovie] = useState<string | undefined>();

  return (
    <div className="">
      <div className="relative w-full min-h-[600px] bg-surface">
        <HomeCarousel />
      </div>
      <div className="sm:px-[50px] xl:px-[150px]">
        <div className="relative h-[120px] bg-background flex flex-col justify-center ">
          <MovieSearchCard
            selectedMovie={selectedMovie}
            setSelectedMovie={setSelectedMovie}
          />
        </div>
        <div className="my-[200px] max-md:mt-[600px] mt-[200px] max-sm:px-5">
          <HomeMovies />
        </div>
      </div>
    </div>
  );
};

export default Home;
