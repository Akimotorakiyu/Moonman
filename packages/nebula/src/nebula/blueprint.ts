import {
  ISpaceshipBlueprint,
  IPlanetBlueprint,
  IIdentity,
} from '@moonman/blueprint'
import {
  registerPlanetBlueprint,
  registerSpaceshipBlueprint,
} from '@moonman/registration'

export function createPlanetBlueprint(identity: IIdentity): IPlanetBlueprint {
  const blueprint: IPlanetBlueprint = {
    type: 'planetBlueprint',
    identity,
    operations: [],
  }

  registerPlanetBlueprint(blueprint)

  return blueprint
}

export function createSpaceshipBlueprint(
  planetBlueprint: IPlanetBlueprint,
  identity: IIdentity,
): ISpaceshipBlueprint {
  const blueprint: ISpaceshipBlueprint = {
    type: 'spaceshipBlueprint',
    identity,
    operations: [],
    planetId: planetBlueprint.identity,
  }

  registerSpaceshipBlueprint(blueprint)

  return blueprint
}
