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
import { ISpaceshipBlueprint } from '@moonman/blueprint'

export const CDocument = defineFunctionComponent(
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
                ? 'shadow-green-800 shadow-lg  animate-pulse bg-green-200 '
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
            {planet.children.length ? (
              planet.children.map((sp) => {
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
    name: 'CDocument',
    inheritAttrs: false,
  },
)

registerComponent('CDocument', CDocument)
