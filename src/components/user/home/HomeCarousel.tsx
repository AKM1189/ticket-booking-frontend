import { Carousel } from "@mantine/carousel";
import { Image, Skeleton } from "@mantine/core";
import Autoplay from "embla-carousel-autoplay";
import { useRef, useMemo, useState } from "react";
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
  const [isLoaded, setIsLoaded] = useState(false);

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
      onLoad={() => setIsLoaded(true)}
      controlSize={40}
      withControls={true}
      nextControlIcon={<IconChevronRight />}
      previousControlIcon={<IconChevronLeft />}
      emblaOptions={{
        loop: true,
      }}
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
