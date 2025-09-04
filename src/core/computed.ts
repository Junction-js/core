import { Signal, effect } from './signal';

/**
 * Cria um sginal cujo valor é o resultado de uma função. O valor é
 * recalculado apenas quando as dependências mudam.
 * @param fn A função que retorna o valor computado.
 * @returns Um signal de leitura que contém o valor computado.
 */
export function computed<T>(fn: () => T): Signal<T> {
  let value: T | undefined;
  let isDirty = true;
  const computedSignal = new Signal<T>(undefined as T);

  effect(() => {
    isDirty = true;
    computedSignal.trigger();
  });

  Object.defineProperty(computedSignal, 'value', {
    enumerable: true,
    configurable: true,
    get: () => {
      if (isDirty) {
        value = fn();
        isDirty = false;
      }
      return value as T;
    },
  });

  return computedSignal;
}
