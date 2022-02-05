import { ISpaceShip } from '@moonman/moonman'
import { computed, reactive, watchEffect } from 'vue'
import { defineFactoryComponent } from '../func'
import { componentMap } from './innerComponent'

export const CSpaceVision = defineFactoryComponent(
  (props: { spaceship: ISpaceShip }) => {
    return {
      spaceship: props.spaceship,
    }
  },
  ({ spaceship }) => {
    const attrs = reactive<Record<string, unknown> & { type?: string }>({})

    watchEffect(() => {
      const attr: Record<string, unknown> & { type?: string } = {}
      spaceship.planet.blueprint.operationTransform.forEach((op) => {
        if (op.type === 'addMark') {
          attrs[op.name] = op.value
          // Reflect.set(attr, op.name, op.value)
        }
      })

      return attr
    })

    console.log('attrs.value.type', attrs.type)

    const RealComName = attrs.type
      ? attrs.type
      : spaceship.planet.blueprint.content
      ? 'TextComponent'
      : 'CContainer'

    const RealCom = componentMap.get(RealComName)!

    // console.log('RealCom', RealCom, componentMap)
    return (
      <>
        {spaceship.slots.backward?.map((sp) => {
          return (
            <CSpaceVision spaceship={sp} key={sp.blueprint.id}></CSpaceVision>
          )
        })}

        <RealCom spaceship={spaceship} attrs={attrs}></RealCom>

        {spaceship.slots.forward?.map((sp) => {
          return (
            <CSpaceVision spaceship={sp} key={sp.blueprint.id}></CSpaceVision>
          )
        })}
      </>
    )
  },
  {
    name: 'CSpaceVision',
    inheritAttrs: false,
  },
)
