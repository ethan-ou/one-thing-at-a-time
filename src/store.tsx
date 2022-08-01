import create from "zustand";
import { persist } from "zustand/middleware";

import { UniqueIdentifier } from "@dnd-kit/core";

interface AppState {
  route: Route;
  setRoute: (route: Route) => void;
  items: Array<ListItem>;
  addItem: (id: UniqueIdentifier, value: string) => void;
  editItem: (id: UniqueIdentifier, value: string) => void;
  removeItem: (id: UniqueIdentifier) => void;
  setItems: (items: Array<ListItem>) => void;
  setNote: (id: UniqueIdentifier, note: string) => void;
}

type Route = "main" | "focus";

type ListItem = {
  id: UniqueIdentifier;
  value: string;
  note: string;
};

const useStore = create<AppState>()(
  persist(
    (set, get) => ({
      route: "main",
      setRoute: (route) => set(() => ({ route })),

      items: [],
      addItem: (id, value) =>
        set((state) => ({ items: [...state.items, { id, value, note: "" }] })),
      editItem: (id, value) =>
        set((state) => ({
          items: state.items.map((item) => {
            if (item.id === id) {
              return { ...item, value };
            }
            return item;
          })
        })),
      removeItem: (id) =>
        set((state) => ({
          items: state.items.filter((item) => item.id !== id)
        })),
      setItems: (items) => set(() => ({ items })),
      setNote: (id, note) =>
        set((state) => ({
          items: state.items.map((item) => {
            if (item.id === id) {
              return { ...item, note };
            }
            return item;
          })
        }))
    }),
    {
      name: "main-store",
      partialize: (state) =>
        Object.fromEntries(
          Object.entries(state).filter(
            ([key]) => !["route", "setRoute"].includes(key)
          )
        )
    }
  )
);

export default useStore;
