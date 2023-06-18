import { v4 as uuidv4 } from 'uuid'

export type INode = {
  children?: Node[]
  id?: string
  isRoot?: boolean
  parentId?: string | null
  topic?: string | null
}

export class Node {
  private _children: Node[] = []
  private _id: string
  private _isRoot: boolean
  private _parentId: string | null = null
  private _topic: string | null

  constructor({ children = [], id = uuidv4(), topic, isRoot, parentId }: INode = {}) {
    this._id = id
    this._topic = topic ?? null
    this._isRoot = Boolean(isRoot)
    this._parentId = parentId ?? null

    this.setChildren(children)
  }

  public get children(): Node[] {
    return this._children
  }

  public setChildren(nodes: Node[]) {
    // Reset each node's parentId
    // to this node's id
    nodes.forEach((node: Node) => {
      node.parentId = this._id
    })
    this._children = nodes
  }

  public get id(): string {
    return this._id
  }

  public get topic(): string | null {
    return this._topic ?? null
  }

  public set topic(topic: string) {
    this._topic = topic
  }

  public get isRoot(): boolean {
    return Boolean(this._isRoot)
  }

  public set isRoot(isRoot: boolean) {
    this._isRoot = isRoot
    if (this._isRoot === false && this._parentId === null) {
      console.warn(
        '[react-mind-map]: an orphaned node has been created after setting `isRoot` to false'
      )
    }
  }

  public get parentId(): string | null {
    return this._parentId
  }

  public set parentId(parentId: string) {
    this._parentId = parentId
  }
}
