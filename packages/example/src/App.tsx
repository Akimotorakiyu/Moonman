import { defineFunctionComponent } from './defineFunctionComponent'
import { MarkRender } from './basicColor'
import { MarkRender as MarkRender2 } from './basicColorMove'
export const App = defineFunctionComponent(() => {
  return {
    render() {
      return (
        <>
          <MarkRender></MarkRender>
          <MarkRender2></MarkRender2>
        </>
      )
    },
  }
})
