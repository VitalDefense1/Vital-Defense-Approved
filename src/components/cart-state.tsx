"use client"

import {
  createContext,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react"

export type CartItem = {
  id: string
  title: string
  price: number
  qty: number
}

type CartContextValue = {
  items: CartItem[]
  count: number
  subtotal: number
  addItem: (item: { id: string; title: string; price: number }) => void
  removeItem: (id: string) => void
}

const CartContext = createContext<CartContextValue | null>(null)

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([])

  const value = useMemo<CartContextValue>(() => {
    const count = items.reduce((sum, item) => sum + item.qty, 0)
    const subtotal = items.reduce((sum, item) => sum + item.price * item.qty, 0)
    return {
      items,
      count,
      subtotal,
      addItem(item) {
        setItems((current) => {
          const existing = current.find((line) => line.id === item.id)
          if (!existing) return [...current, { ...item, qty: 1 }]
          return current.map((line) =>
            line.id === item.id ? { ...line, qty: line.qty + 1 } : line,
          )
        })
      },
      removeItem(id) {
        setItems((current) => current.filter((line) => line.id !== id))
      },
    }
  }, [items])

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}

export function useCart() {
  const value = useContext(CartContext)
  if (!value) throw new Error("useCart must be used within CartProvider")
  return value
}

export function formatPrice(price: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(price)
}
