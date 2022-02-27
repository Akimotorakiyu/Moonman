import { IPlanetBlueprint } from '@moonman/blueprint'
import { addMarkForPlant } from '@moonman/transform'
import { defineCommand } from '../commandRing'

export function addMarkToPlanetBlueprint(
  planet: IPlanetBlueprint,
  name: string,
  value: unknown,
) {
  return defineCommand((next, tr) => {
    addMarkForPlant(tr, planet, name, value)
    next()
    return true
  })
}
