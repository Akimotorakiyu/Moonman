import { ISpaceshipBlueprint } from '@moonman/moonman'
import {
  createSpaceshipByBlueprint,
  createPlanetByBlueprint,
  isTheSameIdentity,
} from '@moonman/nebula'

import { queryPlanetBlueprint } from '@moonman/registration'
import { defineFunctionComponent } from '../../func/defineFunctionComponent'
import { ediotrStateFactory } from '../editorState'
import { registerComponent } from './map'

export const CTextComponent = defineFunctionComponent(
  (props: {
    spaceshipBlueprint: ISpaceshipBlueprint
    attrs: { content: string }
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
          <span
            class={`${
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
          >
            {props.attrs.content}
          </span>
        )
      },
    }
  },
  {
    name: 'CTextComponent',
    inheritAttrs: false,
  },
)

registerComponent('CTextComponent', CTextComponent)
