import { IPlanet, ISpaceship } from '@moonman/blueprint'

export function mergeMark(
  center: IPlanet | ISpaceship,
  atrrs: Record<string, unknown>,
) {
  center.blueprint.operations.forEach((operation) => {
    if (operation.type === 'addMark') {
      atrrs[operation.name] = operation.value
    }
  })
}
