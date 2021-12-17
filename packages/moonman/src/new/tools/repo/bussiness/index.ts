import {
  createPieceViewAndPieceData,
  insertToAdress,
} from '../../repo/bussiness/define'
import { StateSpace } from '../stateSpace'

export interface ITitleModel {
  type: 'ITitle'
  props: Record<string, unknown>
}

export function genTitle(
  props: Record<string, unknown>,
  stateSpace: StateSpace,
) {
  const data = createPieceViewAndPieceData(
    [
      <ITitleModel>{
        type: 'ITitle',
        props: {
          color: 'black',
          fontSize: '14px',
          ...props,
        },
      },
    ],
    stateSpace,
  )

  return data
}

export function genText(text: string, stateSpace: StateSpace) {
  return createPieceViewAndPieceData(text, stateSpace)
}

export interface IDocumentModel {
  type: 'IDocument'
  props: Record<string, unknown>
}

export function genDocument(
  props: Record<string, unknown>,
  stateSpace: StateSpace,
) {
  const doc = createPieceViewAndPieceData(
    [
      <IDocumentModel>{
        type: 'IDocument',
        props: {
          color: 'black',
          fontSize: '14px',
          ...props,
        },
      },
    ],
    stateSpace,
  )

  const title = genTitle({}, stateSpace)
  const paragraph = genParagraph({}, stateSpace)

  const insertTitle = insertToAdress(
    {
      relation: {
        isInner: true,
        isForward: true,
      },
      anchor: {
        coordinate: [title.pieceView.identity],
        index: 0,
      },
    },
    title.pieceView.identity,
    doc.pieceView.identity,
    stateSpace,
  )
  const insertParagraph = insertToAdress(
    {
      relation: {
        isInner: true,
        isForward: true,
      },
      anchor: {
        coordinate: [paragraph.pieceView.identity],
        index: 0,
      },
    },
    paragraph.pieceView.identity,
    doc.pieceView.identity,
    stateSpace,
  )

  return doc
}

export interface IParagraphModel {
  type: 'IParagraph'
  props: Record<string, unknown>
}

export function genParagraph(
  props: Record<string, unknown>,
  stateSpace: StateSpace,
) {
  const data = createPieceViewAndPieceData(
    [
      <IParagraphModel>{
        type: 'IParagraph',
        props: {
          color: 'black',
          fontSize: '14px',
        },
      },
    ],
    stateSpace,
  )

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

export function genTableColumLine(
  props: Record<string, unknown>,
  stateSpace: StateSpace,
) {
  const data = createPieceViewAndPieceData(
    [
      <ITableColumLineModel>{
        type: 'ITableColumLine',
        props: {},
      },
    ],
    stateSpace,
  )

  return data
}

export function genTableRowLine(
  props: Record<string, unknown>,
  stateSpace: StateSpace,
) {
  const data = createPieceViewAndPieceData(
    [
      <ITableRowLineModel>{
        type: 'ITableRowLine',
        props: {},
      },
    ],
    stateSpace,
  )

  return data
}

export function genTable(
  props: Record<string, unknown>,
  stateSpace: StateSpace,
) {
  const table = createPieceViewAndPieceData(
    [
      <ITableModel>{
        type: 'ITable',
        props: {},
      },
    ],
    stateSpace,
  )

  const row = genTableRowLine({}, stateSpace)
  const col = genTableColumLine({}, stateSpace)

  const insertRow = insertToAdress(
    {
      relation: {
        isInner: true,
        isForward: true,
      },
      anchor: {
        coordinate: [table.pieceView.identity],
        index: 0,
      },
    },
    row.pieceView.identity,
    table.pieceView.identity,
    stateSpace,
  )
  const insertCol = insertToAdress(
    {
      relation: {
        isInner: true,
        isForward: true,
      },
      anchor: {
        coordinate: [table.pieceView.identity],
        index: 0,
      },
    },
    col.pieceView.identity,
    col.pieceView.identity,
    stateSpace,
  )

  return table
}
