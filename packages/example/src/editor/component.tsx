import { ISpaceship, mergeMark } from '@moonman/moonman'
import { reactive, watchEffect } from 'vue'
import { defineFactoryComponent } from '../func'
import { componentMap } from './innerComponent'

export const CSpaceVision = defineFactoryComponent(
  (props: { spaceship: ISpaceship }) => {
    return {
      spaceship: props.spaceship,
    }
  },
  ({ spaceship }) => {
    const attrs = reactive<Record<string, unknown> & { type?: string }>({})

    watchEffect(() => {
      mergeMark(spaceship.planet, attrs)

      console.log('calc attr', attrs)
    })

    console.log('attrs.value.type', attrs.type)

    const RealComName = attrs.type ?? 'CContainer'

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
