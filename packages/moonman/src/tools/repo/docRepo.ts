import { IIdentity, IIdentifiable, isTheSameIdentity } from '../../operation'
export type TDocumentIdentity = IIdentity
export interface IDocument extends IIdentifiable {
  author: string
}

export const docRepo: IDocument[] = []

export function getDoc(docIdentity: TDocumentIdentity) {
  const document = docRepo.find((doc) => {
    isTheSameIdentity(doc.identity, docIdentity)
  })

  return document
}

export function getDocList() {
  return docRepo
}
