import { defineFunctionComponent } from './defineFunctionComponent'
import { MarkRender } from './basicColor'
export const App = defineFunctionComponent(() => {
  return {
    render() {
      return <MarkRender></MarkRender>
    },
  }
})
