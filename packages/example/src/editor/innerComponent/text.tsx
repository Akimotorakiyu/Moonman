import { ISpaceShip } from '@moonman/moonman'
import { defineFunctionComponent } from '../../func/defineFunctionComponent'
import { ediotrStateFactory } from '../editorState'
import { registerComponent } from './map'

export const TextComponent = defineFunctionComponent(
  (props: { spaceship: ISpaceShip }) => {
    const editorState = ediotrStateFactory.inject()

    return {
      render() {
        return (
          <span
            class={`${
              editorState?.status.currentSpaceship.blueprint.id ===
              props.spaceship.blueprint.id
                ? 'shadow-green-400 shadow-sm'
                : ''
            }`}
            onClick={(event) => {
              editorState?.setCurrentSpaceship(props.spaceship)
              event.stopPropagation()
            }}
          >
            {props.spaceship.planet.blueprint.content}{' '}
          </span>
        )
      },
    }
  },
  {
    name: 'TextComponent',
    inheritAttrs: false,
  },
)

registerComponent('TextComponent', TextComponent)
