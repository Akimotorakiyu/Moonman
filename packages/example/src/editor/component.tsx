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
      <div
        class={`${' shadow-gray-200 shadow-md p-2 rounded-md'} ${
          editorState?.status.currentSpaceship.blueprint.id ===
          spaceship.blueprint.id
            ? 'shadow-green-200 '
            : ''
        }`}
      >
        <button
          onClick={() => {
            editorState?.setCurrentSpaceship(spaceship)
          }}
        >
          setCurrent{editorState?.status.currentSpaceship.blueprint.id}
        </button>
        <span>{spaceship.planet.blueprint.content}</span>
        <div>
          {Object.entries(spaceship.slots).map(([name, spaceshipList]) => {
            console.log(name, spaceshipList)
            return spaceshipList.map((sp) => {
              return (
                <CSpaceVision
                  spaceship={sp}
                  key={sp.blueprint.id}
                ></CSpaceVision>
              )
            })
          })}
        </div>

        <div class="">
          {spaceship.planet.children.map((sp) => {
            return (
              <CSpaceVision spaceship={sp} key={sp.blueprint.id}></CSpaceVision>
            )
          })}
        </div>
      </div>
    )
  },
)
