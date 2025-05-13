// components/cart-provider-client.tsx
"use client"

import type React from "react"
import { CartProvider as CartContextProvider } from "@/context/cart-context"

export function CartProviderClient({ children }: { children: React.ReactNode }) {
  return <CartContextProvider>{children}</CartContextProvider>
}