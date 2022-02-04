import { reactive } from 'vue'
import { defineFactoryComponent } from './func'
import { defineStateSuite } from './func/defineState'

import {
  addMarkForPlantOrSpaceShip,
  createAndAddRelativeSpaceShip,
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
    if (
      editorState?.status.currentSpaceship.blueprint.id ===
      spaceship.blueprint.id
    ) {
      console.log(spaceship)
    }

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
        <span>{spaceship.planet.blueprint.content}</span>
        <div>
          {Object.entries(spaceship.slots).map(([name, spaceshipList]) => {
            console.log(name, spaceshipList)
            return spaceshipList.map((sp) => {
              return (
                <CSpaceVision
                  spaceship={sp}
                  key={sp.blueprint.id}
                ></CSpaceVision>
              )
            })
          })}
        </div>

        <div class="">
          {spaceship.planet.children.map((sp) => {
            return (
              <CSpaceVision spaceship={sp} key={sp.blueprint.id}></CSpaceVision>
            )
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

const ediotrStateFactory = defineStateSuite(() => {
  const doc = createDocument()
  const status = reactive({
    currentSpaceship: doc,
  })

  const addChild = () => {
    const tr = createTransaction()
    const spaceship = createPlanetAndConnectPlant(
      tr,
      status.currentSpaceship.planet,
      '你好世界',
    )

    addMarkForPlantOrSpaceShip(
      tr,
      spaceship,
      '',
      'id: ' + spaceship.blueprint.id,
    )

    tr.steps.forEach((s) => {
      messageCenter.dispatch(s.aimId, s.operationTransform, tr)
    })
  }

  const addBrother = () => {
    const tr = createTransaction()

    const spaceship = createAndAddRelativeSpaceShip(
      tr,
      status.currentSpaceship,
      '你好世界',
    )

    addMarkForPlantOrSpaceShip(
      tr,
      spaceship.planet,
      '',
      'id: ' + spaceship.planet.blueprint.id,
    )

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
    addBrother,
  })
})

export const App = defineFactoryComponent(
  (props, ctx) => {
    const es = ediotrStateFactory()
    Reflect.set(window, 'es', es)
  },
  (state) => {
    return (
      <div class="">
        <CEditor></CEditor>
      </div>
    )
  },
)
