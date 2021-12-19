import {} from '../..'

export interface ITextModel {
  type: 'IText'
}

export interface ITitleModel extends Record<string, unknown> {
  type: 'ITitle'
}

export interface ITableColumLineModel extends Record<string, unknown> {
  type: 'ITableColumLine'
}

export interface ITableRowLineModel extends Record<string, unknown> {
  type: 'ITableRowLine'
}

export interface IDocumentModel extends Record<string, unknown> {
  type: 'IDocument'
}

export interface IParagraphModel extends Record<string, unknown> {
  type: 'IParagraph'
}

export interface ITableModel extends Record<string, unknown> {
  type: 'ITable'
}
