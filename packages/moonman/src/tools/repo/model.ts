import { IIdentifiable } from '../..'

export interface ITextModel extends IIdentifiable {
  type: 'IText'
  defaultProps: Record<string, unknown>
}

export interface ITitleModel extends IIdentifiable {
  type: 'ITitle'
  defaultProps: Record<string, unknown>
}

export interface ITableColumLineModel extends IIdentifiable {
  type: 'ITableColumLine'
  defaultProps: Record<string, unknown>
}

export interface ITableRowLineModel extends IIdentifiable {
  type: 'ITableRowLine'
  defaultProps: Record<string, unknown>
}

export interface IDocumentModel extends IIdentifiable {
  type: 'IDocument'
  defaultProps: Record<string, unknown>
}

export interface IParagraphModel extends IIdentifiable {
  type: 'IParagraph'
  defaultProps: Record<string, unknown>
}

export interface ITableModel extends IIdentifiable {
  type: 'ITable'
  defaultProps: Record<string, unknown>
}
