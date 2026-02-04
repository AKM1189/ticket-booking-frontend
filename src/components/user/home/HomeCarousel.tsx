import { Carousel } from "@mantine/carousel";
import { Image } from "@mantine/core";
import Autoplay from "embla-carousel-autoplay";
import { useRef, useMemo } from "react";
import { IconChevronRight } from "@tabler/icons-react";
import { IconChevronLeft } from "@tabler/icons-react";

const images = [
  "/movie-bg1.jpg",
  "/movie-bg2.jpg",
  "/movie-bg3.jpg",
  "/movie-bg4.jpg",
  "/movie-bg5.jpg",
];

function HomeCarousel() {
  const autoplay = useRef(Autoplay({ delay: 5000 }));

  // Memoize slides to prevent recreation on every render
  const slides = useMemo(
    () =>
      images.map((url) => (
        <Carousel.Slide key={url}>
          <div>
            <Image
              src={url}
              w={"100%"}
              h={650}
              className="!object-cover"
              fit="cover"
            />
          </div>
        </Carousel.Slide>
      )),
    [],
  );

  return (
    <Carousel
      withIndicators={false}
      flex={1}
      controlSize={40}
      withControls={true}
      nextControlIcon={<IconChevronRight />}
      previousControlIcon={<IconChevronLeft />}
      emblaOptions={{ align: "start" }}
      plugins={[autoplay.current]}
      classNames={{
        container: "!max-h-[600px]",
        control: "!bg-surface !text-text !border-surface",
      }}
      styles={{
        indicator: {
          background: "#57a9d2",
        },
        control: {
          background: "var(--color-lightGray)",
          color: "var(--color-muted)",
        },
      }}
    >
      {slides}
    </Carousel>
  );
}

export default HomeCarousel;
