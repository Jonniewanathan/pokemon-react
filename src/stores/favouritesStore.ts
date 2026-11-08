import { create } from 'zustand'
import { persist } from 'zustand/middleware'

type FavouritesState = {
    favourites: string[]
    notes: Record<string, string>
    toggle: (name: string) => void
    setNote: (name: string, note: string) => void
}

export const useFavouritesStore =  create<FavouritesState>()(
    persist(
        (set) => ({
            favourites: [],
            notes: {},
            toggle: (name) =>
                set((state) => ({
                    favourites: state.favourites.includes(name)
                        ? state.favourites.filter((n) => n !== name)
                        : [...state.favourites, name],
                })),
            setNote: (name, note) =>
                set((state) => ({ notes: { ...state.notes, [name]: note } })),
        }),
        { name: 'favourites' },
    ),
)