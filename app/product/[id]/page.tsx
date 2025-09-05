"use client"

import { useState, use, useEffect } from "react"
import Link from "next/link"
import Image, { StaticImageData } from "next/image"
import foto1 from "@/public/front.jpeg"
import foto2 from "@/public/back.jpeg"
import foto3 from "@/public/model-gean.jpg"
import foto4 from "@/public/mayang-pintu.jpg"
import foto5 from "@/public/rani-tiang.jpg"
import sizeGuideImage from "@/public/size-chart.jpg"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight, Heart, Share, Star, Truck, Shield, ArrowLeft, X, Camera, Ruler } from "lucide-react"
import { useCart } from "@/context/cart-context"
import CartSidebar from "@/components/cart-sidebar"

interface ProductImage {
  id: number
  src: StaticImageData
  alt: string
}

interface ProductSize {
  id: string
  label: string
  stock: number
}

interface ProductColor {
  id: string
  name: string
  hex: string
}

const productImages: ProductImage[] = [
  { id: 1, src: foto1, alt: "Monte Carlo Boxy Tee - Front View" },
  { id: 2, src: foto2, alt: "Monte Carlo Boxy Tee - Back View" },
  { id: 3, src: foto3, alt: "Monte Carlo Boxy Tee - Model View" },
  { id: 4, src: foto4, alt: "Monte Carlo Boxy Tee - Model View" },
  { id: 5, src: foto5, alt: "Monte Carlo Boxy Tee - Model View" },
]

const sizes: ProductSize[] = [
  { id: "M", label: "M", stock: 0 },
  { id: "L", label: "L", stock: 5 },
  { id: "XL", label: "XL", stock: 15 },
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
  const [isImageModalOpen, setIsImageModalOpen] = useState(false)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [isSizeGuideOpen, setIsSizeGuideOpen] = useState(false)

  const { addItem, setIsCartOpen } = useCart()

  // Cek status stok
  const isProductSoldOut = sizes.every(size => size.stock === 0)
  const isSelectedSizeSoldOut = sizes.find(size => size.id === selectedSize)?.stock === 0
  const selectedSizeStock = sizes.find(size => size.id === selectedSize)?.stock || 0

  const nextImage = () => {
    setSelectedImage((prev) => (prev === productImages.length - 1 ? 0 : prev + 1))
  }

  const prevImage = () => {
    setSelectedImage((prev) => (prev === 0 ? productImages.length - 1 : prev - 1))
  }

  const increaseQuantity = () => {
    if (quantity < selectedSizeStock) {
      setQuantity((prev) => prev + 1)
    }
  }

  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity((prev) => prev - 1)
    }
  }

  const handleAddToCart = () => {
    if (isSelectedSizeSoldOut) return
    
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

  const openImageModal = (index: number) => {
    setCurrentImageIndex(index)
    setIsImageModalOpen(true)
  }

  const closeImageModal = () => {
    setIsImageModalOpen(false)
  }

  const openSizeGuide = () => {
    setIsSizeGuideOpen(true)
  }

  const closeSizeGuide = () => {
    setIsSizeGuideOpen(false)
  }

  const navigateImage = (direction: 'prev' | 'next') => {
    if (direction === 'prev') {
      setCurrentImageIndex(prev => prev > 0 ? prev - 1 : productImages.length - 1)
    } else {
      setCurrentImageIndex(prev => prev < productImages.length - 1 ? prev + 1 : 0)
    }
  }

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (isImageModalOpen) {
        if (e.key === 'ArrowLeft') {
          navigateImage('prev')
        } else if (e.key === 'ArrowRight') {
          navigateImage('next')
        } else if (e.key === 'Escape') {
          closeImageModal()
        }
      }
      if (isSizeGuideOpen && e.key === 'Escape') {
        closeSizeGuide()
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isImageModalOpen, isSizeGuideOpen])

  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    const target = e.target as HTMLImageElement;
    target.style.display = 'none';

    const errorDiv = document.createElement('div');
    errorDiv.className = 'w-full h-full bg-gray-200 flex items-center justify-center text-gray-500 text-xs p-2';
    errorDiv.textContent = 'Image not available';

    target.parentNode?.appendChild(errorDiv);
  };

  return (
    <div className="min-h-screen bg-white">
      <CartSidebar />

      {/* Sold Out Overlay */}
      {isProductSoldOut && (
        <div className="fixed inset-0 bg-black bg-opacity-70 z-40 flex items-center justify-center pointer-events-none">
          <div className="bg-white px-6 py-3 rounded-full">
            <span className="text-black font-bold text-lg">SOLD OUT</span>
          </div>
        </div>
      )}

      {/* Image Preview Modal */}
      {isImageModalOpen && (
        <div className="fixed inset-0 bg-black z-50 flex items-center justify-center p-0 md:p-4">
          <div className="relative w-full h-full flex flex-col">
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

            <div className="flex-1 relative flex items-center justify-center">
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

              <button
                onClick={closeImageModal}
                className="hidden md:flex absolute top-4 right-4 bg-black/50 hover:bg-black/70 text-white p-3 rounded-full transition-all z-10"
              >
                <X className="h-5 w-5" />
              </button>

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

      {/* Size Guide Modal */}
      {isSizeGuideOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center p-4">
          <div className="relative bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-hidden">
            <div className="flex items-center justify-between p-4 border-b">
              <h2 className="text-xl font-bold">Size Guide</h2>
              <button
                onClick={closeSizeGuide}
                className="p-2 rounded-full hover:bg-gray-100 transition-colors"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="p-6 overflow-y-auto max-h-[calc(90vh-100px)]">
              <div className="relative aspect-[4/5] mx-auto max-w-md">
                <Image
                  src={sizeGuideImage}
                  alt="Size Guide untuk Monte Carlo Boxy Tee"
                  fill
                  className="object-contain"
                  onError={handleImageError}
                />
              </div>

              <div className="mt-8">
                <h3 className="text-lg font-semibold mb-4">Size Chart Boxy Tee (in cm)</h3>
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse">
                    <thead>
                      <tr className="bg-gray-100">
                        <th className="border p-3 text-left">Size</th>
                        <th className="border p-3 text-center">Length (L)</th>
                        <th className="border p-3 text-center">Width (W)</th>
                        <th className="border p-3 text-center">Chest Width</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td className="border p-3 font-medium">M</td>
                        <td className="border p-3 text-center">66</td>
                        <td className="border p-3 text-center">58</td>
                        <td className="border p-3 text-center">52</td>
                      </tr>
                      <tr className="bg-gray-50">
                        <td className="border p-3 font-medium">L</td>
                        <td className="border p-3 text-center">68</td>
                        <td className="border p-3 text-center">60</td>
                        <td className="border p-3 text-center">54</td>
                      </tr>
                      <tr>
                        <td className="border p-3 font-medium">XL</td>
                        <td className="border p-3 text-center">70</td>
                        <td className="border p-3 text-center">62</td>
                        <td className="border p-3 text-center">56</td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                  <h4 className="font-semibold text-blue-800 mb-2">Cara Mengukur:</h4>
                  <ul className="text-sm text-blue-700 space-y-1">
                    <li>• <strong>Length (L)</strong>: Ukur dari bahu teratas hingga ujung baju</li>
                    <li>• <strong>Width (W)</strong>: Lebar baju dari ketiak ke ketiak (dilipat dua)</li>
                    <li>• <strong>Chest Width</strong>: Lingkar dada terlebar (ukuran badan)</li>
                  </ul>
                </div>
              </div>

              <div className="mt-8">
                <h3 className="text-lg font-semibold mb-4">Rekomendasi Ukuran</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-green-50 p-4 rounded-lg">
                    <h4 className="font-semibold text-green-800 mb-2">Untuk Pria</h4>
                    <ul className="text-sm text-green-700 space-y-1">
                      <li>• <strong>M</strong>: Tinggi 160-170cm, Berat 55-65kg</li>
                      <li>• <strong>L</strong>: Tinggi 170-175cm, Berat 65-75kg</li>
                      <li>• <strong>XL</strong>: Tinggi 175-180cm, Berat 75-85kg</li>
                    </ul>
                  </div>
                  <div className="bg-purple-50 p-4 rounded-lg">
                    <h4 className="font-semibold text-purple-800 mb-2">Untuk Wanita</h4>
                    <ul className="text-sm text-purple-700 space-y-1">
                      <li>• <strong>M</strong>: Tinggi 155-165cm, Oversize fit</li>
                      <li>• <strong>L</strong>: Tinggi 165-170cm, Very oversize</li>
                      <li>• <strong>XL</strong>: Tinggi 170cm+, Extra oversize</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-4 border-t bg-gray-50 flex justify-end">
              <Button onClick={closeSizeGuide} className="bg-black hover:bg-gray-800">
                Close
              </Button>
            </div>
          </div>
        </div>
      )}

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
            {/* Sold Out Badge */}
            {isProductSoldOut && (
              <div className="absolute top-4 left-4 z-10 bg-red-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                SOLD OUT
              </div>
            )}

            {/* Main Image dengan overlay sold out */}
            <div
              className={`relative aspect-square overflow-hidden rounded-lg bg-gray-100 mb-4 ${isProductSoldOut ? 'cursor-not-allowed grayscale' : 'cursor-zoom-in'}`}
              onClick={() => !isProductSoldOut && openImageModal(selectedImage)}
            >
              <Image
                src={productImages[selectedImage].src}
                alt={productImages[selectedImage].alt}
                fill
                className={`object-cover ${isProductSoldOut ? 'opacity-70' : ''}`}
                onError={handleImageError}
              />

              {!isProductSoldOut && (
                <>
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

                  <div className="absolute top-4 right-4 bg-black/50 backdrop-blur-sm text-white px-3 py-1 rounded-full text-xs flex items-center gap-2">
                    <Camera className="h-3 w-3" />
                    Click to zoom
                  </div>
                </>
              )}
            </div>

            {/* Thumbnail Gallery */}
            <div className="grid grid-cols-5 gap-2">
              {productImages.map((image, index) => (
                <button
                  key={image.id}
                  onClick={() => !isProductSoldOut && setSelectedImage(index)}
                  className={`aspect-square relative overflow-hidden rounded-md border-2 ${index === selectedImage ? "border-black" : "border-transparent"
                    } ${isProductSoldOut ? 'cursor-not-allowed grayscale' : ''}`}
                  disabled={isProductSoldOut}
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
                <span className="text-gray-500 text-sm ml-2">(16 reviews)</span>
              </div>

              {/* Price */}
              <div className="flex items-center mb-6">
                <span className="text-2xl font-bold">Rp 169.000</span>
                <span className="text-gray-400 line-through ml-2">Rp 199.000</span>
                <span className="bg-red-100 text-red-600 text-sm font-medium px-2 py-1 rounded ml-3">15% OFF</span>
              </div>
            </div>

            {/* Stock Status */}
            {isProductSoldOut ? (
              <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
                <p className="text-red-700 font-medium">Produk ini sedang habis. Silakan cek kembali nanti.</p>
              </div>
            ) : isSelectedSizeSoldOut ? (
              <div className="mb-6 p-4 bg-amber-50 border border-amber-200 rounded-lg">
                <p className="text-amber-700 font-medium">Ukuran {selectedSize} sedang habis.</p>
              </div>
            ) : (
              <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg">
                <p className="text-green-700 font-medium">
                  Stok tersisa: {selectedSizeStock} untuk ukuran {selectedSize}
                </p>
              </div>
            )}

            {/* Color Selection */}
            <div className="mb-6">
              <h3 className="text-sm font-medium mb-3">Color: {colors.find(c => c.id === selectedColor)?.name}</h3>
              <div className="flex space-x-3">
                {colors.map((color) => (
                  <button
                    key={color.id}
                    onClick={() => !isProductSoldOut && setSelectedColor(color.id)}
                    className={`w-10 h-10 rounded-full border-2 flex items-center justify-center ${selectedColor === color.id ? "border-black" : "border-gray-300"
                      } ${isProductSoldOut ? 'cursor-not-allowed opacity-50' : ''}`}
                    disabled={isProductSoldOut}
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
                <button
                  onClick={openSizeGuide}
                  className="text-sm text-blue-600 hover:underline flex items-center"
                >
                  <Ruler className="h-4 w-4 mr-1" />
                  Size Guide
                </button>
              </div>
              <div className="grid grid-cols-4 gap-2">
                {sizes.map((size) => (
                  <button
                    key={size.id}
                    onClick={() => !isProductSoldOut && setSelectedSize(size.id)}
                    className={`py-3 text-center rounded-md border ${selectedSize === size.id
                      ? size.stock === 0
                        ? "border-red-300 bg-red-100 text-red-400 cursor-not-allowed"
                        : "border-black bg-black text-white"
                      : size.stock === 0
                        ? "border-gray-200 bg-gray-100 text-gray-400 cursor-not-allowed"
                        : "border-gray-300 hover:border-gray-400"
                      }`}
                    disabled={isProductSoldOut || size.stock === 0}
                  >
                    {size.label}
                    {size.stock === 0 && (
                      <span className="block text-xs mt-1">Habis</span>
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity */}
            {!isProductSoldOut && !isSelectedSizeSoldOut && (
              <div className="mb-6">
                <h3 className="text-sm font-medium mb-3">Quantity</h3>
                <div className="flex items-center w-32">
                  <button
                    onClick={decreaseQuantity}
                    className="w-10 h-10 flex items-center justify-center border border-gray-300 rounded-l-md disabled:opacity-50 disabled:cursor-not-allowed"
                    disabled={quantity <= 1}
                  >
                    -
                  </button>
                  <div className="flex-1 h-10 flex items-center justify-center border-t border-b border-gray-300">
                    {quantity}
                  </div>
                  <button
                    onClick={increaseQuantity}
                    className="w-10 h-10 flex items-center justify-center border border-gray-300 rounded-r-md disabled:opacity-50 disabled:cursor-not-allowed"
                    disabled={quantity >= selectedSizeStock}
                  >
                    +
                  </button>
                </div>
                <p className="text-xs text-gray-500 mt-2">
                  Maksimal: {selectedSizeStock} pcs
                </p>
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex space-x-4 mb-8">
              <Button
                onClick={handleAddToCart}
                className="flex-1 py-3 bg-white border border-black text-black hover:bg-gray-100 rounded-md disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={isProductSoldOut || isSelectedSizeSoldOut}
              >
                {isProductSoldOut ? 'Sold Out' : isSelectedSizeSoldOut ? 'Size Sold Out' : 'Add to Cart'}
              </Button>
              <Button 
                className="flex-1 py-3 bg-black text-white hover:bg-gray-800 rounded-md disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={isProductSoldOut || isSelectedSizeSoldOut}
              >
                {isProductSoldOut ? 'Sold Out' : 'Buy Now'}
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
                <div className="text-gray-600 text-sm mt-2">Based on 16 reviews</div>
              </div>
            </div>

            <div className="md:col-span-2">
              <div className="space-y-6">
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