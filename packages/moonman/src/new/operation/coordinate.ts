import { IIdentity, isTheSameIdentity } from './identity'

/**
 * TCoordinate is the coordinate on the n dimension
 */
export type TCoordinate = IIdentity[]

/**
 * isTheSameCoordinate
 * @param coordinateA
 * @param coordinateB
 * @returns
 */
export const isTheSameCoordinate = (
  coordinateA: TCoordinate,
  coordinateB: TCoordinate,
) => {
  const isTheSameDimension = coordinateA.length === coordinateB.length
  if (isTheSameDimension) {
    const isTheSameInEveryDimension = coordinateA.every(
      (identityIndexA, index) => {
        const identityIndexB = coordinateB[index]
        return isTheSameIdentity(identityIndexA, identityIndexB)
      },
    )
    return isTheSameInEveryDimension
  } else {
    return false
  }
}
