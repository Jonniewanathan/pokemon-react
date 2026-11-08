import { useFavouritesStore } from './favouritesStore'

beforeEach(() => {
    localStorage.clear()
    useFavouritesStore.setState({ favourites: [], notes: {} })
})

describe('favouritesStore', () => {
    it('adds a favourite', () => {
        useFavouritesStore.getState().toggle('pikachu')
        expect(useFavouritesStore.getState().favourites).toEqual(['pikachu'])
    })

    it('removes a favourite when toggled twice', () => {
        const { toggle } = useFavouritesStore.getState()
        toggle('pikachu')
        toggle('pikachu')
        expect(useFavouritesStore.getState().favourites).toEqual([])
    })

    it('keeps the other favourites when removing one', () => {
        const { toggle } = useFavouritesStore.getState()
        toggle('pikachu')
        toggle('eevee')
        toggle('pikachu')
        expect(useFavouritesStore.getState().favourites).toEqual(['eevee'])
    })

    it('stores a note per Pokémon', () => {
        const { setNote } = useFavouritesStore.getState()
        setNote('pikachu', 'fast')
        setNote('eevee', 'cute')
        expect(useFavouritesStore.getState().notes).toEqual({ pikachu: 'fast', eevee: 'cute' })
    })

    it('persists to localStorage', () => {
        useFavouritesStore.getState().toggle('pikachu')
        expect(localStorage.getItem('favourites')).toContain('pikachu')
    })
})