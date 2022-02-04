import { ISpaceShip } from '@moonman/moonman'
import { defineFactoryComponent } from '../func'
import { ediotrStateFactory } from './editorState'

export const CSpaceVision = defineFactoryComponent(
  (props: { spaceship: ISpaceShip }) => {
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
      <>
        <div>
          {spaceship.slots.backward?.map((sp) => {
            return (
              <CSpaceVision spaceship={sp} key={sp.blueprint.id}></CSpaceVision>
            )
          })}
        </div>

        <span>{spaceship.planet.blueprint.content}</span>

        <div
          class=""
          onClick={() => {
            editorState?.setCurrentSpaceship(spaceship)
          }}
        >
          {spaceship.planet.children.map((sp) => {
            return (
              <CSpaceVision spaceship={sp} key={sp.blueprint.id}></CSpaceVision>
            )
          })}
        </div>

        <div>
          {spaceship.slots.forward?.map((sp) => {
            return (
              <CSpaceVision spaceship={sp} key={sp.blueprint.id}></CSpaceVision>
            )
          })}
        </div>
      </>
    )
  },
  {
    name: 'CSpaceVision',
    inheritAttrs: false,
  },
)
