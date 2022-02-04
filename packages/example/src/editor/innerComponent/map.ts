import { Component, defineComponent } from 'vue'

export const componentMap = new Map<
  string,
  ReturnType<typeof defineComponent>
>()

export function registerComponent(componentNtype: string, com: Component) {
  componentMap.set(componentNtype, com)
}
