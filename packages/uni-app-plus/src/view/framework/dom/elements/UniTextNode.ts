import { UniNodeJSON } from '@dcloudio/uni-shared'
import { UniNode } from './UniNode'

export class UniTextNode extends UniNode {
  constructor(
    id: number,
    parentNodeId: number,
    refNodeId: number,
    nodeJson: Partial<UniNodeJSON>
  ) {
    super(id, '#text', parentNodeId, document.createTextNode(''))
    this.init(nodeJson)
    this.insert(parentNodeId, refNodeId)
  }
}
