import { ISpaceshipBlueprint } from '@moonman/moonman'
import { ediotrStateFactory } from '../editorState'
import { CSpaceVision } from '../component'
import { registerComponent } from './map'
import {
  createSpaceshipByBlueprint,
  createPlanetByBlueprint,
  isTheSameIdentity,
} from '@moonman/nebula'
import {
  getTimestampAndIdCombineKey,
  queryPlanetBlueprint,
  querySpaceshipBlueprint,
} from '@moonman/registration'
import { defineFunctionComponent } from '../../func/defineFunctionComponent'

export const CContainer = defineFunctionComponent(
  (props: { spaceshipBlueprint: ISpaceshipBlueprint }) => {
    const editorState = ediotrStateFactory.inject()!
    const spaceship = createSpaceshipByBlueprint(props.spaceshipBlueprint)
    const planetBlueprint = queryPlanetBlueprint(
      props.spaceshipBlueprint.planetId,
    )
    const planet = createPlanetByBlueprint(planetBlueprint)

    return {
      editorState: editorState,
      spaceship: spaceship,
      render: () => {
        return (
          <div
            class={`${' m-3 p-3 shadow-gray-400 shadow-sm bg-light-100'} ${
              isTheSameIdentity(
                editorState.status.current.spaceshipBlueprint.identity,
                props.spaceshipBlueprint.identity,
              )
                ? 'shadow-green-400'
                : ''
            }`}
            onClick={(event) => {
              editorState.setCurrentSpaceship(
                spaceship.blueprint,
                planet.blueprint,
              )
              event.stopPropagation()
            }}
          >
            {spaceship.planet.children.length ? (
              spaceship.planet.children.map((sp) => {
                const spaceshipBlueprint = querySpaceshipBlueprint(sp)

                return (
                  <CSpaceVision
                    spaceshipBlueprint={spaceshipBlueprint}
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
