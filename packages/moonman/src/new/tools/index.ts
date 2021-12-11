import { createPieceViewAndPieceData, insertToAdress } from './define'

export function genTextView(text: string) {
  return createPieceViewAndPieceData(text)
}

export interface IParagraph {
  type: 'IParagraph'
  props: Record<string, unknown>
}

export function genParagraph(props: Record<string, unknown>) {
  const paragraph: IParagraph = {
    type: 'IParagraph',
    props: {
      color: 'blue',
      fontSize: '16px',
    },
  }

  return createPieceViewAndPieceData([paragraph])
}

export interface ITable {
  type: 'ITable'
  props: Record<string, unknown>
}

export interface ITableColumLine {
  type: 'ITableColumLine'
  props: Record<string, unknown>
}

export interface ITableRowLine {
  type: 'ITableRowLine'
  props: Record<string, unknown>
}

export function genTableColumLine(props: Record<string, unknown>) {
  const paragraph: ITableColumLine = {
    type: 'ITableColumLine',
    props: {},
  }

  return createPieceViewAndPieceData([paragraph])
}

export function genTableRowLine(props: Record<string, unknown>) {
  const paragraph: ITableRowLine = {
    type: 'ITableRowLine',
    props: {},
  }

  return createPieceViewAndPieceData([paragraph])
}

export function genTable(props: Record<string, unknown>) {
  const paragraph: ITable = {
    type: 'ITable',
    props: {},
  }

  const table = createPieceViewAndPieceData([paragraph])

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
