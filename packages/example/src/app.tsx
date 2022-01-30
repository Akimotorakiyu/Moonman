import { reactive } from 'vue'
import { defineFactoryComponent } from './func'
import { defineStateSuite } from './func/defineState'

import { createDocument } from '@moonman/moonman'

const CEditor = () => {
  const doc = docState.inject()

  return <div></div>
}

const docState = defineStateSuite(() => {
  const doc = createDocument()
  return reactive(doc)
})

export const App = defineFactoryComponent(
  (props, ctx) => {
    docState()
  },
  (state) => {
    return (
      <div class=" text-blue-500">
        <CEditor></CEditor>
      </div>
    )
  },
)
