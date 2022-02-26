import { ISpaceship } from '@moonman/moonman'
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
  }

  const inputingValyue = ref('')

  return reactive({
    status,
    doc,
    setCurrentSpaceship,
    inputingValyue,
  })
})
