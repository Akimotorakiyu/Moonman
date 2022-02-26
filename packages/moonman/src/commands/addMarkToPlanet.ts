import { IPlanet } from '@moonman/blueprint'
import { addMarkForPlant, defineCommand } from '@moonman/transform'

export function addMarkForPlanet(
  planet: IPlanet,
  name: string,
  value: unknown,
) {
  return defineCommand((next, tr) => {
    addMarkForPlant(tr, planet, name, value)
    next()
    return true
  })
}
