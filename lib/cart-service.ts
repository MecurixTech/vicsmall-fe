"use server";

import { cookies } from "next/headers";

export interface CartItemResponse {
  cart_id: number;
  product_id: string;
  quantity: number;
  added_at: string;
}

export interface CartResponse {
  success: boolean;
  data: CartItemResponse[];
  error?: string;
}

export interface AddToCartResponse {
  success: boolean;
  data: CartItemResponse | null;
  error?: string;
}

export interface RemoveFromCartResponse {
  success: boolean;
  error?: string;
}

const isAuthError = (status: number, errorText: string): boolean => {
  return (
    status === 401 ||
    status === 403 ||
    errorText.includes("Authentication") ||
    errorText.includes("authentication") ||
    errorText.includes("token") ||
    errorText.includes("Token") ||
    errorText.includes("login") ||
    errorText.includes("Login")
  );
};

export async function getCartItems(): Promise<CartResponse> {
  try {
    const cookieStore = await cookies();
    const accessToken = cookieStore.get("access_token")?.value;

    if (!accessToken) {
      return {
        success: false,
        data: [],
        error: "Authentication required",
      };
    }

    const url = `${process.env.NEXT_PUBLIC_API_BASE_URL}/shop/customer-cart`;

    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      cache: "no-store",
    });

    if (response.status === 400) {
      let errorData: any = {};
      try {
        errorData = await response.json();
        if (
          errorData.Message &&
          errorData.Message.includes("You do not have any products in cat")
        ) {
          return {
            success: true,
            data: [],
            error: undefined,
          };
        }
      } catch (e) {
        console.error("[CartService] Failed to parse 400 response as JSON");
      }
    }

    if (response.status === 401 || response.status === 403) {
      return {
        success: false,
        data: [],
        error: "Authentication required",
      };
    }

    if (!response.ok) {
      const errorText = await response.text();
      console.error(
        "[CartService] Error fetching cart items. Status:",
        response.status,
        "Body:",
        errorText,
      );

      if (isAuthError(response.status, errorText)) {
        return {
          success: false,
          data: [],
          error: "Authentication required",
        };
      }

      let errorData: any = {};
      try {
        errorData = JSON.parse(errorText);
      } catch (e) {
        console.error("[CartService] Failed to parse error response as JSON");
      }

      return {
        success: false,
        data: [],
        error:
          errorData.Message ||
          `Failed to fetch cart items. Server returned ${response.status}`,
      };
    }

    let responseData: any;
    try {
      responseData = await response.json();
    } catch (e) {
      console.error("[CartService] Failed to parse response as JSON:", e);
      return {
        success: false,
        data: [],
        error: "Invalid response format",
      };
    }

    let cartItems: CartItemResponse[] = [];

    if (Array.isArray(responseData)) {
      cartItems = responseData;
    } else if (responseData && typeof responseData === "object") {
      if (responseData.Data && Array.isArray(responseData.Data)) {
        cartItems = responseData.Data;
      } else if (responseData.data && Array.isArray(responseData.data)) {
        cartItems = responseData.data;
      }
    }

    return {
      success: true,
      data: cartItems,
    };
  } catch (error) {
    console.error("[CartService] Exception in getCartItems:", error);
    return {
      success: false,
      data: [],
      error: "An unexpected error occurred while fetching cart items",
    };
  }
}

export async function addToCart(
  productId: string,
  quantity: number,
): Promise<AddToCartResponse> {
  try {
    const cookieStore = await cookies();
    const accessToken = cookieStore.get("access_token")?.value;

    if (!accessToken) {
      return {
        success: false,
        data: null,
        error: "Authentication required",
      };
    }

    const url = `${process.env.NEXT_PUBLIC_API_BASE_URL}/shop/customer-cart/add`;

    const payload = {
      product_id: productId,
      quantity: quantity,
    };

    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify(payload),
      cache: "no-store",
    });
    if (response.status === 401 || response.status === 403) {
      return {
        success: false,
        data: null,
        error: "Authentication required",
      };
    }

    if (!response.ok) {
      const errorText = await response.text();
      console.error(
        "[CartService] Error adding to cart. Status:",
        response.status,
        "Body:",
        errorText,
      );

      if (isAuthError(response.status, errorText)) {
        return {
          success: false,
          data: null,
          error: "Authentication required",
        };
      }

      let errorData: any = {};
      try {
        errorData = JSON.parse(errorText);
      } catch (e) {
        console.error("[CartService] Failed to parse error response as JSON");
      }

      return {
        success: false,
        data: null,
        error:
          errorData.Message ||
          `Failed to add item to cart. Server returned ${response.status}`,
      };
    }

    let responseData: any;
    try {
      responseData = await response.json();
    } catch (e) {
      console.error("[CartService] Failed to parse response as JSON:", e);
      return {
        success: false,
        data: null,
        error: "Invalid response format",
      };
    }

    let cartItem: CartItemResponse | null = null;

    if (responseData && typeof responseData === "object") {
      if (responseData.Data && typeof responseData.Data === "object") {
        cartItem = responseData.Data;
      } else if (responseData.data && typeof responseData.data === "object") {
        cartItem = responseData.data;
      } else if (responseData.cart_id) {
        cartItem = responseData;
      }
    }

    return {
      success: true,
      data: cartItem,
    };
  } catch (error) {
    console.error(
      `[CartService] Exception in addToCart for product ${productId}:`,
      error,
    );
    return {
      success: false,
      data: null,
      error: "An unexpected error occurred while adding item to cart",
    };
  }
}

export async function removeFromCart(
  cartId: number,
): Promise<RemoveFromCartResponse> {
  try {
    const cookieStore = await cookies();
    const accessToken = cookieStore.get("access_token")?.value;

    if (!accessToken) {
      return {
        success: false,
        error: "Authentication required",
      };
    }

    const url = `${process.env.NEXT_PUBLIC_API_BASE_URL}/shop/customer-cart/remove/${cartId}`;

    const response = await fetch(url, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      cache: "no-store",
    });

    if (response.status === 401 || response.status === 403) {
      return {
        success: false,
        error: "Authentication required",
      };
    }

    if (!response.ok) {
      const errorText = await response.text();
      console.error(
        "[CartService] Error removing from cart. Status:",
        response.status,
        "Body:",
        errorText,
      );

      if (isAuthError(response.status, errorText)) {
        return {
          success: false,
          error: "Authentication required",
        };
      }

      let errorData: any = {};
      try {
        errorData = JSON.parse(errorText);
      } catch (e) {
        console.error("[CartService] Failed to parse error response as JSON");
      }

      return {
        success: false,
        error:
          errorData.Message ||
          `Failed to remove item from cart. Server returned ${response.status}`,
      };
    }

    return {
      success: true,
    };
  } catch (error) {
    console.error(
      `[CartService] Exception in removeFromCart for cart item ${cartId}:`,
      error,
    );
    return {
      success: false,
      error: "An unexpected error occurred while removing item from cart",
    };
  }
}

export async function updateCartItemQuantity(
  productId: string,
  quantity: number,
): Promise<AddToCartResponse> {
  return addToCart(productId, quantity);
}
