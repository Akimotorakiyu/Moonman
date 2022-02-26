import { ISpaceship } from '@moonman/blueprint'
import { addMarkForSpaceship } from '@moonman/transform'
import { defineCommand } from '../commandRing'

export function addMarkToSpaceShip(spaceship: ISpaceship) {
  return defineCommand((next, tr) => {
    addMarkForSpaceship(tr, spaceship, 'type', 'pargraph')
    next()
    return true
  })
}
