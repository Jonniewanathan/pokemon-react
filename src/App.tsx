import { useState } from 'react'
import { usePokemonList } from './hooks/usePokemonList'
import { useDebounce } from './hooks/useDebounce'
import { useFavouritesStore } from './stores/favouritesStore'
import { FavouriteButton } from './components/FavouriteButton'

function App() {
    const [query, setQuery] = useState('')
    const debouncedQuery = useDebounce(query, 300)
    const { pokemon, loading, error } = usePokemonList()
    const favouritesCount = useFavouritesStore((s) => s.favourites.length)

    if (loading) return <p>Loading...</p>
    if (error) return <p>Error: {error}</p>

    const term = debouncedQuery.trim().toLowerCase()
    const matches = pokemon.filter((p) => p.name.includes(term))

    return (
        <main>
            <h1>Pokémon browser</h1>
            <p>Favourites: {favouritesCount}</p>
            <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search Pokémon"
            />
            <p>{matches.length} results</p>
            <ul>
                {matches.slice(0, 50).map((p) => (
                    <li key={p.name}>
                        {p.name} <FavouriteButton name={p.name} />
                    </li>
                ))}
            </ul>
        </main>
    )
}

export default App