import React, { createContext, useContext, useMemo, useState } from 'react'

const CartContext = createContext(null)

export const CartProvider = ({ children, initialItems = [] }) => {
  const [items, setItems] = useState(initialItems)

  const addItem = (product) => {
    setItems((prev) => {
      const existing = prev.find(i => i.id === product.id)
      if (existing) {
        return prev.map(i => i.id === product.id ? { ...i, quantity: i.quantity + 1 } : i)
      }
      return [
        ...prev,
        {
          id: product.id,
          title: product.title,
          price: product.price,
          oldPrice: product.oldPrice || 0,
          unitPrice: product.unitPrice || product.price,
          quantity: 1,
          selected: true,
          discountPercent: product.discountPercent || 0,
          inStock: product.inStock !== false,
          image: product.image,
        },
      ]
    })
  }

  const removeItem = (id) => setItems(prev => prev.filter(i => i.id !== id))
  const increment = (id) => setItems(prev => prev.map(i => i.id === id ? { ...i, quantity: i.quantity + 1 } : i))
  const decrement = (id) => setItems(prev => prev.map(i => i.id === id && i.quantity > 1 ? { ...i, quantity: i.quantity - 1 } : i))
  const toggleSelect = (id) => setItems(prev => prev.map(i => i.id === id ? { ...i, selected: !i.selected } : i))
  const selectAll = (checked) => setItems(prev => prev.map(i => ({ ...i, selected: checked })))

  const totals = useMemo(() => {
    const selected = items.filter(i => i.selected && i.inStock)
    const totalCount = selected.reduce((s, i) => s + i.quantity, 0)
    const lineSum = selected.reduce((s, i) => s + i.price, 0)
    const oldSum = selected.reduce((s, i) => s + (i.oldPrice || i.price), 0)
    const discount = oldSum > lineSum ? oldSum - lineSum : 0
    return { totalCount, totalPrice: lineSum, discount }
  }, [items])

  const value = {
    items,
    addItem,
    removeItem,
    increment,
    decrement,
    toggleSelect,
    selectAll,
    ...totals,
  }

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}

export const useCart = () => {
  const ctx = useContext(CartContext)
  if (!ctx) throw new Error('useCart must be used within CartProvider')
  return ctx
}
