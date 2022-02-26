import { IPlanet } from './../../../blueprint/src/blueprint'
import { addMarkForPlant } from '@moonman/transform'
import { defineCommand } from '@moonman/transform'
import { createPlanet } from '@moonman/nebula'

export function createDocumentByPlanet(planet: IPlanet) {
  return defineCommand((next, tr) => {
    addMarkForPlant(tr, planet, 'type', 'document')
    next()
    return true
  })
}

export const createDocument = () => {
  const document = createPlanet()
  return createDocumentByPlanet(document)
}
