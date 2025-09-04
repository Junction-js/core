/**
 * Representa uma função que reage a mudanças de um Signal
 * @internal
 */
export type Effect = () => void;

/**
 * Armazena a lista de efeitos que dependem do Signal atualmente em execução.
 * @internal
 */
export let activeEffect: Effect | null = null;

/**
 * Seta o efeito ativo para a função passada e a executa.
 * @param fn A função a ser executada como efeito.
 * @returns A função que permite parar a execução.
 */
export function effect(fn: Effect): () => void {
  const runner = () => {
    try {
      activeEffect = runner;
      fn();
    } finally {
      activeEffect = null;
    }
  };

  runner();

  return () => {};
}
