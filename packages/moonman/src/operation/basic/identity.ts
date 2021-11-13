export interface IIdentity {
  timestamp: number
  id: number
}

export interface IIdentifiable {
  identity: IIdentity
}

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
