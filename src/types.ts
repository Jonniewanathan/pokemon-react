export type PokemonSummary = {
    name: string
    url: string
}

export type PokemonListResponse = {
    count: number
    results: PokemonSummary[]
}

export type PokemonDetail = {
    id: number
    name: string
    height: number
    weight: number
    types: { type: { name: string } }[]
    sprites: { front_default: string | null }
}