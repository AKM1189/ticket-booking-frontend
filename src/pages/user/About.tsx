import {
  CustomersIcon,
  LocationIcon,
  MagnifyIcon,
  PeopleIcon,
  ScreenIcon,
  ShakeIcon,
  TheatreIcon,
} from "@/assets/svgs";
import { Button } from "@mantine/core";
import React from "react";

const About = () => {
  return (
    <div className="relative mt-20">
      {/* <div
        className={`relative w-full h-[500px] bg-[url("/movie-bg-9.jpg")] bg-no-repeat bg-cover`}
      >
        <div className="relative w-full h-full bg-background/90 flex flex-col gap-5 justify-center">
          <div className="flex justify-center items-center gap-10 uppercase text-5xl font-bold">
            About Us
          </div>
        </div>
      </div> */}
      <div className="flex gap-20 justify-between ps-20 items-center">
        <div>
          <div className="text-5xl font-bold">About Us</div>
          <p className="mt-6">
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
        <div className="relative">
          <div className=" w-[650px] max-w-[700px] bg-surface-hover rounded-lg">
            <img src="/teamwork.png" alt="" />
          </div>
          <div className="absolute bottom-0 w-full h-[60px] bg-surface-hover rounded-lg"></div>
        </div>
      </div>

      <div className="flex gap-20 justify-between pe-20 items-center mt-40">
        <div className="relative">
          <div className=" w-[700px] max-w-[700px] bg-surface-hover rounded-lg overflow-hidden">
            <img className="w-full h-full" src="/movie-bg-13.jpg" alt="" />
          </div>
          {/* <div className="absolute bottom-0 w-full h-[60px] bg-surface-hover rounded-lg"></div> */}
        </div>

        <div>
          <div className="text-5xl font-bold">Our Philosophy</div>
          <p className="mt-6">
            We believe in more than just showing movies—we believe in creating
            memorable experiences. Our philosophy is built on principles that
            guide how we serve our customers and operate our theatres.
          </p>
          <ul className="flex flex-col gap-8 mt-8 text-2xl">
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

      <div className="w-full mt-20">
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
          <div className="text-accent text-lg mb-5">Meet our most valued</div>
          <h1 className="text-5xl font-semibold">Expert Team Members</h1>
        </div>

        <div className="w-[200px] h-[400px]">
          <img
            className="w-full h-full object-cover"
            src="/employees/employee1.jpg"
            alt=""
          />
        </div>
      </div>
    </div>
  );
};

export default About;
