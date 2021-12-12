import { createPieceViewAndPieceData, insertToAdress } from './define'

export interface ITitleModel {
  type: 'ITitle'
  props: Record<string, unknown>
}

export function genTitle(props: Record<string, unknown>) {
  const data = createPieceViewAndPieceData([
    <ITitleModel>{
      type: 'ITitle',
      props: {
        color: 'black',
        fontSize: '14px',
      },
    },
  ])

  return data
}

export function genText(text: string) {
  return createPieceViewAndPieceData(text)
}

export interface IDocumentModel {
  type: 'IDocument'
  props: Record<string, unknown>
}

export function genDocument(props: Record<string, unknown>) {
  const doc = createPieceViewAndPieceData([
    <IDocumentModel>{
      type: 'IDocument',
      props: {
        color: 'black',
        fontSize: '14px',
      },
    },
  ])

  const title = genTitle({})
  const paragraph = genParagraph({})

  const insertRow = insertToAdress(title.pieceView.identity, {
    relation: {
      isInner: true,
      isForward: true,
    },
    anchor: {
      coordinate: [title.pieceView.identity],
      index: 0,
    },
  })
  const insertCol = insertToAdress(paragraph.pieceView.identity, {
    relation: {
      isInner: true,
      isForward: true,
    },
    anchor: {
      coordinate: [paragraph.pieceView.identity],
      index: 0,
    },
  })

  return doc
}

export interface IParagraphModel {
  type: 'IParagraph'
  props: Record<string, unknown>
}

export function genParagraph(props: Record<string, unknown>) {
  const data = createPieceViewAndPieceData([
    <IParagraphModel>{
      type: 'IParagraph',
      props: {
        color: 'black',
        fontSize: '14px',
      },
    },
  ])

  return data
}

export interface ITableModel {
  type: 'ITable'
  props: Record<string, unknown>
}

export interface ITableColumLineModel {
  type: 'ITableColumLine'
  props: Record<string, unknown>
}

export interface ITableRowLineModel {
  type: 'ITableRowLine'
  props: Record<string, unknown>
}

export function genTableColumLine(props: Record<string, unknown>) {
  const data = createPieceViewAndPieceData([
    <ITableColumLineModel>{
      type: 'ITableColumLine',
      props: {},
    },
  ])

  return data
}

export function genTableRowLine(props: Record<string, unknown>) {
  const data = createPieceViewAndPieceData([
    <ITableRowLineModel>{
      type: 'ITableRowLine',
      props: {},
    },
  ])

  return data
}

export function genTable(props: Record<string, unknown>) {
  const table = createPieceViewAndPieceData([
    <ITableModel>{
      type: 'ITable',
      props: {},
    },
  ])

  const row = genTableRowLine({})
  const col = genTableColumLine({})

  const insertRow = insertToAdress(row.pieceView.identity, {
    relation: {
      isInner: true,
      isForward: true,
    },
    anchor: {
      coordinate: [table.pieceView.identity],
      index: 0,
    },
  })
  const insertCol = insertToAdress(col.pieceView.identity, {
    relation: {
      isInner: true,
      isForward: true,
    },
    anchor: {
      coordinate: [table.pieceView.identity],
      index: 0,
    },
  })

  return table
}
