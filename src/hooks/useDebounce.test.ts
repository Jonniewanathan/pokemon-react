import { act, renderHook } from '@testing-library/react'
import { useDebounce } from './useDebounce'

beforeEach(() => {
    vi.useFakeTimers()
})

afterEach(() => {
    vi.useRealTimers()
})

describe('useDebounce', () => {
    it('returns the initial value immediately', () => {
        const { result } = renderHook(() => useDebounce('a', 300))
        expect(result.current).toBe('a')
    })

    it('updates only after the delay', () => {
        const { result, rerender } = renderHook(
            ({ value }) => useDebounce(value, 300),
            { initialProps: { value: 'a' } },
        )

        rerender({ value: 'ab' })
        expect(result.current).toBe('a')

        act(() => {
            vi.advanceTimersByTime(299)
        })
        expect(result.current).toBe('a')

        act(() => {
            vi.advanceTimersByTime(1)
        })
        expect(result.current).toBe('ab')
    })

    it('restarts the timer when the value changes again', () => {
        const { result, rerender } = renderHook(
            ({ value }) => useDebounce(value, 300),
            { initialProps: { value: 'a' } },
        )

        rerender({ value: 'ab' })
        act(() => {
            vi.advanceTimersByTime(200)
        })
        rerender({ value: 'abc' })
        act(() => {
            vi.advanceTimersByTime(200)
        })
        expect(result.current).toBe('a')

        act(() => {
            vi.advanceTimersByTime(100)
        })
        expect(result.current).toBe('abc')
    })
})