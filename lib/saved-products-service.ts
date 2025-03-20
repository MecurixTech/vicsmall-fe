"use server";

import { cookies } from "next/headers";

export interface SavedProductResponse {
  id: string;
  user: string;
  product: string;
  created_at: string;
  updated_at?: string;
}

export interface SavedProductsListResponse {
  success: boolean;
  data: SavedProductResponse[];
  error?: string;
}

export interface SaveProductResponse {
  success: boolean;
  data?: SavedProductResponse;
  error?: string;
}

export async function getSavedProducts(): Promise<SavedProductsListResponse> {
  try {
    const cookieStore = await cookies();
    const accessToken = cookieStore.get("access_token")?.value;

    const headers: HeadersInit = {
      "Content-Type": "application/json",
    };

    if (accessToken) {
      headers["Authorization"] = `Bearer ${accessToken}`;
    } else {
      return {
        success: false,
        data: [],
        error: "Authentication required",
      };
    }

    const url = `${process.env.NEXT_PUBLIC_API_BASE_URL}/shop/customer/all-saved-list`;

    const response = await fetch(url, {
      method: "GET",
      headers,
      cache: "no-store",
    });

    const responseText = await response.text();

    let responseData;
    try {
      responseData = JSON.parse(responseText);
    } catch (e) {
      console.error(
        "[SavedProductsActions] Failed to parse response as JSON:",
        e,
      );
      return {
        success: false,
        data: [],
        error: "Invalid response format",
      };
    }

    if (!response.ok) {
      console.error(
        `[SavedProductsActions] Error fetching saved products. Status: ${response.status}, Body:`,
        responseText,
      );

      let errorData: any = {};
      try {
        errorData = JSON.parse(responseText);
      } catch (e) {
        console.error(
          "[SavedProductsActions] Failed to parse error response as JSON",
        );
      }

      return {
        success: false,
        data: [],
        error:
          errorData.Message ||
          `Failed to fetch saved products. Server returned ${response.status}`,
      };
    }

    let savedProducts: SavedProductResponse[] = [];

    if (responseData && typeof responseData === "object") {
      if (Array.isArray(responseData)) {
        savedProducts = responseData;
      } else if (responseData.Data && Array.isArray(responseData.Data)) {
        savedProducts = responseData.Data;
      } else if (responseData.data && Array.isArray(responseData.data)) {
        savedProducts = responseData.data;
      }
    }

    return {
      success: true,
      data: savedProducts,
    };
  } catch (error) {
    console.error(
      `[SavedProductsActions] Exception in getSavedProducts:`,
      error,
    );
    return {
      success: false,
      data: [],
      error: "An unexpected error occurred while fetching saved products",
    };
  }
}

export async function saveProduct(
  productId: string,
): Promise<SaveProductResponse> {
  try {
    const cookieStore = await cookies();
    const accessToken = cookieStore.get("access_token")?.value;

    const headers: HeadersInit = {
      "Content-Type": "application/json",
    };

    if (accessToken) {
      headers["Authorization"] = `Bearer ${accessToken}`;
    } else {
      return {
        success: false,
        error: "Authentication required",
      };
    }

    const url = `${process.env.NEXT_PUBLIC_API_BASE_URL}/shop/customer/save-product`;

    const payload = JSON.stringify({ product: productId });

    const response = await fetch(url, {
      method: "POST",
      headers,
      body: payload,
    });

    const responseText = await response.text();

    let responseData;
    try {
      responseData = JSON.parse(responseText);
    } catch (e) {
      console.error(
        "[SavedProductsActions] Failed to parse response as JSON:",
        e,
      );
      if (response.ok) {
        return { success: true };
      }
      return {
        success: false,
        error: "Invalid response format",
      };
    }

    if (!response.ok) {
      console.error(
        `[SavedProductsActions] Error saving product ${productId}. Status: ${response.status}, Body:`,
        responseText,
      );

      let errorData: any = {};
      try {
        errorData = JSON.parse(responseText);
      } catch (e) {
        console.error(
          "[SavedProductsActions] Failed to parse error response as JSON",
        );
      }

      return {
        success: false,
        error:
          errorData.Message ||
          `Failed to save product. Server returned ${response.status}`,
      };
    }

    let savedProduct: SavedProductResponse | null = null;

    if (responseData && typeof responseData === "object") {
      if (responseData.id) {
        savedProduct = responseData;
      } else if (responseData.Data && typeof responseData.Data === "object") {
        savedProduct = responseData.Data;
      } else if (responseData.data && typeof responseData.data === "object") {
        savedProduct = responseData.data;
      }
    }

    if (!savedProduct) {
      return {
        success: true,
      };
    }

    return {
      success: true,
      data: savedProduct,
    };
  } catch (error) {
    console.error(
      `[SavedProductsActions] Exception in saveProduct for ${productId}:`,
      error,
    );
    return {
      success: false,
      error: "An unexpected error occurred while saving product",
    };
  }
}

export async function removeSavedProduct(
  savedProductId: string,
): Promise<{ success: boolean; error?: string }> {
  try {
    const cookieStore = await cookies();
    const accessToken = cookieStore.get("access_token")?.value;

    const headers: HeadersInit = {
      "Content-Type": "application/json",
    };

    if (accessToken) {
      headers["Authorization"] = `Bearer ${accessToken}`;
    } else {
      return {
        success: false,
        error: "Authentication required",
      };
    }

    const url = `${process.env.NEXT_PUBLIC_API_BASE_URL}/shop/customer-saved-product/remove/${savedProductId}`;

    const response = await fetch(url, {
      method: "DELETE",
      headers,
    });

    if (response.status >= 200 && response.status < 300) {
      return { success: true };
    }
    const errorText = await response.text();
    console.error(
      `[SavedProductsActions] Error removing saved product ${savedProductId}. Status: ${response.status}, Body:`,
      errorText,
    );

    let errorData: any = {};
    try {
      errorData = JSON.parse(errorText);
    } catch (e) {
      console.error(
        "[SavedProductsActions] Failed to parse error response as JSON",
      );
    }

    return {
      success: false,
      error:
        errorData.Message ||
        `Failed to remove saved product. Server returned ${response.status}`,
    };
  } catch (error) {
    console.error(
      `[SavedProductsActions] Exception in removeSavedProduct for ${savedProductId}:`,
      error,
    );
    return {
      success: false,
      error: "An unexpected error occurred while removing saved product",
    };
  }
}
