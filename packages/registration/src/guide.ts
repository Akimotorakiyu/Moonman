import {
  IIdentity,
  IPlanetBlueprint,
  ISpaceshipBlueprint,
} from '@moonman/blueprint'
import {
  createPlanetBlueprint,
  createPlanetByBlueprint,
  createSpaceshipBlueprint,
  createSpaceshipByBlueprint,
  getIdentity,
} from '@moonman/nebula'
import { effect, reactive } from '@vue/reactivity'
import {
  applyOperationToPlanet,
  applyOperationToSpaceship,
} from './applyOperation'
import { tryQueryPlanet, tryQuerySpaceship } from './query'
import {
  registerPlanet,
  registerPlanetBlueprint,
  registerSpaceship,
  registerSpaceshipBlueprint,
} from './register'

export function registerPlanetGuide(_planetBlueprint: IPlanetBlueprint) {
  const prePlanet = tryQueryPlanet(_planetBlueprint.identity)
  if (prePlanet) {
    return prePlanet
  } else {
    const planetBlueprint = reactive(_planetBlueprint)
    registerPlanetBlueprint(planetBlueprint)
    const planet = reactive(createPlanetByBlueprint(planetBlueprint))
    registerPlanet(planet)
    effect(() => {
      applyOperationToPlanet(planet)
    })

    return planet
  }
}

export function registerSpaceshipGuide(
  _spaceshipBlueprint: ISpaceshipBlueprint,
) {
  const preSpaceship = tryQuerySpaceship(_spaceshipBlueprint.identity)
  if (preSpaceship) {
    return preSpaceship
  } else {
    const spaceshipBlueprint = reactive(_spaceshipBlueprint)
    registerSpaceshipBlueprint(spaceshipBlueprint)
    const spaceship = reactive(createSpaceshipByBlueprint(spaceshipBlueprint))
    registerSpaceship(spaceship)

    effect(() => {
      applyOperationToSpaceship(spaceship)
    })

    return spaceship
  }
}

export function createAndRegisterPlanet() {
  const planetBlueprint = createPlanetBlueprint(getIdentity())
  return registerPlanetGuide(planetBlueprint)
}
export function createAndRegisterSpaceship(planetBlueprint: IPlanetBlueprint) {
  const spaceship = createSpaceshipBlueprint(planetBlueprint, getIdentity())
  return registerSpaceshipGuide(spaceship)
}
