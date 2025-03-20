export type productData = {
  id: string
  name: string
  currentPrice: number
  originalPrice: number
  imgSrc?: string
  category: string
  isShippedFromAbroad: boolean
  colorVariants: string[]
  rating: number
  isNew: boolean
  isFeatured: boolean
  stockQuantity: number
  vendor: string
  description: string
  variant: string
  tags: string[]
  createdAt: string
  updatedAt: string
  visibility: boolean
  status: boolean
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
  price: number;
  quantity: number;
  image: string;
  variant: string;
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

export type vendorData = {
  name: string;
  numberOfProducts: number;
  imageUrl: string;
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

export type notification = {
  id: number;
  status: string;
  message: string;
  time: string;
};

export type faq = {
  id: number;
  question: string;
  answer: string;
};
