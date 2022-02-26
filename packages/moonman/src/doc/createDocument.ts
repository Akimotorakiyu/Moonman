import { IPlanet } from '@moonman/blueprint/src/blueprint'
import { createPlanet, createSpaceshipByPlanet } from '@moonman/nebula'
import { addMarkToPlanet } from '@moonman/command'
import { runCommandsWithTransation } from '@moonman/command'
export function createDocumentByPlanet(planet: IPlanet) {
  return addMarkToPlanet(planet, 'type', 'document')
}

export function createDocument() {
  console.log('createDocument')
  const nodePlanet = createPlanet()
  const spaceship = createSpaceshipByPlanet(nodePlanet)
  runCommandsWithTransation([addMarkToPlanet(nodePlanet, 'type', 'document')])

  return spaceship
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
