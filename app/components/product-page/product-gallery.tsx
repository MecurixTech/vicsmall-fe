"use client";

import { useRef, useEffect, useState } from "react";
import Image from "next/image";
import {
  ArrowBackIosOutlined,
  ArrowForwardIosOutlined,
} from "@mui/icons-material";

type ProductGalleryProps = {
  selectedColor: "black" | "red" | "orange" | "gray" | null;
};

const ProductGallery = ({ selectedColor }: ProductGalleryProps) => {
  const colorImages: Record<"black" | "red" | "orange" | "gray", string> = {
    black: "https://utfs.io/f/QVO6Qx1nmSgLG3FzAH7JYIBchDetdlziMZ8s6VUkq7WogTf9",
    red: "https://utfs.io/f/QVO6Qx1nmSgLaEH2bWNQ0exu3JRmPfQalwBhoDrXWTHybOqV",
    orange:
      "https://utfs.io/f/QVO6Qx1nmSgL4uZFXwKmQVIExXUGOkvDzsPKiWZ6tcA9frHw",
    gray: "https://utfs.io/f/QVO6Qx1nmSgLjezgUBpsuHGkVwpI8Qh52RFU71LnKtMNcZXo",
  };

  const thumbnail = {
    firstthumbnail:
      "https://utfs.io/f/QVO6Qx1nmSgLjezgUBpsuHGkVwpI8Qh52RFU71LnKtMNcZXo",
    secondthumbnail:
      "https://utfs.io/f/QVO6Qx1nmSgLaEH2bWNQ0exu3JRmPfQalwBhoDrXWTHybOqV",
    thirdthumbnail:
      "https://utfs.io/f/QVO6Qx1nmSgL4uZFXwKmQVIExXUGOkvDzsPKiWZ6tcA9frHw",
    fourththumbnail:
      "https://utfs.io/f/QVO6Qx1nmSgLG3FzAH7JYIBchDetdlziMZ8s6VUkq7WogTf9",
    fifththumbnail:
      "https://utfs.io/f/QVO6Qx1nmSgLG3FzAH7JYIBchDetdlziMZ8s6VUkq7WogTf9",
    sixththumbnail:
      "https://utfs.io/f/QVO6Qx1nmSgLaEH2bWNQ0exu3JRmPfQalwBhoDrXWTHybOqV",
    sevenththumbnail:
      "https://utfs.io/f/QVO6Qx1nmSgL4uZFXwKmQVIExXUGOkvDzsPKiWZ6tcA9frHw",
    eighththumbnail:
      "https://utfs.io/f/QVO6Qx1nmSgLjezgUBpsuHGkVwpI8Qh52RFU71LnKtMNcZXo",
    ninththumbnail:
      "https://utfs.io/f/QVO6Qx1nmSgLjezgUBpsuHGkVwpI8Qh52RFU71LnKtMNcZXo",
  };

  const defaultImage = colorImages.black;
  const productImage = selectedColor
    ? colorImages[selectedColor]
    : defaultImage;

  const [hoveredImage, setHoveredImage] = useState<string | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [showButtons, setShowButtons] = useState(false);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  const handleThumbnailHover = (image: string) => setHoveredImage(image);

  const checkScroll = () => {
    const container = containerRef.current;
    if (container) {
      setCanScrollLeft(container.scrollLeft > 0);
      setCanScrollRight(
        container.scrollLeft < container.scrollWidth - container.clientWidth,
      );
      setShowButtons(container.scrollWidth > container.clientWidth);
    }
  };

  const scroll = (direction: "left" | "right") => {
    const container = containerRef.current;
    if (container) {
      const scrollAmount = 200;
      container.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  useEffect(() => {
    checkScroll();
    window.addEventListener("resize", checkScroll);
    return () => window.removeEventListener("resize", checkScroll);
  }, []);

  return (
    <div className="flex flex-col items-center gap-4 sm:gap-6">
      <div className="relative w-full max-w-md sm:max-w-lg lg:max-w-xl">
        <Image
          src={hoveredImage || productImage}
          alt="Product image"
          layout="responsive"
          quality={100}
          width={600}
          height={400}
          className="transform rounded-lg object-cover transition-transform duration-300 hover:scale-105"
        />
      </div>

      <div className="relative flex w-full max-w-lg items-center lg:max-w-2xl">
        {showButtons && canScrollLeft && (
          <button
            onClick={() => scroll("left")}
            className="absolute left-0 z-10 h-8 w-8 items-center justify-center rounded-full bg-white shadow hover:bg-gray-200 md:flex"
          >
            <ArrowBackIosOutlined />
          </button>
        )}

        <div
          ref={containerRef}
          className="scrollbar-hide flex w-full gap-2 overflow-x-auto py-2 md:gap-4"
          onScroll={checkScroll}
        >
          {Object.values(thumbnail).map((image, index) => (
            <div
              key={index}
              className="relative h-16 w-16 flex-shrink-0 cursor-pointer overflow-hidden rounded-lg transition-transform duration-300 hover:scale-105 md:h-20 md:w-20"
              onMouseEnter={() => handleThumbnailHover(image)}
              onMouseLeave={() => setHoveredImage(null)}
            >
              <Image
                src={image}
                alt={`Thumbnail ${index}`}
                layout="fill"
                objectFit="cover"
              />
            </div>
          ))}
        </div>

        {showButtons && canScrollRight && (
          <button
            onClick={() => scroll("right")}
            className="absolute right-0 z-10 h-8 w-8 items-center justify-center rounded-full bg-white shadow hover:bg-gray-200 md:flex"
          >
            <ArrowForwardIosOutlined />
          </button>
        )}
        <div className="pointer-events-none absolute right-0 top-0 h-full w-16 bg-gradient-to-l from-white opacity-90" />
      </div>
    </div>
  );
};

export default ProductGallery;
