import { IIdentity, ISpaceshipBlueprint, mergeMark } from '@moonman/moonman'
import { reactive, watchEffect } from 'vue'
import { componentMap } from './innerComponent'
import {
  getTimestampAndIdCombineKey,
  querySpaceship,
  querySpaceshipBlueprint,
} from '@moonman/registration'
import { defineFunctionComponent } from '../func/defineFunctionComponent'

export const CSpaceVision = defineFunctionComponent(
  (props: { spaceshipBlueprint: ISpaceshipBlueprint }) => {
    const spaceship = querySpaceship(props.spaceshipBlueprint.identity)

    return {
      spaceship,
      render: () => {
        const attrs = reactive<Record<string, unknown> & { type?: string }>({})

        watchEffect(() => {
          mergeMark(spaceship.blueprint, attrs)

          console.log('calc attr', attrs)
        })

        console.log('attrs.value.type', attrs.type)

        const RealComName = attrs.type ?? 'CContainer'

        const RealCom = componentMap.get(RealComName)!

        // console.log('RealCom', RealCom, componentMap)
        return (
          <>
            {spaceship.slots.backward?.map((sp) => {
              const spaceshipBlueprint = querySpaceshipBlueprint(sp)
              return (
                <CSpaceVision
                  spaceshipBlueprint={spaceshipBlueprint}
                  key={getTimestampAndIdCombineKey(sp)}
                ></CSpaceVision>
              )
            })}

            <RealCom spaceship={spaceship} attrs={attrs}></RealCom>

            {spaceship.slots.forward?.map((sp) => {
              const spaceshipBlueprint = querySpaceshipBlueprint(sp)

              return (
                <CSpaceVision
                  spaceshipBlueprint={spaceshipBlueprint}
                  key={getTimestampAndIdCombineKey(sp)}
                ></CSpaceVision>
              )
            })}
          </>
        )
      },
    }
  },

  {
    name: 'CSpaceVision',
    inheritAttrs: false,
  },
)
