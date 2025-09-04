import { Signal } from './signal';
import { effect } from './dep-tracking';

/**
 * Cria um signal cujo valor é o resultado de uma função. O valor é
 * recalculado apenas quando as dependências mudam.
 *
 * @param fn A função que retorna o valor computado.
 * @returns Um signal de leitura que contém o valor computado.
 */
export function computed<T>(fn: () => T): Signal<T> {
  // A variável 'value' armazena o resultado do cálculo.
  let value: T | undefined;
  // A flag 'isDirty' indica se o valor precisa ser recalculado.
  let isDirty = true;
  
  // Cria um signal interno para notificar os observadores deste 'computed'.
  const computedSignal = new Signal<T>(undefined as T);

  // O 'effect' agora é responsável por rastrear as dependências e marcar o 'computed' como "sujo".
  effect(() => {
    isDirty = true;
    computedSignal.trigger();
  });

  // Sobrescrevemos o getter da propriedade 'value' do signal.
  Object.defineProperty(computedSignal, 'value', {
    enumerable: true,
    configurable: true,
    get: () => {
      // Se o valor estiver sujo, ele é recalculado.
      if (isDirty) {
        value = fn();
        isDirty = false;
      }
      return value as T;
    },
  });

  return computedSignal;
}
