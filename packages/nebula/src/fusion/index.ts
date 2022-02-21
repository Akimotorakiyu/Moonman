import {
  ISpaceShipBlueprint,
  IPlanetBlueprint,
  TSpaceShipOperationTransform,
  TPlanetOperationTransform,
} from '@moonman/blueprint'
import { createPlanetBlueprint, createSpaceShipBlueprint } from '..'
import { fusionTOperationTransform } from './fusion'

export function fusionSpaceshipBlueprint(
  spaceship1: ISpaceShipBlueprint,
  spaceship2: ISpaceShipBlueprint,
): ISpaceShipBlueprint {
  if (spaceship1.id !== spaceship2.id) {
    throw 'only the same spaceship blueprint can be fusioned'
  }

  const fusionedOpList = fusionTOperationTransform(
    spaceship1.operationTransform,
    spaceship2.operationTransform,
  )

  const fusionedSpaceship = createSpaceShipBlueprint(
    spaceship1.planetId,
    spaceship1.id,
  )

  fusionedSpaceship.operationTransform =
    fusionedOpList as TSpaceShipOperationTransform[]
  return fusionedSpaceship
}

export function fusionPlanetBlueprint(
  planetship1: IPlanetBlueprint,
  planetship2: IPlanetBlueprint,
): IPlanetBlueprint {
  if (planetship1.id !== planetship2.id) {
    throw 'only the same planet blueprint can be fusioned'
  }

  const fusionedOpList = fusionTOperationTransform(
    planetship1.operationTransform,
    planetship2.operationTransform,
  )

  const fusionedSpaceship = createPlanetBlueprint(planetship1.id)

  fusionedSpaceship.operationTransform =
    fusionedOpList as TPlanetOperationTransform[]
  return fusionedSpaceship
}
