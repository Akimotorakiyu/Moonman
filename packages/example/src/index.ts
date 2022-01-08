console.log('hello world!')
import {
  createEnv,
  createDoc,
  addChildForNode,
  addBrotherForNode,
} from '@moonman/moonman'
// import './temp'

const doc = createDoc()

const commander = createEnv(doc)

const opc = addChildForNode(doc, 'pargraph0')
const opc1 = addChildForNode(doc, 'pargraph1')
const opc2 = addChildForNode(doc, 'pargraph2')

commander.addOpAndExec(opc)
commander.addOpAndExec(opc1)
commander.addOpAndExec(opc2)

const opc3 = addBrotherForNode(doc.children[1], 'pargraph3')
const opc4 = addBrotherForNode(doc.children[1], 'pargraph4', 'back-flow')

commander.addOpAndExec(opc3)
commander.addOpAndExec(opc4)

console.log(doc)
