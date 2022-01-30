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
import { getId } from './util'
import { messageCenter } from './wave'
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
  messageCenter.addAction(blueprint.id, (e, tr) => {
    console.log(e, tr)
  })

  return {
    type: 'spaceShip',
    blueprint,
    slots: {},
    planet,
  }
}

export function createPlanet(blueprint: IPlanetBlueprint): IPlanet {
  messageCenter.addAction(blueprint.id, (e, tr) => {
    console.log(e, tr)
  })

  return {
    type: 'planet',
    blueprint,
    children: [],
  }
}
