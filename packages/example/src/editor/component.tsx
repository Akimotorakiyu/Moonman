import {
  ISpaceshipBlueprint,
  applyOperationToSpaceship,
  applyOperationToPlanet,
} from '@moonman/moonman'
import { computed, watchEffect } from 'vue'
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
    createPlanetByBlueprint(
      queryPlanetBlueprint(props.spaceshipBlueprint.planetId),
    )
    createSpaceshipByBlueprint(props.spaceshipBlueprint)

    const planet = createPlanetByBlueprint(
      queryPlanetBlueprint(props.spaceshipBlueprint.planetId),
    )

    const spaceship = createSpaceshipByBlueprint(props.spaceshipBlueprint)

    watchEffect(() => {
      applyOperationToPlanet(planet)
    })

    watchEffect(() => {
      applyOperationToSpaceship(spaceship)
    })

    const RealComName = computed(() => {
      return (planet.attributes.type as string) ?? 'CContainer'
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
              attrs={planet.attributes}
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
