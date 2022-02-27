import { ISpaceshipBlueprint, mergeMark } from '@moonman/moonman'
import { computed, reactive, watchEffect } from 'vue'
import { componentMap } from './innerComponent'
import {
  getTimestampAndIdCombineKey,
  queryPlanetBlueprint,
  querySpaceshipBlueprint,
} from '@moonman/registration'
import { defineFunctionComponent } from '../func/defineFunctionComponent'
import {
  createPlanetByBlueprint,
  createSpaceshipByBlueprint,
} from '@moonman/nebula'

export const CSpaceVision = defineFunctionComponent(
  (props: { spaceshipBlueprint: ISpaceshipBlueprint }) => {
    // todo: 需要先创建一次 planet，防止在 创建 spaceship 时  planet 不存在
    const planet = createPlanetByBlueprint(
      queryPlanetBlueprint(props.spaceshipBlueprint.planetId),
    )
    const spaceship = createSpaceshipByBlueprint(props.spaceshipBlueprint)
    const attrs = reactive<Record<string, unknown> & { type?: string }>({})

    watchEffect(() => {
      mergeMark(planet.blueprint, attrs)
    })

    const RealComName = computed(() => {
      return attrs.type ?? 'CContainer'
    })

    const RealCom = componentMap.get(RealComName.value)!

    return {
      spaceship,
      render: () => {
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

            <RealCom
              spaceshipBlueprint={spaceship.blueprint}
              attrs={attrs}
            ></RealCom>

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
