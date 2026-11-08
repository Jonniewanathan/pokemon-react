import { Link, useParams } from 'react-router'
import { usePokemonDetail } from '../hooks/usePokemonDetail'
import { FavouriteButton } from '../components/FavouriteButton'
import { NoteForm } from '../components/NoteForm'
import {useFavouritesStore} from '../stores/favouritesStore.ts';

export function DetailPage() {
    const { name } = useParams()
    const { detail, loading, error } = usePokemonDetail(name)
    const isFavourite = useFavouritesStore((s) => s.favourites.includes(name ?? ''))

    if (loading) return <p>Loading...</p>
    if (error) return <p>Error: {error}</p>
    if (!detail) return null

    return (
        <main>
            <Link to="/">← Back</Link>
            <h1>
                {detail.name} #{detail.id}
            </h1>
            <FavouriteButton name={detail.name} />
            {detail.sprites.front_default && (
                <img src={detail.sprites.front_default} alt={detail.name} />
            )}
            <p>
                Height: {detail.height} · Weight: {detail.weight}
            </p>
            <p>Types: {detail.types.map((t) => t.type.name).join(', ')}</p>
            {isFavourite && <NoteForm name={detail.name} />}
        </main>
    )
}