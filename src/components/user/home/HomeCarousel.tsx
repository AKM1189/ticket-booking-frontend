import { Carousel } from "@mantine/carousel";
import { Image } from "@mantine/core";
import Autoplay from "embla-carousel-autoplay";
import { useRef, useMemo } from "react";
import { IconChevronRight } from "@tabler/icons-react";
import { IconChevronLeft } from "@tabler/icons-react";

const images = [
  "https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/images/bg-1.png",
  "https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/images/bg-2.png",
  "https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/images/bg-3.png",
  "https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/images/bg-4.png",
  "https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/images/bg-5.png",
];

function HomeCarousel() {
  const autoplay = useRef(Autoplay({ delay: 5000 }));

  // Memoize slides to prevent recreation on every render
  const slides = useMemo(
    () =>
      images.map((url) => (
        <Carousel.Slide key={url}>
          <Image src={url} />
        </Carousel.Slide>
      )),
    [],
  );

  return (
    <Carousel
      withIndicators={false}
      flex={1}
      // height={600}
      controlSize={40}
      nextControlIcon={<IconChevronRight />}
      previousControlIcon={<IconChevronLeft />}
      emblaOptions={{
        loop: true,
      }}
      plugins={[autoplay.current]}
      // onMouseEnter={autoplay.current.stop}
      // onMouseLeave={() => autoplay.current.play()}
      classNames={{
        container: "!max-h-[600px]",
        control: "!bg-surface !text-white !border-surface",
      }}
      styles={{
        indicator: {
          background: "oklch(92.9% 0.013 255.508)",
        },
        control: {
          background: "var(--color-lightGray)",
          color: "var(--color-muted)",
          // fontSize: "30px",
        },
      }}
    >
      {slides}
    </Carousel>
  );
}

export default HomeCarousel;
