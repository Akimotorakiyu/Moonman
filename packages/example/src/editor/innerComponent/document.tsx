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
  queryPlanet,
  queryPlanetBlueprint,
  querySpaceship,
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
    name: 'CDocument',
    inheritAttrs: false,
  },
)

registerComponent('CDocument', CDocument)
