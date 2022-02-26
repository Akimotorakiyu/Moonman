import { IPlanet } from '@moonman/blueprint/src/blueprint'
import { createPlanet } from '@moonman/nebula'
import { addMarkToPlanet } from '../../../command/src/addMarkToPlanet'
import { runCommandsWithTransation } from '@moonman/command'
export function createDocumentByPlanet(planet: IPlanet) {
  return addMarkToPlanet(planet, 'type', 'document')
}

export const createDocument = () => {
  const document = createPlanet()
  runCommandsWithTransation([addMarkToPlanet(document, 'type', 'document')])
  return document
}
