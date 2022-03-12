import { computed } from 'vue'
import { componentMap } from './innerComponent'
import {
  getTimestampAndIdCombineKey,
  queryPlanet,
  querySpaceship,
} from '@moonman/registration'
import { defineFunctionComponent } from '../func/defineFunctionComponent'

import { IPlanet, ISpaceship } from '@moonman/blueprint'

export const CSpaceVision = defineFunctionComponent(
  (props: { spaceship: ISpaceship; planet: IPlanet }) => {
    const spaceship = props.spaceship
    const planet = props.planet

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
              const spaceship = querySpaceship(sp)
              const planet = queryPlanet(spaceship.blueprint.planetId)
              return (
                <CSpaceVision
                  spaceship={spaceship}
                  planet={planet}
                  key={getTimestampAndIdCombineKey(sp)}
                ></CSpaceVision>
              )
            })}

            <RealCom
              spaceshipBlueprint={spaceship.blueprint}
              attrs={planet.attributes}
            ></RealCom>

            {spaceship.slots.forward?.map((sp) => {
              const spaceship = querySpaceship(sp)
              const planet = queryPlanet(spaceship.blueprint.planetId)

              return (
                <CSpaceVision
                  spaceship={spaceship}
                  planet={planet}
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
