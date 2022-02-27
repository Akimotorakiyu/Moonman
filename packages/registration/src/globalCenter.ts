import {
  IPlanet,
  IPlanetBlueprint,
  ISpaceship,
  ISpaceshipBlueprint,
  TTimestampAndIdCombineKey,
} from '@moonman/blueprint'
import { reactive } from '@vue/reactivity'

export const planetBlueprintRegistrationCenter = reactive(
  new Map<TTimestampAndIdCombineKey, IPlanetBlueprint>(),
)
export const spaceshipBlueprintRegistrationCenter = reactive(
  new Map<TTimestampAndIdCombineKey, ISpaceshipBlueprint>(),
)

export const planetRegistrationCenter = reactive(
  new Map<TTimestampAndIdCombineKey, IPlanet>(),
)
export const spaceshipRegistrationCenter = reactive(
  new Map<TTimestampAndIdCombineKey, ISpaceship>(),
)
