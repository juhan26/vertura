"use client"

import { useState, use, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight, Heart, Share, Star, Truck, Shield, ArrowLeft, X, Camera } from "lucide-react" // Tambahkan X dan Camera
import { useCart } from "@/context/cart-context"
import CartSidebar from "@/components/cart-sidebar"

interface ProductImage {
  id: number
  src: string
  alt: string
}

interface ProductSize {
  id: string
  label: string
}

interface ProductColor {
  id: string
  name: string
  hex: string
}

const productImages: ProductImage[] = [
  { id: 1, src: "/front.jpeg", alt: "Monte Carlo Boxy Tee - Front View" },
  { id: 2, src: "/back.jpeg", alt: "Monte Carlo Boxy Tee - Back View" },
  { id: 3, src: "/model-gean.jpg", alt: "Monte Carlo Boxy Tee - Model View" },
  { id: 4, src: "/mayang-pintu.jpg", alt: "Monte Carlo Boxy Tee - Model View" },
  { id: 5, src: "/rani-tiang.jpg", alt: "Monte Carlo Boxy Tee - Model View" },

]

const sizes: ProductSize[] = [
  { id: "M", label: "M" },
  { id: "L", label: "L" },
  { id: "XL", label: "XL" },
]

const colors: ProductColor[] = [
  { id: "white", name: "White", hex: "#ffffff" },
]

export default function ProductDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params)
  const [selectedImage, setSelectedImage] = useState(0)
  const [selectedSize, setSelectedSize] = useState("M")
  const [selectedColor, setSelectedColor] = useState("white")
  const [quantity, setQuantity] = useState(1)
  const [isImageModalOpen, setIsImageModalOpen] = useState(false) // State untuk modal gambar
  const [currentImageIndex, setCurrentImageIndex] = useState(0) // State untuk indeks gambar saat ini di modal

  const { addItem, setIsCartOpen } = useCart()

  const nextImage = () => {
    setSelectedImage((prev) => (prev === productImages.length - 1 ? 0 : prev + 1))
  }

  const prevImage = () => {
    setSelectedImage((prev) => (prev === 0 ? productImages.length - 1 : prev - 1))
  }

  const increaseQuantity = () => {
    setQuantity((prev) => prev + 1)
  }

  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity((prev) => prev - 1)
    }
  }

  const handleAddToCart = () => {
    addItem({
      id: parseInt(id),
      name: "Monte Carlo Boxy Tee",
      price: 169000,
      imageSrc: "/front.jpeg",
      quantity: quantity,
      size: selectedSize,
      color: selectedColor
    })
    setIsCartOpen(true)
  }

  // Fungsi untuk membuka modal gambar
  const openImageModal = (index: number) => {
    setCurrentImageIndex(index)
    setIsImageModalOpen(true)
  }

  // Fungsi untuk menutup modal gambar
  const closeImageModal = () => {
    setIsImageModalOpen(false)
  }

  // Fungsi untuk navigasi gambar di modal
  const navigateImage = (direction: 'prev' | 'next') => {
    if (direction === 'prev') {
      setCurrentImageIndex(prev => prev > 0 ? prev - 1 : productImages.length - 1)
    } else {
      setCurrentImageIndex(prev => prev < productImages.length - 1 ? prev + 1 : 0)
    }
  }

  // Handle keyboard navigation untuk modal gambar
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isImageModalOpen) return

      if (e.key === 'ArrowLeft') {
        navigateImage('prev')
      } else if (e.key === 'ArrowRight') {
        navigateImage('next')
      } else if (e.key === 'Escape') {
        closeImageModal()
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isImageModalOpen])

  // Function to handle image loading errors
  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    const target = e.target as HTMLImageElement;
    target.style.display = 'none';

    // Create and show error message
    const errorDiv = document.createElement('div');
    errorDiv.className = 'w-full h-full bg-gray-200 flex items-center justify-center text-gray-500 text-xs p-2';
    errorDiv.textContent = 'Image not available';

    target.parentNode?.appendChild(errorDiv);
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Cart Sidebar */}
      <CartSidebar />

      {/* Image Preview Modal */}
      {isImageModalOpen && (
        <div className="fixed inset-0 bg-black z-50 flex items-center justify-center p-0 md:p-4">
          <div className="relative w-full h-full flex flex-col">
            {/* Top Bar - Mobile Only */}
            <div className="md:hidden flex items-center justify-between p-4 bg-black/80 text-white z-10">
              <span className="text-sm">
                {currentImageIndex + 1} / {productImages.length}
              </span>
              <button
                onClick={closeImageModal}
                className="p-2 rounded-full bg-black/50"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Main Image Container */}
            <div className="flex-1 relative flex items-center justify-center">
              {/* Navigation Buttons - Desktop */}
              <button
                onClick={() => navigateImage('prev')}
                className="hidden md:flex absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-4 rounded-full transition-all z-10"
              >
                <ChevronLeft className="h-6 w-6" />
              </button>

              <button
                onClick={() => navigateImage('next')}
                className="hidden md:flex absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-4 rounded-full transition-all z-10"
              >
                <ChevronRight className="h-6 w-6" />
              </button>

              {/* Close Button - Desktop */}
              <button
                onClick={closeImageModal}
                className="hidden md:flex absolute top-4 right-4 bg-black/50 hover:bg-black/70 text-white p-3 rounded-full transition-all z-10"
              >
                <X className="h-5 w-5" />
              </button>

              {/* Image */}
              <div className="w-full h-full flex items-center justify-center p-4">
                <div className="relative w-full h-full max-w-6xl max-h-full">
                  <Image
                    src={productImages[currentImageIndex].src}
                    alt={productImages[currentImageIndex].alt}
                    fill
                    className="object-contain"
                    onError={handleImageError}
                  />
                </div>
              </div>

              {/* Mobile Swipe Area - Invisible touch targets */}
              <div className="md:hidden absolute inset-0 flex">
                <div
                  className="flex-1"
                  onClick={() => navigateImage('prev')}
                />
                <div
                  className="flex-1"
                  onClick={() => navigateImage('next')}
                />
              </div>
            </div>

            {/* Bottom Info Bar */}
            <div className="bg-black/80 text-white p-4 z-10">
              <div className="max-w-4xl mx-auto">
                <p className="text-center font-medium mb-1">{productImages[currentImageIndex].alt}</p>
                <div className="flex items-center justify-center gap-4 text-sm text-gray-300">
                  <span className="hidden md:inline">
                    {currentImageIndex + 1} of {productImages.length}
                  </span>
                </div>
              </div>
            </div>

            {/* Mobile Navigation Dots */}
            <div className="md:hidden flex justify-center gap-2 p-4 bg-black/80">
              {productImages.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentImageIndex(index)}
                  className={`w-2 h-2 rounded-full transition-all ${index === currentImageIndex ? 'bg-white' : 'bg-gray-500'
                    }`}
                />
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Header */}
      <header className="border-b border-gray-200 sticky top-0 bg-white z-10">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link href="/shop" className="flex items-center text-gray-600 hover:text-black">
              <ArrowLeft className="h-5 w-5 mr-2" />
              Back to Shop
            </Link>
            <div className="flex items-center gap-4">
              <button className="p-2 rounded-full hover:bg-gray-100">
                <Share className="h-5 w-5" />
              </button>
              <button className="p-2 rounded-full hover:bg-gray-100">
                <Heart className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Product Gallery */}
          <div className="relative">
            {/* Main Image */}
            <div
              className="relative aspect-square overflow-hidden rounded-lg bg-gray-100 mb-4 cursor-zoom-in"
              onClick={() => openImageModal(selectedImage)}
            >
              <Image
                src={productImages[selectedImage].src}
                alt={productImages[selectedImage].alt}
                fill
                className="object-cover"
                onError={handleImageError}
              />

              {/* Navigation Arrows */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  prevImage();
                }}
                className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white p-2 rounded-full transition-all"
              >
                <ChevronLeft className="h-6 w-6" />
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  nextImage();
                }}
                className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white p-2 rounded-full transition-all"
              >
                <ChevronRight className="h-6 w-6" />
              </button>

              {/* Image Indicator */}
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2">
                {productImages.map((_, index) => (
                  <button
                    key={index}
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedImage(index);
                    }}
                    className={`w-2 h-2 rounded-full ${index === selectedImage ? "bg-white" : "bg-white/50"
                      }`}
                  />
                ))}
              </div>

              {/* Zoom Indicator */}
              <div className="absolute top-4 right-4 bg-black/50 backdrop-blur-sm text-white px-3 py-1 rounded-full text-xs flex items-center gap-2">
                <Camera className="h-3 w-3" />
                Click to zoom
              </div>
            </div>

            {/* Thumbnail Gallery */}
            <div className="grid grid-cols-5 gap-2">
              {productImages.map((image, index) => (
                <button
                  key={image.id}
                  onClick={() => setSelectedImage(index)}
                  className={`aspect-square relative overflow-hidden rounded-md border-2 ${index === selectedImage ? "border-black" : "border-transparent"
                    }`}
                >
                  <Image
                    src={image.src}
                    alt={image.alt}
                    fill
                    className="object-cover"
                    onError={handleImageError}
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div>
            <div className="mb-6">
              <h1 className="text-3xl font-bold mb-2">Monte Carlo Boxy Tee</h1>
              <p className="text-gray-600 mb-4">Monaco Series - Premium Cotton Box Fit T-Shirt</p>

              {/* Rating */}
              <div className="flex items-center mb-4">
                <div className="flex text-amber-400">
                  <Star className="h-4 w-4 fill-current" />
                  <Star className="h-4 w-4 fill-current" />
                  <Star className="h-4 w-4 fill-current" />
                  <Star className="h-4 w-4 fill-current" />
                  <Star className="h-4 w-4" />
                </div>
                <span className="text-gray-500 text-sm ml-2">(142 reviews)</span>
              </div>

              {/* Price */}
              <div className="flex items-center mb-6">
                <span className="text-2xl font-bold">Rp 169.000</span>
                <span className="text-gray-400 line-through ml-2">Rp 199.000</span>
                <span className="bg-red-100 text-red-600 text-sm font-medium px-2 py-1 rounded ml-3">15% OFF</span>
              </div>
            </div>

            {/* Color Selection */}
            <div className="mb-6">
              <h3 className="text-sm font-medium mb-3">Color: {colors.find(c => c.id === selectedColor)?.name}</h3>
              <div className="flex space-x-3">
                {colors.map((color) => (
                  <button
                    key={color.id}
                    onClick={() => setSelectedColor(color.id)}
                    className={`w-10 h-10 rounded-full border-2 flex items-center justify-center ${selectedColor === color.id ? "border-black" : "border-gray-300"
                      }`}
                  >
                    <div
                      className="w-8 h-8 rounded-full"
                      style={{ backgroundColor: color.hex }}
                    ></div>
                  </button>
                ))}
              </div>
            </div>

            {/* Size Selection */}
            <div className="mb-6">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-sm font-medium">Size</h3>
                <button className="text-sm text-blue-600 hover:underline">Size Guide</button>
              </div>
              <div className="grid grid-cols-4 gap-2">
                {sizes.map((size) => (
                  <button
                    key={size.id}
                    onClick={() => setSelectedSize(size.id)}
                    className={`py-3 text-center rounded-md border ${selectedSize === size.id
                      ? "border-black bg-black text-white"
                      : "border-gray-300 hover:border-gray-400"
                      }`}
                  >
                    {size.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity */}
            <div className="mb-6">
              <h3 className="text-sm font-medium mb-3">Quantity</h3>
              <div className="flex items-center w-32">
                <button
                  onClick={decreaseQuantity}
                  className="w-10 h-10 flex items-center justify-center border border-gray-300 rounded-l-md"
                >
                  -
                </button>
                <div className="flex-1 h-10 flex items-center justify-center border-t border-b border-gray-300">
                  {quantity}
                </div>
                <button
                  onClick={increaseQuantity}
                  className="w-10 h-10 flex items-center justify-center border border-gray-300 rounded-r-md"
                >
                  +
                </button>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex space-x-4 mb-8">
              <Button
                onClick={handleAddToCart}
                className="flex-1 py-3 bg-white border border-black text-black hover:bg-gray-100 rounded-md"
              >
                Add to Cart
              </Button>
              <Button className="flex-1 py-3 bg-black text-white hover:bg-gray-800 rounded-md">
                Buy Now
              </Button>
            </div>

            {/* Delivery Info */}
            <div className="border rounded-lg p-4 mb-6">
              <div className="flex items-start mb-4">
                <Truck className="h-5 w-5 text-gray-600 mr-3 mt-0.5" />
                <div>
                  <p className="font-medium">Free Delivery</p>
                  <p className="text-sm text-gray-600">Enter your postal code for delivery availability</p>
                </div>
              </div>
              <div className="flex items-start">
                <Shield className="h-5 w-5 text-gray-600 mr-3 mt-0.5" />
                <div>
                  <p className="font-medium">Return & Exchange</p>
                  <p className="text-sm text-gray-600">Free 30-day returns and exchanges</p>
                </div>
              </div>
            </div>

            {/* Product Details */}
            <div>
              <h3 className="text-lg font-medium mb-3">Product Details</h3>
              <ul className="text-sm text-gray-600 space-y-2">
                <li>• Premium 100% cotton fabric</li>
                <li>• Cotton Combed 20s – breathable and comfortable</li>
                <li>• Box fit design for a modern silhouette</li>
                <li>• Rib 6cm on collar for durability and fit</li>
                <li>• Double-stitched seams for durability</li>
                <li>• Plastisol curing screen printing technique</li>
                <li>• Printed label tag for comfort</li>
                <li>• Bottom tag with baby terry material</li>
                <li>• Ribbed collar maintains shape wash after wash</li>
                <li>• Made with eco-friendly processes</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Product Description Section */}
        <div className="mt-16 border-t pt-8">
          <h2 className="text-2xl font-bold mb-6">Product Description</h2>
          <div className="prose max-w-none">
            <p className="text-gray-700 mb-4">
              The Monte Carlo Boxy Tee from our Monaco Series redefines casual luxury. Designed with a contemporary
              boxy fit, this premium t-shirt offers both comfort and style with its relaxed silhouette.
            </p>
            <p className="text-gray-700 mb-4">
              Crafted from 100% high-quality cotton, using Cotton Combed 20s for a soft yet durable texture.
              The 6cm rib on the collar ensures shape retention, while plastisol curing screen printing gives
              vibrant and long-lasting graphics. A printed label tag inside and a bottom baby terry tag
              add subtle premium touches.
            </p>
            <p className="text-gray-700">
              Whether you're dressing it up with tailored trousers or keeping it casual with jeans, the Monte Carlo
              Boxy Tee delivers versatile style that transitions seamlessly from day to night. This essential piece
              embodies the VERTURA philosophy of blending cultural heritage with modern design.
            </p>
          </div>
        </div>


        {/* Reviews Section */}
        <div className="mt-16 border-t pt-8">
          <h2 className="text-2xl font-bold mb-6">Customer Reviews</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Review Summary */}
            <div className="bg-gray-50 p-6 rounded-lg">
              <div className="text-center mb-4">
                <div className="text-4xl font-bold mb-2">4.2</div>
                <div className="flex justify-center text-amber-400">
                  <Star className="h-5 w-5 fill-current" />
                  <Star className="h-5 w-5 fill-current" />
                  <Star className="h-5 w-5 fill-current" />
                  <Star className="h-5 w-5 fill-current" />
                  <Star className="h-5 w-5" />
                </div>
                <div className="text-gray-600 text-sm mt-2">Based on 142 reviews</div>
              </div>
            </div>

            {/* Review List */}
            <div className="md:col-span-2">
              <div className="space-y-6">
                {/* Sample Review */}
                <div className="border-b pb-6">
                  <div className="flex items-center mb-2">
                    <div className="flex text-amber-400 mr-2">
                      <Star className="h-4 w-4 fill-current" />
                      <Star className="h-4 w-4 fill-current" />
                      <Star className="h-4 w-4 fill-current" />
                      <Star className="h-4 w-4 fill-current" />
                      <Star className="h-4 w-4 fill-current" />
                    </div>
                    <span className="text-sm text-gray-500">2 days ago</span>
                  </div>
                  <h4 className="font-medium mb-2">Perfect fit and quality!</h4>
                  <p className="text-gray-600 text-sm">
                    The boxy fit is exactly what I was looking for. The fabric is thick and feels premium. Definitely worth the price!
                  </p>
                  <div className="text-xs text-gray-500 mt-2">By Alex Johnson</div>
                </div>

                {/* Another Sample Review */}
                <div className="border-b pb-6">
                  <div className="flex items-center mb-2">
                    <div className="flex text-amber-400 mr-2">
                      <Star className="h-4 w-4 fill-current" />
                      <Star className="h-4 w-4 fill-current" />
                      <Star className="h-4 w-4 fill-current" />
                      <Star className="h-4 w-4 fill-current" />
                      <Star className="h-4 w-4" />
                    </div>
                    <span className="text-sm text-gray-500">1 week ago</span>
                  </div>
                  <h4 className="font-medium mb-2">Great material, runs slightly large</h4>
                  <p className="text-gray-600 text-sm">
                    Love the quality of the fabric, but I would recommend sizing down if you prefer a more fitted look. The boxy cut is quite roomy.
                  </p>
                  <div className="text-xs text-gray-500 mt-2">By Sarah Miller</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}