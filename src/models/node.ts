import { v4 as uuidv4 } from 'uuid'

export type INode = {
  children?: Node[]
  id?: string
  isRoot?: boolean
  parentId?: string | null
  parentRef?: React.RefObject<HTMLElement> | null
  ref?: React.RefObject<HTMLElement> | null
  siblings?: number
  topic?: string | null
}

export class Node {
  private _children: Node[] = []
  private _id: string
  private _isRoot: boolean
  private _parentId: string | null = null
  private _parentRef: React.RefObject<HTMLElement> | null = null
  private _ref: React.RefObject<HTMLElement> | null = null
  private _topic: string | null
  private _siblings: number = 0

  constructor({
    children = [],
    id = uuidv4(),
    isRoot,
    parentId,
    parentRef,
    siblings,
    topic,
  }: INode = {}) {
    this._id = id
    this._isRoot = Boolean(isRoot)
    this._parentId = parentId ?? null
    this._parentRef = parentRef ?? null
    this._siblings = siblings ?? 0
    this._topic = topic ?? null

    this.setChildren(children)
  }

  public get children(): Node[] {
    return this._children
  }

  public setChildren(nodes: Node[]) {
    // we want the sibling nodes and
    // we remove 1 from the count because
    // nodes.length _includes_ this node
    const siblings = [...this._children, ...nodes].length

    // Reset each node's parentId
    // to this node's id
    nodes.forEach((node: Node) => {
      node.parentId = this._id
      node.siblings = siblings
      node.parentRef = this._parentRef
    })
    this._children = [...this._children, ...nodes]
    this.updateChildren()
    // this._siblings = nodes.length - 1
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

  public get parentRef(): React.RefObject<HTMLElement> | null {
    return this._parentRef
  }

  public set parentRef(ref: React.RefObject<HTMLElement> | null) {
    this._parentRef = ref
  }

  public get ref(): React.RefObject<HTMLElement> | null {
    return this._ref
  }

  public set ref(ref: React.RefObject<HTMLElement> | null) {
    this._ref = ref
  }

  public get defaultPosition(): Record<string, string> {
    return { horizontalCenter: '500px', verticalCenter: '500px' }
  }

  public get siblings(): number {
    return this._siblings
  }

  private set siblings(siblings: number) {
    this._siblings = siblings
  }

  private updateChildren(): void {
    const siblings = this._children.length - 1
    this._children.forEach(child => {
      child.siblings = siblings
    })
  }
}
