import { create } from 'zustand'
import { persist } from 'zustand/middleware'

type FavouritesState = {
    favourites: string[]
    toggle: (name: string) => void
}

export const useFavouritesStore = create<FavouritesState>()(
    persist(
        (set) => ({
            favourites: [],
            toggle: (name) =>
                set((state) => ({
                    favourites: state.favourites.includes(name)
                        ? state.favourites.filter((n) => n !== name)
                        : [...state.favourites, name],
                })),
        }),
        { name: 'favourites' },
    ),
)