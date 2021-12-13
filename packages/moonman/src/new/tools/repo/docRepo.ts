import { IIdentity, IIdentifiable } from '../../operation'

interface IDocumentList extends IIdentifiable {
  author: string
}

export const markRepo: IDocumentList[] = []
