import { IPlanet } from '@moonman/moonman'
import { reactive, ref } from 'vue'
import { defineStateSuite } from '../func/defineState'

import {
  addMarkForPlantOrSpaceShip,
  createAndAddRelativeSpaceShip,
  createDocument,
  createPlanetAndConnectPlant,
  createTransaction,
  ISpaceShip,
  messageCenter,
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
    const tr = createTransaction()
    const spaceship = createPlanetAndConnectPlant(
      tr,
      status.currentSpaceship.planet,
    )

    addMarkForPlantOrSpaceShip(tr, spaceship.planet, 'type', 'CContainer')

    tr.steps.forEach((s) => {
      messageCenter.dispatch(s.aimId, s.operationTransform, tr)
    })

    setCurrentSpaceship(spaceship)
  }

  const addBrother = (direction: TDirection, content?: string) => {
    const tr = createTransaction()
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

    if (spaceship) {
      addMarkForPlantOrSpaceShip(
        tr,
        spaceship.planet,
        '',
        'id: ' + spaceship.planet.blueprint.id,
      )

      tr.steps.forEach((s) => {
        messageCenter.dispatch(s.aimId, s.operationTransform, tr)
      })

      setCurrentSpaceship(spaceship)
    } else {
      throw new Error('no spaceship created')
    }
  }

  const addImageBrother = (direction: TDirection, content?: string) => {
    const tr = createTransaction()

    const spaceship = createAndAddRelativeSpaceShip(
      tr,
      status.currentSpaceship,
      direction,
    )

    addMarkForPlantOrSpaceShip(tr, spaceship.planet, 'type', 'image')
    addMarkForPlantOrSpaceShip(tr, spaceship.planet, 'src', content)

    tr.steps.forEach((s) => {
      messageCenter.dispatch(s.aimId, s.operationTransform, tr)
    })

    setCurrentSpaceship(spaceship)
  }

  const addMark = (aim: IPlanet | ISpaceShip, name: string, value: unknown) => {
    const tr = createTransaction()

    console.log('mark delete')
    addMarkForPlantOrSpaceShip(tr, aim, name, value)
    tr.steps.forEach((s) => {
      messageCenter.dispatch(s.aimId, s.operationTransform, tr)
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
