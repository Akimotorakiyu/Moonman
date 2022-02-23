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
  IIdentity,
} from '@moonman/blueprint'
import { getIdentity } from '../util'
import { messageCenter } from './registrationCenter/wave'
import {
  getTimestampAndIdCombineKey,
  querySpaceship,
  registerPlanet,
  registerSpaceship,
} from './registrationCenter/registrationCenter'
import { reactive } from '@vue/reactivity'
export function createTransaction(): ITransaction {
  return {
    identity: getIdentity(),
    steps: [],
    type: 'transaction',
  }
}

export function createStep(
  aimId: IIdentity,
  operationTransform: TOperationTransform,
): IStep {
  return {
    aimId,
    operationTransform,
    type: 'step',
  }
}

export function createAddRelativeSpaceShip(
  transactionId: IIdentity,
  spaceShipId: IIdentity,
  direction: TDirection,
): IAddRelativeSpaceShip {
  return {
    identity: getIdentity(),
    direction,
    transactionId,
    spaceShipId,
    type: 'addRelativeSpaceShip',
  }
}

export function createAddChildSpaceShip(
  transactionId: IIdentity,
  spaceShipId: IIdentity,
  direction: TDirection,
): IAddChildSpaceShip {
  return {
    identity: getIdentity(),
    direction,
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
    identity: getIdentity(),
    type: 'addMark',
    transactionId,
    name,
    value,
  }
}

export function createSpaceShipBlueprint(
  planetId: IIdentity,
  identity: IIdentity = getIdentity(),
): ISpaceShipBlueprint {
  return {
    type: 'spaceShipBlueprint',
    identity,
    operationTransform: [],
    planetId,
  }
}

export function createPlanetBlueprint(
  identity: IIdentity = getIdentity(),
): IPlanetBlueprint {
  return {
    type: 'planetBlueprint',
    identity,
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

  messageCenter.addAction(
    getTimestampAndIdCombineKey(blueprint.identity),
    (e, step, tr) => {
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
    },
  )

  registerSpaceship(spaceship)

  return spaceship
}

export function createPlanet(blueprint: IPlanetBlueprint): IPlanet {
  const planet: IPlanet = reactive({
    type: 'planet',
    blueprint,
    children: [],
  })

  messageCenter.addAction(
    getTimestampAndIdCombineKey(blueprint.identity),
    (e, step, tr) => {
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
    },
  )

  registerPlanet(planet)

  return planet
}
