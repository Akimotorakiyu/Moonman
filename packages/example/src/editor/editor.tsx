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
          创建并添加飞船
        </button>
        <button
          class="bg-green-400 text-white p-2 rounded-md"
          onClick={() => {
            doc?.addBrother()
          }}
        >
          创建并添加关联飞船
        </button>
      </div>
      <div class="m-2">
        <CSpaceVision spaceship={doc?.doc!}></CSpaceVision>
      </div>
    </div>
  )
}
