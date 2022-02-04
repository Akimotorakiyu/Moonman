import {
  SetupContext,
  defineComponent,
  h,
  VNode,
  onBeforeUpdate,
  shallowReactive,
} from 'vue'

const shallowReadonlyProxyHandlerFunction = () => {
  console.error('You should not change the props directly!')
  return false
}

const shallowReadonlyProxyHandler: ProxyHandler<any> = {
  set: shallowReadonlyProxyHandlerFunction,
  deleteProperty: shallowReadonlyProxyHandlerFunction,
  defineProperty: shallowReadonlyProxyHandlerFunction,
  setPrototypeOf: shallowReadonlyProxyHandlerFunction,
}

export interface IFunctionComponentOption {
  name?: string
  inheritAttrs?: boolean
}

/**
 * defineFunctionComponent
 * @author 臭哥哥·湫曗
 * @param component 工厂函数
 * @param option 选项
 * @returns
 */
export const defineFunctionComponent = <
  P extends {},
  I extends { render: () => VNode | JSX.Element },
>(
  component: (props: P, ctx: SetupContext) => I,
  option?: IFunctionComponentOption,
) => {
  const comName = option?.name || component.name || 'Anonymous Component'

  const OptionCom = defineComponent({
    name: comName,
    inheritAttrs: option?.inheritAttrs ?? true,
    setup(_, ctx) {
      const props = shallowReactive<Record<string, unknown>>({})

      const updateProps = () => {
        const keys = Object.keys(ctx.attrs)
        Object.keys(props).forEach((key) => {
          if (!keys.includes(key)) {
            delete props[key]
          }
        })

        Object.entries(ctx.attrs).forEach(([key, value]) => {
          if (props[key] !== value) {
            props[key] = value
          }
        })
      }

      updateProps()

      onBeforeUpdate(() => {
        updateProps()
      })

      const protectedProps = new Proxy(props, shallowReadonlyProxyHandler)

      return component(protectedProps as P, ctx)
    },
    render(ctx: { render: () => VNode }) {
      return ctx.render()
    },
  })

  const funtionCom = {
    [comName]: (props: P) => {
      const instance = h(OptionCom, props)
      return instance as unknown as I
    },
  }

  Reflect.set(OptionCom, 'create', funtionCom[comName])

  type Sign = (props: P) => I & JSX.Element

  const com = OptionCom as unknown as Sign & {
    create: Sign
  }

  return com
}
