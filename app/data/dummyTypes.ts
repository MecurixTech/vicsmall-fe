export type productData = {
  id: number;
  name: string;
  originalPrice: string;
  currentPrice: string;
  isShippedFromAbroad: boolean;
  colorVariants?: string[];
  imgSrc: string;
};

export type categoryData = {
  id: number;
  name: string;
  numberOfProducts: string;
  imgSrc: string;
  imgAlt: string;
};

export type cartItem = {
  id: number;
  name: string;
  price: string;
  quantity: number;
  imgSrc: string;
};
