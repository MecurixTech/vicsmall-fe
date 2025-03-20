"use server";
import type { productData } from "@/app/data/dummyTypes";

export interface ApiProduct {
  product_id: string;
  product_name: string;
  product_sale_price: string;
  product_regular_price: string;
  product_description: string;
  category: string;
  product_tags: string;
  product_visibility: boolean;
  product_status: boolean;
  created_at: string;
  updated_at: string;
}

export interface ApiResponse {
  Message: string;
  Success: boolean;
  Status: number;
  Data: ApiProduct[];
}

export interface ProductResponse {
  success: boolean;
  data: productData[];
  error?: string;
}

export interface Category {
  category_id: string;
  name: string;
  slug: string;
  created_at: string;
  updated_at: string;
}

export interface CategoryResponse {
  success: boolean;
  data: Category[];
  error?: string;
}

function mapApiProductToProductData(apiProduct: ApiProduct): productData {
  return {
    id: apiProduct.product_id,
    name: apiProduct.product_name || "Product Name",
    currentPrice: Number.parseFloat(apiProduct.product_sale_price) || 0,
    originalPrice: Number.parseFloat(apiProduct.product_regular_price) || 0,
    imgSrc: "",
    category: apiProduct.category || "",
    isShippedFromAbroad: false,
    colorVariants: [],
    rating: 4,
    isNew: false,
    isFeatured: false,
    stockQuantity: 10,
    vendor: "",
    description: apiProduct.product_description || "",
    createdAt: apiProduct.created_at,
    updatedAt: apiProduct.updated_at,
    visibility: apiProduct.product_visibility,
    status: apiProduct.product_status,
    tags: [],
    variant: "",
  };
}

export async function getCategories(): Promise<CategoryResponse> {
  try {
    const url = `${process.env.NEXT_PUBLIC_API_BASE_URL}/categories/customer/view-categories`;

    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      cache: "no-store",
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      console.error("[ProductActions] Error fetching categories:", errorData);
      return {
        success: false,
        data: [],
        error:
          errorData.Message ||
          `Failed to fetch categories. Server returned ${response.status}`,
      };
    }

    const data = await response.json();

    let categories: Category[] = [];

    if (Array.isArray(data)) {
      categories = data;
    } else if (data.Data && Array.isArray(data.Data)) {
      categories = data.Data;
    } else if (data.data && Array.isArray(data.data)) {
      categories = data.data;
    }

    return {
      success: true,
      data: categories,
    };
  } catch (error) {
    console.error("[ProductActions] Exception in getCategories:", error);
    return {
      success: false,
      data: [],
      error: "An unexpected error occurred while fetching categories",
    };
  }
}

export async function getProductsByCategory(
  category: string,
): Promise<ProductResponse> {
  try {
    const url = `${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/customer/product-by-category`;

    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ category }),
      cache: "no-store",
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      console.error(
        `[ProductActions] Error fetching products for category ${category}:`,
        errorData,
      );
      return {
        success: false,
        data: [],
        error:
          errorData.Message ||
          `Failed to fetch ${category} products. Server returned ${response.status}`,
      };
    }

    const apiResponse = (await response.json()) as ApiResponse;

    if (!apiResponse.Success) {
      return {
        success: false,
        data: [],
        error: apiResponse.Message || `Failed to fetch ${category} products`,
      };
    }

    const mappedProducts = (apiResponse.Data || []).map(
      mapApiProductToProductData,
    );

    return {
      success: true,
      data: mappedProducts,
    };
  } catch (error) {
    console.error(
      `[ProductActions] Exception in getProductsByCategory for ${category}:`,
      error,
    );
    return {
      success: false,
      data: [],
      error: `An unexpected error occurred while fetching ${category} products`,
    };
  }
}

export async function getFlashProducts(): Promise<ProductResponse> {
  try {
    const url = `${process.env.NEXT_PUBLIC_API_BASE_URL}/shop/customer/flash-sales`;

    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      cache: "no-store",
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      console.error(
        "[ProductActions] Error fetching flash sale products:",
        errorData,
      );
      return {
        success: false,
        data: [],
        error:
          errorData.Message ||
          `Failed to fetch flash sale products. Server returned ${response.status}`,
      };
    }

    const apiResponse = (await response.json()) as ApiResponse;

    if (!apiResponse.Success) {
      return {
        success: false,
        data: [],
        error: apiResponse.Message || "Failed to fetch flash sale products",
      };
    }

    const mappedProducts = (apiResponse.Data || []).map(
      mapApiProductToProductData,
    );

    return {
      success: true,
      data: mappedProducts,
    };
  } catch (error) {
    console.error("[ProductActions] Exception in getFlashProducts:", error);
    return {
      success: false,
      data: [],
      error: "An unexpected error occurred while fetching flash sale products",
    };
  }
}

export async function getRecommendedProducts(): Promise<ProductResponse> {
  try {
    const url = `${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/product/recommendation`;

    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      cache: "no-store",
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      console.error(
        "[ProductActions] Error fetching recommended products:",
        errorData,
      );
      return {
        success: false,
        data: [],
        error:
          errorData.Message ||
          `No products available for recommended products.`,
      };
    }

    const apiResponse = (await response.json()) as ApiResponse;

    if (!apiResponse.Success) {
      return {
        success: false,
        data: [],
        error: apiResponse.Message || "Failed to fetch recommended products",
      };
    }

    const mappedProducts = (apiResponse.Data || []).map(
      mapApiProductToProductData,
    );

    return {
      success: true,
      data: mappedProducts,
    };
  } catch (error) {
    console.error(
      "[ProductActions] Exception in getRecommendedProducts:",
      error,
    );
    return {
      success: false,
      data: [],
      error: "An unexpected error occurred while fetching recommended products",
    };
  }
}
