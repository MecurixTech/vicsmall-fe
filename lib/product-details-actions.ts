"use server";

import { cookies } from "next/headers";

export interface ProductDetails {
  id: string;
  name: string;
  description: string;
  currentPrice: number;
  originalPrice: number;
  imgSrc?: string;
  category: string;
  tags: string[];
  variant: string;
  isShippedFromAbroad: boolean;
  colorVariants: string[];
  rating: number;
  isNew: boolean;
  isFeatured: boolean;
  stockQuantity: number;
  vendor: string;
  createdAt: string;
  updatedAt: string;
  visibility: boolean;
  status: boolean;
}

export interface ProductDetailsResponse {
  success: boolean;
  data: ProductDetails | null;
  error?: string;
}

interface ApiProductDetails {
  product_id: string;
  product_name: string;
  product_description: string;
  category: string;
  product_tags: string;
  product_sale_price: string;
  product_regular_price: string;
  product_visibility: boolean;
  product_status: boolean;
  product_variant: string;
  product_images: string;
  created_at: string;
  updated_at: string;
}

interface ApiResponse {
  Message: string;
  Success: boolean;
  Status: number;
  Data: ApiProductDetails;
}

export async function getProductDetails(
  productId: string,
): Promise<ProductDetailsResponse> {
  try {
    const cookieStore = await cookies();
    const accessToken = cookieStore.get("access_token")?.value;

    const headers: HeadersInit = {
      "Content-Type": "application/json",
    };

    if (accessToken) {
      headers["Authorization"] = `Bearer ${accessToken}`;
    } else {
    }

    const url = `${process.env.NEXT_PUBLIC_API_BASE_URL}/shop/product-details/${productId}`;

    const response = await fetch(url, {
      method: "GET",
      headers,
      cache: "no-store",
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error(
        `[ProductDetailsActions] Error fetching product details for ${productId}. Status: ${response.status}, Body:`,
        errorText,
      );

      return {
        success: false,
        data: null,
        error: `Failed to fetch product details. Server returned ${response.status}`,
      };
    }

    let responseData: any;
    try {
      responseData = await response.json();
    } catch (e) {
      return {
        success: false,
        data: null,
        error: "Invalid response format",
      };
    }

    let productDetails: ApiProductDetails | null = null;

    if (responseData && typeof responseData === "object") {
      if (responseData.product_id) {
        productDetails = responseData as ApiProductDetails;
      } else if (responseData.Data && typeof responseData.Data === "object") {
        productDetails = responseData.Data as ApiProductDetails;
      } else if (responseData.data && typeof responseData.data === "object") {
        productDetails = responseData.data as ApiProductDetails;
      }
    }

    if (!productDetails) {
      console.error(
        `[ProductDetailsActions] Invalid product details format for ${productId}:`,
        responseData,
      );
      return {
        success: false,
        data: null,
        error: "Invalid product details format",
      };
    }

    const tags = productDetails.product_tags
      ? productDetails.product_tags.split(",").map((tag) => tag.trim())
      : [];

    const mappedProduct: ProductDetails = {
      id: productDetails.product_id,
      name: productDetails.product_name || "Product Name",
      description: productDetails.product_description || "",
      currentPrice: Number.parseFloat(productDetails.product_sale_price) || 0,
      originalPrice:
        Number.parseFloat(productDetails.product_regular_price) || 0,
      imgSrc: productDetails.product_images,
      category: productDetails.category || "",
      tags: tags,
      variant: productDetails.product_variant || "",
      isShippedFromAbroad: false,
      colorVariants: [],
      rating: 4,
      isNew: false,
      isFeatured: false,
      stockQuantity: 10,
      vendor: "VicSmall",
      createdAt: productDetails.created_at,
      updatedAt: productDetails.updated_at,
      visibility: productDetails.product_visibility,
      status: productDetails.product_status,
    };

    return {
      success: true,
      data: mappedProduct,
    };
  } catch (error) {
    console.error(
      `[ProductDetailsActions] Exception in getProductDetails for ${productId}:`,
      error,
    );
    return {
      success: false,
      data: null,
      error: "An unexpected error occurred while fetching product details",
    };
  }
}
