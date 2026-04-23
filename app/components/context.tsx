'use client'
import { useState, createContext, ReactNode, useEffect } from "react"

export interface Product {
  id: number        // ← changed from string to number
  title: string
  price: number
  image: string
  description: string
  count: number
  rate: number
  category: string
}

interface CartContextType {
  cartItems: Product[]
  add: (product: Product) => void
  remove: (id: number) => void  // ← changed from string to number
}

export const CartContext = createContext<CartContextType | undefined>(undefined)

interface Props {
  children: ReactNode
}

export default function CartProvider({ children }: Props) {
  const [cartItems, setCartItems] = useState<Product[]>([])

  // Load cart from localStorage
  useEffect(() => {
    try {
      // ← guard against server-side rendering crash
      if (typeof window !== "undefined") {
        const storedCart = localStorage.getItem("cartItems")
        if (storedCart) {
          const parsed = JSON.parse(storedCart)
          if (Array.isArray(parsed)) setCartItems(parsed)
        }
      }
    } catch (error) {
      console.error(error)
    }
  }, [])

  // Save cart to localStorage
  useEffect(() => {
    if (typeof window !== "undefined") {  // ← guard here too
      localStorage.setItem("cartItems", JSON.stringify(cartItems))
    }
  }, [cartItems])

  // Prevent duplicate items
  const add = (newItem: Product) => {
    const alreadyInCart = cartItems.some(item => item.id === newItem.id)
    if (!alreadyInCart) {
      setCartItems([...cartItems, newItem])
    }
  }

  const remove = (idToRemove: number) => {  // ← changed from string to number
    setCartItems(cartItems.filter(item => item.id !== idToRemove))
  }

  return (
    <CartContext.Provider value={{ cartItems, add, remove }}>
      {children}
    </CartContext.Provider>
  )
}