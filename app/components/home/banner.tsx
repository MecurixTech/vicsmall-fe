"use client";

import { useState, useEffect } from "react";
import {
  CardGiftcardOutlined,
  HeadsetMicOutlined,
  LocalShippingOutlined,
} from "@mui/icons-material";

const Banner = () => {
  const [activeDot, setActiveDot] = useState(0);

  const leftContent = [
    {
      title: "SHOP TO GET WHAT YOU LOVE",
      subtitle: "PAY INSTANTLY OR",
      description: "PAY IN INSTALLMENTS",
      footer: "FROM VICSMALL",
    },
    {
      title: "DISCOVER AMAZING DEALS",
      subtitle: "EXCLUSIVE OFFERS",
      description: "LIMITED TIME ONLY",
      footer: "HURRY UP AND GRAB THEM",
    },
    {
      title: "JOIN THE BEST COMMUNITY",
      subtitle: "UNLOCK VIP BENEFITS",
      description: "EXTRA DISCOUNTS & MORE",
      footer: "SIGN UP NOW",
    },
  ];

  const rightContent = [
    {
      image: <CardGiftcardOutlined fontSize="inherit" className="text-white" />,
      text: "Win amazing gifts",
    },
    {
      image: <HeadsetMicOutlined fontSize="inherit" className="text-white" />,
      text: "Great Customer Service",
    },
    {
      image: (
        <LocalShippingOutlined fontSize="inherit" className="text-white" />
      ),
      text: "Express Delivery Service",
    },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveDot((prev) => (prev + 1) % 3);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative mx-auto flex h-auto w-full max-w-screen-xl flex-col items-center justify-between overflow-hidden rounded-[23px] px-4 py-8 sm:flex-row sm:px-8 lg:px-16 lg:py-12">
      <div
        className="absolute inset-0 bg-center bg-no-repeat"
        style={{
          backgroundImage:
            "linear-gradient(to right, #FF8C48F9, #FF8C48F9), url('https://utfs.io/f/wLDjZbdcJHpRZf4TaQuIU7aODg2yt0HSxWFBNfqTKvI59cYP')",
        }}
      ></div>

      <div className="z-10 mb-8 flex w-full max-w-full flex-col items-center text-center text-white sm:mb-0 sm:w-[50%] sm:items-start sm:text-left">
        <span className="text-[12px] font-bold leading-[17px] sm:text-[14px]">
          {leftContent[activeDot].title}
        </span>
        <h1 className="mt-4 text-[20px] font-semibold leading-[39px] text-white sm:text-[36px]">
          {leftContent[activeDot].subtitle}
        </h1>
        <h2 className="mt-4 text-[18px] font-semibold leading-[39px] text-white sm:text-[34px]">
          {leftContent[activeDot].description}
        </h2>
        <h3 className="mt-4 text-[20px] font-semibold leading-[39px] text-white sm:text-[36px]">
          <span className="text-[16px] font-thin sm:text-[34px]">
            {leftContent[activeDot].footer}
          </span>
        </h3>
      </div>

      <div className="z-10 flex flex-nowrap items-center justify-center gap-8 sm:w-[50%] sm:flex-row sm:justify-start sm:gap-10">
        {rightContent.map((content, index) => (
          <div
            key={index}
            className={`flex flex-col items-center gap-3 text-center transition-opacity duration-500 ${
              activeDot === index ? "opacity-100" : "opacity-50"
            }`}
          >
            <div className="text-6xl">{content.image}</div>
            <p className="text-[14px] font-medium leading-[21px] text-white sm:text-[19px]">
              {content.text}
            </p>
          </div>
        ))}
      </div>

      <div className="absolute bottom-4 left-[50%] flex -translate-x-[50%] transform items-center gap-2 rounded-[11px] bg-[rgba(30,30,30,0.8)] p-[3px_5px] backdrop-blur-[22px] sm:bottom-6">
        {[...Array(3)].map((_, index) => (
          <div
            key={index}
            className={`h-[8px] w-[8px] rounded-full transition-opacity duration-500 ${
              activeDot === index
                ? "bg-white opacity-100"
                : "bg-[rgba(255,255,255,0.38)] opacity-50"
            }`}
          ></div>
        ))}
      </div>
    </section>
  );
};

export default Banner;
