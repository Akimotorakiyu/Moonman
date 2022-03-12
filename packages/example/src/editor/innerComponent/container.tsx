import { ediotrStateFactory } from '../editorState'
import { CSpaceVision } from '../component'
import { registerComponent } from './map'
import { isTheSameIdentity } from '@moonman/nebula'
import {
  getTimestampAndIdCombineKey,
  queryPlanet,
  querySpaceship,
  querySpaceshipBlueprint,
} from '@moonman/registration'
import { defineFunctionComponent } from '../../func/defineFunctionComponent'
import { ISpaceshipBlueprint } from '@moonman/blueprint'

export const CContainer = defineFunctionComponent(
  (props: { spaceshipBlueprint: ISpaceshipBlueprint }) => {
    const editorState = ediotrStateFactory.inject()!
    const spaceship = querySpaceship(props.spaceshipBlueprint.identity)
    const planet = queryPlanet(props.spaceshipBlueprint.planetId)

    return {
      editorState: editorState,
      spaceship: spaceship,
      render: () => {
        return (
          <div
            class={`${' m-3 p-3 shadow-gray-400 shadow-sm bg-light-100'} ${
              isTheSameIdentity(
                editorState.status.current.spaceship.blueprint.identity,
                props.spaceshipBlueprint.identity,
              )
                ? 'shadow-green-800 shadow-lg  animate-pulse bg-green-200 '
                : ''
            }`}
            onClick={(event) => {
              editorState.setCurrentSpaceship(spaceship, planet)
              event.stopPropagation()
            }}
          >
            {planet.children.length ? (
              planet.children.map((sp) => {
                const spaceship = querySpaceship(sp)
                const planet = queryPlanet(spaceship.blueprint.planetId)

                return (
                  <CSpaceVision
                    spaceship={spaceship}
                    planet={planet}
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
    }
  },

  {
    name: 'CContainer',
    inheritAttrs: false,
  },
)

registerComponent('CContainer', CContainer)
