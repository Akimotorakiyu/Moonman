import { IIdentity } from '@moonman/blueprint'
import { queryPlanetBlueprint } from '@moonman/registration'

export function createGalaxy(spaceshipBluePrintIdentity: IIdentity) {
  const planetBlueprint = queryPlanetBlueprint(spaceshipBluePrintIdentity)
  // const planet =
}
