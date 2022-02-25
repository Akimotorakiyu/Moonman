import { IIdentity, TTimestampAndIdCombineKey } from '@moonman/blueprint'

export function getTimestampAndIdCombineKey(
  identity: IIdentity,
): TTimestampAndIdCombineKey {
  return `${identity.timestamp}-${identity.id}`
}
