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
} from '@moonman/moonman'

export const ediotrStateFactory = defineStateSuite(() => {
  const doc = createDocument()
  const status = reactive({
    currentSpaceship: doc,
  })

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
  }

  const addBrother = () => {
    const tr = createTransaction()

    const spaceship = createAndAddRelativeSpaceShip(
      tr,
      status.currentSpaceship,
      '你好世界',
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
  }

  const setCurrentSpaceship = (spaceship: ISpaceShip) => {
    status.currentSpaceship = spaceship
  }

  return reactive({
    status,
    doc,
    addChild,
    setCurrentSpaceship,
    addBrother,
  })
})
