import { ISpaceship } from '@moonman/moonman'
import { defineFactoryComponent } from '../../func'
import { ediotrStateFactory } from '../editorState'
import { CSpaceVision } from '../component'
import { registerComponent } from './map'
export const CContainer = defineFactoryComponent(
  (props: { spaceship: ISpaceship }) => {
    const editorState = ediotrStateFactory.inject()

    return {
      editorState: editorState,
      spaceship: props.spaceship,
    }
  },
  ({ editorState, spaceship }) => {
    if (
      editorState?.status.currentSpaceship.blueprint.id ===
      spaceship.blueprint.id
    ) {
      console.log(spaceship)
    }

    return (
      <div
        class={`${' m-3 p-3 shadow-gray-400 shadow-sm bg-light-100'} ${
          editorState?.status.currentSpaceship.blueprint.id ===
          spaceship.blueprint.id
            ? 'shadow-green-400'
            : ''
        }`}
        onClick={(event) => {
          editorState?.setCurrentSpaceship(spaceship)
          event.stopPropagation()
        }}
      >
        {spaceship.planet.children.length ? (
          spaceship.planet.children.map((sp) => {
            return (
              <CSpaceVision spaceship={sp} key={sp.blueprint.id}></CSpaceVision>
            )
          })
        ) : (
          <br />
        )}
      </div>
    )
  },
  {
    name: 'CContainer',
    inheritAttrs: false,
  },
)

registerComponent('CContainer', CContainer)
