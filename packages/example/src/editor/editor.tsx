import { ediotrStateFactory } from './editorState'
import { CSpaceVision } from './component'
export const CEditor = () => {
  const state = ediotrStateFactory.inject()!
  console.log(state)
  return (
    <div>
      <div class="m-2 flex grid grid-cols-24 gap-2">
        <button
          class="bg-green-400 text-white p-2 rounded-md mx-2 col-span-6"
          onClick={() => {
            state.addChild('CContainer', 'forward')
          }}
        >
          ππ»ζ·»ε ε­θηΉ
        </button>
        <button
          class="bg-green-400 text-white p-2 rounded-md mx-2 col-span-6"
          onClick={() => {
            state.addChild('CContainer', 'backward')
          }}
        >
          ππ»ζ·»ε ε­θηΉ
        </button>
        <button
          class="bg-green-400 text-white p-2 rounded-md mx-2 col-span-6"
          onClick={() => {
            state.addBrother('CContainer', 'forward')
          }}
        >
          ππ»εΉΆζ·»ε εεΌθηΉ
        </button>
        <button
          class="bg-green-400 text-white p-2 rounded-md mx-2 col-span-6"
          onClick={() => {
            state.addBrother('CContainer', 'backward')
          }}
        >
          ππ»εΉΆζ·»ε εεΌθηΉ
        </button>

        <button
          class="bg-green-400 text-white p-2 rounded-md mx-2 col-span-6"
          onClick={() => {
            state.addChildText('hello', 'forward')
          }}
        >
          ππ»ει¨ζε₯ζε­
        </button>
        <button
          class="bg-green-400 text-white p-2 rounded-md mx-2 col-span-6"
          onClick={() => {
            state.addChildText('hello', 'backward')
          }}
        >
          ππ»ει¨ζε₯ζε­
        </button>
        <button
          class="bg-green-400 text-white p-2 rounded-md mx-2 col-span-6"
          onClick={() => {
            state.addBrotherText('world', 'forward')
          }}
        >
          ππ»ζε₯ζε­
        </button>
        <button
          class="bg-green-400 text-white p-2 rounded-md mx-2 col-span-6"
          onClick={() => {
            state.addBrotherText('world', 'backward')
          }}
        >
          ππ»ζε₯εεΌζε­
        </button>
      </div>
      <div class="m-2">
        <CSpaceVision
          spaceship={state!.doc.spaceship}
          planet={state!.doc.planet}
        ></CSpaceVision>
      </div>
      <input
        value={state?.inputingValue}
        placeholder="θ―·θΎε₯ζε­"
        onChange={(e) => {
          if (state && e.currentTarget) {
            const target = e.currentTarget as HTMLInputElement
            state.inputingValue = target.value
            const start = performance.now()
            const { spaceship, planet } = state.addBrotherText(
              state.inputingValue,
              'forward',
            )
            state.setCurrentSpaceship(spaceship, planet)
            console.log(`use ${performance.now() - start}ms`)
            state.inputingValue = ''
            target.scrollIntoView()
            target.focus()
          }
        }}
      ></input>

      {/* <input
        value={state?.inputingValue}
        placeholder="θ―·θΎε₯εΎηιΎζ₯"
        onChange={(e) => {
          if (state && e.currentTarget) {
            const target = e.currentTarget as HTMLInputElement
            state.inputingValue = target.value.trim() || 'image.jpg'
            const start = performance.now()
            state.addBrother('image','forward',)
            console.log(`use ${performance.now() - start}ms`)
            state.inputingValue = ''
            target.scrollIntoView()
          }
        }}
      ></input> */}
    </div>
  )
}
