import { ISpaceship } from '@moonman/blueprint'
import { defineCommand, addMarkForSpaceship } from '@moonman/transform'

export const addMarkToSpaceShip = defineCommand(
  (spaceship: ISpaceship) => (next, tr) => {
    addMarkForSpaceship(tr, spaceship, 'type', 'pargraph')
    next()
    return true
  },
)
