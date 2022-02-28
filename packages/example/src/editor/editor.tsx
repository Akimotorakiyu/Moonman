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
          👉🏻添加子节点
        </button>
        <button
          class="bg-green-400 text-white p-2 rounded-md mx-2 col-span-6"
          onClick={() => {
            state.addChild('CContainer', 'backward')
          }}
        >
          👈🏻添加子节点
        </button>
        <button
          class="bg-green-400 text-white p-2 rounded-md mx-2 col-span-6"
          onClick={() => {
            state.addBrother('CContainer', 'forward')
          }}
        >
          👉🏻并添加兄弟节点
        </button>
        <button
          class="bg-green-400 text-white p-2 rounded-md mx-2 col-span-6"
          onClick={() => {
            state.addBrother('CContainer', 'backward')
          }}
        >
          👈🏻并添加兄弟节点
        </button>

        <button
          class="bg-green-400 text-white p-2 rounded-md mx-2 col-span-6"
          onClick={() => {
            state.addChildText('hello', 'forward')
          }}
        >
          👈🏻内部插入文字
        </button>
        <button
          class="bg-green-400 text-white p-2 rounded-md mx-2 col-span-6"
          onClick={() => {
            state.addChildText('hello', 'backward')
          }}
        >
          👉🏻内部插入文字
        </button>
        <button
          class="bg-green-400 text-white p-2 rounded-md mx-2 col-span-6"
          onClick={() => {
            state.addBrotherText('world', 'forward')
          }}
        >
          👉🏻插入文字
        </button>
        <button
          class="bg-green-400 text-white p-2 rounded-md mx-2 col-span-6"
          onClick={() => {
            state.addBrotherText('world', 'backward')
          }}
        >
          👈🏻插入兄弟文字
        </button>
      </div>
      <div class="m-2">
        <CSpaceVision
          spaceshipBlueprint={state!.doc.spaceshipBlueprint}
        ></CSpaceVision>
      </div>
      <input
        value={state?.inputingValue}
        placeholder="请输入文字"
        onChange={(e) => {
          if (state && e.currentTarget) {
            const target = e.currentTarget as HTMLInputElement
            state.inputingValue = target.value
            const start = performance.now()
            const { spaceshipBlueprint, planetBlueprint } =
              state.addBrotherText(state.inputingValue, 'forward')
            state.setCurrentSpaceship(spaceshipBlueprint, planetBlueprint)
            console.log(`use ${performance.now() - start}ms`)
            state.inputingValue = ''
            target.scrollIntoView()
            target.focus()
          }
        }}
      ></input>

      {/* <input
        value={state?.inputingValue}
        placeholder="请输入图片链接"
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
