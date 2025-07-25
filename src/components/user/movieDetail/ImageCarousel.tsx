import { Carousel } from "@mantine/carousel";
import { Image } from "@mantine/core";
import Autoplay from "embla-carousel-autoplay";
import { useRef, useMemo } from "react";
import { IconChevronRight } from "@tabler/icons-react";
import { IconChevronLeft } from "@tabler/icons-react";

type ImageCarouselType = {
  images: string[];
};
const ImageCarousel = ({ images }: ImageCarouselType) => {
  const autoplay = useRef(Autoplay({ delay: 3000 }));

  // Memoize slides to prevent recreation on every render
  const slides = useMemo(
    () =>
      images.map((url) => (
        <Carousel.Slide key={url}>
          <img className="w-[400px] h-[200px] rounded-md" src={url} />
        </Carousel.Slide>
      )),
    [images],
  );

  return (
    <Carousel
      withIndicators={false}
      // height={700}
      flex={1}
      withControls={false}
      slideSize="33.33333%"
      slideGap="md"
      emblaOptions={{
        loop: true,
      }}
      plugins={[autoplay.current]}
      // onMouseEnter={autoplay.current.stop}
      // onMouseLeave={() => autoplay.current.play()}
      styles={{
        indicator: {
          width: "50px",
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
};

export default ImageCarousel;
