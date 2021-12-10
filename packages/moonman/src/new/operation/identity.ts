export interface IIdentity {
  timestamp: number
  id: number
}

export interface IIdentifiable {
  identity: IIdentity
}

export interface IIdentityIndex extends IIdentifiable {
  index: number // index in ziped meta coordinate
}

export type TCoordinate = IIdentityIndex[]

export const identitySortMethod = (a: IIdentifiable, b: IIdentifiable) => {
  const delta =
    a.identity.timestamp - b.identity.timestamp || a.identity.id - b.identity.id
  return delta
}

export const isTheSameIdentity = (
  identityA: IIdentity,
  identityB: IIdentity,
) => {
  const isTheSame =
    identityA.timestamp == identityB.timestamp && identityA.id === identityB.id

  return isTheSame
}

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
        return (
          identityIndexA.index === identityIndexB.index &&
          isTheSameIdentity(identityIndexA.identity, identityIndexB.identity)
        )
      },
    )
    return isTheSameInEveryDimension
  } else {
    return false
  }
}
