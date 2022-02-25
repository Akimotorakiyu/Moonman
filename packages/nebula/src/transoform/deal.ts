import {
  IPlanet,
  ISpaceship,
  ITransaction,
  IPlanetStep,
  ISpaceshipStep,
} from '@moonman/blueprint'
import { queryPlanet, querySpaceship } from '@moonman/registration'
import { isTheSameIdentity } from '../util'

function dealPlanetOperationTransform(
  planet: IPlanet,
  step: IPlanetStep,
  tr: ITransaction,
) {
  const { operation: operationTransform } = step
  planet.blueprint.operations.push(operationTransform)

  if (operationTransform.type === 'addChildSpaceship') {
    planet.children.push(operationTransform.spaceshipId)
  } else if (operationTransform.type === 'addMark') {
    // todo: 自定义合并支持
    planet.attributes[operationTransform.name] = operationTransform.value
  } else {
    throw 'unknow operationTransform type for planet'
  }
}

function dealSpaceshipOperationTransform(
  spaceship: ISpaceship,
  step: ISpaceshipStep,
  tr: ITransaction,
) {
  const { operation: operationTransform } = step
  spaceship.blueprint.operations.push(operationTransform)

  if (operationTransform.type === 'addRelativeSpaceship') {
    if (operationTransform.direction === 'backward') {
      spaceship.slots.backward.push(operationTransform.spaceshipId)
    } else {
      spaceship.slots.forward.unshift(operationTransform.spaceshipId)
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
}

export function dispatchTransation(tr: ITransaction) {
  tr.steps.forEach((step) => {
    switch (step.type) {
      case 'planetStep':
        const planet = queryPlanet(step.aimId)
        if (planet) {
          dealPlanetOperationTransform(planet, step, tr)
        }

        break
      case 'spaceshipStep':
        const spaceship = querySpaceship(step.aimId)
        if (spaceship) {
          dealSpaceshipOperationTransform(spaceship, step, tr)
        }
        break

      default:
        throw 'you need to assign step type'
    }
  })
}
