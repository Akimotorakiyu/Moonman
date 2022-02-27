import {
  ITransaction,
  IPlanetStep,
  ISpaceshipStep,
  IPlanetBlueprint,
  ISpaceshipBlueprint,
} from '@moonman/blueprint'

export function applyPlanetBlueprintOperationTransform(
  planetBlueprint: IPlanetBlueprint,
  step: IPlanetStep,
  tr: ITransaction,
) {
  const { operation: operationTransform } = step
  planetBlueprint.operations.push(operationTransform)

  // todo: move planet and spaceship update
  // if (operationTransform.type === 'addChildSpaceship') {
  //   if (operationTransform.direction === 'forward') {
  //     planet.children.unshift(operationTransform.spaceshipId)
  //   } else {
  //     planet.children.push(operationTransform.spaceshipId)
  //   }
  // } else if (operationTransform.type === 'addMark') {
  //   // todo: 自定义合并支持
  //   planet.attributes[operationTransform.name] = operationTransform.value
  // } else {
  //   throw 'unknow operationTransform type for planet'
  // }
}

export function applySpaceshipBlueprintOperationTransform(
  spaceshipBlueprint: ISpaceshipBlueprint,
  step: ISpaceshipStep,
  tr: ITransaction,
) {
  const { operation: operationTransform } = step
  spaceshipBlueprint.operations.push(operationTransform)

  // todo: move planet and spaceship update
  // if (operationTransform.type === 'addRelativeSpaceship') {
  //   if (operationTransform.direction === 'forward') {
  //     spaceship.slots.forward.unshift(operationTransform.spaceshipId)
  //   } else {
  //     spaceship.slots.backward.push(operationTransform.spaceshipId)
  //   }
  // } else if (operationTransform.type === 'addMark') {
  //   // todo: 自定义合并支持
  //   spaceship.attributes[operationTransform.name] = operationTransform.value
  // } else if (operationTransform.type === 'transferSpaceship') {
  //   if (
  //     isTheSameIdentity(
  //       operationTransform.toSpaceshipId,
  //       spaceship.blueprint.identity,
  //     )
  //   ) {
  //     spaceship.attributes['transferSrc'] = true
  //   }

  //   if (
  //     isTheSameIdentity(
  //       operationTransform.toSpaceshipId,
  //       spaceship.blueprint.identity,
  //     )
  //   ) {
  //     spaceship.attributes['transferIn'] = true
  //   } else if (
  //     isTheSameIdentity(
  //       operationTransform.fromSpaceshipId,
  //       spaceship.blueprint.identity,
  //     )
  //   ) {
  //     spaceship.attributes['transferOut'] = true
  //   } else {
  //     throw 'unknow transfer'
  //   }
  // } else {
  //   throw 'unknow operationTransform type for spaceship'
  // }
}
