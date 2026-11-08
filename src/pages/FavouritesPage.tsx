import { Link } from 'react-router'
import { useFavouritesStore } from '../stores/favouritesStore'
import { FavouriteButton } from '../components/FavouriteButton'

export function FavouritesPage() {
    const favourites = useFavouritesStore((s) => s.favourites)

    return (
        <main>
            <h1>Favourites</h1>
            {favourites.length === 0 ? (
                <p>No favourites yet.</p>
            ) : (
                <ul>
                    {favourites.map((name) => (
                        <li key={name}>
                            <Link to={`/pokemon/${name}`}>{name}</Link>{' '}
                            <FavouriteButton name={name} />
                        </li>
                    ))}
                </ul>
            )}
        </main>
    )
}