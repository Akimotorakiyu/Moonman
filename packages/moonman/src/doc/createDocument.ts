import {
  addMarkToPlanetBlueprint,
  addChildSpaceshipBlueprint,
  addRelativeSpaceshipBlueprint,
} from '@moonman/command'
import { runCommandsWithTransation } from '@moonman/command'
import {
  IPlanet,
  IPlanetBlueprint,
  ISpaceship,
  ISpaceshipBlueprint,
  TDirection,
} from '@moonman/blueprint'
import { getIdentity } from '@moonman/nebula'
import {
  createAndRegisterPlanet,
  createAndRegisterSpaceship,
} from '@moonman/registration'

export function createDocument() {
  console.log('createDocument')
  const nodePlanet = createAndRegisterPlanet()
  const nodeSpaceship = createAndRegisterSpaceship(nodePlanet.blueprint)

  runCommandsWithTransation([
    addMarkToPlanetBlueprint(nodePlanet.blueprint, 'type', 'CDocument'),
  ])

  return {
    spaceship: nodeSpaceship,
    planet: nodePlanet,
  }
}

export function createChildParagraph(
  main: IPlanetBlueprint,
  direction: TDirection,
) {
  const nodePlanet = createAndRegisterPlanet()
  const nodeSpaceship = createAndRegisterSpaceship(nodePlanet.blueprint)

  runCommandsWithTransation([
    addMarkToPlanetBlueprint(nodePlanet.blueprint, 'type', 'CContainer'),
    addChildSpaceshipBlueprint(main, nodeSpaceship.blueprint, direction),
  ])

  return {
    spaceship: nodeSpaceship,
    planet: nodePlanet,
  }
}

export function createRelativeParagraph(
  relativeSpaceship: ISpaceshipBlueprint,
  direction: TDirection,
) {
  const nodePlanet = createAndRegisterPlanet()
  const nodeSpaceship = createAndRegisterSpaceship(nodePlanet.blueprint)

  runCommandsWithTransation([
    addMarkToPlanetBlueprint(nodePlanet.blueprint, 'type', 'CContainer'),
    addRelativeSpaceshipBlueprint(
      relativeSpaceship,
      nodeSpaceship.blueprint,
      direction,
    ),
  ])
  return {
    spaceship: nodeSpaceship,
    planet: nodePlanet,
  }
}

export function createChildText(
  main: IPlanetBlueprint,
  text: string,
  direction: TDirection,
) {
  let nodePlanet: IPlanet
  let nodeSpaceship: ISpaceship

  const commands = text
    .split('')
    .reverse()
    .map((char) => {
      nodePlanet = createAndRegisterPlanet()
      nodeSpaceship = createAndRegisterSpaceship(nodePlanet.blueprint)

      return [
        addMarkToPlanetBlueprint(
          nodePlanet.blueprint,
          'type',
          'CTextComponent',
        ),
        addMarkToPlanetBlueprint(nodePlanet.blueprint, 'content', char),
        addChildSpaceshipBlueprint(main, nodeSpaceship.blueprint, direction),
      ]
    })
    .flat()
  runCommandsWithTransation(commands)

  return {
    spaceship: nodeSpaceship!,
    planet: nodePlanet!,
  }
}

export function createRelativeText(
  _relativeSpaceship: ISpaceship,
  text: string,
  direction: TDirection,
) {
  let relativeSpaceship: ISpaceship = _relativeSpaceship

  let nodePlanet: IPlanet
  let nodeSpaceship: ISpaceship = _relativeSpaceship

  const commands = text
    .split('')
    .map((char, index) => {
      relativeSpaceship = nodeSpaceship

      nodePlanet = createAndRegisterPlanet()
      nodeSpaceship = createAndRegisterSpaceship(nodePlanet.blueprint)

      return [
        addMarkToPlanetBlueprint(
          nodePlanet.blueprint,
          'type',
          'CTextComponent',
        ),
        addMarkToPlanetBlueprint(nodePlanet.blueprint, 'content', char),
        addRelativeSpaceshipBlueprint(
          relativeSpaceship.blueprint,
          nodeSpaceship.blueprint,
          direction,
        ),
      ]
    })
    .flat()
  runCommandsWithTransation(commands)

  return {
    spaceship: nodeSpaceship!,
    planet: nodePlanet!,
  }
}
