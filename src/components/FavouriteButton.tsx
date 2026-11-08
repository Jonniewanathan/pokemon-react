import { useFavouritesStore } from '../stores/favouritesStore'

type Props = {
    name: string
}

export function FavouriteButton({ name }: Props) {
    const isFavourite = useFavouritesStore((s) => s.favourites.includes(name))
    const toggle = useFavouritesStore((s) => s.toggle)

    return (
        <button onClick={() => toggle(name)} aria-pressed={isFavourite}>
            {isFavourite ? '★' : '☆'}
        </button>
    )
}