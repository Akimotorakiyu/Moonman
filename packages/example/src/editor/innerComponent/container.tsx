import { ISpaceship } from '@moonman/moonman'
import { defineFactoryComponent } from '../../func'
import { ediotrStateFactory } from '../editorState'
import { CSpaceVision } from '../component'
import { registerComponent } from './map'
import { isTheSameIdentity } from '@moonman/nebula'
import { getTimestampAndIdCombineKey } from '@moonman/registration'

export const CContainer = defineFactoryComponent(
  (props: { spaceship: ISpaceship }) => {
    const editorState = ediotrStateFactory.inject()!

    return {
      editorState: editorState,
      spaceship: props.spaceship,
    }
  },
  ({ editorState, spaceship }) => {
    return (
      <div
        class={`${' m-3 p-3 shadow-gray-400 shadow-sm bg-light-100'} ${
          isTheSameIdentity(
            editorState.status.current.spaceship!.blueprint.identity,
            spaceship.blueprint.identity,
          )
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
              <CSpaceVision
                spaceshipIdentity={sp}
                key={getTimestampAndIdCombineKey(sp)}
              ></CSpaceVision>
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
