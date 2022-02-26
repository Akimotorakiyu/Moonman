import { IPlanet } from './../../../blueprint/src/blueprint'
import { addMarkForPlant } from '@moonman/transform'
import { defineCommand } from '@moonman/transform'

export const createDocumentCommand = defineCommand(
  (planet: IPlanet) => (next, tr) => {
    addMarkForPlant(tr, planet, 'type', 'document')
    next()
    return true
  },
)
