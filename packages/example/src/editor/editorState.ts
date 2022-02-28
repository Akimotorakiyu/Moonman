import {
  TDirection,
  IPlanetBlueprint,
  ISpaceshipBlueprint,
} from '@moonman/blueprint'
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
      spaceshipBlueprint: doc.spaceshipBlueprint,
      planetBlueprint: doc.planetBlueprint,
    },
  })

  const setCurrentSpaceship = (
    spaceshipBlueprint: ISpaceshipBlueprint,
    planetBlueprint: IPlanetBlueprint,
  ) => {
    status.current.spaceshipBlueprint = spaceshipBlueprint
    status.current.planetBlueprint = planetBlueprint
  }

  const addChild = (type: string, direction: TDirection) => {
    return createChildParagraph(status.current.planetBlueprint, direction)
  }

  const addBrother = (type: string, direction: TDirection) => {
    return createRelativeParagraph(status.current.spaceshipBlueprint, direction)
  }

  const addChildText = (text: string, direction: TDirection) => {
    return createChildText(status.current.planetBlueprint, text, direction)
  }
  const addBrotherText = (text: string, direction: TDirection) => {
    return createRelativeText(
      status.current.spaceshipBlueprint,
      text,
      direction,
    )
  }

  const inputingValue = ref('')

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
