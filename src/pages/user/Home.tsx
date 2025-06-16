import { useState } from "react";
import CustomCarousel from "../../ui/carousel/CustomCarousel";
import HomeMovies from "../../components/user/home/HomeMovies";
import MovieSearchCard from "@/components/user/home/MovieSearchCard";

const Home = () => {
  const [selectedMovie, setSelectedMovie] = useState<string | undefined>();

  return (
    <div>
      <CustomCarousel />
      <div className="sm:px-[50px] xl:px-[150px]">
        <div className="relative h-[120px] bg-background flex flex-col justify-center ">
          <MovieSearchCard
            selectedMovie={selectedMovie}
            setSelectedMovie={setSelectedMovie}
          />
        </div>
        <div className="my-[200px] max-md:mt-[600px] mt-[300px] max-sm:px-5">
          <HomeMovies />
        </div>
      </div>
    </div>
  );
};

export default Home;
