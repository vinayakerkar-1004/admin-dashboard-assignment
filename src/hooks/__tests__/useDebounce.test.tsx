import { renderHook, act } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { useDebounce } from '../useDebounce';

describe('useDebounce hook', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('should return the initial value immediately', () => {
    const { result } = renderHook(() => useDebounce('hello', 300));

    expect(result.current).toBe('hello');
  });

  it('should not update the value before the debounce delay', () => {
    const { result, rerender } = renderHook(
      ({ value }: { value: string }) => useDebounce(value, 300),
      { initialProps: { value: 'hello' } }
    );

    rerender({ value: 'hello world' });

    act(() => {
      vi.advanceTimersByTime(200);
    });

    expect(result.current).toBe('hello');
  });

  it('should update the value after the debounce delay', () => {
    const { result, rerender } = renderHook(
      ({ value }) => useDebounce(value, 300),
      { initialProps: { value: 'hello' } }
    );

    rerender({ value: 'hello world' });

    act(() => {
      vi.advanceTimersByTime(300);
    });

    expect(result.current).toBe('hello world');
  });

  it('should reset the timer when value changes rapidly', () => {
    const { result, rerender } = renderHook(
      ({ value }) => useDebounce(value, 300),
      { initialProps: { value: 'a' } }
    );

    rerender({ value: 'ab' });

    act(() => {
      vi.advanceTimersByTime(150);
    });

    rerender({ value: 'abc' });

    act(() => {
      vi.advanceTimersByTime(150);
    });

    expect(result.current).toBe('a');

    act(() => {
      vi.advanceTimersByTime(150);
    });

    expect(result.current).toBe('abc');
  });
});
