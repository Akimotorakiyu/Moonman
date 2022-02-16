import { IPlanet, ISpaceShip } from '@moonman/blueprint'

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
