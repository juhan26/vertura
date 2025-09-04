// components/product-card.tsx
"use client"

import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { useCart } from "@/context/cart-context"

interface ProductCardProps {
  id: number
  name: string
  price: number 
  description: string
  imageSrc: string
  color: string
}

export default function ProductCard({ id, name, price, description, imageSrc, color }: ProductCardProps) {
  const { addItem, setIsCartOpen } = useCart()

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    addItem({
      id,
      name,
      price,
      size: 'M',
      imageSrc: imageSrc || "/placeholder-image.jpg", // Berikan fallback
      quantity: 1,
      color
    })
    // Buka sidebar cart otomatis
    setIsCartOpen(true)
  }

  return (
    <Link href={`/product/${id}`} className="group">
      <div className="relative overflow-hidden">
        <Image
          src={imageSrc || "/placeholder-image.jpg"} // Berikan fallback
          alt={name}
          width={300}
          height={400}
          className="w-full h-auto object-cover transition-transform duration-300 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-10 transition-all duration-300" />
        <Button
          onClick={handleAddToCart}
          className="absolute bottom-4 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black text-white hover:bg-gray-800 rounded-none px-8"
        >
          Add to Cart
        </Button>
      </div>
      <div className="mt-4">
        <h3 className="font-medium text-lg mb-1">{name}</h3>
        <p className="text-gray-600 text-sm mb-2">{description}</p>
        <p className="font-bold">Rp {price.toLocaleString('id-ID')}</p>
      </div>
    </Link>
  )
}