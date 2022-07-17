export interface IIdentity {
  timestamp: number
  id: number
}

export type TSourceBPID = IIdentity
export type TVisionBPID = IIdentity
export type TPlaceholderBPID = IIdentity

export type TTimestampAndIdCombineKey =
  `${IIdentity['timestamp']}-${IIdentity['id']}`
