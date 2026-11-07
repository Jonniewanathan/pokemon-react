import { useEffect, useState } from 'react'
import type { PokemonListResponse, PokemonSummary } from '../types'

export function usePokemonList() {
    const [pokemon, setPokemon] = useState<PokemonSummary[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        const controller = new AbortController()

        async function load() {
            try {
                const response = await fetch(
                    'https://pokeapi.co/api/v2/pokemon?limit=20',
                    { signal: controller.signal },
                )
                if (!response.ok) throw new Error(`Request failed: ${response.status}`)
                const data: PokemonListResponse = await response.json()
                setPokemon(data.results)
            } catch (err) {
                if (err instanceof DOMException && err.name === 'AbortError') return
                setError(err instanceof Error ? err.message : 'Something went wrong')
            } finally {
                if (!controller.signal.aborted) setLoading(false)
            }
        }

        load()
        return () => controller.abort()
    }, [])

    return { pokemon, loading, error }
}