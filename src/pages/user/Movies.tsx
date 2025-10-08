import MovieSearchCard from "@/components/user/home/MovieSearchCard";
import { MovieFrame } from "@/components/user/movies";
import { useParams } from "react-router";

const Movies = () => {
  const { type } = useParams();

  return (
    <div>
      <div className="relative">
        <div className="w-full h-[300px] md:h-[600px] bg-[url('https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/images/bg-1.png')]">
          <div className="w-full h-full bg-surface/70 flex flex-col gap-5 justify-center items-center">
            <div className="text-2xl md:text-7xl font-bold uppercase">
              Get <span className="text-accent">Movie</span> Tickets
            </div>
            <div className="text-base md:text-2xl max-w-[800px] text-center">
              Buy movie tickets in advance, find movie times watch trailer, read
              movie reviews and much more
            </div>
          </div>
        </div>
        <div className="relative  max-sm:px-3  max-sm:top-3 max-md:top-20 sm:px-[50px] xl:px-[150px]">
          <div className="relative h-[120px] bg-background flex flex-col justify-center ">
            <MovieSearchCard />
          </div>
          <div className="mt-[500px] sm:mt-[400px] md:mt-[200px]">
            <MovieFrame type={type} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Movies;
