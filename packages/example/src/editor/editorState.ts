import { IPlanet, dispatchTransation, doTransation } from '@moonman/moonman'
import { reactive, ref } from 'vue'
import { defineStateSuite } from '../func/defineState'

import {
  addMarkForPlantOrSpaceShip,
  createAndAddRelativeSpaceShip,
  createDocument,
  createPlanetAndConnectPlant,
  ISpaceShip,
  TDirection,
} from '@moonman/moonman'

export const ediotrStateFactory = defineStateSuite(() => {
  const doc = createDocument()
  const status = reactive({
    currentSpaceship: doc,
  })

  const setCurrentSpaceship = (spaceship: ISpaceShip) => {
    status.currentSpaceship = spaceship
  }

  const inputingValyue = ref('')

  const addChild = () => {
    const spaceship = doTransation((tr) => {
      const spaceship = createPlanetAndConnectPlant(
        tr,
        status.currentSpaceship.planet,
      )
      addMarkForPlantOrSpaceShip(tr, spaceship.planet, 'type', 'CContainer')
      return spaceship
    })

    setCurrentSpaceship(spaceship)
  }

  const addBrother = (direction: TDirection, content?: string) => {
    const spaceship = doTransation((tr) => {
      let spaceship: ISpaceShip | null = null
      if (content) {
        console.log('asdasd', [...content])
        ;[...content].forEach((text) => {
          spaceship = createAndAddRelativeSpaceShip(
            tr,
            status.currentSpaceship,
            direction,
            text,
          )
          addMarkForPlantOrSpaceShip(
            tr,
            spaceship.planet,
            'type',
            'TextComponent',
          )
          addMarkForPlantOrSpaceShip(tr, spaceship.planet, 'src', text)
        })
      } else {
        spaceship = createAndAddRelativeSpaceShip(
          tr,
          status.currentSpaceship,
          direction,
          content,
        )

        addMarkForPlantOrSpaceShip(tr, spaceship.planet, 'type', 'CContainer')
      }

      if (!spaceship) {
        throw new Error('no spaceship created')
      }
      return spaceship
    })

    setCurrentSpaceship(spaceship)
  }

  const addImageBrother = (direction: TDirection, content?: string) => {
    const spaceship = doTransation((tr) => {
      const spaceship = createAndAddRelativeSpaceShip(
        tr,
        status.currentSpaceship,
        direction,
      )
      addMarkForPlantOrSpaceShip(tr, spaceship.planet, 'type', 'image')
      addMarkForPlantOrSpaceShip(tr, spaceship.planet, 'src', content)

      return spaceship
    })

    setCurrentSpaceship(spaceship)
  }

  const addMark = (aim: IPlanet | ISpaceShip, name: string, value: unknown) => {
    doTransation((tr) => {
      console.log('mark delete')
      addMarkForPlantOrSpaceShip(tr, aim, name, value)
    })
  }

  return reactive({
    status,
    doc,
    addChild,
    setCurrentSpaceship,
    addBrother,
    inputingValyue,
    addImageBrother,
    addMark,
  })
})
