import {
  IPlanet,
  runCommandsWithTransation,
  doTransation,
  defineCommand,
} from '@moonman/moonman'
import { reactive, ref } from 'vue'
import { defineStateSuite } from '../func/defineState'

import {
  addMarkForPlantOrSpaceship,
  createAndAddRelativeSpaceship,
  createDocument,
  createPlanetAndConnectPlant,
  ISpaceship,
  TDirection,
} from '@moonman/moonman'

const addMarkCommand = defineCommand(
  (aim: IPlanet | ISpaceship, name: string, value: unknown) => (next, tr) => {
    addMarkForPlantOrSpaceship(tr, aim, name, value)
    next()
    return true
  },
)

export const ediotrStateFactory = defineStateSuite(() => {
  const doc = createDocument()
  const status = reactive({
    currentSpaceship: doc,
  })

  const setCurrentSpaceship = (spaceship: ISpaceship) => {
    status.currentSpaceship = spaceship
  }

  const inputingValyue = ref('')

  const addChild = () => {
    const spaceship = doTransation((tr) => {
      const spaceship = createPlanetAndConnectPlant(
        tr,
        status.currentSpaceship.planet,
      )
      addMarkForPlantOrSpaceship(tr, spaceship.planet, 'type', 'CContainer')
      return spaceship
    })

    setCurrentSpaceship(spaceship)
  }

  const addBrother = (direction: TDirection, content?: string) => {
    const spaceship = doTransation((tr) => {
      let spaceship: ISpaceship | null = null
      if (content) {
        console.log('asdasd', [...content])
        ;[...content].forEach((text) => {
          spaceship = createAndAddRelativeSpaceship(
            tr,
            status.currentSpaceship,
            direction,
            text,
          )
          addMarkForPlantOrSpaceship(
            tr,
            spaceship.planet,
            'type',
            'TextComponent',
          )
          addMarkForPlantOrSpaceship(tr, spaceship.planet, 'content', text)
        })
      } else {
        spaceship = createAndAddRelativeSpaceship(
          tr,
          status.currentSpaceship,
          direction,
          content,
        )

        addMarkForPlantOrSpaceship(tr, spaceship.planet, 'type', 'CContainer')
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
      const spaceship = createAndAddRelativeSpaceship(
        tr,
        status.currentSpaceship,
        direction,
      )
      addMarkForPlantOrSpaceship(tr, spaceship.planet, 'type', 'image')
      addMarkForPlantOrSpaceship(tr, spaceship.planet, 'src', content)

      return spaceship
    })

    setCurrentSpaceship(spaceship)
  }

  const addMark = (aim: IPlanet | ISpaceship, name: string, value: unknown) => {
    runCommandsWithTransation([addMarkCommand(aim, name, value)])
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
