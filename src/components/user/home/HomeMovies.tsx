import { Carousel } from "@mantine/carousel";
import Autoplay from "embla-carousel-autoplay";
import { useRef, useMemo, useEffect, useState } from "react";
import { NavLink } from "react-router";
import { routes } from "../../../routes";
import { SortType, type HomeMoviesType } from "@/types/MovieTypes";
import { MovieStatus } from "@/constants/movieConstants";
import MovieCard from "./MovieCard";

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
  const autoplay = useRef<ReturnType<typeof Autoplay> | null>(null);
  const [showControls, setShowControls] = useState(true);

  useEffect(() => {
    autoplay.current = Autoplay({ delay });
  }, [delay]);

  const sortBy = menu === SortType.showing ? "now-showing" : "coming-soon";

  // Adjust based on screen width
  useEffect(() => {
    const checkControls = () => {
      const width = window.innerWidth;
      let visibleSlides = 1;
      if (width >= 500) visibleSlides = 4;
      else if (width >= 300) visibleSlides = 2;

      setShowControls(movies.length > visibleSlides);
    };

    checkControls();
    window.addEventListener("resize", checkControls);
    return () => window.removeEventListener("resize", checkControls);
  }, [movies.length]);

  const slides = useMemo(
    () =>
      movies.map((movie) => (
        <Carousel.Slide key={movie.id} className="min-h-[500px]">
          <MovieCard movie={movie} type={type} />
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

      <div
        className="mt-10"
        style={{ overflow: "hidden", maxWidth: "100%", minWidth: 250 }}
      >
        <Carousel
          withControls={showControls}
          controlSize={35}
          type="container"
          draggable
          slideSize={{ base: "100%", "300px": "50%", "500px": "25%" }}
          slideGap={{ base: 0, "300px": "md", "500px": "lg" }}
          emblaOptions={{ loop: true, align: "start" }}
          plugins={autoplay.current ? [autoplay.current] : []}
          onMouseEnter={() => autoplay.current?.stop()}
          onMouseLeave={() => autoplay.current?.play()}
          classNames={{
            control: "!bg-surface-hover !text-text !border-none",
          }}
        >
          {slides}
        </Carousel>
      </div>
    </div>
  );
};

export default MovieCarousel;
