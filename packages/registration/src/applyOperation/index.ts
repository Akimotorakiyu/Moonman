import { ISpaceship } from '@moonman/blueprint/src/blueprint'
import { IPlanet } from '@moonman/blueprint'
import { isTheSameIdentity } from '@moonman/nebula'

export function applyOperationToPlanet(planet: IPlanet) {
  // clear old data
  planet.attributes = {}
  planet.children.length = 0

  // apply Operation
  planet.blueprint.operations.forEach((operationTransform) => {
    if (operationTransform.type === 'addChildSpaceship') {
      if (operationTransform.direction === 'forward') {
        planet.children.unshift(operationTransform.spaceshipId)
      } else {
        planet.children.push(operationTransform.spaceshipId)
      }
    } else if (operationTransform.type === 'addMark') {
      // todo: 自定义合并支持
      planet.attributes[operationTransform.name] = operationTransform.value
    } else {
      throw 'unknow operationTransform type for planet'
    }
  })
}
export function applyOperationToSpaceship(spaceship: ISpaceship) {
  // clear old data
  spaceship.attributes = {}
  Object.values(spaceship.slots).forEach((slot) => {
    slot.length = 0
  })

  // apply Operation
  spaceship.blueprint.operations.forEach((operationTransform) => {
    if (operationTransform.type === 'addRelativeSpaceship') {
      if (operationTransform.direction === 'forward') {
        spaceship.slots.forward.unshift(operationTransform.spaceshipId)
      } else {
        spaceship.slots.backward.push(operationTransform.spaceshipId)
      }
    } else if (operationTransform.type === 'addMark') {
      // todo: 自定义合并支持
      spaceship.attributes[operationTransform.name] = operationTransform.value
    } else if (operationTransform.type === 'transferSpaceship') {
      if (
        isTheSameIdentity(
          operationTransform.toSpaceshipId,
          spaceship.blueprint.identity,
        )
      ) {
        spaceship.attributes['transferSrc'] = true
      }

      if (
        isTheSameIdentity(
          operationTransform.toSpaceshipId,
          spaceship.blueprint.identity,
        )
      ) {
        spaceship.attributes['transferIn'] = true
      } else if (
        isTheSameIdentity(
          operationTransform.fromSpaceshipId,
          spaceship.blueprint.identity,
        )
      ) {
        spaceship.attributes['transferOut'] = true
      } else {
        throw 'unknow transfer'
      }
    } else {
      throw 'unknow operationTransform type for spaceship'
    }
  })
}
