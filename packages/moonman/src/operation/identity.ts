/**
 * 所有操作和节点的唯一身份标志
 */
export interface IIdentity {
  readonly timestamp: number
  readonly id: number
}

/**
 * 有身份的协议
 */
export interface IIdentifiable {
  readonly identity: IIdentity
}

//
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
