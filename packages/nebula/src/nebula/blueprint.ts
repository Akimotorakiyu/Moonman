import {
  ISpaceshipBlueprint,
  IPlanetBlueprint,
  IIdentity,
} from '@moonman/blueprint'

export function createPlanetBlueprint(identity: IIdentity): IPlanetBlueprint {
  return {
    type: 'planetBlueprint',
    identity,
    operations: [],
  }
}

export function createSpaceshipBlueprint(
  planetId: IIdentity,
  identity: IIdentity,
): ISpaceshipBlueprint {
  return {
    type: 'spaceshipBlueprint',
    identity,
    operations: [],
    planetId,
  }
}
