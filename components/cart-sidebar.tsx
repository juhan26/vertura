"use client"

import { useCart } from "@/context/cart-context"
import { X, Plus, Minus, ShoppingBag } from "lucide-react"
import { Button } from "@/components/ui/button"
import { formatCurrency } from "@/lib/utils"
import Image from "next/image"

export default function CartSidebar() {
  const { items, removeItem, updateQuantity, isCartOpen, setIsCartOpen, totalItems, totalPrice } = useCart()

  const handleCheckout = () => {
    // Format the WhatsApp message
    let message = "Halo, saya ingin memesan produk berikut:\n\n"

    items.forEach((item, index) => {
      message += `${index + 1}. ${item.name}\n`
      message += `   Ukuran: ${item.size}\n`
      message += `   Harga: ${formatCurrency(item.price)}\n`
      message += `   Jumlah: ${item.quantity}\n`
      message += `   Subtotal: ${formatCurrency(item.price * item.quantity)}\n\n`
    })

    message += `Total: ${formatCurrency(totalPrice)}\n\n`
    message += "Mohon diproses. Terima kasih!"

    const encodedMessage = encodeURIComponent(message)

    const whatsappNumber = "6282266011860"

    window.open(`https://wa.me/${whatsappNumber}?text=${encodedMessage}`, "_blank")
  }

  if (!isCartOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/50" onClick={() => setIsCartOpen(false)} />

      {/* Cart sidebar */}
      <div className="relative w-full max-w-md bg-white h-full overflow-auto shadow-xl flex flex-col">
        <div className="p-4 border-b flex items-center justify-between">
          <h2 className="text-lg font-bold flex items-center">
            <ShoppingBag className="mr-2 h-5 w-5" />
            Keranjang Belanja
            {totalItems > 0 && (
              <span className="ml-2 text-sm bg-[#7EBDE6] text-white px-2 py-0.5 rounded-full">{totalItems}</span>
            )}
          </h2>
          <button onClick={() => setIsCartOpen(false)} className="p-1 rounded-full hover:bg-gray-100">
            <X className="h-5 w-5" />
          </button>
        </div>

        {items.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center p-4">
            <ShoppingBag className="h-16 w-16 text-gray-300 mb-4" />
            <p className="text-gray-500">Keranjang belanja Anda kosong</p>
            <Button className="mt-4 bg-[#7EBDE6] hover:bg-[#6ba9d2]" onClick={() => setIsCartOpen(false)}>
              Lanjutkan Belanja
            </Button>
          </div>
        ) : (
          <>
            <div className="flex-1 overflow-auto p-4">
              {items.map((item) => (
                <div key={`${item.id}-${item.size}`} className="flex border-b py-4">
                  <div className="w-20 h-20 bg-gray-200 mr-4 flex-shrink-0 relative overflow-hidden rounded">
                    {item.image === "product-1" ? (
                      <Image src="/product.png" alt={item.name} layout="fill" objectFit="cover" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-gray-200">
                        <span className="text-gray-500 text-xs">Product {item.id}</span>
                      </div>
                    )}
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between">
                      <h3 className="font-medium">{item.name}</h3>
                      <button
                        onClick={() => removeItem(item.id, item.size)}
                        className="text-gray-400 hover:text-red-500"
                      >
                        <X className="h-4 w-4" />
                      </button>
                    </div>
                    <p className="text-gray-500 text-sm">Ukuran: {item.size}</p>
                    <p className="text-[#7EBDE6] font-medium">{formatCurrency(item.price)}</p>
                    <div className="flex items-center mt-2">
                      <button
                        onClick={() => updateQuantity(item.id, item.size, item.quantity - 1)}
                        className="p-1 border rounded-l-md"
                        disabled={item.quantity <= 1}
                      >
                        <Minus className="h-3 w-3" />
                      </button>
                      <span className="px-3 py-1 border-t border-b">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.id, item.size, item.quantity + 1)}
                        className="p-1 border rounded-r-md"
                      >
                        <Plus className="h-3 w-3" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="border-t p-4">
              <div className="flex justify-between mb-2">
                <span>Subtotal</span>
                <span className="font-medium">{formatCurrency(totalPrice)}</span>
              </div>
              <Button className="w-full bg-[#7EBDE6] hover:bg-[#6ba9d2] py-6" onClick={handleCheckout}>
                Lanjutkan ke Pembayaran
              </Button>
              <p className="text-xs text-center mt-2 text-gray-500">
                Anda akan diarahkan ke WhatsApp untuk menyelesaikan pesanan
              </p>
            </div>
          </>
        )}
      </div>
    </div>
  )
}
