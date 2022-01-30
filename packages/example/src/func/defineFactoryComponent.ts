import { defineStateSuite, TStateFactory, IStateSuite } from './defineState'
import { SetupContext, VNode } from 'vue'
import { defineFunctionComponent } from './defineFunctionComponent'

export function defineFactoryComponent<P extends {}, S>(
  stateFactory: TStateFactory<[P, SetupContext], S>,
  view: (state: S) => VNode,
) {
  const suite = defineStateSuite(stateFactory)

  const com = defineFunctionComponent<P, { render: () => VNode }>(
    (props, ctx) => {
      const state = suite(props, ctx)
      suite.provide(state)
      return {
        render() {
          return view(state)
        },
      }
    },
  )

  Reflect.set(com, 'suite', suite)
  type TCom = typeof com
  type FCom = TCom & { suite: IStateSuite<[P, SetupContext], S> }
  return com as FCom
}
