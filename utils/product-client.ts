
import { getProductDetails } from "@/lib/product-details-actions"

export async function fetchProductDetails(productId: string) {
  const result = await getProductDetails(productId)

  if (result.success && result.data && result.data.imgSrc) {
    try {

      if (
        typeof result.data.imgSrc === "string" &&
        (result.data.imgSrc.startsWith("[") || result.data.imgSrc.startsWith("{"))
      ) {

        const parsed = JSON.parse(result.data.imgSrc)

        if (Array.isArray(parsed) && parsed.length > 0) {
          result.data.imgSrc = parsed[0]

        }

        else if (typeof parsed === "object" && parsed !== null) {

          const possibleUrlProps = ["url", "src", "path", "image", "imageUrl", "img"]
          for (const prop of possibleUrlProps) {
            if (parsed[prop] && typeof parsed[prop] === "string") {
              result.data.imgSrc = parsed[prop]

              break
            }
          }

          if (typeof result.data.imgSrc === "object") {
            const firstStringValue = Object.values(parsed).find((val) => typeof val === "string" && val.trim() !== "")

            if (firstStringValue) {
              if (typeof firstStringValue === "string") {
                result.data.imgSrc = firstStringValue
              }

            }
          }
        }
      }
    } catch (error) {

    }
  }

  return result
}

