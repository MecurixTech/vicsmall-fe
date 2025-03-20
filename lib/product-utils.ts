"use server";

import {
  getProductsByCategory,
  getRecommendedProducts,
  getFlashProducts,
} from "./product-actions";
import type { productData } from "@/app/data/dummyTypes";

const productCache = new Map<string, productData>();

export async function getProductById(
  productId: string,
): Promise<productData | null> {
  try {
    if (productCache.has(productId)) {
      return productCache.get(productId) || null;
    }

    const recommendedResponse = await getRecommendedProducts();
    if (recommendedResponse.success) {
      const product = recommendedResponse.data.find((p) => p.id === productId);
      if (product) {
        productCache.set(productId, product);
        return product;
      }
    }

    const flashResponse = await getFlashProducts();
    if (flashResponse.success) {
      const product = flashResponse.data.find((p) => p.id === productId);
      if (product) {
        productCache.set(productId, product);
        return product;
      }
    }

    const categories = ["electronics", "fashion", "home", "beauty", "sports"];

    for (const category of categories) {
      const categoryResponse = await getProductsByCategory(category);
      if (categoryResponse.success) {
        const product = categoryResponse.data.find((p) => p.id === productId);
        if (product) {
          productCache.set(productId, product);
          return product;
        }
      }
    }

    return null;
  } catch (error) {
    console.error(
      `[ProductUtils] Error fetching product by ID ${productId}:`,
      error,
    );
    return null;
  }
}

export async function getRelatedProducts(
  productId: string,
  category: string,
): Promise<productData[]> {
  try {
    console.log(
      `[ProductUtils] Fetching related products for ${productId} in category ${category}`,
    );

    const categoryResponse = await getProductsByCategory(category);
    if (categoryResponse.success) {
      return categoryResponse.data
        .filter((p) => p.id !== productId)
        .slice(0, 4);
    }

    const recommendedResponse = await getRecommendedProducts();
    if (recommendedResponse.success) {
      return recommendedResponse.data
        .filter((p) => p.id !== productId)
        .slice(0, 4);
    }

    return [];
  } catch (error) {
    console.error(
      `[ProductUtils] Error fetching related products for ${productId}:`,
      error,
    );
    return [];
  }
}
