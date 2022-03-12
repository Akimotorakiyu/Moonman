import { IIdentity } from '@moonman/blueprint'
import {
  queryPlanet,
  queryPlanetBlueprint,
  querySpaceship,
  querySpaceshipBlueprint,
} from '@moonman/registration'

import {
  createPlanetByBlueprint,
  createSpaceshipByBlueprint,
} from '@moonman/nebula'

export function createGalaxy(spaceshipBluePrintIdentity: IIdentity) {
  // const spaceshipBlueprint = querySpaceshipBlueprint(spaceshipBluePrintIdentity)
  // // mark: 需要先创建一次 planet，防止在 创建 spaceship 时  planet 不存在
  // // todo: 优化实现
  // createPlanetByBlueprint(queryPlanetBlueprint(spaceshipBlueprint.planetId))
  // createSpaceshipByBlueprint(spaceshipBlueprint)
  // const spaceship = querySpaceship(spaceshipBluePrintIdentity)
  // const planet = queryPlanet(spaceshipBluePrintIdentity)
  // return {
  //   spaceship,
  //   planet,
  // }
}
