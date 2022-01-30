import { defineFunctionComponent } from './func'

export const App = defineFunctionComponent(() => {
  return {
    render() {
      return <div class=" text-blue-500">hello world</div>
    },
  }
})
