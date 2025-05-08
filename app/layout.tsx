"use client"

import type React from "react"
import { ChakraProvider } from "@chakra-ui/react"
import { Providers } from "@/store/provider"
import { theme } from "@/styles/theme"
import Navbar from "@/components/Navbar"

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
          <ChakraProvider theme={theme}>
            <Providers>
              <Navbar />
              {children}
            </Providers>
          </ChakraProvider>
      </body>
    </html>
  )
}
