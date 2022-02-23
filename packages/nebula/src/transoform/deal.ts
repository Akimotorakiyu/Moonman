import {
  IPlanet,
  ISpaceShip,
  ITransaction,
  IPlanetStep,
  ISpaceShipStep,
} from '@moonman/blueprint'
import { queryPlanet, querySpaceship } from '..'

function dealPlanetOperationTransform(
  planet: IPlanet,
  step: IPlanetStep,
  tr: ITransaction,
) {
  const { operationTransform } = step
  planet.blueprint.operationTransform.push(operationTransform)

  if (operationTransform.type === 'addChildSpaceShip') {
    planet.children.push(operationTransform.spaceShipId)
  } else if (operationTransform.type === 'addMark') {
    // todo: 自定义合并支持
    planet.attributes[operationTransform.name] = operationTransform.value
  } else {
    throw 'unknow operationTransform type for planet'
  }
}

function dealSpaceShipOperationTransform(
  spaceship: ISpaceShip,
  step: ISpaceShipStep,
  tr: ITransaction,
) {
  const { operationTransform } = step
  spaceship.blueprint.operationTransform.push(operationTransform)

  if (operationTransform.type === 'addRelativeSpaceShip') {
    if (operationTransform.direction === 'backward') {
      spaceship.slots.backward.push(operationTransform.spaceShipId)
    } else {
      spaceship.slots.forward.unshift(operationTransform.spaceShipId)
    }
  } else if (operationTransform.type === 'addMark') {
    // todo: 自定义合并支持
    spaceship.attributes[operationTransform.name] = operationTransform.value
  } else if (operationTransform.type === 'transferSpaceShip') {
    spaceship.attributes['moveTo'] = operationTransform.nextSpaceShipId
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
      case 'spaceShipStep':
        const spaceship = querySpaceship(step.aimId)
        if (spaceship) {
          dealSpaceShipOperationTransform(spaceship, step, tr)
        }
        break

      default:
        throw 'you need to assign step type'
    }
  })
}
