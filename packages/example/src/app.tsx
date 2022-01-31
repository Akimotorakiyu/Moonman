import { reactive } from 'vue'
import { defineFactoryComponent } from './func'
import { defineStateSuite } from './func/defineState'

import {
  createDocument,
  createPlanetAndConnectPlant,
  createTransaction,
  ISpaceShip,
  messageCenter,
} from '@moonman/moonman'

const CSpaceVision = defineFactoryComponent(
  (props: { spaceship: ISpaceShip }) => {
    const editorState = ediotrStateFactory.inject()

    return {
      editorState: editorState,
      spaceship: props.spaceship,
    }
  },
  ({ editorState, spaceship }) => {
    return (
      <div
        class={`${' shadow-gray-200 shadow-md p-2 rounded-md'} ${
          editorState?.status.currentSpaceship.blueprint.id ===
          spaceship.blueprint.id
            ? 'shadow-green-200 '
            : ''
        }`}
      >
        <button
          onClick={() => {
            editorState?.setCurrentSpaceship(spaceship)
          }}
        >
          setCurrent{editorState?.status.currentSpaceship.blueprint.id}
        </button>
        <div>spaceship {spaceship.blueprint.id}</div>
        <div>planet {spaceship.planet.blueprint.id}</div>
        <div class="">
          {spaceship.planet.children.map((sp) => {
            return <CSpaceVision spaceship={sp}></CSpaceVision>
          })}
        </div>
      </div>
    )
  },
)

const CEditor = () => {
  const doc = ediotrStateFactory.inject()
  console.log(doc)
  return (
    <div>
      <div class="m-2 ">
        <button
          class="bg-green-400 text-white p-2 rounded-md"
          onClick={() => {
            doc?.addChild()
          }}
        >
          创建并添加飞船
        </button>
      </div>
      <div class="m-2">
        <CSpaceVision spaceship={doc?.doc!}></CSpaceVision>
      </div>
    </div>
  )
}

const ediotrStateFactory = defineStateSuite(() => {
  const doc = createDocument()
  const status = reactive({
    currentSpaceship: doc,
  })

  const addChild = () => {
    const tr = createTransaction()
    createPlanetAndConnectPlant(tr, status.currentSpaceship.planet)
    tr.steps.forEach((s) => {
      messageCenter.dispatch(s.aimId, s.operationTransform, tr)
    })
  }

  const setCurrentSpaceship = (spaceship: ISpaceShip) => {
    status.currentSpaceship = spaceship
  }

  return reactive({
    status,
    doc,
    addChild,
    setCurrentSpaceship,
  })
})

export const App = defineFactoryComponent(
  (props, ctx) => {
    ediotrStateFactory()
  },
  (state) => {
    return (
      <div class="">
        <CEditor></CEditor>
      </div>
    )
  },
)