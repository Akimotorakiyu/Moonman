import {
  ISpaceship,
  IPlanet,
  ITransaction,
  createStep,
  createAddMark,
} from '@moonman/nebula'

export function addMarkForPlantOrSpaceship<T>(
  tr: ITransaction,
  planetOrSpaceship: IPlanet | ISpaceship,
  name: string,
  value: T,
) {
  const addMarkOp = createAddMark(tr.id, name, value)
  const step = createStep(planetOrSpaceship.blueprint.id, addMarkOp)
  tr.steps.push(step)
}
