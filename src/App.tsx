import { NavLink, Route, Routes } from 'react-router'
import { useFavouritesStore } from './stores/favouritesStore'
import { ListPage } from './pages/ListPage'
import { DetailPage } from './pages/DetailPage'
import { FavouritesPage } from './pages/FavouritesPage'

function App() {
    const favouritesCount = useFavouritesStore((s) => s.favourites.length)

    return (
        <>
            <nav>
                <NavLink to="/" end>Pokémon</NavLink>
                <NavLink to="/favourites">Favourites ({favouritesCount})</NavLink>
            </nav>
            <Routes>
                <Route path="/" element={<ListPage />} />
                <Route path="/pokemon/:name" element={<DetailPage />} />
                <Route path="/favourites" element={<FavouritesPage />} />
                <Route path="*" element={<p>Page not found</p>} />
            </Routes>
        </>
    )
}

export default App