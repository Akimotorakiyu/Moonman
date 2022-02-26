import { createPlanet, createSpaceshipByPlanet } from '@moonman/nebula'
import {
  addMarkToPlanet,
  addChildSpaceship,
  addRelativeSpaceship,
} from '@moonman/command'
import { runCommandsWithTransation } from '@moonman/command'
import { IPlanet, ISpaceship, TDirection } from '@moonman/blueprint'

export function createDocument() {
  console.log('createDocument')
  const nodePlanet = createPlanet()
  const spaceship = createSpaceshipByPlanet(nodePlanet)
  runCommandsWithTransation([addMarkToPlanet(nodePlanet, 'type', 'CDocument')])

  return spaceship
}

export function createChildParagraph(main: IPlanet, direction: TDirection) {
  const nodePlanet = createPlanet()
  runCommandsWithTransation([
    addMarkToPlanet(nodePlanet, 'type', 'CContainer'),
    addChildSpaceship(main, nodePlanet, direction),
  ])
  return nodePlanet
}

export function createRelativeParagraph(
  relativeSpaceship: ISpaceship,
  direction: TDirection,
) {
  const nodePlanet = createPlanet()
  runCommandsWithTransation([
    addMarkToPlanet(nodePlanet, 'type', 'CContainer'),
    addRelativeSpaceship(relativeSpaceship, nodePlanet, direction),
  ])
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

export function createChildText(main: IPlanet, text: string) {
  const commands = text
    .split('')
    .reverse()
    .map((char, index) => {
      const nodePlanet = createPlanet()
      return [
        addMarkToPlanet(nodePlanet, 'type', 'CTextComponent'),
        addMarkToPlanet(nodePlanet, 'content', char),
        addChildSpaceship(main, nodePlanet, 'forward'),
      ]
    })
    .flat()
  runCommandsWithTransation(commands)
}

export function createRelativeText(
  relativeSpaceship: ISpaceship,
  text: string,
) {
  const commands = text
    .split('')
    .reverse()
    .map((char, index) => {
      const nodePlanet = createPlanet()
      return [
        addMarkToPlanet(nodePlanet, 'type', 'CTextComponent'),
        addMarkToPlanet(nodePlanet, 'content', char),
        addRelativeSpaceship(relativeSpaceship, nodePlanet, 'forward'),
      ]
    })
    .flat()
  runCommandsWithTransation(commands)
}
