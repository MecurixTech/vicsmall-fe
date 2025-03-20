import { ShoppingCart, Heart } from "lucide-react"
import type { Product } from "@/lib/api"
import Image from "next/image"

interface ProductCardProps {
  product: Product
  showHeart?: boolean
}

export default function MobileProductCard({ product, showHeart = false }: ProductCardProps) {
  return (
    <div className="w-[164px] bg-[#FDFDFD] rounded-[5px] shadow-[0px_4px_28px_-2px_rgba(0,0,0,0.08)] p-[8px_9px_17px] relative">
      <div className="relative">
        <Image
          src={product.image || "/placeholder.svg"}
          alt={product.name}
          className="w-[146px] h-[126px] object-cover rounded-[11px] border border-black/10 mb-[9px]"
        />

        <div className="absolute top-[3px] left-[3px] bg-white/70 backdrop-blur-md rounded-[20px] p-[3px] flex gap-[8px]">
          {product.colors?.map((color, i) => (
            <div
              key={i}
              className="w-[14px] h-[14px] rounded-[150px]"
              style={{
                backgroundColor: color,
                border: color === "#242B33" ? "1px solid white" : "none",
              }}
            ></div>
          ))}
        </div>

        <button className="absolute right-[9px] top-[99px] w-[30px] h-[30px] bg-[#FDFDFD] rounded-full flex items-center justify-center">
          <ShoppingCart size={16} className="text-black" />
        </button>

        {showHeart && (
          <div className="absolute right-[9px] bottom-[-30px] flex items-center">
            <Heart size={14} className="text-[#767575]" />
          </div>
        )}
      </div>

      <div className="mt-[9px]">
        <p className="text-[14px] leading-[24px] text-[#474747] font-ubuntu">{product.name}</p>
        <div className="flex gap-[9px] items-center mt-[2px]">
          <span className="font-bold text-[16px] leading-[20px] text-[#00171F] font-ubuntu">
            ₦ {product.price.toLocaleString()}
          </span>
          <span className="text-[14px] leading-[20px] text-[#CD011C] line-through font-ubuntu">
            ₦ {product.originalPrice.toLocaleString()}
          </span>
        </div>
      </div>
    </div>
  )
}

