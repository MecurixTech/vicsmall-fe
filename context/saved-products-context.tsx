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
  getSavedProducts,
  saveProduct,
  removeSavedProduct,
} from "@/lib/saved-products-service";
import type { SavedProductResponse } from "@/lib/saved-products-service";

interface SavedProductsContextType {
  savedProducts: SavedProductResponse[];
  isLoading: boolean;
  saveProduct: (productId: string) => Promise<void>;
  removeSavedProduct: (savedProductId: string) => Promise<void>;
  isProductSaved: (productId: string) => boolean;
  getSavedProductId: (productId: string) => string | undefined;
  refreshSavedProducts: () => Promise<void>;
}

const SavedProductsContext = createContext<
  SavedProductsContextType | undefined
>(undefined);

export const SavedProductsProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [savedProducts, setSavedProducts] = useState<SavedProductResponse[]>(
    [],
  );
  const [isLoading, setIsLoading] = useState(false);
  const refreshIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const silentRefreshingRef = useRef(false);
  const initialFetchDoneRef = useRef(false);

  const fetchSavedProducts = useCallback(async (silent = false) => {
    try {
      if (!silent) {
        setIsLoading(true);
      } else {
        silentRefreshingRef.current = true;
      }

      const response = await getSavedProducts();

      if (response.success) {
        setSavedProducts(response.data);
      } else if (response.error === "Authentication required") {
        setSavedProducts([]);
      } else {
        console.error(
          "[SavedProductsContext] Failed to fetch saved products:",
          response.error,
        );
        if (!silent) {
          toast.error("Failed to load your saved products");
        }
      }
    } catch (error) {
      console.error(
        "[SavedProductsContext] Error fetching saved products:",
        error,
      );
      if (!silent) {
        toast.error("Error loading your saved products");
      }
    } finally {
      if (!silent) {
        setIsLoading(false);
      } else {
        silentRefreshingRef.current = false;
      }
      initialFetchDoneRef.current = true;
    }
  }, []);

  const silentRefresh = useCallback(() => {
    fetchSavedProducts(true);
  }, [fetchSavedProducts]);

  useEffect(() => {
    if (!initialFetchDoneRef.current) {
      fetchSavedProducts();
    }
    refreshIntervalRef.current = setInterval(() => {
      silentRefresh();
    }, 60000);

    return () => {
      if (refreshIntervalRef.current) {
        clearInterval(refreshIntervalRef.current);
      }
    };
  }, [fetchSavedProducts, silentRefresh]);

  const handleSaveProduct = async (productId: string) => {
    const isAlreadySaved = savedProducts.some(
      (item) => item.product === productId,
    );

    if (isAlreadySaved) {
      toast.success("This product is already in your saved list");
      return;
    }

    setIsLoading(true);

    const tempSavedProduct: SavedProductResponse = {
      id: `temp-${Date.now()}`,
      product: productId,
      user: "",
      created_at: new Date().toISOString(),
    };

    setSavedProducts((prev) => [...prev, tempSavedProduct]);

    try {
      const response = await saveProduct(productId);

      if (!response.success) {
        if (response.error === "Authentication required") {
          toast.error("Please log in to save products");

          window.location.href = "/login";

          setSavedProducts((prev) =>
            prev.filter((item) => item.id !== tempSavedProduct.id),
          );
          return;
        }
        throw new Error(response.error || "Failed to save product");
      }

      if (response.data) {
        setSavedProducts((prev) =>
          prev.map((item) =>
            item.id === tempSavedProduct.id ? response.data! : item,
          ),
        );
      } else {
        await fetchSavedProducts(true);
      }

      toast.success("Product saved to your list");
    } catch (error) {
      console.error("[SavedProductsContext] Error saving product:", error);

      setSavedProducts((prev) =>
        prev.filter((item) => item.id !== tempSavedProduct.id),
      );
      toast.error("Error saving product");
    } finally {
      setIsLoading(false);
    }
  };

  const handleRemoveSavedProduct = async (savedProductId: string) => {
    setIsLoading(true);

    const productToRemove = savedProducts.find(
      (item) => item.id === savedProductId,
    );
    if (productToRemove) {
      const productBackup = { ...productToRemove };

      setSavedProducts((prev) =>
        prev.filter((item) => item.id !== savedProductId),
      );

      try {
        const response = await removeSavedProduct(savedProductId);

        if (!response.success) {
          if (response.error === "Authentication required") {
            toast.error("Please log in to manage your saved products");

            window.location.href = "/login";

            setSavedProducts((prev) => [...prev, productBackup]);
            return;
          }
          throw new Error(response.error || "Failed to remove saved product");
        }

        toast.success("Product removed from your saved list");
      } catch (error) {
        console.error(
          "[SavedProductsContext] Error removing saved product:",
          error,
        );
        toast.error("Error removing saved product");

        setSavedProducts((prev) => [...prev, productBackup]);
      } finally {
        setIsLoading(false);
      }
    } else {
      console.error(
        "[SavedProductsContext] Product not found in saved products:",
        savedProductId,
      );
      setIsLoading(false);
    }
  };

  const isProductSaved = useCallback(
    (productId: string) => {
      if (!productId) return false;
      return savedProducts.some((item) => item.product === productId);
    },
    [savedProducts],
  );
  const getSavedProductId = useCallback(
    (productId: string) => {
      const savedProduct = savedProducts.find(
        (item) => item.product === productId,
      );
      return savedProduct?.id;
    },
    [savedProducts],
  );

  return (
    <SavedProductsContext.Provider
      value={{
        savedProducts,
        isLoading,
        saveProduct: handleSaveProduct,
        removeSavedProduct: handleRemoveSavedProduct,
        isProductSaved,
        getSavedProductId,
        refreshSavedProducts: fetchSavedProducts,
      }}
    >
      {children}
    </SavedProductsContext.Provider>
  );
};

export const useSavedProducts = () => {
  const context = useContext(SavedProductsContext);
  if (context === undefined) {
    throw new Error(
      "useSavedProducts must be used within a SavedProductsProvider",
    );
  }
  return context;
};
