#### 父子节点

- 父节点持有可观察到子节点的 pieceView
- 子节点持有自身的数据

#### Replace

- delete the old pieces which can be saw
- create a new piece which position is in the focus and the relation is the inverse direction
- and move all the OT after replace to the new piece
