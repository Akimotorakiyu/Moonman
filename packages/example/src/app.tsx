import { reactive } from 'vue'
import { defineFactoryComponent } from './func'
import { defineStateSuite } from './func/defineState'

const CChild = () => {
  const state = App.suite.inject()
  console.log(state, showSuite.inject())
  return <div>child{state?.count}</div>
}

const showSuite = defineStateSuite(() => {
  return reactive({
    show: true,
  })
})

export const App = defineFactoryComponent(
  (props, ctx) => {
    const status = reactive({
      count: 0,
      showStatus: showSuite(),
    })

    return status
  },
  (state) => {
    return (
      <div
        class=" text-blue-500"
        onClick={() => {
          state.count++
        }}
      >
        hello world {state.count}
        <CChild></CChild>
      </div>
    )
  },
)
