import { IPlanet } from '@moonman/blueprint/src/blueprint'
import { createPlanet } from '@moonman/nebula'
import { addMarkToPlanet } from '@moonman/command'
import { runCommandsWithTransation } from '@moonman/command'
export function createDocumentByPlanet(planet: IPlanet) {
  return addMarkToPlanet(planet, 'type', 'document')
}

export function createDocument() {
  const nodePlanet = createPlanet()
  runCommandsWithTransation([addMarkToPlanet(nodePlanet, 'type', 'document')])
  return nodePlanet
}

export function createParagraph() {
  const nodePlanet = createPlanet()
  runCommandsWithTransation([addMarkToPlanet(nodePlanet, 'type', 'pargraph')])
  return nodePlanet
}

export function createImage(src: string) {
  const nodePlanet = createPlanet()
  runCommandsWithTransation([
    addMarkToPlanet(nodePlanet, 'type', 'image'),
    addMarkToPlanet(nodePlanet, 'src', 'image'),
  ])
  return nodePlanet
}

export function createText(text: string) {
  const commands = text
    .split('')
    .map((char, index) => {
      const nodePlanet = createPlanet()
      return [
        addMarkToPlanet(nodePlanet, 'type', 'text'),
        addMarkToPlanet(nodePlanet, 'content', char),
      ]
    })
    .flat()
  runCommandsWithTransation(commands)
}
