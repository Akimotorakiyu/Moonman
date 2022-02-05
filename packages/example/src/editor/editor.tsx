import { ediotrStateFactory } from './editorState'
import { CSpaceVision } from './component'
export const CEditor = () => {
  const doc = ediotrStateFactory.inject()
  console.log(doc)
  return (
    <div>
      <div class="m-2 ">
        <button
          class="bg-green-400 text-white p-2 rounded-md mx-2"
          onClick={() => {
            doc?.addChild()
          }}
        >
          创建并添加子节点
        </button>
        <button
          class="bg-green-400 text-white p-2 rounded-md mx-2"
          onClick={() => {
            doc?.addBrother('forward')
          }}
        >
          创建并添加兄弟节点
        </button>
        <button
          class="bg-green-400 text-white p-2 rounded-md mx-2"
          onClick={() => {
            doc?.addBrother('backward', 'hello')
          }}
        >
          在节点前插入文字
        </button>
        <button
          class="bg-green-400 text-white p-2 rounded-md mx-2"
          onClick={() => {
            doc?.addBrother('forward', 'world')
          }}
        >
          在节点后插入文字
        </button>
      </div>
      <div class="m-2">
        <CSpaceVision spaceship={doc?.doc!}></CSpaceVision>
      </div>
    </div>
  )
}
