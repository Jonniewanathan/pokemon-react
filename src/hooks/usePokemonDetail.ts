import { useEffect, useState } from 'react'
import type { PokemonDetail } from '../types'

export function usePokemonDetail(name: string | undefined) {
    const [detail, setDetail] = useState<PokemonDetail | null>(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        if (!name) return
        const controller = new AbortController()

        async function load() {
            try {
                const response = await fetch(
                    `https://pokeapi.co/api/v2/pokemon/${name}`,
                    { signal: controller.signal },
                )
                if (!response.ok) {
                    throw new Error(
                        response.status === 404
                            ? 'Pokémon not found'
                            : `Request failed: ${response.status}`,
                    )
                }
                setDetail(await response.json())
            } catch (err) {
                if (err instanceof DOMException && err.name === 'AbortError') return
                setError(err instanceof Error ? err.message : 'Something went wrong')
            } finally {
                if (!controller.signal.aborted) setLoading(false)
            }
        }

        load()
        return () => controller.abort()
    }, [name])

    return { detail, loading, error }
}