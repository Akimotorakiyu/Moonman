import { defineFactoryComponent } from './func'
import { ediotrStateFactory } from './editor/editorState'
import { CEditor } from './editor'
export const App = defineFactoryComponent(
  (props, ctx) => {
    const es = ediotrStateFactory()
    Reflect.set(window, 'es', es)
  },
  (state) => {
    return (
      <div class="">
        <CEditor></CEditor>
      </div>
    )
  },
)
