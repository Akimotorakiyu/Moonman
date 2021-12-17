import { IIdentifiable } from '../..'

export interface ITitleModel extends IIdentifiable {
  type: 'ITitle'
  props: Record<string, unknown>
}

export interface ITableColumLineModel extends IIdentifiable {
  type: 'ITableColumLine'
  props: Record<string, unknown>
}

export interface ITableRowLineModel extends IIdentifiable {
  type: 'ITableRowLine'
  props: Record<string, unknown>
}

export interface IDocumentModel extends IIdentifiable {
  type: 'IDocument'
  props: Record<string, unknown>
}

export interface IParagraphModel extends IIdentifiable {
  type: 'IParagraph'
  props: Record<string, unknown>
}

export interface ITableModel extends IIdentifiable {
  type: 'ITable'
  props: Record<string, unknown>
}
