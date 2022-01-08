console.log('hello world!')
import { createEnv, createDoc, addChildForNode } from '@moonman/moonman'
// import './temp'

const doc = createDoc()

const commander = createEnv(doc)

const opc = addChildForNode(doc, 'pargraph0')
const opc1 = addChildForNode(doc, 'pargraph1')
const opc2 = addChildForNode(doc, 'pargraph2')

commander.addOpAndExec(opc)
commander.addOpAndExec(opc1)
commander.addOpAndExec(opc2)

console.log(doc)
