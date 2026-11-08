import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter } from 'react-router'
import { ListPage } from './ListPage'
import { useFavouritesStore } from '../stores/favouritesStore'

const mockList = {
    count: 3,
    results: [
        { name: 'bulbasaur', url: '' },
        { name: 'ivysaur', url: '' },
        { name: 'pikachu', url: '' },
    ],
}

function renderPage() {
    return render(
        <MemoryRouter>
            <ListPage />
        </MemoryRouter>,
    )
}

beforeEach(() => {
    localStorage.clear()
    useFavouritesStore.setState({ favourites: [], notes: {} })
    vi.stubGlobal(
        'fetch',
        vi.fn().mockResolvedValue({ ok: true, json: async () => mockList }),
    )
})

afterEach(() => {
    vi.unstubAllGlobals()
})

describe('ListPage', () => {
    it('shows loading, then the list', async () => {
        renderPage()
        expect(screen.getByText('Loading...')).toBeInTheDocument()
        expect(await screen.findByText('bulbasaur')).toBeInTheDocument()
        expect(screen.getByText('3 results')).toBeInTheDocument()
    })

    it('shows an error when the request fails', async () => {
        vi.stubGlobal('fetch', vi.fn().mockResolvedValue({ ok: false, status: 500 }))
        renderPage()
        expect(await screen.findByText('Error: Request failed: 500')).toBeInTheDocument()
    })

    it('filters by the search text after the debounce', async () => {
        const user = userEvent.setup()
        renderPage()
        await screen.findByText('bulbasaur')

        await user.type(screen.getByPlaceholderText('Search Pokémon'), 'pika')

        await waitFor(() => {
            expect(screen.queryByText('bulbasaur')).not.toBeInTheDocument()
        })
        expect(screen.getByText('pikachu')).toBeInTheDocument()
        expect(screen.getByText('1 results')).toBeInTheDocument()
    })
})