import { definePortal, IPortal } from './portal'

export const suiteKey = Symbol('suiteKey')

export type TStateFactory<
  Args extends unknown[],
  S extends Record<string, any>,
> = (...args: Args) => S

export type IStateSuite<
  Args extends unknown[],
  S extends Record<string, any>,
> = TStateFactory<Args, S> & IPortal<S>

export function defineStateSuite<Args extends unknown[], S>(
  stateFactory: TStateFactory<Args, S>,
  key?: KeyType,
) {
  const checkStateSuite = Reflect.get(stateFactory, suiteKey)
  if (checkStateSuite) {
    return checkStateSuite as IStateSuite<Args, S>
  }
  const portal = definePortal<S, KeyType>(key)

  const stateSuite = (...args: Args) => {
    const state = stateFactory(...args)
    portal.provide(state)
    return state
  }

  Object.assign(stateFactory, { ...portal, suiteKey: stateSuite })
  Object.assign(stateSuite, { ...portal, suiteKey: stateSuite })

  return stateSuite as IStateSuite<Args, S>
}
