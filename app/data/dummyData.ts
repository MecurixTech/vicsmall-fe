import {
  DashboardOutlined,
  LogoutOutlined,
  PaymentsOutlined,
  PersonOutlined,
  PlaceOutlined,
  ShoppingBagOutlined,
  WalletOutlined,
} from "@mui/icons-material";

export const navLinks = [
  "Accessories",
  "All Hoodies",
  "Beanies",
  "Boots",
  "Games & Consoles",
  "Gym",
  "Head Wears",
  "Jerseys",
  "Jumpsuits",
  "Men's Clothing",
  "Hoodies",
  "Other Categories",
];

// Dummy product data
export const products = [
  {
    id: 0,
    name: "Butterfly on My Necklace",
    originalPrice: "770,000",
    currentPrice: "2,500",
    isShippedFromAbroad: true,
    colorVariants: ["bg-black", "bg-red-500", "bg-orange-500", "bg-gray-500"],
    imgSrc:
      "https://utfs.io/f/wLDjZbdcJHpR6GzP9tNC4ixdcsRJyHYuWMK8l0EPahTBok7f",
  },
  {
    id: 1,
    name: "Nike Shox Rider",
    originalPrice: "110,200",
    currentPrice: "32,000",
    isShippedFromAbroad: true,
    colorVariants: ["bg-black", "bg-red-500", "bg-orange-500", "bg-gray-500"],
    imgSrc:
      "https://utfs.io/f/wLDjZbdcJHpRYvzkoJDnqwxQN14hETb5kDvde3zrKMJZfRX0",
  },
  {
    id: 2,
    name: "Nike Air Force 1 Low",
    originalPrice: "232,300",
    currentPrice: "9,500",
    isShippedFromAbroad: true,
    imgSrc:
      "https://utfs.io/f/wLDjZbdcJHpRxgNC5D8dYVwu9JvF5km2ElbzTQKC0BsMGigA",
  },
  {
    id: 3,
    name: "3-in-1 Women's Handbag",
    originalPrice: "40,000",
    currentPrice: "23,500",
    isShippedFromAbroad: true,
    colorVariants: ["bg-black", "bg-red-500", "bg-orange-500", "bg-gray-500"],
    imgSrc:
      "https://utfs.io/f/wLDjZbdcJHpRZ8GvjdIU7aODg2yt0HSxWFBNfqTKvI59cYPh",
  },
  {
    id: 4,
    name: "Coach City Tote Women's Bag",
    originalPrice: "12,300",
    currentPrice: "10,000",
    isShippedFromAbroad: true,
    colorVariants: ["bg-black", "bg-red-500", "bg-orange-500", "bg-gray-500"],
    imgSrc:
      "https://utfs.io/f/wLDjZbdcJHpRoki5D1i4gjP2ZxK0UVnc8t5aqFdYEuWh947M",
  },
];

// Dummy category data
export const categories = [
  {
    id: 0,
    name: "Accessories",
    numberOfProducts: "50,000",
    imgSrc:
      "https://utfs.io/f/wLDjZbdcJHpR6GzP9tNC4ixdcsRJyHYuWMK8l0EPahTBok7f",
    imgAlt: "Accessories",
  },
  {
    id: 1,
    name: "Games and Consoles",
    numberOfProducts: "50,000",
    imgSrc:
      "https://utfs.io/f/wLDjZbdcJHpR6GzP9tNC4ixdcsRJyHYuWMK8l0EPahTBok7f",
    imgAlt: "Games and Consoles",
  },
  {
    id: 2,
    name: "Gym",
    numberOfProducts: "50,000",
    imgSrc:
      "https://utfs.io/f/wLDjZbdcJHpR6GzP9tNC4ixdcsRJyHYuWMK8l0EPahTBok7f",
    imgAlt: "Gym",
  },
  {
    id: 3,
    name: "Men's Clothing",
    numberOfProducts: "50,000",
    imgSrc:
      "https://utfs.io/f/wLDjZbdcJHpR6GzP9tNC4ixdcsRJyHYuWMK8l0EPahTBok7f",
    imgAlt: "Men's Clothing",
  },
  {
    id: 4,
    name: "Men's Clothing",
    numberOfProducts: "50,000",
    imgSrc:
      "https://utfs.io/f/wLDjZbdcJHpR6GzP9tNC4ixdcsRJyHYuWMK8l0EPahTBok7f",
    imgAlt: "Men's Clothing",
  },
  {
    id: 5,
    name: "Men's Clothing",
    numberOfProducts: "50,000",
    imgSrc:
      "https://utfs.io/f/wLDjZbdcJHpR6GzP9tNC4ixdcsRJyHYuWMK8l0EPahTBok7f",
    imgAlt: "Men's Clothing",
  },
  {
    id: 6,
    name: "Watches",
    numberOfProducts: "50,000",
    imgSrc:
      "https://utfs.io/f/wLDjZbdcJHpR6GzP9tNC4ixdcsRJyHYuWMK8l0EPahTBok7f",
    imgAlt: "Watches",
  },
  {
    id: 7,
    name: "Hoodies",
    numberOfProducts: "50,000",
    imgSrc:
      "https://utfs.io/f/wLDjZbdcJHpR6GzP9tNC4ixdcsRJyHYuWMK8l0EPahTBok7f",
    imgAlt: "Hoodies",
  },
  {
    id: 8,
    name: "Phones",
    numberOfProducts: "50,000",
    imgSrc:
      "https://utfs.io/f/wLDjZbdcJHpR6GzP9tNC4ixdcsRJyHYuWMK8l0EPahTBok7f",
    imgAlt: "Phones",
  },
  {
    id: 9,
    name: "T Shirts",
    numberOfProducts: "50,000",
    imgSrc:
      "https://utfs.io/f/wLDjZbdcJHpR6GzP9tNC4ixdcsRJyHYuWMK8l0EPahTBok7f",
    imgAlt: "T Shirts",
  },
  {
    id: 10,
    name: "Men Shoes",
    numberOfProducts: "50,000",
    imgSrc:
      "https://utfs.io/f/wLDjZbdcJHpR6GzP9tNC4ixdcsRJyHYuWMK8l0EPahTBok7f",
    imgAlt: "Men Shoes",
  },
  {
    id: 11,
    name: "Female",
    numberOfProducts: "50,000",
    imgSrc:
      "https://utfs.io/f/wLDjZbdcJHpR6GzP9tNC4ixdcsRJyHYuWMK8l0EPahTBok7f",
    imgAlt: "Female",
  },
];

// Dummy cart data
export const cartItems = [
  {
    id: 0,
    name: "Nike Air Force 1 Low",
    price: "25,000",
    quantity: 1,
    imgSrc:
      "https://utfs.io/f/wLDjZbdcJHpRxgNC5D8dYVwu9JvF5km2ElbzTQKC0BsMGigA",
  },
];

// Dummy reviews
export const reviews = [
  {
    id: 0,
    user: {
      avatar:
        "https://utfs.io/f/wLDjZbdcJHpRxgNC5D8dYVwu9JvF5km2ElbzTQKC0BsMGigA",
      fullName: "Alex Paxwel",
    },
    rating: "4.0",
    date: "4th March 2023",
    message:
      "This product was awesome. Could have taken a little less time to arrive, but I love it anyway!",
  },
  {
    id: 1,
    user: {
      avatar:
        "https://utfs.io/f/wLDjZbdcJHpR6GzP9tNC4ixdcsRJyHYuWMK8l0EPahTBok7f",
      fullName: "Barry Tuple",
    },
    rating: "4.0",
    date: "5th April 2023",
    message: "This is awesome",
  },
  {
    id: 2,
    user: {
      avatar:
        "https://utfs.io/f/wLDjZbdcJHpRYvzkoJDnqwxQN14hETb5kDvde3zrKMJZfRX0",
      fullName: "Matthew Teew",
    },
    rating: "5.0",
    date: "23rd April 2023",
    message:
      "This product was awesome. Could have taken a little less time to arrive, but I love it anyway!",
    images: [
      {
        id: 0,
        imgSrc:
          "https://utfs.io/f/wLDjZbdcJHpR6GzP9tNC4ixdcsRJyHYuWMK8l0EPahTBok7f",
        alt: "Image 1",
      },
      {
        id: 1,
        imgSrc:
          "https://utfs.io/f/wLDjZbdcJHpR6GzP9tNC4ixdcsRJyHYuWMK8l0EPahTBok7f",
        alt: "Image 2",
      },
      {
        id: 2,
        imgSrc:
          "https://utfs.io/f/wLDjZbdcJHpR6GzP9tNC4ixdcsRJyHYuWMK8l0EPahTBok7f",
        alt: "Image 3",
      },
      {
        id: 3,
        imgSrc:
          "https://utfs.io/f/wLDjZbdcJHpR6GzP9tNC4ixdcsRJyHYuWMK8l0EPahTBok7f",
        alt: "Image 4",
      },
    ],
  },
];

export const vendorDetails = {
  name: "Hactor Hozier",
  numberOfProducts: 40,
  reviews: {
    numberOfReviews: 2000,
    averageRating: "4.0",
    reviewDistribution: [
      {
        id: 0,
        amount: 0,
      },
      {
        id: 1,
        amount: 200,
      },
      {
        id: 2,
        amount: 500,
      },
      {
        id: 3,
        amount: 100,
      },
      {
        id: 4,
        amount: 1200,
      },
    ],
  },
};

export const interests = [
  {
    id: 0,
    value: "Hoodies",
  },
  {
    id: 1,
    value: "T-shirts",
  },
  {
    id: 2,
    value: "Trousers",
  },
  {
    id: 3,
    value: "Male wears",
  },
  {
    id: 4,
    value: "Suits",
  },
  {
    id: 5,
    value: "Female wears",
  },
  {
    id: 6,
    value: "Watches",
  },
  {
    id: 7,
    value: "Accessories",
  },
  {
    id: 8,
    value: "Bangles",
  },
  {
    id: 9,
    value: "Earrings",
  },
  {
    id: 10,
    value: "Shoes",
  },
  {
    id: 11,
    value: "Caps",
  },
];

export const userAccountSidebarLinks = [
  {
    id: 0,
    label: "Profile",
    href: "/account/profile",
    icon: PersonOutlined,
  },
  {
    id: 1,
    label: "Dashboard",
    href: "/account/dashboard",
    icon: DashboardOutlined,
  },
  {
    id: 2,
    label: "Orders",
    href: "/account/orders",
    icon: ShoppingBagOutlined,
  },
  {
    id: 3,
    label: "Part payments",
    href: "/account/part-payments",
    icon: PaymentsOutlined,
  },
  {
    id: 4,
    label: "Addresses",
    href: "/account/addresses",
    icon: PlaceOutlined,
  },
  {
    id: 5,
    label: "Payment method",
    href: "/account/payment-method",
    icon: WalletOutlined,
  },
  {
    id: 6,
    label: "Logout",
    href: "/account/logout",
    icon: LogoutOutlined,
  },
];

// const productData = {
//     id: 0,
//     name: "Butterfly on My Necklace",
//     originalPrice: "770,000",
//     currentPrice: "2,500",
//     isShippedFromAbroad: true,
//     colorVariants: ["bg-black", "bg-red-500", "bg-orange-500", "bg-gray-500"],
//     img: {
//       src: "",
//       alt: "",
//     }
//     shippingDetails: {
//       ...
//     },
//     packagingDetails: {
//       ...
//     },
// }
