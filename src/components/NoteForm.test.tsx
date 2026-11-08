import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { NoteForm } from './NoteForm'
import { useFavouritesStore } from '../stores/favouritesStore'

beforeEach(() => {
    localStorage.clear()
    useFavouritesStore.setState({ favourites: [], notes: {} })
})

describe('NoteForm', () => {
    it('shows no error before the field is touched', () => {
        render(<NoteForm name="pikachu" />)
        expect(screen.queryByRole('alert')).not.toBeInTheDocument()
    })

    it('shows a required error when saving an empty note', async () => {
        const user = userEvent.setup()
        render(<NoteForm name="pikachu" />)

        await user.click(screen.getByRole('button', { name: /save note/i }))

        expect(screen.getByRole('alert')).toHaveTextContent('Note is required')
    })

    it('shows an error when leaving the field with too little text', async () => {
        const user = userEvent.setup()
        render(<NoteForm name="pikachu" />)

        await user.type(screen.getByLabelText('Note'), 'hi')
        await user.tab()

        expect(screen.getByRole('alert')).toHaveTextContent('at least 3 characters')
    })

    it('does not save an invalid note', async () => {
        const user = userEvent.setup()
        render(<NoteForm name="pikachu" />)

        await user.type(screen.getByLabelText('Note'), 'hi')
        await user.click(screen.getByRole('button', { name: /save note/i }))

        expect(useFavouritesStore.getState().notes).toEqual({})
    })

    it('saves a trimmed note to the store and shows it', async () => {
        const user = userEvent.setup()
        render(<NoteForm name="pikachu" />)

        await user.type(screen.getByLabelText('Note'), '  Fast one  ')
        await user.click(screen.getByRole('button', { name: /save note/i }))

        expect(useFavouritesStore.getState().notes.pikachu).toBe('Fast one')
        expect(screen.getByText('Saved note: Fast one')).toBeInTheDocument()
    })
})