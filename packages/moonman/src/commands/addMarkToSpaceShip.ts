import { ISpaceship } from '@moonman/blueprint'
import { defineCommand, addMarkForSpaceship } from '@moonman/transform'

export function addMarkToSpaceShip(spaceship: ISpaceship) {
  return defineCommand((next, tr) => {
    addMarkForSpaceship(tr, spaceship, 'type', 'pargraph')
    next()
    return true
  })
}
