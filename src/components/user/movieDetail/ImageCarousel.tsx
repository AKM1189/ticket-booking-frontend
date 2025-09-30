import { Carousel } from "@mantine/carousel";
import Autoplay from "embla-carousel-autoplay";
import { useRef, useMemo } from "react";

type ImageCarouselType = {
  images: string[];
};
const ImageCarousel = ({ images }: ImageCarouselType) => {
  const autoplay = useRef(Autoplay({ delay: 3000 }));

  const slides = useMemo(
    () =>
      images?.map((url) => (
        <Carousel.Slide key={url}>
          <img className="w-[400px] h-[250px] rounded-md" src={url} />
        </Carousel.Slide>
      )),
    [images],
  );

  return (
    <Carousel
      withIndicators={false}
      // height={700}
      flex={1}
      withControls={true}
      // slideSize="33.33333%"
      slideSize={{ sm: "100%", md: "33.33%" }}
      slideGap="md"
      emblaOptions={{
        loop: true,
      }}
      plugins={[autoplay.current]}
    >
      {slides}
    </Carousel>
  );
};

export default ImageCarousel;
