import { ISpaceShip } from '@moonman/moonman'
import { defineFunctionComponent } from '../../func/defineFunctionComponent'
import { ediotrStateFactory } from '../editorState'
import { registerComponent } from './map'

export const ImageComponent = defineFunctionComponent(
  (props: { spaceship: ISpaceShip; attrs: { src: string } }) => {
    const editorState = ediotrStateFactory.inject()
    console.log('props.attrs.src', props.attrs)
    return {
      render() {
        return (
          <img
            class={` w-64 m-2 inline-block ${
              editorState?.status.currentSpaceship.blueprint.id ===
              props.spaceship.blueprint.id
                ? 'shadow-green-800 shadow-lg'
                : ''
            }`}
            onClick={(event) => {
              editorState?.setCurrentSpaceship(props.spaceship)
              event.stopPropagation()
            }}
            src={props.attrs.src}
            alt="image"
          ></img>
        )
      },
    }
  },
  {
    name: 'TextComponent',
    inheritAttrs: false,
  },
)

registerComponent('image', ImageComponent)
