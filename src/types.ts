export type PokemonSummary = {
    name: string
    url: string
}

export type PokemonListResponse = {
    count: number
    results: PokemonSummary[]
}