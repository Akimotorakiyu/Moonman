import {
  ITransaction,
  TOperationTransform,
  IStep,
  IAddChildSpaceShip,
  IAddRelativeSpaceShip,
  TDirection,
  ISpaceShipBlueprint,
  IPlanetBlueprint,
  ISpaceShip,
  IPlanet,
} from './blueprint'
import { getId } from '../util'
import { messageCenter } from './wave'
import {
  querySpaceship,
  registPlanet,
  registSpaceship,
} from './registrationCenter'
import { reactive } from '@vue/reactivity'
export function createTransaction(): ITransaction {
  return {
    timestamp: Date.now(),
    id: getId(),
    steps: [],
    type: 'transaction',
  }
}

export function createStep(
  aimId: string,
  operationTransform: TOperationTransform,
): IStep {
  return {
    aimId,
    operationTransform,
    type: 'step',
  }
}

export function createAddRelativeSpaceShip(
  transactionId: string,
  spaceShipId: string,
  direction: TDirection,
): IAddRelativeSpaceShip {
  return {
    direction,
    timestamp: Date.now(),
    transactionId,
    spaceShipId,
    type: 'addRelativeSpaceShip',
  }
}

export function createAddChildSpaceShip(
  transactionId: string,
  spaceShipId: string,
  direction: TDirection,
): IAddChildSpaceShip {
  return {
    direction,
    timestamp: Date.now(),
    transactionId,
    spaceShipId,
    type: 'addChildSpaceShip',
  }
}

export function createSpaceShipBlueprint(
  planetId: string,
): ISpaceShipBlueprint {
  return {
    type: 'spaceShipBlueprint',
    id: getId(),
    operationTransform: [],
    planetId,
  }
}

export function createPlanetBlueprint(): IPlanetBlueprint {
  return {
    type: 'planetBlueprint',
    id: getId(),
    operationTransform: [],
  }
}

export function createSpaceShip(
  blueprint: ISpaceShipBlueprint,
  planet: IPlanet,
): ISpaceShip {
  const spaceship: ISpaceShip = reactive({
    type: 'spaceShip',
    blueprint,
    slots: {},
    planet,
  })

  messageCenter.addAction(blueprint.id, (e, step, tr) => {
    if (step.type === 'addRelativeSpaceShip') {
      const _spaceship = querySpaceship(step.spaceShipId)
      let slot = Reflect.get(spaceship.slots, step.direction)
      if (!slot) {
        Reflect.set(spaceship.slots, step.direction, (slot = []))
      }
      slot.push(_spaceship)
    }
  })

  registSpaceship(spaceship)

  return spaceship
}

export function createPlanet(blueprint: IPlanetBlueprint): IPlanet {
  const planet: IPlanet = reactive({
    type: 'planet',
    blueprint,
    children: [],
  })

  messageCenter.addAction(blueprint.id, (e, step, tr) => {
    if (step.type === 'addChildSpaceShip') {
      const spaceship = querySpaceship(step.spaceShipId)

      if (spaceship) {
        planet.children.push(spaceship)
      } else {
        throw new Error('未注册的宇宙飞船')
      }
    }
  })

  registPlanet(planet)

  return planet
}
