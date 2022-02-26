import { ISpaceship } from '@moonman/moonman'
import { defineFunctionComponent } from '../../func/defineFunctionComponent'
import { ediotrStateFactory } from '../editorState'
import { registerComponent } from './map'
import { isTheSameIdentity } from '@moonman/nebula'

export const CImageComponent = defineFunctionComponent(
  (props: {
    spaceship: ISpaceship
    attrs: { src: string; deleted?: boolean }
  }) => {
    const editorState = ediotrStateFactory.inject()!
    console.log('props.attrs.src', props.attrs)
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
                  editorState.status.current.spaceship!.blueprint.identity,
                  props.spaceship.blueprint.identity,
                )
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
