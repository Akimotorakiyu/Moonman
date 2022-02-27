import { ISpaceshipBlueprint } from '@moonman/blueprint'
import { addMarkForSpaceship } from '@moonman/transform'
import { defineCommand } from '../commandRing'

export function addMarkToSpaceShipBlueprint(spaceship: ISpaceshipBlueprint) {
  return defineCommand((next, tr) => {
    addMarkForSpaceship(tr, spaceship, 'type', 'pargraph')
    next()
    return true
  })
}
