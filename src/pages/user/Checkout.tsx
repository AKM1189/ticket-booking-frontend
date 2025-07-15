import SeatPlanHeader from "@/components/user/seatPlan/SeatPlanHeader";
import { Button, TextInput } from "@mantine/core";
import { useParams } from "react-router";
import { twMerge } from "tailwind-merge";

const Checkout = () => {
  const { id } = useParams();

  const movie = {
    id: 1,
    name: "ALONE",
    duration: "2 hrs 50 mins",
    genres: [
      { id: 2, label: "Adventure" },
      { id: 4, label: "Action" },
    ],
    languages: ["English", "Tamil", "Hindi"],
    subtitle: ["Myanmar"],
    releaseDate: "8 Nov, 2025",
    rating: "8.0",
    status: "Now Showing",
    posterUrl: "/movie03.jpg",
    trailerId: "o2T2V1jrLY0",
    casts: [
      {
        id: 1,
        name: "Aung Kaung Myat",
        role: "Actor",
        imageUrl: null,
      },
      {
        id: 2,
        name: "John Wick",
        role: "Actor",
        imageUrl: null,
      },
      {
        id: 2,
        name: "John Wick",
        role: "Actor",
        imageUrl: null,
      },
    ],
    images: [
      "https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/images/bg-1.png",
      "https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/images/bg-2.png",
      "https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/images/bg-3.png",
      "https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/images/bg-4.png",
      "https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/images/bg-5.png",
    ],
    reviews: [
      {
        id: 1,
        username: "Aung Kaung Myat",
        rating: "8.0",
        reviewedDate: "2 days ago",
        review:
          "Lorem ipsum dolor sit, amet consectetur adipisicing elit. In, alias! Cum ipsam voluptate molestias aliquam quos, vitae commodi, ex facere magnam, amet nesciunt nisi accusamus libero architecto cupiditate! Culpa possimus ipsa id fugiat odio iusto ea inventore quidem, similique magnam eaque architecto, voluptas voluptatibus, nesciunt maxime molestias laborum eveniet! Quod!",
      },
      {
        id: 2,
        username: "Aung Kaung Myat",
        rating: "8.9",
        reviewedDate: "2 months ago",
        review:
          "Lorem ipsum dolor sit, amet consectetur adipisicing elit. In, alias! Cum ipsam voluptate molestias aliquam quos, vitae commodi, ex facere magnam, amet nesciunt nisi accusamus libero architecto cupiditate! Culpa possimus ipsa id fugiat odio iusto ea inventore quidem, similique magnam eaque architecto, voluptas voluptatibus, nesciunt maxime molestias laborum eveniet! Quod!",
      },
    ],
  };
  return (
    <div>
      <SeatPlanHeader movie={movie} id={id} />
      <div className="px-52 mt-20">
        <div className="grid grid-cols-8 gap-10">
          <div className="col-span-5 bg-surface p-8">
            <h1 className="text-xl font-bold">Share Your Contact Details</h1>
            <div className="auth-text-input">
              <div className="grid grid-cols-6 gap-10 w-full">
                <div className="col-span-3">
                  <TextInput
                    label="Email"
                    placeholder="Enter Your Email"
                    //   key={form.key("email")}
                    classNames={{
                      root: "mt-5 !w-full",
                      label: "text-[16px]",
                      input: twMerge(
                        "login-input",
                        //   form.errors.email && "border-red-500",
                      ),
                      error: "text-red-500",
                    }}
                    //   {...form.getInputProps("email")}
                  />
                  <TextInput
                    label="Email"
                    placeholder="Enter Your Email"
                    //   key={form.key("email")}
                    classNames={{
                      root: "mt-5",
                      label: "text-[16px]",
                      input: twMerge(
                        "login-input",
                        //   form.errors.email && "border-red-500",
                      ),
                      error: "text-red-500",
                    }}
                    //   {...form.getInputProps("email")}
                  />
                </div>
                <div className="col-span-3 flex flex-col justify-between">
                  <TextInput
                    label="Email"
                    placeholder="Enter Your Email"
                    //   key={form.key("email")}
                    classNames={{
                      root: "mt-5 !w-full",
                      label: "text-[16px]",
                      input: twMerge(
                        "login-input",
                        //   form.errors.email && "border-red-500",
                      ),
                      error: "text-red-500",
                    }}
                    //   {...form.getInputProps("email")}
                  />
                  <div>
                    <Button>Continue</Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-span-3 bg-surface p-8">
            <h1 className="text-2xl font-bold text-center">Booking Summary</h1>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
