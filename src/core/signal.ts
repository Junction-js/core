import { activeEffect, type Effect } from './dep-tracking';

/**
 * Uma classe que representa um valor reativo. Quando seu valor é alterado, notifica todos os "efeitos" que dependem dele.
 */
export class Signal<T> {
  private _value: T;
  private effects = new Set<Effect>();

  constructor(initialValue: T) {
    this._value = initialValue;
  }

  /**
   * Obtèm o valor atual do Signal,
   * Se houver um efeito ativo, ele é inscrito para ser notificado de mudanças
   */
  get value(): T {
    this.track();
    return this._value;
  }

  /**
   * Define um novo valor para o Signal e notifica os efeitos inscritos se o valor mudou.
   * @param newValue O novo valor a ser definido.
   */
  set value(newValue: T) {
    if (newValue !== this._value) {
      this._value = newValue;
      this.trigger();
    }
  }

  /**
   * Adiciona o efeito ativo atual à lista de inscritos.
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
 * Cria e retorna um novo Signal.
 * @param initialValue O valor do Signal.
 * @returns Um novo Signal.
 */
export function signal<T>(initialValue: T): Signal<T> {
  return new Signal(initialValue);
}
