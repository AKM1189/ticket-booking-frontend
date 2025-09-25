import { Carousel } from "@mantine/carousel";
import Autoplay from "embla-carousel-autoplay";
import { useRef, useMemo, useEffect } from "react";
import { NavLink } from "react-router";
import { routes } from "../../../routes";
import MovieCard from "./MovieCard";
import {
  SortType,
  type HomeMoviesType,
  type MovieType,
} from "@/types/MovieTypes";
import { useMovieStore } from "@/store/useMovieStore";
import { MovieStatus } from "@/constants/movieConstants";

// type MoviesType = typeof movies;
const movies = [
  {
    id: 1,
    name: "AKM",
    posterUrl: "/movie02.jpg",
  },
  {
    id: 2,
    name: "Marvel",
    posterUrl: "/movie03.jpg",
  },
  {
    id: 3,
    name: "AKM",
    posterUrl: "/movie02.jpg",
  },
  {
    id: 4,
    name: "Marvel",
    posterUrl: "/movie03.jpg",
  },
  {
    id: 5,
    name: "AKM",
    posterUrl: "/movie02.jpg",
  },
  {
    id: 6,
    name: "Marvel",
    posterUrl: "/movie03.jpg",
  },
  {
    id: 7,
    name: "AKM",
    posterUrl: "/movie02.jpg",
  },
  {
    id: 8,
    name: "Marvel",
    posterUrl: "/movie03.jpg",
  },
];

const HomeMovies = () => {
  const { showingMovies, comingMovies, availableMovies } = useMovieStore();
  return (
    <div className="min-h-[500px]">
      <div className="flex justify-between items-baseline">
        <div className="md:text-5xl text-3xl inline uppercase font-bold pb-5 border-b-4 border-accent">
          Movies
        </div>
      </div>
      <div className="flex flex-col gap-10">
        {showingMovies?.length > 0 && (
          <MovieCarousel
            movies={showingMovies}
            menu={SortType.showing}
            type={MovieStatus.showing}
          />
        )}

        {availableMovies?.length > 0 && (
          <MovieCarousel
            movies={availableMovies}
            menu={"Ticket Available"}
            delay={2500}
            type={MovieStatus.available}
          />
        )}

        {comingMovies?.length > 0 && (
          <MovieCarousel
            movies={comingMovies}
            menu={SortType.comingSoon}
            delay={2500}
            type={MovieStatus.coming}
          />
        )}
      </div>
    </div>
  );
};

export default HomeMovies;

interface MovieCarouselProps {
  movies: HomeMoviesType[];
  menu: string;
  type: MovieStatus;
  delay?: number;
}
const MovieCarousel = ({
  movies,
  menu,
  type,
  delay = 2000,
}: MovieCarouselProps) => {
  const autoplay = useRef(Autoplay({ delay }));
  const sortBy = menu === SortType.showing ? "now-showing" : "coming-soon";

  // Memoize slides to prevent recreation on every render
  const slides = useMemo(
    () =>
      movies.map((movie: HomeMoviesType) => (
        <Carousel.Slide key={movie.id} className="min-h-[500px]">
          {movie && <MovieCard movie={movie} type={type} />}
        </Carousel.Slide>
      )),
    [movies],
  );

  return (
    <div>
      <div className="mt-10 flex justify-between">
        <span className="text-xl font-semibold">{menu}</span>
        <NavLink
          to={"/" + routes.user.movies + "/sortBy/" + sortBy}
          className="text-accent underline"
        >
          See All
        </NavLink>
      </div>

      <div className="mt-10">
        <div
          style={{
            overflow: "hidden",
            maxWidth: "100%",
            minWidth: 250,
          }}
        >
          <Carousel
            withControls={false}
            type="container"
            draggable
            slideSize={{ base: "100%", "300px": "50%", "500px": "25%" }}
            slideGap={{ base: 0, "300px": "md", "500px": "lg" }}
            emblaOptions={{ loop: true, align: "start" }}
            plugins={[autoplay.current]}
            onMouseEnter={autoplay.current.stop}
            onMouseLeave={() => autoplay.current.play()}
          >
            {slides}
          </Carousel>
        </div>
      </div>
    </div>
  );
};
