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
        return <img src={props.attrs.src} alt="image"></img>
      },
    }
  },
  {
    name: 'TextComponent',
    inheritAttrs: false,
  },
)

registerComponent('image', ImageComponent)
