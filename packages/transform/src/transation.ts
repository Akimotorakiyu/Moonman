import { ITransaction } from '@moonman/blueprint'
import { getIdentity } from '@moonman/nebula'
import {
  queryPlanetBlueprint,
  querySpaceshipBlueprint,
} from '@moonman/registration'
import {
  applyPlanetBlueprintOperationTransform,
  applySpaceshipBlueprintOperationTransform,
} from './deal'

export function createTransaction(): ITransaction {
  return {
    identity: getIdentity(),
    steps: [],
    type: 'transaction',
  }
}

export function doTransation<T>(fn: (tr: ITransaction) => T) {
  const tr = createTransaction()
  const result = fn(tr)

  dispatchTransation(tr)

  return result
}

export function dispatchTransation(tr: ITransaction) {
  tr.steps.forEach((step) => {
    switch (step.type) {
      case 'planetStep':
        const planetBlueprint = queryPlanetBlueprint(step.aimId)
        if (planetBlueprint) {
          applyPlanetBlueprintOperationTransform(planetBlueprint, step, tr)
        }

        break
      case 'spaceshipStep':
        const spaceshipBlueprint = querySpaceshipBlueprint(step.aimId)
        if (spaceshipBlueprint) {
          applySpaceshipBlueprintOperationTransform(
            spaceshipBlueprint,
            step,
            tr,
          )
        }
        break

      default:
        throw 'you need to assign step type'
    }
  })
}
