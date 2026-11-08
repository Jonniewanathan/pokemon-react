import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { FavouriteButton } from './FavouriteButton'
import { useFavouritesStore } from '../stores/favouritesStore'

beforeEach(() => {
    localStorage.clear()
    useFavouritesStore.setState({ favourites: [], notes: {} })
})

describe('FavouriteButton', () => {
    it('shows an empty star when not a favourite', () => {
        render(<FavouriteButton name="pikachu" />)
        const button = screen.getByRole('button')
        expect(button).toHaveTextContent('☆')
        expect(button).toHaveAttribute('aria-pressed', 'false')
    })

    it('shows a filled star when already a favourite', () => {
        useFavouritesStore.setState({ favourites: ['pikachu'] })
        render(<FavouriteButton name="pikachu" />)
        expect(screen.getByRole('button', { pressed: true })).toHaveTextContent('★')
    })

    it('toggles when clicked', async () => {
        const user = userEvent.setup()
        render(<FavouriteButton name="pikachu" />)

        await user.click(screen.getByRole('button'))

        expect(screen.getByRole('button')).toHaveTextContent('★')
        expect(useFavouritesStore.getState().favourites).toEqual(['pikachu'])

        await user.click(screen.getByRole('button'))

        expect(screen.getByRole('button')).toHaveTextContent('☆')
        expect(useFavouritesStore.getState().favourites).toEqual([])
    })
})