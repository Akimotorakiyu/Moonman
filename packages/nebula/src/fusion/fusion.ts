import {
  ISpaceShipBlueprint,
  IPlanetBlueprint,
  TSpaceShipOperationTransform,
  TPlanetOperationTransform,
  TOperationTransform,
  IIdentity,
} from '@moonman/blueprint'

import { zipFusion } from './zipFusionAlgorithm'
import { createPlanetBlueprint, createSpaceShipBlueprint } from '..'

// todo: 使用二分查找 插入法，对有大量操作，加入少量插入的情况进行优化
export function fusionTOperationTransform(
  opList1: TOperationTransform[],
  opList2: TOperationTransform[],
) {
  return zipFusion(opList1, opList2, (value1, value2) => {
    return (
      value2.identity.timestamp - value1.identity.timestamp ||
      value2.identity.id - value1.identity.id
    )
  })
}

export function fusionSpaceshipBlueprint(
  spaceship1: ISpaceShipBlueprint,
  spaceship2: ISpaceShipBlueprint,
): ISpaceShipBlueprint {
  if (!isTheSameIdentity(spaceship1.identity, spaceship2.identity)) {
    throw 'only the same spaceship blueprint can be fusioned'
  }

  const fusionedOpList = fusionTOperationTransform(
    spaceship1.operationTransform,
    spaceship2.operationTransform,
  )

  const fusionedSpaceship = createSpaceShipBlueprint(
    spaceship1.planetId,
    spaceship1.identity,
  )

  fusionedSpaceship.operationTransform =
    fusionedOpList as TSpaceShipOperationTransform[]
  return fusionedSpaceship
}

export function isTheSameIdentity(id0: IIdentity, id1: IIdentity) {
  return id0.timestamp === id1.timestamp && id0.id === id1.id
}

export function fusionPlanetBlueprint(
  planetship1: IPlanetBlueprint,
  planetship2: IPlanetBlueprint,
): IPlanetBlueprint {
  if (!isTheSameIdentity(planetship1.identity, planetship2.identity)) {
    throw 'only the same planet blueprint can be fusioned'
  }

  const fusionedOpList = fusionTOperationTransform(
    planetship1.operationTransform,
    planetship2.operationTransform,
  )

  const fusionedSpaceship = createPlanetBlueprint(planetship1.identity)

  fusionedSpaceship.operationTransform =
    fusionedOpList as TPlanetOperationTransform[]
  return fusionedSpaceship
}
