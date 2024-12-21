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

type reviewImage = {
  id: number;
  imgSrc: string;
  alt: string;
};

export type review = {
  id: number;
  user: {
    avatar: string;
    fullName: string;
  };
  rating: string;
  date: string;
  message: string;
  images?: reviewImage[];
};

type reviewDistributionItem = {
  id: number;
  amount: number;
};

export type vendor = {
  name: string;
  numberOfProducts: number;
  reviews: {
    numberOfReviews: number;
    averageRating: string;
    reviewDistribution: reviewDistributionItem[];
  };
};

export type order = {
  id: number;
  productDetails: {
    imgSrc: string;
    productName: string;
    price: string;
  };
  status: string;
  paymentMade: string;
  balance: string;
};

export type address = {
  id: number;
  fullName: string;
  address: string;
  state: string;
  phoneNumber: string;
};

export type card = {
  id: number;
  nameOnCard: string;
  cardNumber: string;
  cardType: {
    name: string;
    imgSrc: string;
  };
};
