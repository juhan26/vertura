"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ShoppingBag, Heart, Menu, Search, User } from "lucide-react"
import Image from "next/image"
import { useCart } from "@/context/cart-context"
import CartSidebar from "@/components/cart-sidebar"
import ProductCard from "@/components/product-card"

// Sample product data
const products = [
  {
    id: 1,
    name: "Monte Carlo Boxy Tee - White",
    price: 169000,
    description: "Monaco Series",
    imageSrc: "/product.png",
  },
  // {
  //   id: 2,
  //   name: "VERTURA Culture Hoodie",
  //   price: 389000,
  //   description: "Premium Collection",
  //   imageSrc: "/product.png",
  // },
  // {
  //   id: 3,
  //   name: "VERTURA Urban Jacket",
  //   price: 459000,
  //   description: "New Arrival",
  //   imageSrc: "/product.png",
  // },
  // {
  //   id: 4,
  //   name: "VERTURA Essential Pants",
  //   price: 329000,
  //   description: "Bestseller",
  //   imageSrc: "/product.png",
  // },
]

export default function ShopPage() {
  // Initialize cart state with default values
  const initialCartState = {
    isCartOpen: false,
    setIsCartOpen: (isOpen: boolean) => {},
    totalItems: 0,
  }

  // Call the useCart hook unconditionally
  let cartState
  try {
    cartState = useCart()
  } catch (error) {
    console.error("Cart context not available:", error)
    cartState = initialCartState // Use default values if context is not available
  }

  const { isCartOpen, setIsCartOpen, totalItems } = cartState

  return (
    <div className="min-h-screen bg-white">
      {/* Cart Sidebar */}
      <CartSidebar />

      {/* Header */}
      <header className="border-b border-gray-200">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-6">
              <Menu className="h-6 w-6 md:hidden" />
              <Link href="/" className="flex items-center">
                <Image
                  src="/vertura.png"
                  alt="Vertura Logo"
                  width={240}
                  height={60}
                  className="h-14 w-auto object-contain invert"
                  priority
                />
              </Link>
            </div>

            <nav className="hidden md:flex items-center space-x-8">
              <Link href="/shop" className="text-sm font-medium hover:underline underline-offset-4">
                NEW ARRIVALS
              </Link>
              <Link href="/shop" className="text-sm font-medium hover:underline underline-offset-4">
                COLLECTIONS
              </Link>
              <Link href="/shop" className="text-sm font-medium hover:underline underline-offset-4">
                ABOUT
              </Link>
            </nav>

            <div className="flex items-center gap-4">
              <Search className="h-5 w-5" />
              <User className="h-5 w-5" />
              <Heart className="h-5 w-5" />
              <button className="relative" onClick={() => setIsCartOpen(true)}>
                <ShoppingBag className="h-5 w-5" />
                {totalItems > 0 && (
                  <span className="absolute -top-2 -right-2 bg-[#7EBDE6] text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                    {totalItems}
                  </span>
                )}
              </button>
            </div>
          </div>
        </div>
      </header>

      <section className="relative h-[70vh] bg-gray-100 flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="/banner.png"
            alt="Banner"
            layout="fill"
            objectFit="cover"
            className="w-full h-full"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0a0f1c]/70 to-transparent"></div>
        </div>
        <div className="relative z-10 text-white container mx-auto px-4">
          <div className="max-w-xl">
            <div className="inline-block px-4 py-1 border border-white text-white text-sm mb-4">PREMIUM COLLECTION</div>
            <h1 className="text-5xl md:text-7xl font-bold mb-4">WEAR THE CULTURE</h1>
            <p className="text-xl mb-8 text-white/80">RISE UP WITH A TWIST</p>
            <Button className="bg-white text-black hover:bg-gray-500 border-0 px-8 py-6 text-lg rounded-none">
              SHOP NOW
            </Button>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-12">
            <h2 className="text-3xl font-bold">NEW ARRIVALS</h2>
            <div className="hidden md:block">
              <Link
                href="/shop"
                className="text-gray-400 hover:text-gray-700 transition-all duration-300 ease-in-out font-medium"
              >
                View All Collections →
              </Link>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {products.map((product) => (
              <ProductCard
                key={product.id}
                id={product.id}
                name={product.name}
                price={product.price}
                description={product.description}
                imageSrc={product.imageSrc}
              />
            ))}
          </div>

          <div className="mt-16 text-center md:hidden">
            <Button className="bg-black text-white hover:bg-black/90 px-8 py-6 text-lg rounded-none">VIEW ALL</Button>
          </div>
        </div>
      </section>

      {/* Culture Section */}
      <section className="py-16 bg-[#0a0f1c] text-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">Our Cultural Heritage</h2>
              <p className="text-white/80 mb-6">
                VERTURA blends traditional craftsmanship with contemporary design. Each piece tells a story of cultural
                heritage and modern expression.
              </p>
              <p className="text-white/80 mb-8">
                Our premium fabrics and attention to detail create clothing that's not just worn, but experienced. Rise
                up with us and twist the ordinary into extraordinary.
              </p>
              <Button className="bg-white rounded-md text-black hover:bg-gray-500 border-0 px-8 py-4 text-lg">
                DISCOVER OUR STORY
              </Button>
            </div>
            <div className="relative">
              <div className="w-full h-[400px] rounded-lg shadow-2xl bg-gradient-to-br from-gray-700 to-gray-900 flex items-center justify-center">
                <span className="text-white/50">VERTURA Culture</span>
              </div>
              <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-amber-500 rounded-lg -z-10"></div>
              <div className="absolute -top-6 -right-6 w-32 h-32 border-2 border-amber-500 rounded-lg -z-10"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#0a0f1c] text-white py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center mb-4">
                <Image
                  src="/vertura.png"
                  alt="Vertura Logo"
                  width={240}
                  height={60}
                  className="h-14 w-auto object-contain"
                  priority
                />
              </div>
              <p className="text-gray-400">Wear the Culture. Rise Up With A Twist.</p>
            </div>

            <div>
              <h4 className="text-lg font-medium mb-4">Shop</h4>
              <ul className="space-y-2">
                <li>
                  <Link href="#" className="text-gray-400 hover:text-amber-500">
                    New Arrivals
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-gray-400 hover:text-amber-500">
                    Collections
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="text-lg font-medium mb-4">Company</h4>
              <ul className="space-y-2">
                <li>
                  <Link href="#" className="text-gray-400 hover:text-amber-500">
                    About Us
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-gray-400 hover:text-amber-500">
                    Sustainability
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-gray-400 hover:text-amber-500">
                    Careers
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-gray-400 hover:text-amber-500">
                    Contact
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="text-lg font-medium mb-4">Stay Connected</h4>
              <p className="text-gray-400 mb-4">Subscribe to our newsletter for exclusive updates and offers.</p>
              <div className="flex">
                <input
                  type="email"
                  placeholder="Your email"
                  className="bg-white/10 border-0 px-4 py-2 flex-grow focus:ring-amber-500 focus:border-amber-500"
                />
                <Button className="bg-white text-black hover:bg-gray-500 border-0 rounded-none">Subscribe</Button>
              </div>
            </div>
          </div>

          <div className="mt-12 pt-8 border-t border-gray-800 flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400">© {new Date().getFullYear()} VERTURA. All rights reserved.</p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <Link href="#" className="text-gray-400 hover:text-amber-500">
                Instagram
              </Link>
              <Link href="#" className="text-gray-400 hover:text-amber-500">
                Twitter
              </Link>
              <Link href="#" className="text-gray-400 hover:text-amber-500">
                Facebook
              </Link>
              <Link href="#" className="text-gray-400 hover:text-amber-500">
                TikTok
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
