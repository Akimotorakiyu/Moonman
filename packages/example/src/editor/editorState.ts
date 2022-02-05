import { reactive } from 'vue'
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

  const addChild = () => {
    const tr = createTransaction()
    const spaceship = createPlanetAndConnectPlant(
      tr,
      status.currentSpaceship.planet,
    )

    addMarkForPlantOrSpaceShip(
      tr,
      spaceship,
      '',
      'id: ' + spaceship.blueprint.id,
    )

    tr.steps.forEach((s) => {
      messageCenter.dispatch(s.aimId, s.operationTransform, tr)
    })

    setCurrentSpaceship(spaceship)
  }

  const addBrother = (direction: TDirection, content?: string) => {
    const tr = createTransaction()

    const spaceship = createAndAddRelativeSpaceShip(
      tr,
      status.currentSpaceship,
      direction,
      content,
    )

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
  }

  return reactive({
    status,
    doc,
    addChild,
    setCurrentSpaceship,
    addBrother,
  })
})
