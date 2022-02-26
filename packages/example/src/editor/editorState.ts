import {
  createChildParagraph,
  createChildText,
  createRelativeParagraph,
  createRelativeText,
  ISpaceship,
} from '@moonman/moonman'
import { createDocument } from '@moonman/moonman'
import { reactive, ref } from 'vue'
import { defineStateSuite } from '../func/defineState'

export const ediotrStateFactory = defineStateSuite(() => {
  const doc = createDocument()
  const status = reactive({
    current: {
      spaceship: doc,
      planet: doc.planet,
    },
  })

  const setCurrentSpaceship = (spaceship: ISpaceship) => {
    status.current.spaceship = spaceship
    status.current.planet = spaceship.planet
  }

  const addChild = () => {
    createChildParagraph(status.current.planet, 'forward')
  }

  const addBrother = () => {
    createRelativeParagraph(status.current.spaceship, 'forward')
  }

  const addChildText = (text: string) => {
    createChildText(status.current.planet, text)
  }
  const addBrotherText = (text: string) => {
    createRelativeText(status.current.spaceship, text)
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
