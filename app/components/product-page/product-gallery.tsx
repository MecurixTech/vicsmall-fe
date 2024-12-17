"use client";

import { useRef, useEffect, useState } from "react";
import Image from "next/image";

type ProductGalleryProps = {
  selectedColor: "black" | "red" | "orange" | "gray" | null;
};

const ProductGallery = ({ selectedColor }: ProductGalleryProps) => {
  const colorImages: Record<"black" | "red" | "orange" | "gray", string> = {
    black: "https://utfs.io/f/QVO6Qx1nmSgLG3FzAH7JYIBchDetdlziMZ8s6VUkq7WogTf9",
    red: "https://utfs.io/f/QVO6Qx1nmSgLaEH2bWNQ0exu3JRmPfQalwBhoDrXWTHybOqV",
    orange: "https://utfs.io/f/QVO6Qx1nmSgL4uZFXwKmQVIExXUGOkvDzsPKiWZ6tcA9frHw",
    gray: "https://utfs.io/f/QVO6Qx1nmSgLjezgUBpsuHGkVwpI8Qh52RFU71LnKtMNcZXo",
  };

  const thumbnail = {
    firstthumbnail: "https://utfs.io/f/QVO6Qx1nmSgLjezgUBpsuHGkVwpI8Qh52RFU71LnKtMNcZXo",
    secondthumbnail: "https://utfs.io/f/QVO6Qx1nmSgLaEH2bWNQ0exu3JRmPfQalwBhoDrXWTHybOqV",
    thirdthumbnail: "https://utfs.io/f/QVO6Qx1nmSgL4uZFXwKmQVIExXUGOkvDzsPKiWZ6tcA9frHw",
    fourththumbnail: "https://utfs.io/f/QVO6Qx1nmSgLG3FzAH7JYIBchDetdlziMZ8s6VUkq7WogTf9",
    fifththumbnail: "https://utfs.io/f/QVO6Qx1nmSgLG3FzAH7JYIBchDetdlziMZ8s6VUkq7WogTf9",
    sixththumbnail: "https://utfs.io/f/QVO6Qx1nmSgLaEH2bWNQ0exu3JRmPfQalwBhoDrXWTHybOqV",
    sevenththumbnail: "https://utfs.io/f/QVO6Qx1nmSgL4uZFXwKmQVIExXUGOkvDzsPKiWZ6tcA9frHw",
    eighththumbnail: "https://utfs.io/f/QVO6Qx1nmSgLjezgUBpsuHGkVwpI8Qh52RFU71LnKtMNcZXo",
    ninththumbnail: "https://utfs.io/f/QVO6Qx1nmSgLjezgUBpsuHGkVwpI8Qh52RFU71LnKtMNcZXo",
  };

  const defaultImage = colorImages.black;
  const productImage = selectedColor ? colorImages[selectedColor] : defaultImage;

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
      setCanScrollRight(container.scrollLeft < container.scrollWidth - container.clientWidth);
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
      {/* Main Product Image */}
      <div className="relative w-full max-w-md sm:max-w-lg lg:max-w-xl">
        <Image
          src={hoveredImage || productImage}
          alt="Product image"
          layout="responsive"
          quality={100}
          width={600}
          height={400}
          className="rounded-lg object-cover transition-transform duration-300 transform hover:scale-105"
        />
      </div>

      {/* Thumbnails Section */}
      <div className="relative flex items-center w-full max-w-lg lg:max-w-2xl">
        {/* Left Scroll Button */}
        {showButtons && canScrollLeft && (
          <button
            onClick={() => scroll("left")}
            className="absolute left-0 z-10 hidden md:flex items-center justify-center w-8 h-8 bg-white rounded-full shadow hover:bg-gray-200"
          >
            &#9664;
          </button>
        )}

        {/* Thumbnails */}
        <div
          ref={containerRef}
          className="flex gap-2 md:gap-4 w-full overflow-x-auto scrollbar-hide py-2"
          onScroll={checkScroll}
        >
          {Object.values(thumbnail).map((image, index) => (
            <div
              key={index}
              className="relative flex-shrink-0 w-16 h-16 md:w-20 md:h-20 rounded-lg overflow-hidden cursor-pointer hover:scale-105 transition-transform duration-300"
              onMouseEnter={() => handleThumbnailHover(image)}
              onMouseLeave={() => setHoveredImage(null)}
            >
              <Image src={image} alt={`Thumbnail ${index}`} layout="fill" objectFit="cover" />
            </div>
          ))}
        </div>

        {/* Right Scroll Button */}
        {showButtons && canScrollRight && (
          <button
            onClick={() => scroll("right")}
            className="absolute right-0 z-10 hidden md:flex items-center justify-center w-8 h-8 bg-white rounded-full shadow hover:bg-gray-200"
          >
            &#9654;
          </button>
        )}
        <div className="absolute top-0 right-0 w-16 h-full bg-gradient-to-l from-white opacity-90 pointer-events-none" />
      </div>
    </div>
  );
};

export default ProductGallery;
