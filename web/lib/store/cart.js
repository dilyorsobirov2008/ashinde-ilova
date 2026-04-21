import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const useCartStore = create(
  persist(
    (set, get) => ({
      items: [],
      addToCart: (product) => {
        set((state) => {
          const existing = state.items.find((i) => i.id === product.id);
          if (existing) {
            return {
              items: state.items.map((i) =>
                i.id === product.id ? { ...i, qty: i.qty + 1 } : i
              ),
            };
          }
          return { items: [...state.items, { ...product, qty: 1 }] };
        });
      },
      removeFromCart: (productId) => {
        set((state) => ({
          items: state.items.filter((i) => i.id !== productId),
        }));
      },
      updateQuantity: (productId, delta) => {
        set((state) => ({
          items: state.items.map((i) => {
            if (i.id === productId) {
              const newQty = i.qty + delta;
              return newQty > 0 ? { ...i, qty: newQty } : i;
            }
            return i;
          }),
        }));
      },
      clearCart: () => set({ items: [] }),
      get cartTotal() {
        return get().items.reduce((total, item) => total + item.price * item.qty, 0);
      },
      get itemCount() {
        return get().items.reduce((total, item) => total + item.qty, 0);
      }
    }),
    {
      name: 'cart-storage',
    }
  )
);
