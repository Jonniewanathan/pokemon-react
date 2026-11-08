import { useState } from 'react'
import { Link } from 'react-router'
import { usePokemonList } from '../hooks/usePokemonList'
import { useDebounce } from '../hooks/useDebounce'
import { FavouriteButton } from '../components/FavouriteButton'

export function ListPage() {
    const [query, setQuery] = useState('')
    const debouncedQuery = useDebounce(query, 300)
    const { pokemon, loading, error } = usePokemonList()

    if (loading) return <p>Loading...</p>
    if (error) return <p>Error: {error}</p>

    const term = debouncedQuery.trim().toLowerCase()
    const matches = pokemon.filter((p) => p.name.includes(term))

    return (
        <main>
            <h1>Pokémon browser</h1>
            <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search Pokémon"
            />
            <p>{matches.length} results</p>
            <ul>
                {matches.slice(0, 50).map((p) => (
                    <li key={p.name}>
                        <Link to={`/pokemon/${p.name}`}>{p.name}</Link>{' '}
                        <FavouriteButton name={p.name} />
                    </li>
                ))}
            </ul>
        </main>
    )
}