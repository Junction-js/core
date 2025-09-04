import { signal, effect } from '../src/index'

describe('Reactivity Core: signal and effect', () => {

    // Limpa o mock a cada teste para evitar interferencia
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it(`should run an effect when a signal value changes`, () => {
        const count = signal(0);

        const mockEffect = jest.fn(() => {
            console.log(`Count is: `, count.value);
        });

        effect(mockEffect);

        expect(mockEffect).toHaveBeenCalledTimes(1);

        count.value = 1;

        expect(mockEffect).toHaveBeenCalledTimes(2);

        count.value = 2;

        expect(mockEffect).toHaveBeenCalledTimes(3);
    });

    it('should not run an effect if the signal value is not changed', () => {
        const count = signal(0);

        const mockEffect = jest.fn(() => {
            console.log('Count is: ', count.value);
        });

        effect(mockEffect);

        expect(mockEffect).toHaveBeenCalledTimes(1);
        
        count.value = 0;
        
        expect(mockEffect).toHaveBeenCalledTimes(1);
    });
})