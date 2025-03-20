"use client";

import type React from "react";
import {
  createContext,
  useState,
  useContext,
  useEffect,
  useRef,
  useCallback,
} from "react";
import { toast } from "react-hot-toast";
import {
  getCartItems,
  addToCart,
  removeFromCart,
  updateCartItemQuantity,
} from "@/lib/cart-service";
import type { CartItemResponse } from "@/lib/cart-service";
import {
  enrichCartItems,
  type EnrichedCartItem,
} from "@/utils/cart-product-utils";
import {
  calculateCartTotals,
  saveCartTotalsToStorage,
} from "@/utils/cart-calculations";

function debounce(func: Function, wait: number) {
  let timeout: NodeJS.Timeout | null = null;
  return (...args: any[]) => {
    if (timeout) clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
}

export interface CartItem extends CartItemResponse {
  name?: string;
  price?: number;
  image?: string;
  variant?: string;
  description?: string;
}

interface CartContextType {
  items: CartItem[];
  totalItems: number;
  uniqueItemsCount: number;
  addToCart: (
    productId: string,
    quantity: number,
  ) => Promise<{ success: boolean; error?: string }>;
  removeFromCart: (cartId: number) => Promise<void>;
  updateQuantity: (productId: string, quantity: number) => void;
  isLoading: boolean;
  refreshCart: () => Promise<void>;
  isAuthenticated: boolean;
  syncCartWithServer: () => Promise<boolean>;
  buyNow: (
    productId: string,
    quantity: number,
  ) => Promise<{ success: boolean; error?: string }>;
  cartTotals: {
    subtotal: number;
    deliveryFee: number;
    discount: number;
    grandTotal: number;
  };
}

const CartContext = createContext<CartContextType | undefined>(undefined);

const CART_STORAGE_KEY = "vicsmall_cart_state";
const CART_QUANTITIES_KEY = "vicsmall_cart_quantities";

export const CartProvider = ({ children }: { children: React.ReactNode }) => {
  const [items, setItems] = useState<CartItem[]>([]);
  const [enrichedItems, setEnrichedItems] = useState<EnrichedCartItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isEnriching, setIsEnriching] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(true);
  const refreshIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const silentRefreshingRef = useRef(false);
  const isUpdatingRef = useRef(false);
  const updatedProductsRef = useRef(new Set<string>());
  const lastRefreshTimeRef = useRef<number>(0);
  const MIN_REFRESH_INTERVAL = 100000;
  const REFRESH_INTERVAL = 300000;
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [productQuantities, setProductQuantities] = useState<
    Record<string, number>
  >({});

  const [cartTotals, setCartTotals] = useState({
    subtotal: 0,
    deliveryFee: 1500,
    discount: 0,
    grandTotal: 0,
  });

  const uniqueItemsCount = items.length;

  const totalItems = items.length;

  useEffect(() => {
    try {
      const savedCart = localStorage.getItem(CART_STORAGE_KEY);
      if (savedCart) {
        const parsedCart = JSON.parse(savedCart);
        if (Array.isArray(parsedCart) && parsedCart.length > 0) {
          setItems(parsedCart);
        }
      }

      const savedQuantities = localStorage.getItem(CART_QUANTITIES_KEY);
      if (savedQuantities) {
        const parsedQuantities = JSON.parse(savedQuantities);
        if (typeof parsedQuantities === "object") {
          setProductQuantities(parsedQuantities);

          if (savedCart) {
            const parsedCart = JSON.parse(savedCart);
            if (Array.isArray(parsedCart) && parsedCart.length > 0) {
              const updatedCart = parsedCart.map((item) => {
                if (parsedQuantities[item.product_id]) {
                  return {
                    ...item,
                    quantity: parsedQuantities[item.product_id],
                  };
                }
                return item;
              });
              setItems(updatedCart);
            }
          }
        }
      }
    } catch (error) {
      console.error(
        "[CartContext] Error loading cart from localStorage:",
        error,
      );
    }
  }, []);

  useEffect(() => {
    if (items.length > 0) {
      try {
        localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items));
      } catch (error) {
        console.error(
          "[CartContext] Error saving cart to localStorage:",
          error,
        );
      }
    } else if (items.length === 0 && localStorage.getItem(CART_STORAGE_KEY)) {
      localStorage.removeItem(CART_STORAGE_KEY);
    }
  }, [items]);

  useEffect(() => {
    if (Object.keys(productQuantities).length > 0) {
      try {
        localStorage.setItem(
          CART_QUANTITIES_KEY,
          JSON.stringify(productQuantities),
        );
      } catch (error) {
        console.error(
          "[CartContext] Error saving product quantities to localStorage:",
          error,
        );
      }
    }
  }, [productQuantities]);

  useEffect(() => {
    if (enrichedItems.length > 0) {
      const totals = calculateCartTotals(enrichedItems);
      setCartTotals(totals);
      saveCartTotalsToStorage(totals);
    } else if (items.length > 0) {
      const totals = calculateCartTotals(items);
      setCartTotals(totals);
      saveCartTotalsToStorage(totals);
    } else {
      const emptyTotals = {
        subtotal: 0,
        deliveryFee: 1500,
        discount: 0,
        grandTotal: 1500,
      };
      setCartTotals(emptyTotals);
      saveCartTotalsToStorage(emptyTotals);
    }
  }, [enrichedItems, items]);

  const enrichItems = useCallback(
    async (cartItems: CartItem[]) => {
      if (cartItems.length === 0) {
        setEnrichedItems([]);
        return;
      }

      if (isEnriching) {
        return;
      }

      setIsEnriching(true);
      try {
        const enriched = await enrichCartItems(cartItems);

        const updatedItems = cartItems.map((item) => {
          const enrichedItem = enriched.find((e) => e.cart_id === item.cart_id);
          if (enrichedItem) {
            return {
              ...item,
              name: enrichedItem.name,
              price: enrichedItem.price,
              image: enrichedItem.image,
              variant: enrichedItem.variant,
              description: enrichedItem.description,
            };
          }
          return item;
        });

        setItems(updatedItems);
        setEnrichedItems(enriched);
      } catch (error) {
        console.error("[CartContext] Error enriching cart items:", error);
      } finally {
        setIsEnriching(false);
      }
    },
    [isEnriching],
  );

  useEffect(() => {
    if (items.length > 0 && !isEnriching) {
      const timer = setTimeout(() => {
        enrichItems(items);
      }, 300);

      return () => clearTimeout(timer);
    }
  }, [items, enrichItems, isEnriching]);

  const fetchCartItems = async (silent = false) => {
    if (isUpdatingRef.current) {
      return;
    }

    const now = Date.now();
    if (now - lastRefreshTimeRef.current < MIN_REFRESH_INTERVAL && !silent) {
      return;
    }

    lastRefreshTimeRef.current = now;

    try {
      if (!silent) {
        setIsLoading(true);
      } else {
        silentRefreshingRef.current = true;
      }

      const response = await getCartItems();

      if (response.success) {
        setIsAuthenticated(true);

        if (updatedProductsRef.current.size > 0) {
          const updatedItems = response.data.map((serverItem) => {
            const existingItem = items.find(
              (item) => item.product_id === serverItem.product_id,
            );

            if (
              existingItem &&
              updatedProductsRef.current.has(serverItem.product_id)
            ) {
              return {
                ...serverItem,
                quantity: existingItem.quantity,
              };
            }

            return serverItem;
          });

          setItems(updatedItems);

          const newQuantities = { ...productQuantities };
          response.data.forEach((item) => {
            if (!updatedProductsRef.current.has(item.product_id)) {
              newQuantities[item.product_id] = item.quantity;
            }
          });
          setProductQuantities(newQuantities);
        } else {
          if (JSON.stringify(items) !== JSON.stringify(response.data)) {
            setItems(response.data);

            const newQuantities = { ...productQuantities };
            response.data.forEach((item) => {
              newQuantities[item.product_id] = item.quantity;
            });
            setProductQuantities(newQuantities);
          }
        }
      } else if (response.error === "Authentication required") {
        setIsAuthenticated(false);
        setItems([]);
      } else {
        console.error(
          "[CartContext] Failed to fetch cart items:",
          response.error,
        );
        if (!silent) {
          toast.error("Failed to load your cart");
        }
      }
    } catch (error) {
      console.error("[CartContext] Error fetching cart:", error);
      if (!silent && isAuthenticated) {
        toast.error("Error loading your cart");
      }
    } finally {
      if (!silent) {
        setIsLoading(false);
      } else {
        silentRefreshingRef.current = false;
      }
    }
  };

  const silentRefresh = () => {
    fetchCartItems(true);
  };
  useEffect(() => {
    fetchCartItems();

    refreshIntervalRef.current = setInterval(() => {
      silentRefresh();
    }, REFRESH_INTERVAL);

    return () => {
      if (refreshIntervalRef.current) {
        clearInterval(refreshIntervalRef.current);
      }
    };
  }, []);

  const handleAddToCart = async (productId: string, quantity: number) => {
    if (!isAuthenticated) {
      return { success: false, error: "Authentication required" };
    }

    const existingItem = items.find((item) => item.product_id === productId);

    if (existingItem) {
      handleUpdateQuantity(productId, existingItem.quantity + quantity);
      return { success: true };
    }

    setIsLoading(true);
    try {
      const response = await addToCart(productId, quantity);

      if (!response.success) {
        if (response.error === "Authentication required") {
          setIsAuthenticated(false);
          toast.error("Please log in to add items to cart");

          window.location.href = "/login";
          return { success: false, error: "Authentication required" };
        }
        throw new Error(response.error || "Failed to add item to cart");
      }

      if (response.data) {
        const newItem = response.data;
        setItems((prevItems) => [...prevItems, newItem]);

        setProductQuantities((prev) => ({
          ...prev,
          [productId]: quantity,
        }));
      } else {
        await fetchCartItems();
      }

      toast.success("Item added to cart");
      return { success: true };
    } catch (error) {
      console.error("[CartContext] Error adding to cart:", error);
      toast.error("Error adding to cart");
      return { success: false, error: "Error adding to cart" };
    } finally {
      setIsLoading(false);
    }
  };

  const handleRemoveFromCart = async (cartId: number) => {
    if (!isAuthenticated) {
      toast.error("Please log in to remove items from cart");

      window.location.href = "/login";
      return;
    }

    setIsLoading(true);
    try {
      const itemToRemove = items.find((item) => item.cart_id === cartId);
      if (itemToRemove) {
        updatedProductsRef.current.delete(itemToRemove.product_id);

        const newQuantities = { ...productQuantities };
        delete newQuantities[itemToRemove.product_id];
        setProductQuantities(newQuantities);
      }

      const response = await removeFromCart(cartId);

      if (!response.success) {
        if (response.error === "Authentication required") {
          setIsAuthenticated(false);
          toast.error("Please log in to remove items from cart");

          window.location.href = "/login";
          return;
        }
        throw new Error(response.error || "Failed to remove item from cart");
      }

      setItems(items.filter((item) => item.cart_id !== cartId));
      setEnrichedItems(enrichedItems.filter((item) => item.cart_id !== cartId));

      toast.error("Item removed");
    } catch (error) {
      console.error("[CartContext] Error removing from cart:", error);
      toast.error("Error removing item");
    } finally {
      setIsLoading(false);
    }
  };
  const handleUpdateQuantity = (productId: string, quantity: number) => {
    if (!isAuthenticated) {
      toast.error("Please log in to update cart");

      window.location.href = "/login";
      return;
    }

    if (quantity <= 0) {
      const itemToRemove = items.find((item) => item.product_id === productId);
      if (itemToRemove) {
        const newQuantities = { ...productQuantities };
        delete newQuantities[productId];
        setProductQuantities(newQuantities);
        return handleRemoveFromCart(itemToRemove.cart_id);
      }
      return;
    }

    const itemIndex = items.findIndex((item) => item.product_id === productId);
    if (itemIndex === -1) return;

    const updatedItems = [...items];

    updatedItems[itemIndex] = {
      ...updatedItems[itemIndex],
      quantity: quantity,
    };

    setItems(updatedItems);

    setProductQuantities((prev) => {
      const updated = { ...prev, [productId]: quantity };

      return updated;
    });

    const enrichedItemIndex = enrichedItems.findIndex(
      (item) => item.product_id === productId,
    );
    if (enrichedItemIndex !== -1) {
      const updatedEnrichedItems = [...enrichedItems];
      updatedEnrichedItems[enrichedItemIndex] = {
        ...updatedEnrichedItems[enrichedItemIndex],
        quantity: quantity,
      };
      setEnrichedItems(updatedEnrichedItems);
    }

    updatedProductsRef.current.add(productId);

    debouncedSyncCart();
  };

  const syncCartWithServer = async () => {
    const updatedProducts = Array.from(updatedProductsRef.current);

    if (updatedProducts.length === 0) {
      return true;
    }

    const isBackgroundSync = !isSubmitting;
    if (!isBackgroundSync) {
      setIsLoading(true);
    }

    try {
      const updatePromises = updatedProducts.map(async (productId) => {
        const item = items.find((item) => item.product_id === productId);
        if (!item) return null;

        return updateCartItemQuantity(productId, item.quantity);
      });

      const results = await Promise.all(updatePromises);
      const failures = results.filter((r) => r && !r.success);

      if (failures.length > 0) {
        console.error("[CartContext] Some items failed to sync:", failures);
        if (!isBackgroundSync) {
          toast.error("Some items in your cart couldn't be updated");
        }
        return false;
      }

      updatedProductsRef.current.clear();

      return true;
    } catch (error) {
      console.error("[CartContext] Error syncing cart:", error);
      if (!isBackgroundSync) {
        toast.error("Failed to update your cart");
      }
      return false;
    } finally {
      if (!isBackgroundSync) {
        setIsLoading(false);
      }
    }
  };

  const debouncedSyncCart = useCallback(
    debounce(async () => {
      await syncCartWithServer();
    }, 2000),
    [],
  );
  const handleBuyNow = async (productId: string, quantity: number) => {
    const result = await handleAddToCart(productId, quantity);

    if (result.success) {
      const checkoutItem =
        enrichedItems.find((item) => item.product_id === productId) ||
        items.find((item) => item.product_id === productId);

      if (checkoutItem) {
        const itemPrice = checkoutItem.price || 0;
        const subtotal = itemPrice * quantity;
        const deliveryFee = 1500;
        const discount = 0;
        const grandTotal = subtotal + deliveryFee - discount;

        const checkoutData = {
          items: [{ ...checkoutItem, quantity }],
          subtotal,
          deliveryFee,
          discount,
          grandTotal,
          paymentMode: "full",
          partPayment: 0,
          partPaymentPercentage: 0,
        };

        sessionStorage.setItem("checkoutData", JSON.stringify(checkoutData));

        window.location.href = "/checkout";
      }
    }

    return result;
  };

  return (
    <CartContext.Provider
      value={{
        items: enrichedItems.length > 0 ? enrichedItems : items,
        totalItems,
        uniqueItemsCount,
        addToCart: handleAddToCart,
        removeFromCart: handleRemoveFromCart,
        updateQuantity: handleUpdateQuantity,
        isLoading: isLoading || isEnriching,
        refreshCart: fetchCartItems,
        isAuthenticated,
        syncCartWithServer,
        buyNow: handleBuyNow,
        cartTotals,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};
