"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { useCart, type CartItem } from "@/context/cart-context"
import { formatCurrency } from "@/lib/utils"
import { ShoppingBag } from "lucide-react"
import Image from "next/image"

type ProductCardProps = {
  id: number
  name: string
  price: number
  description: string
  imageSrc: string
}

export default function ProductCard({ id, name, price, description, imageSrc }: ProductCardProps) {
  const [selectedSize, setSelectedSize] = useState<string>("")
  const [showSizeError, setShowSizeError] = useState(false)
  const { addItem, setIsCartOpen } = useCart()

  const sizes = ["M", "L", "XL"]

  const handleAddToCart = () => {
    if (!selectedSize) {
      setShowSizeError(true)
      return
    }

    const item: CartItem = {
      id,
      name,
      price,
      size: selectedSize,
      image: `product-${id}`,
      quantity: 1,
    }

    addItem(item)
    setIsCartOpen(true)
    setShowSizeError(false)
  }

  return (
    <div className="group">
      <div className="relative overflow-hidden mb-4">
        <div className="w-full aspect-[3/4] bg-gray-100 flex items-center justify-center relative rounded">
          <Image src={imageSrc || "/placeholder.svg"} alt={name} layout="fill" objectFit="cover" className="rounded" />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        <Button
          variant="outline"
          className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-white opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          onClick={handleAddToCart}
        >
          Quick Add
        </Button>
      </div>

      <h3 className="text-lg font-medium">{name}</h3>
      <p className="text-gray-600 mb-2">{description}</p>
      <p className="font-bold text-gray-600 mb-3">{formatCurrency(price)}</p>

      <div className="mb-3">
        <p className="text-sm text-gray-600 mb-1">Ukuran:</p>
        <div className="flex gap-2">
          {sizes.map((size) => (
            <button
              key={size}
              className={`w-10 h-10 flex items-center justify-center border ${
                selectedSize === size
                  ? "border-[#7EBDE6] bg-[#7EBDE6]/10 text-[#7EBDE6]"
                  : "border-gray-300 hover:border-gray-400"
              }`}
              onClick={() => {
                setSelectedSize(size)
                setShowSizeError(false)
              }}
            >
              {size}
            </button>
          ))}
        </div>
        {showSizeError && <p className="text-red-500 text-xs mt-1">Silakan pilih ukuran</p>}
      </div>

      <Button
        className="w-full bg-[#7EBDE6] hover:bg-[#6ba9d2] flex items-center justify-center gap-2"
        onClick={handleAddToCart}
      >
        <ShoppingBag className="h-4 w-4" />
        Tambahkan ke Keranjang
      </Button>
    </div>
  )
}
