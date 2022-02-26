import { IPlanet } from '@moonman/blueprint'
import { addMarkForPlant, defineCommand } from '@moonman/transform'

export const addMarkForPlanet = defineCommand(
  (planet: IPlanet, name: string, value: unknown) => (next, tr) => {
    addMarkForPlant(tr, planet, name, value)
    next()
    return true
  },
)
