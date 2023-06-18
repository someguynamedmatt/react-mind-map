import { v4 as uuidv4 } from 'uuid'

interface INode {
  children?: Node[]
  id: string
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

  constructor({ children, id = uuidv4(), topic, isRoot, parentId }: INode) {
    this.children = children ?? []
    this._id = id
    this._topic = topic ?? null
    this._isRoot = Boolean(isRoot)
    this._parentId = parentId ?? null
  }

  public get children(): Node[] {
    return this._children
  }

  public set children(nodes: Node[]) {
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
  }

  public get parentId(): string | null {
    return this._parentId
  }

  public set parentId(parentId: string) {
    this._parentId = parentId
  }
}
