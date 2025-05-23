// app/layout.tsx
import type { Metadata } from 'next'
import './globals.css'
import { CartProviderClient } from '@/components/cart-provider-client'

export const metadata: Metadata = {
  title: 'Vertura',
  description: 'Wear the culture, rise up with a twist',
  generator: 'Vertura Development Team',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/logo2.png" type="image/png" />
      </head>
      <body>
        <CartProviderClient>{children}</CartProviderClient>
      </body>
    </html>
  )
}