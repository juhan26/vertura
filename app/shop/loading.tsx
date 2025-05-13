import type React from "react"
import { CartProvider } from "@/context/cart-context"
// import "@/app/globals.css"

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div>
      <CartProvider>{children}</CartProvider>
    </div>
  )
}
