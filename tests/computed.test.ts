import { signal } from '../src';
import { computed } from '../src';

describe('Reativity Core: computed', () => {
  it('should compute a value based on a signal', () => {
    const count = signal(0);

    const doubleCount = computed(() => count.value * 2);

    expect(doubleCount.value).toBe(0);

    count.value = 5;

    expect(doubleCount.value).toBe(10);
  });

  it('should only re-compute when dependencies change', () => {
    const count = signal(0);
    const mockFn = jest.fn(() => count.value * 2);
    const doubleCount = computed(mockFn);

    expect(doubleCount.value).toBe(0);
    expect(mockFn).toHaveBeenCalledTimes(1);

    count.value = 0;

    expect(doubleCount.value).toBe(0);
    expect(mockFn).toHaveBeenCalledTimes(1);

    count.value = 10;

    expect(doubleCount.value).toBe(20);
    expect(mockFn).toHaveBeenCalledTimes(2);
  });
});
