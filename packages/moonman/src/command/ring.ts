import { ITransaction } from '@moonman/core'

export type TNext<R> = () => R | undefined
export type TMiddleWare<Args extends unknown[], R> = (
  next: TNext<R>,
  ...args: Args
) => R
export type TKeyType = number | symbol | string

export interface IPortal<D> {
  provide(data: D): void
  inject(): D | undefined
  key: TKeyType
}

export function _theNext<
  T extends Record<TKeyType, unknown>,
  Args extends unknown[],
  R,
>(
  middleware: TMiddleWare<Args, R>[],
  state: T,
  contextStack: unknown[],
  args: Args,
  index: number = 0,
): R {
  try {
    const context = Object.create(state) as T
    contextStack.push(context)
    return middleware[index]?.(() => {
      return _theNext(middleware, context, contextStack, args, index + 1)
    }, ...args)
  } finally {
    contextStack.pop()
  }
}

export type TProvide<T> = (key: TKeyType, value: T) => void
export type TInject<T> = (key: TKeyType) => T | undefined

export function _createPortal<D, K extends TKeyType = symbol>(
  provide: TProvide<D>,
  inject: TInject<D>,
  key?: K,
): IPortal<D> {
  const _key = key || Symbol()
  return {
    provide(data: D) {
      provide(_key, data)
    },
    inject() {
      return inject(_key)
    },
    get key() {
      return _key
    },
  }
}

export function ringCompose<Args extends unknown[], R>() {
  const contextStack: Record<TKeyType, unknown>[] = []

  function getCurrentContext() {
    return contextStack[contextStack.length - 1]
  }

  function provide<T>(key: TKeyType, value: T) {
    const ctx = getCurrentContext()
    ctx[key] = value
  }

  function inject<T>(key: TKeyType): T | undefined {
    const ctx = getCurrentContext()
    return ctx[key] as T
  }

  function ring(middleware: TMiddleWare<Args, R>[], args: Args) {
    return _theNext(middleware, getCurrentContext() ?? null, contextStack, args)
  }

  function createPortal<D, K extends TKeyType = symbol>(key?: K): IPortal<D> {
    return _createPortal<D, K>(provide, inject, key)
  }

  return {
    createPortal,
    ring,
  }
}

export const commandRing = ringCompose<[ITransaction], boolean>()
