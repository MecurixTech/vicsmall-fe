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

export const vendorDetails = [
  {
    name: "Hactor Hozier",
    numberOfProducts: 40,
    imageUrl:
      "https://utfs.io/f/QVO6Qx1nmSgLPKIXXBjiTeyXQZmwNR9dOu60B1LqH7vSzrF2",
    reviews: {
      numberOfReviews: 2000,
      averageRating: "4.0",
      reviewDistribution: [
        { id: 0, amount: 0 },
        { id: 1, amount: 200 },
        { id: 2, amount: 500 },
        { id: 3, amount: 100 },
        { id: 4, amount: 1200 },
      ],
    },
  },
  {
    name: "rick",
    numberOfProducts: 30,
    imageUrl:
      "https://utfs.io/f/QVO6Qx1nmSgLPKIXXBjiTeyXQZmwNR9dOu60B1LqH7vSzrF2",
    reviews: {
      numberOfReviews: 1500,
      averageRating: "3.8",
      reviewDistribution: [
        { id: 0, amount: 100 },
        { id: 1, amount: 300 },
        { id: 2, amount: 400 },
        { id: 3, amount: 500 },
        { id: 4, amount: 200 },
      ],
    },
  },
  {
    name: "edd",
    numberOfProducts: 25,
    imageUrl:
      "https://utfs.io/f/QVO6Qx1nmSgLPKIXXBjiTeyXQZmwNR9dOu60B1LqH7vSzrF2",
    reviews: {
      numberOfReviews: 1200,
      averageRating: "4.2",
      reviewDistribution: [
        { id: 0, amount: 50 },
        { id: 1, amount: 150 },
        { id: 2, amount: 300 },
        { id: 3, amount: 400 },
        { id: 4, amount: 300 },
      ],
    },
  },
  {
    name: "moonpie",
    numberOfProducts: 50,
    imageUrl:
      "https://utfs.io/f/QVO6Qx1nmSgLPKIXXBjiTeyXQZmwNR9dOu60B1LqH7vSzrF2",
    reviews: {
      numberOfReviews: 1800,
      averageRating: "3.9",
      reviewDistribution: [
        { id: 0, amount: 200 },
        { id: 1, amount: 400 },
        { id: 2, amount: 600 },
        { id: 3, amount: 300 },
        { id: 4, amount: 300 },
      ],
    },
  },
  {
    name: "bob",
    numberOfProducts: 15,
    imageUrl:
      "https://utfs.io/f/QVO6Qx1nmSgLPKIXXBjiTeyXQZmwNR9dOu60B1LqH7vSzrF2",
    reviews: {
      numberOfReviews: 800,
      averageRating: "4.5",
      reviewDistribution: [
        { id: 0, amount: 20 },
        { id: 1, amount: 80 },
        { id: 2, amount: 300 },
        { id: 3, amount: 200 },
        { id: 4, amount: 200 },
      ],
    },
  },
  {
    name: "young money",
    numberOfProducts: 60,
    imageUrl:
      "https://utfs.io/f/QVO6Qx1nmSgLPKIXXBjiTeyXQZmwNR9dOu60B1LqH7vSzrF2",
    reviews: {
      numberOfReviews: 3000,
      averageRating: "4.7",
      reviewDistribution: [
        { id: 0, amount: 50 },
        { id: 1, amount: 200 },
        { id: 2, amount: 700 },
        { id: 3, amount: 1000 },
        { id: 4, amount: 1050 },
      ],
    },
  },
  {
    name: "tim",
    numberOfProducts: 35,
    imageUrl:
      "https://utfs.io/f/QVO6Qx1nmSgLPKIXXBjiTeyXQZmwNR9dOu60B1LqH7vSzrF2",
    reviews: {
      numberOfReviews: 1700,
      averageRating: "3.6",
      reviewDistribution: [
        { id: 0, amount: 150 },
        { id: 1, amount: 350 },
        { id: 2, amount: 500 },
        { id: 3, amount: 400 },
        { id: 4, amount: 300 },
      ],
    },
  },
  {
    name: "guy",
    numberOfProducts: 20,
    imageUrl:
      "https://utfs.io/f/QVO6Qx1nmSgLPKIXXBjiTeyXQZmwNR9dOu60B1LqH7vSzrF2",
    reviews: {
      numberOfReviews: 900,
      averageRating: "4.3",
      reviewDistribution: [
        { id: 0, amount: 30 },
        { id: 1, amount: 120 },
        { id: 2, amount: 250 },
        { id: 3, amount: 300 },
        { id: 4, amount: 200 },
      ],
    },
  },
  {
    name: "zayn",
    numberOfProducts: 45,
    imageUrl:
      "https://utfs.io/f/QVO6Qx1nmSgLPKIXXBjiTeyXQZmwNR9dOu60B1LqH7vSzrF2",
    reviews: {
      numberOfReviews: 2100,
      averageRating: "4.1",
      reviewDistribution: [
        { id: 0, amount: 100 },
        { id: 1, amount: 250 },
        { id: 2, amount: 600 },
        { id: 3, amount: 700 },
        { id: 4, amount: 450 },
      ],
    },
  },
  {
    name: "gait",
    numberOfProducts: 10,
    imageUrl:
      "https://utfs.io/f/QVO6Qx1nmSgLPKIXXBjiTeyXQZmwNR9dOu60B1LqH7vSzrF2",
    reviews: {
      numberOfReviews: 400,
      averageRating: "3.5",
      reviewDistribution: [
        { id: 0, amount: 50 },
        { id: 1, amount: 100 },
        { id: 2, amount: 150 },
        { id: 3, amount: 50 },
        { id: 4, amount: 50 },
      ],
    },
  },
];

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
    label: "Payment methods",
    href: "/account/payment-methods",
    icon: WalletOutlined,
  },
  {
    id: 6,
    label: "Logout",
    href: "/account/logout",
    icon: LogoutOutlined,
  },
];

export const orders = [
  {
    id: 0,
    productDetails: {
      imgSrc:
        "https://utfs.io/f/wLDjZbdcJHpR6GzP9tNC4ixdcsRJyHYuWMK8l0EPahTBok7f",
      productName: "Nike Air Force 1 Low",
      price: "25,000",
    },
    status: "delivered",
    paymentMade: "15,000",
    balance: "10,000",
  },
  {
    id: 1,
    productDetails: {
      imgSrc:
        "https://utfs.io/f/wLDjZbdcJHpR6GzP9tNC4ixdcsRJyHYuWMK8l0EPahTBok7f",
      productName:
        "Fashion Front Classic Men Leather Multilayer Bracelet  Brown",
      price: "25,000",
    },
    status: "in transit",
    paymentMade: "25,000",
    balance: "0",
  },
  {
    id: 2,
    productDetails: {
      imgSrc:
        "https://utfs.io/f/wLDjZbdcJHpR6GzP9tNC4ixdcsRJyHYuWMK8l0EPahTBok7f",
      productName: "Nike Jordan 1",
      price: "25,000",
    },
    status: "cancelled",
    paymentMade: "20,000",
    balance: "5,000",
  },
];

export const addresses = [
  {
    id: 0,
    fullName: "John Placeholder Doe",
    address: "No. 35 Plaza Road Uyo",
    state: "Akwa-Ibom",
    phoneNumber: "0814 333 8983",
  },
  {
    id: 1,
    fullName: "John Placeholder Doe",
    address: "No. 12 Dummy Street, Fake Estate Uyo",
    state: "Akwa-Ibom",
    phoneNumber: "0814 333 8983",
  },
  {
    id: 2,
    fullName: "John Placeholder Doe",
    address: "No. 40 Placeholder Street Uyo",
    state: "Akwa-Ibom",
    phoneNumber: "0814 333 8983",
  },
];

export const paymentMethods = [
  {
    id: 0,
    nameOnCard: "John Placeholder Doe",
    cardNumber: "7748 4948 2293 2200",
    cardType: {
      name: "Visa",
      imgSrc:
        "https://utfs.io/f/wLDjZbdcJHpRPX4PXilmjskbuFOfhd9rRGH0xBp2yi3evQ71",
    },
  },
  {
    id: 1,
    nameOnCard: "John Placeholder Doe",
    cardNumber: "8899 8890 0029 8839",
    cardType: {
      name: "Mastercard",
      imgSrc:
        "https://utfs.io/f/wLDjZbdcJHpRmvvpNoyR3IeQOKw86LrAaEsNXpnHzPq75WUR",
    },
  },
];

export const notifications = [
  {
    id: 0,
    status: "delivered",
    message:
      " Your order has been delivered to the specified address. Thank you for shopping with us! If you have any questions or concerns, please contact our support team.",
    time: "4 hours ago",
  },
  {
    id: 1,
    status: "shipped",
    message: "Your order has been shipped and is on its way.",
    time: "6 hours ago",
  },
  {
    id: 2,
    status: "shipped",
    message: "Your order has been shipped and is on its way.",
    time: "1 day ago",
  },
  {
    id: 3,
    status: "cancelled",
    message:
      "Your order has been cancelled. If you have any questions, please contact our support team.",
    time: "2 days ago",
  },
];

export const FAQs = [
  {
    id: 0,
    question: "What is the return policy?",
    answer:
      "Our return policy lasts 30 days. If 30 days have gone by since your purchase, unfortunately we cannot offer you a refund or exchange.",
  },
  {
    id: 1,
    question: "How do I track my order?",
    answer:
      "You can track your order by logging into your account and visiting the 'Orders' section. You will find the tracking information there.",
  },
  {
    id: 2,
    question: "What payment methods are accepted?",
    answer:
      "We accept various payment methods including Visa, Mastercard, and PayPal.",
  },
  {
    id: 3,
    question: "How do I cancel my order?",
    answer:
      "To cancel your order, please contact our customer support team as soon as possible. If the order has not been shipped yet, we will be able to cancel it for you.",
  },
  {
    id: 4,
    question: "Can I change my shipping address after placing an order?",
    answer:
      "Yes, you can change your shipping address before the order is shipped. Please contact our customer support team to update your address.",
  },
  {
    id: 5,
    question: "What should I do if I receive a damaged product?",
    answer:
      "If you receive a damaged product, please contact our customer support team immediately. We will assist you with the return process and send you a replacement.",
  },
  {
    id: 6,
    question: "How long does shipping take?",
    answer:
      "Shipping times vary depending on your location and the shipping method chosen. Typically, it takes 5-7 business days for standard shipping.",
  },
  {
    id: 7,
    question: "Do you offer international shipping?",
    answer:
      "Yes, we offer international shipping to many countries. Shipping fees and delivery times may vary based on the destination.",
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
