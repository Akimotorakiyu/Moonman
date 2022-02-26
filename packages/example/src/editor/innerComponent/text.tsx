import { ISpaceship } from '@moonman/moonman'
import { isTheSameIdentity } from '@moonman/nebula'
import { defineFunctionComponent } from '../../func/defineFunctionComponent'
import { ediotrStateFactory } from '../editorState'
import { registerComponent } from './map'

export const CTextComponent = defineFunctionComponent(
  (props: { spaceship: ISpaceship; attrs: { content: string } }) => {
    const editorState = ediotrStateFactory.inject()!

    return {
      render() {
        return (
          <span
            class={`${
              isTheSameIdentity(
                editorState.status.current.spaceship!.blueprint.identity,
                props.spaceship.blueprint.identity,
              )
                ? 'shadow-green-800 shadow-lg'
                : ''
            }`}
            onClick={(event) => {
              editorState.setCurrentSpaceship(props.spaceship)
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
