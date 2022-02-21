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
  IAddMark,
} from '@moonman/blueprint'
import { getId } from '../util'
import { messageCenter } from './registrationCenter/wave'
import {
  querySpaceship,
  registerPlanet,
  registerSpaceship,
} from './registrationCenter/registrationCenter'
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
    id: getId(),
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
    id: getId(),
    direction,
    timestamp: Date.now(),
    transactionId,
    spaceShipId,
    type: 'addChildSpaceShip',
  }
}

export function createAddMark<T>(
  transactionId: string,
  name: string,
  value: T,
): IAddMark {
  return {
    id: getId(),
    timestamp: Date.now(),
    type: 'addMark',
    transactionId,
    name,
    value,
  }
}

export function createSpaceShipBlueprint(
  planetId: string,
  id: number = getId(),
): ISpaceShipBlueprint {
  return {
    type: 'spaceShipBlueprint',
    id: getId(),
    operationTransform: [],
    planetId,
  }
}

export function createPlanetBlueprint(id: number = getId()): IPlanetBlueprint {
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
    slots: {
      forward: [],
      backward: [],
    },
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
      spaceship.blueprint.operationTransform.push(step)
    } else if (step.type === 'addMark') {
      // console.log('spaceShip add mark', step)
      spaceship.blueprint.operationTransform.push(step)
    }
  })

  registerSpaceship(spaceship)

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
      planet.blueprint.operationTransform.push(step)

      if (spaceship) {
        planet.children.push(spaceship)
      } else {
        throw new Error('未注册的宇宙飞船')
      }
    } else if (step.type === 'addMark') {
      // console.log('planet add mark', step)
      planet.blueprint.operationTransform.push(step)
    }
  })

  registerPlanet(planet)

  return planet
}
