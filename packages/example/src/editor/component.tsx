import { IIdentity, mergeMark } from '@moonman/moonman'
import { reactive, watchEffect } from 'vue'
import { defineFactoryComponent } from '../func'
import { componentMap } from './innerComponent'
import {
  getTimestampAndIdCombineKey,
  querySpaceship,
} from '@moonman/registration'
export const CSpaceVision = defineFactoryComponent(
  (props: { spaceshipIdentity: IIdentity }) => {
    const spaceship = querySpaceship(props.spaceshipIdentity)

    return {
      spaceship,
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
            <CSpaceVision
              spaceshipIdentity={sp}
              key={getTimestampAndIdCombineKey(sp)}
            ></CSpaceVision>
          )
        })}

        <RealCom spaceship={spaceship} attrs={attrs}></RealCom>

        {spaceship.slots.forward?.map((sp) => {
          return (
            <CSpaceVision
              spaceshipIdentity={sp}
              key={getTimestampAndIdCombineKey(sp)}
            ></CSpaceVision>
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
