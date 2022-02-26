import {
  IPlanet,
  ISpaceship,
  TTimestampAndIdCombineKey,
} from '@moonman/blueprint'
import { reactive } from '@vue/reactivity'

export const planetRegistrationCenter = reactive(
  new Map<TTimestampAndIdCombineKey, IPlanet>(),
)
export const spaceshipRegistrationCenter = reactive(
  new Map<TTimestampAndIdCombineKey, ISpaceship>(),
)
