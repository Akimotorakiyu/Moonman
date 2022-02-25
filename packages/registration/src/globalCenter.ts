import {
  IPlanet,
  ISpaceship,
  TTimestampAndIdCombineKey,
} from '@moonman/blueprint'

export const planetRegistrationCenter = new Map<
  TTimestampAndIdCombineKey,
  IPlanet
>()
export const spaceshipRegistrationCenter = new Map<
  TTimestampAndIdCombineKey,
  ISpaceship
>()
