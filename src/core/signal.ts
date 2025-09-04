/**
 * Representa uma funçao que reage a mudanças de um Signal.
 * @internal
 */
type Effect = () => void;

/**
 * Armazena a lista de efeitos que dependem do Signal atualmente em execuçao.
 * @intenal
 */
let activeEffect: Effect | null = null;

/**
 * Uma classe que representa um valor reativo. Quando seu valor é alterado,
 * notifica todos os "efeitos" que dependem dele.
 */
export class Signal<T> {
  private _value: T;
  private effects = new Set<Effect>();

  constructor(initialValue: T) {
    this._value = initialValue;
  }

  /**
   * Obtem o valor atual do Signal.
   * Se houver um efeito ativo, ele é incrito para ser notificado de mudanças.
   */
  get value(): T {
    this.track();
    return this._value;
  }

  /**
   * Define um novo valor para o Signal e notifica os efeitos inscritos se o valor mudou.
   * @param newValue O novo valor a ser definido.
   */
  // eslint-disable-next-line @typescript-eslint/explicit-member-accessibility
  public set value(newValue: T) {
    // Evita a notificaçao se o valor nao mudou, otimizando a performance.
    if (newValue !== this._value) {
      this._value = newValue;
      this.trigger();
    }
  }
  /**
   * Adiciona o efeito atual à lista de inscritos.
   * @private
   */
  private track(): void {
    if (activeEffect) {
      this.effects.add(activeEffect);
    }
  }

  /**
   * Notifica todos os efeitos inscritos para que sejam reexecutados.
   * @private
   */
  trigger(): void {
    for (const effects of this.effects) {
      effects();
    }
  }
}

/**
 * Executa uma funçao e a inscreve como efeito.
 * A cada execuçao, o efeito é registrado nos Signals que ele acessa.
 * @param fn A funçao a ser executada como efeito.
 */
export function effect(fn: Effect): void {
  activeEffect = fn;
  fn();
  activeEffect = null;
}

/**
 * Cria e retorna um novo Signal.
 * @param initialValue O valor inicial do Signal.
 * @returns Um novo Signal.
 */
export function signal<T>(initialValue: T): Signal<T> {
  return new Signal(initialValue);
}
