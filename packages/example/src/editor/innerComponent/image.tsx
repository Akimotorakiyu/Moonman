import { ISpaceshipBlueprint } from '@moonman/moonman'
import { defineFunctionComponent } from '../../func/defineFunctionComponent'
import { ediotrStateFactory } from '../editorState'
import { registerComponent } from './map'
import {
  createSpaceshipByBlueprint,
  createPlanetByBlueprint,
  isTheSameIdentity,
} from '@moonman/nebula'

import { queryPlanetBlueprint } from '@moonman/registration'

export const CImageComponent = defineFunctionComponent(
  (props: {
    spaceshipBlueprint: ISpaceshipBlueprint
    attrs: { src: string; deleted?: boolean }
  }) => {
    const editorState = ediotrStateFactory.inject()!

    const spaceship = createSpaceshipByBlueprint(props.spaceshipBlueprint)
    const planetBlueprint = queryPlanetBlueprint(
      props.spaceshipBlueprint.planetId,
    )
    const planet = createPlanetByBlueprint(planetBlueprint)

    return {
      render() {
        return (
          <div
            class={` inline-block ${
              props.attrs.deleted ? 'shadow-red-800 shadow-lg' : ''
            }`}
          >
            <button
              onClick={() => {
                // editorState?.addMark(props.spaceship.planet, 'deleted', true)
              }}
            >
              del {props.attrs.deleted}
            </button>
            <img
              class={` w-64 m-2 inline-block ${
                isTheSameIdentity(
                  editorState.status.current.spaceshipBlueprint.identity,
                  props.spaceshipBlueprint.identity,
                )
                  ? 'shadow-green-800 shadow-lg'
                  : ''
              }`}
              onClick={(event) => {
                editorState.setCurrentSpaceship(
                  spaceship.blueprint,
                  planet.blueprint,
                )
                event.stopPropagation()
              }}
              src={props.attrs.src}
              alt="image"
            ></img>
          </div>
        )
      },
    }
  },
  {
    name: 'CImageComponent',
    inheritAttrs: false,
  },
)

registerComponent('CImageComponent', CImageComponent)
