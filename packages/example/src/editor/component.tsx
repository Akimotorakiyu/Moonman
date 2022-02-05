import { ISpaceShip } from '@moonman/moonman'
import { defineFactoryComponent } from '../func'
import { componentMap } from './innerComponent'

export const CSpaceVision = defineFactoryComponent(
  (props: { spaceship: ISpaceShip }) => {
    return {
      spaceship: props.spaceship,
    }
  },
  ({ spaceship }) => {
    const RealComName = spaceship.planet.blueprint.content
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

        <RealCom spaceship={spaceship}></RealCom>

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
