import { ediotrStateFactory } from './editorState'
import { CSpaceVision } from './component'
export const CEditor = () => {
  const state = ediotrStateFactory.inject()!
  console.log(state)
  return (
    <div>
      <div class="m-2 ">
        <button
          class="bg-green-400 text-white p-2 rounded-md mx-2"
          onClick={() => {
            // doc?.addChild()
          }}
        >
          创建并添加子节点
        </button>
        <button
          class="bg-green-400 text-white p-2 rounded-md mx-2"
          onClick={() => {
            // doc?.addBrother('forward')
          }}
        >
          创建并添加兄弟节点
        </button>
        <button
          class="bg-green-400 text-white p-2 rounded-md mx-2"
          onClick={() => {
            // doc?.addBrother('backward', 'hello')
          }}
        >
          在节点前插入文字
        </button>
        <button
          class="bg-green-400 text-white p-2 rounded-md mx-2"
          onClick={() => {
            // doc?.addBrother('forward', 'world')
          }}
        >
          在节点后插入文字
        </button>
      </div>
      <div class="m-2">
        <CSpaceVision
          spaceshipIdentity={state!.doc.blueprint.identity}
        ></CSpaceVision>
      </div>
      <input
        value={state?.inputingValyue}
        placeholder="请输入文字"
        onChange={(e) => {
          // if (doc && e.currentTarget) {
          //   const target = e.currentTarget as HTMLInputElement
          //   doc.inputingValyue = target.value
          //   const start = performance.now()
          //   doc.addBrother('forward', doc.inputingValyue)
          //   console.log(`use ${performance.now() - start}ms`)
          //   doc.inputingValyue = ''
          //   target.scrollIntoView()
          // }
        }}
      ></input>

      <input
        value={state?.inputingValyue}
        placeholder="请输入图片链接"
        onChange={(e) => {
          // if (doc && e.currentTarget) {
          //   const target = e.currentTarget as HTMLInputElement
          //   doc.inputingValyue = target.value.trim() || 'image.jpg'
          //   const start = performance.now()
          //   doc.addImageBrother('forward', doc.inputingValyue)
          //   console.log(`use ${performance.now() - start}ms`)
          //   doc.inputingValyue = ''
          //   target.scrollIntoView()
          // }
        }}
      ></input>
    </div>
  )
}
