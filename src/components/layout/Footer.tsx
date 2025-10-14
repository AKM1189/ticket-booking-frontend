import { Button, ThemeIcon } from "@mantine/core";
import { Link } from "react-router-dom";
import {
  IconBrandFacebook,
  IconBrandFacebookFilled,
  IconBrandGoogle,
  IconBrandGoogleFilled,
  IconBrandInstagram,
  IconBrandInstagramFilled,
  IconBrandTwitter,
  IconBrandTwitterFilled,
} from "@tabler/icons-react";
import { routes } from "@/routes";

const Footer = () => {
  return (
    <div className="w-full bottom-0 footer mt-[150px] relative min-h-[100px] px-[20px] md:px-[50px] lg:px-[150px]  bg-surface">
      {/* <SubscribeCard /> */}
      <div className="pt-[50px] pb-[30px] border-b border-coolGray flex justify-between">
        <span className="text-lg text-accent uppercase font-semibold">
          Movie Palace
        </span>
        <span className="flex gap-3">
          <ThemeIcon radius={100} color={'var(--primary)'} size={32} className="!cursor-pointer">
            <IconBrandFacebookFilled size={20} />
          </ThemeIcon>
          <ThemeIcon radius={100} color={'var(--primary)'} size={32} className="!cursor-pointer">
            <IconBrandTwitterFilled size={20} />
          </ThemeIcon>
          <ThemeIcon radius={100} color={'var(--primary)'} size={32} className="!cursor-pointer">
            <IconBrandGoogleFilled size={20} />
          </ThemeIcon>
          <ThemeIcon radius={100} color={'var(--primary)'} size={32} className="!cursor-pointer">
            <IconBrandInstagramFilled size={20} />
          </ThemeIcon>
        </span>
      </div>
      <div className="flex max-sm:flex-col pb-10 gap-5 max-sm:items-center justify-between py-8 text-text text-sm max-sm:text-xs">
        <ul className="flex gap-5 text-muted">
          <li>
            <Link to={routes.user.about} className="hover:text-accent transition-colors">
              About
            </Link>
          </li>
          <li>
            <Link to={routes.user.termsOfUse} className="hover:text-accent transition-colors">
              Terms of Use
            </Link>
          </li>
          <li>
            <Link to={routes.user.privacyPolicy} className="hover:text-accent transition-colors">
              Privacy Policy
            </Link>
          </li>
          <li>
            <Link to={routes.user.faq} className="hover:text-accent transition-colors">
              FAQ
            </Link>
          </li>
        </ul>
        <div className="text-muted">
          Copyright © 2025. All Rights Reserved By{" "}
          <span className="text-accent"> Movie Palace</span>
        </div>
      </div>
    </div>
  );
};

export default Footer;

export const SubscribeCard = () => {
  return (
    <div className="px-[100px]">
      <div className=" absolute text-center top-[-50%] left-[50%] translate-x-[-50%] sm:min-w-[300px] max-sm:w-[90%] lg:min-w-[800px] p-10 min-h-[250px] text-text bg-surface-hover rounded-2xl">
        <div className="text-base sm:text-xl text-accent font-semibold uppercase mb-3">
          Subscribe to Movie Palace
        </div>
        <span className="text-xl sm:text-3xl uppercase font-bold">
          To get exclusive promotions
        </span>
        <div className="w-full mt-10 flex justify-center">
          <div className="max-w-[700px] flex justify-center items-center">
            <input
              type="text"
              className="w-full bg-transparent max-sm:w-full sm:min-w-[400px] rounded-full h-[40px] sm:h-[50px] px-5 pe-16 text-xl border border-coolGray outline-none"
              placeholder="Enter Your Email Address"
            />
            <span className="ms-[-60px]">
              {/* <PrimaryButton
                value="Subscribe"
                type="submit"
                className="!h-[50px] !rounded-full !text-lg"
              /> */}
              <Button
                type="button"
                className="!h-[40px] sm:!h-[50px] !rounded-full !text-base !px-5 sm:!px-10"
              >
                Search
              </Button>
            </span>
          </div>
        </div>
        <div className="mt-5 text-xs sm:text-sm text-muted">
          We respect your privacy. We will never share you info.
        </div>
      </div>
    </div>
  );
};
