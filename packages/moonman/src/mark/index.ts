import { IPlanetBlueprint, ISpaceshipBlueprint } from '@moonman/blueprint'

export function mergeMark(
  center: IPlanetBlueprint | ISpaceshipBlueprint,
  atrrs: Record<string, unknown>,
) {
  center.operations.forEach((operation) => {
    if (operation.type === 'addMark') {
      atrrs[operation.name] = operation.value
    }
  })
}
