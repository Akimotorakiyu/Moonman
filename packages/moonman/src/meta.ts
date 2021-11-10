export interface IMetaView {
  id: number
  start: number
  content: string
  timestamp: number
  data: Record<string, any>
}

export class MetaView implements IMetaView {
  constructor(
    public id: number,
    public start: number,
    public content: string,
    public timestamp: number,
    public data: Record<string, any>,
  ) {}
}
