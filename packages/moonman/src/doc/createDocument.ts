import {
  addMarkToPlanetBlueprint,
  addChildSpaceshipBlueprint,
  addRelativeSpaceshipBlueprint,
} from '@moonman/command'
import { runCommandsWithTransation } from '@moonman/command'
import {
  IPlanetBlueprint,
  ISpaceshipBlueprint,
  TDirection,
} from '@moonman/blueprint'
import {
  createPlanetBlueprint,
  createSpaceshipBlueprint,
  getIdentity,
} from '@moonman/nebula'

export function createDocument() {
  console.log('createDocument')
  const nodePlanetBlueprint = createPlanetBlueprint(getIdentity())
  const nodeSpaceshipBlueprint = createSpaceshipBlueprint(
    nodePlanetBlueprint,
    getIdentity(),
  )

  runCommandsWithTransation([
    addMarkToPlanetBlueprint(nodePlanetBlueprint, 'type', 'CDocument'),
  ])

  return {
    spaceshipBlueprint: nodeSpaceshipBlueprint,
    planetBlueprint: nodePlanetBlueprint,
  }
}

export function createChildParagraph(
  main: IPlanetBlueprint,
  direction: TDirection,
) {
  const nodePlanetBlueprint = createPlanetBlueprint(getIdentity())
  const nodeSpaceshipBlueprint = createSpaceshipBlueprint(
    nodePlanetBlueprint,
    getIdentity(),
  )

  runCommandsWithTransation([
    addMarkToPlanetBlueprint(nodePlanetBlueprint, 'type', 'CContainer'),
    addChildSpaceshipBlueprint(main, nodeSpaceshipBlueprint, direction),
  ])

  return {
    spaceshipBlueprint: nodeSpaceshipBlueprint,
    planetBlueprint: nodePlanetBlueprint,
  }
}

export function createRelativeParagraph(
  relativeSpaceship: ISpaceshipBlueprint,
  direction: TDirection,
) {
  const nodePlanetBlueprint = createPlanetBlueprint(getIdentity())
  const nodeSpaceshipBlueprint = createSpaceshipBlueprint(
    nodePlanetBlueprint,
    getIdentity(),
  )

  runCommandsWithTransation([
    addMarkToPlanetBlueprint(nodePlanetBlueprint, 'type', 'CContainer'),
    addRelativeSpaceshipBlueprint(
      relativeSpaceship,
      nodeSpaceshipBlueprint,
      direction,
    ),
  ])
  return {
    spaceshipBlueprint: nodeSpaceshipBlueprint,
    planetBlueprint: nodePlanetBlueprint,
  }
}

export function createChildText(
  main: IPlanetBlueprint,
  text: string,
  direction: TDirection,
) {
  let nodePlanetBlueprint: IPlanetBlueprint
  let nodeSpaceshipBlueprint: ISpaceshipBlueprint

  const commands = text
    .split('')
    .reverse()
    .map((char) => {
      nodePlanetBlueprint = createPlanetBlueprint(getIdentity())
      nodeSpaceshipBlueprint = createSpaceshipBlueprint(
        nodePlanetBlueprint,
        getIdentity(),
      )

      return [
        addMarkToPlanetBlueprint(nodePlanetBlueprint, 'type', 'CTextComponent'),
        addMarkToPlanetBlueprint(nodePlanetBlueprint, 'content', char),
        addChildSpaceshipBlueprint(main, nodeSpaceshipBlueprint, direction),
      ]
    })
    .flat()
  runCommandsWithTransation(commands)

  return {
    spaceshipBlueprint: nodeSpaceshipBlueprint!,
    planetBlueprint: nodePlanetBlueprint!,
  }
}

export function createRelativeText(
  _relativeSpaceship: ISpaceshipBlueprint,
  text: string,
  direction: TDirection,
) {
  let relativeSpaceship = _relativeSpaceship

  let nodePlanetBlueprint: IPlanetBlueprint
  let nodeSpaceshipBlueprint: ISpaceshipBlueprint = _relativeSpaceship

  const commands = text
    .split('')
    .map((char, index) => {
      relativeSpaceship = nodeSpaceshipBlueprint

      nodePlanetBlueprint = createPlanetBlueprint(getIdentity())
      nodeSpaceshipBlueprint = createSpaceshipBlueprint(
        nodePlanetBlueprint,
        getIdentity(),
      )

      return [
        addMarkToPlanetBlueprint(nodePlanetBlueprint, 'type', 'CTextComponent'),
        addMarkToPlanetBlueprint(nodePlanetBlueprint, 'content', char),
        addRelativeSpaceshipBlueprint(
          relativeSpaceship,
          nodeSpaceshipBlueprint,
          direction,
        ),
      ]
    })
    .flat()
  runCommandsWithTransation(commands)

  return {
    spaceshipBlueprint: nodeSpaceshipBlueprint!,
    planetBlueprint: nodePlanetBlueprint!,
  }
}
