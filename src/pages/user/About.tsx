import {
  CustomersIcon,
  LocationIcon,
  MagnifyIcon,
  PeopleIcon,
  ScreenIcon,
  ShakeIcon,
  TheatreIcon,
} from "@/assets/svgs";
import EmployeeCarousel from "@/components/user/home/EmployeeCarousel";
import { Button } from "@mantine/core";

const employees = [
  {
    id: 1,
    name: "John Anderson",
    position: "Founder & CEO",
    image: "/employees/emp8.jpg",
  },
  {
    id: 2,
    name: "Sarah Thompson",
    position: "Operations Manager",
    image: "/employees/emp3.jpg",
  },
  {
    id: 5,
    name: "Emily Davis",
    position: "Creative Director",
    image: "/employees/emp5.jpg",
  },
  {
    id: 3,
    name: "James Lee",
    position: "Marketing Director",
    image: "/employees/emp4.jpg",
  },
  {
    id: 6,
    name: "Aisha Patel",
    position: "Customer Experience Lead",
    image: "/employees/emp6.jpg",
  },
  {
    id: 4,
    name: "David Kim",
    position: "Chief Financial Officer",
    image: "/employees/emp1.jpg",
  },
  {
    id: 7,
    name: "Lily Chen",
    position: "Technical Supervisor",
    image: "/employees/emp7.jpg",
  },
];

const About = () => {
  return (
    <div className="relative">
      <div
        className={`relative w-full h-[500px] bg-[url("/movie-bg-11.jpg")] bg-no-repeat bg-cover`}
      >
        <div className="relative w-full h-full bg-surface/70 flex flex-col gap-5 justify-center">
          <div className="flex justify-center items-center gap-10 uppercase text-5xl font-bold">
            About Us
          </div>
        </div>
      </div>
      <div className="flex gap-20 justify-between max-md:flex-col md:px-20 mt-40">
        <div className="max-md:px-5">
          <div className="text-5xl font-bold mb-8">Movie Palace</div>
          <p className="mt-6 text-base/loose">
            Established in 2005, offering a modern and enjoyable cinematic
            experience. With 8 theatres and 24 screens, we provide a wide
            selection of films in HD quality and comfortable seating for all
            audiences. To improve convenience, we’ve launched an online ticket
            booking system, allowing customers to check showtimes, select seats,
            and book tickets anytime, anywhere. Our goal is to combine great
            entertainment with seamless service—making your movie night easier,
            faster, and more enjoyable. At Movie Palace Cinema, we bring stories
            to life, one screen at a time.
          </p>

          <Button className="mt-8 !rounded-full">Book Tickets</Button>
        </div>
        <div className="relative ">
          {/* <div className="md:w-[600px] max-w-[700px] rounded-lg p-10 px-20 bg-surface-hover"> */}
          <img className="md:w-[500px] max-w-[700px]" src="/team3.png" alt="" />
          {/* </div> */}
        </div>
      </div>

      <div className="flex gap-20 justify-between px-20 mt-40">
        <div className="relative">
          <div className=" w-[700px] max-w-[700px] bg-surface-hover rounded-lg overflow-hidden">
            <img className="w-full h-full" src="/movie-bg-13.jpg" alt="" />
          </div>
          {/* <div className="absolute bottom-0 w-full h-[60px] bg-surface-hover rounded-lg"></div> */}
        </div>

        <div>
          <div className="text-5xl font-bold mb-10">Our Philosophy</div>
          <p className="mt-6">
            We believe in more than just showing movies—we believe in creating
            memorable experiences. Our philosophy is built on principles that
            guide how we serve our customers and operate our theatres.
          </p>
          <ul className="flex flex-col gap-10 mt-14 text-2xl">
            <li className="font-semibold flex items-center gap-5">
              <div className="p-2 border border-secondary rounded-full">
                <ShakeIcon size={30} color="var(--color-secondary)" />
              </div>

              <span>Honesty & Fairness</span>
            </li>
            <li className="font-semibold flex items-center gap-5">
              <div className="p-2 border border-secondary rounded-full">
                <MagnifyIcon size={30} color="var(--color-secondary)" />
              </div>

              <span>Clarity & Transparency</span>
            </li>
            <li className="font-semibold flex items-center gap-5">
              <div className="p-2 border border-secondary rounded-full">
                <PeopleIcon size={30} color="var(--color-secondary)" />
              </div>

              <span>Focus on Customers</span>
            </li>
          </ul>
        </div>
      </div>

      <div className="w-full mt-36">
        <div className="bg-surface py-10 w-full h-full">
          <ul className="flex justify-center gap-40">
            <li className="flex flex-col items-center">
              <div className="p-3 border-2 border-secondary rounded-full">
                <CustomersIcon size={40} color="var(--color-secondary)" />
              </div>
              <div className="text-3xl font-semibold mt-5">120+</div>
              <span className="text-sm text-accent">Customers</span>
            </li>
            <li className="flex flex-col items-center">
              <div className="p-3 border-2 border-secondary rounded-full">
                <LocationIcon size={40} color="var(--color-secondary)" />
              </div>
              <div className="text-3xl font-semibold mt-5">10</div>
              <span className="text-sm text-accent">Cities</span>
            </li>
            <li className="flex flex-col items-center">
              <div className="p-3 border-2 border-secondary rounded-full">
                <TheatreIcon size={40} color="var(--color-secondary)" />
              </div>
              <div className="text-3xl font-semibold mt-5">12+</div>
              <span className="text-sm text-accent">Theatres</span>
            </li>
            <li className="flex flex-col items-center">
              <div className="p-3 border-2 border-secondary rounded-full">
                <ScreenIcon size={40} color="var(--color-secondary)" />
              </div>
              <div className="text-3xl font-semibold mt-5">24+</div>
              <span className="text-sm text-accent">Screens</span>
            </li>
          </ul>
        </div>
      </div>

      <div className="mt-40">
        <div className="text-center uppercase">
          <div className="text-accent text-lg mb-5 font-semibold">
            Meet our most valued
          </div>
          <h1 className="text-5xl font-semibold">Expert Team Members</h1>
        </div>

        <div className="md:px-[100px] px-[20px] lg:px-[200px] mt-20">
          {/* <div className="text-center">
            <div className="w-[250px] h-[350px] rounded-xl overflow-hidden">
              <img
                className="w-full h-full object-cover"
                src="/employees/emp1.jpg"
                alt=""
              />
            </div>
            <div className="text-xl font-semibold mt-5">Michael Jackson</div>
            <div className="text-accent mt-2 uppercase">Founder</div>
          </div> */}

          <EmployeeCarousel employees={employees} />
        </div>
      </div>
    </div>
  );
};

export default About;
