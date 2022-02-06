import { IPlanet, ISpaceShip } from '@moonman/core'

export function mergeMark(
  center: IPlanet | ISpaceShip,
  atrrs: Record<string, unknown>,
) {
  center.blueprint.operationTransform.forEach((operation) => {
    if (operation.type === 'addMark') {
      atrrs[operation.name] = operation.value
    }
  })
}
