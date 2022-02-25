import { IPlanet } from './../../../blueprint/src/blueprint'
import { addMarkForPlant } from '@moonman/transform'

import { defineCommand } from '../command'

export const createDocumentCommand = defineCommand(
  (planet: IPlanet) => (next, tr) => {
    addMarkForPlant(tr, planet, 'type', 'document')
    next()
    return true
  },
)
