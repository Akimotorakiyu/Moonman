import { TDirection, ISpaceship, IPlanet } from '@moonman/blueprint'
import {
  createChildParagraph,
  createChildText,
  createRelativeParagraph,
  createRelativeText,
} from '@moonman/moonman'
import { createDocument } from '@moonman/moonman'
import { reactive, ref } from 'vue'
import { defineStateSuite } from '../func/defineState'

export const ediotrStateFactory = defineStateSuite(() => {
  const doc = createDocument()
  const status = reactive({
    current: {
      spaceship: doc.spaceship,
      planet: doc.planet,
    },
  })

  const setCurrentSpaceship = (
    spaceshipBlueprint: ISpaceship,
    planetBlueprint: IPlanet,
  ) => {
    status.current.spaceship = spaceshipBlueprint
    status.current.planet = planetBlueprint
  }

  const addChild = (type: string, direction: TDirection) => {
    return createChildParagraph(status.current.planet.blueprint, direction)
  }

  const addBrother = (type: string, direction: TDirection) => {
    return createRelativeParagraph(
      status.current.spaceship.blueprint,
      direction,
    )
  }

  const addChildText = (text: string, direction: TDirection) => {
    return createChildText(status.current.planet.blueprint, text, direction)
  }
  const addBrotherText = (text: string, direction: TDirection) => {
    return createRelativeText(status.current.spaceship, text, direction)
  }

  const inputingValue = ref('')

  console.log('status', status)

  return reactive({
    status,
    doc,
    setCurrentSpaceship,
    inputingValue,
    addChild,
    addBrother,
    addChildText,
    addBrotherText,
  })
})
