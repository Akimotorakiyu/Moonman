// import {
//   createPieceViewAndPieceData,
//   insertToAdress,
// } from '../../repo/bussiness/define'
// import { BlockSpace } from '../stateSpace'

// export function genTitle(
//   props: Record<string, unknown>,
//   parentStateSpace: BlockSpace,
// ) {
//   return createPieceViewAndPieceData(
//     [
//       <ITitleModel>{
//         type: 'ITitle',
//         props: {
//           color: 'black',
//           fontSize: '14px',
//           ...props,
//         },
//       },
//     ],
//     parentStateSpace,
//   )
// }

// export function genText(text: string, parentStateSpace: BlockSpace) {
//   return createPieceViewAndPieceData(text, parentStateSpace)
// }

// export function genDocument(
//   props: Record<string, unknown>,
//   stateSpace: BlockSpace,
// ) {
//   const doc = createPieceViewAndPieceData(
//     [
//       <IDocumentModel>{
//         type: 'IDocument',
//         props: {
//           color: 'black',
//           fontSize: '14px',
//           ...props,
//         },
//       },
//     ],
//     stateSpace,
//   )

//   return doc
// }

// export function genParagraph(
//   props: Record<string, unknown>,
//   parentStateSpace: BlockSpace,
// ) {
//   const data = createPieceViewAndPieceData(
//     [
//       <IParagraphModel>{
//         type: 'IParagraph',
//         props: {
//           color: 'black',
//           fontSize: '14px',
//         },
//       },
//     ],
//     parentStateSpace,
//   )

//   return data
// }

// export function genTableColumLine(
//   props: Record<string, unknown>,
//   parentStateSpace: BlockSpace,
// ) {
//   const data = createPieceViewAndPieceData(
//     [
//       <ITableColumLineModel>{
//         type: 'ITableColumLine',
//         props: {},
//       },
//     ],
//     parentStateSpace,
//   )

//   return data
// }

// export function genTableRowLine(
//   props: Record<string, unknown>,
//   parentStateSpace: BlockSpace,
// ) {
//   const data = createPieceViewAndPieceData(
//     [
//       <ITableRowLineModel>{
//         type: 'ITableRowLine',
//         props: {},
//       },
//     ],
//     parentStateSpace,
//   )

//   return data
// }

// export function genTable(
//   props: Record<string, unknown>,
//   parentStateSpace: BlockSpace,
// ) {
//   const table = createPieceViewAndPieceData(
//     [
//       <ITableModel>{
//         type: 'ITable',
//         props: {},
//       },
//     ],
//     parentStateSpace,
//   )

//   const row = genTableRowLine({}, parentStateSpace)
//   const col = genTableColumLine({}, parentStateSpace)

//   const insertRow = insertToAdress(
//     {
//       relation: {
//         isInner: true,
//         isForward: true,
//       },
//       anchor: {
//         coordinate: [table.pieceView.identity],
//         index: 0,
//       },
//     },
//     row.pieceView.identity,
//     table.pieceView.identity,
//     parentStateSpace,
//   )
//   const insertCol = insertToAdress(
//     {
//       relation: {
//         isInner: true,
//         isForward: true,
//       },
//       anchor: {
//         coordinate: [table.pieceView.identity],
//         index: 0,
//       },
//     },
//     col.pieceView.identity,
//     col.pieceView.identity,
//     parentStateSpace,
//   )

//   return table
// }
