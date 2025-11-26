import type { EmployeeType } from "@/types/EmployeeTypes";
import { Carousel } from "@mantine/carousel";
import Autoplay from "embla-carousel-autoplay";
import { useRef, useMemo } from "react";

type EmployeeCarousel = {
  employees: EmployeeType[];
};
const EmployeeCarousel = ({ employees }: EmployeeCarousel) => {
  const autoplay = useRef(Autoplay({ delay: 2000 }));

  // Memoize slides to prevent recreation on every render
  const slides = useMemo(
    () =>
      employees.map((employee: any) => (
        <Carousel.Slide key={employee.id}>
          <div className="text-center">
            <div className="h-[350px] rounded-xl overflow-hidden">
              <img
                className="w-full h-full object-cover min-w-[250px]"
                src={employee.image}
                alt=""
              />
            </div>
            <div className="text-xl font-semibold mt-5">{employee.name}</div>
            <div className="text-accent mt-2 uppercase">
              {employee.position}
            </div>
          </div>
        </Carousel.Slide>
      )),
    [employees],
  );

  return (
    <div>
      <div
        style={{
          overflow: "hidden",
          maxWidth: "100%",
          minWidth: 250,
        }}
      >
        <Carousel
          withControls
          type="container"
          draggable
          slideSize={{ base: "100%", "300px": "50%", "500px": "25%" }}
          slideGap={{ base: 0, "300px": "md", "500px": "lg" }}
          controlSize={40}
          classNames={{
            controls: "!absolute !top-0 !top-44",
            control: "!bg-surface !text-white !border-surface",
          }}
          emblaOptions={{ align: "start" }}
          plugins={[autoplay.current]}
          onMouseEnter={autoplay.current.stop}
          onMouseLeave={() => autoplay.current.play()}
        >
          {slides}
        </Carousel>
      </div>
    </div>
  );
};

export default EmployeeCarousel;
