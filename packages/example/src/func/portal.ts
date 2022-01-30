import { provide, inject } from 'vue'
export type KeyType = number | symbol | string

export interface IPortal<D> {
  provide(data: D): void
  inject(): D | undefined
  key: KeyType
}

export function definePortal<D, K extends KeyType = symbol>(
  key?: K,
): IPortal<D> {
  const _key = key || Symbol()
  return {
    provide(data: D) {
      provide(_key, data)
    },
    inject(): D | undefined {
      return inject(_key as string) as D
    },
    get key() {
      return _key
    },
  }
}
