export interface IIdentity {
  timestamp: number
  id: number
}

export type TTimestampAndIdCombineKey =
  `${IIdentity['timestamp']}-${IIdentity['id']}`
