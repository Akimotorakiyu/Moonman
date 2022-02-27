import {
  createChildParagraph,
  createChildText,
  createRelativeParagraph,
  createRelativeText,
  IPlanetBlueprint,
  ISpaceshipBlueprint,
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

  const addChild = () => {
    createChildParagraph(status.current.planetBlueprint, 'forward')
  }

  const addBrother = () => {
    createRelativeParagraph(status.current.spaceshipBlueprint, 'forward')
  }

  const addChildText = (text: string) => {
    createChildText(status.current.planetBlueprint, text)
  }
  const addBrotherText = (text: string) => {
    createRelativeText(status.current.spaceshipBlueprint, text)
  }

  const inputingValyue = ref('')

  return reactive({
    status,
    doc,
    setCurrentSpaceship,
    inputingValyue,
    addChild,
    addBrother,
    addChildText,
    addBrotherText,
  })
})
