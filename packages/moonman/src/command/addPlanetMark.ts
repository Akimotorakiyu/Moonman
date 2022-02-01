import {
  ITransaction,
  IPlanet,
  createAddMark,
  createStep,
  ISpaceShip,
} from '../nebula'

export function addMarkForPlantOrSpaceShip<T>(
  tr: ITransaction,
  planetOrSpaceShip: IPlanet | ISpaceShip,
  name: string,
  value: T,
) {
  const addMarkOp = createAddMark(tr.id, name, value)
  const step = createStep(planetOrSpaceShip.blueprint.id, addMarkOp)
  tr.steps.push(step)
}
