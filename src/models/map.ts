import { v4 as uuidv4 } from 'uuid'
import { Node } from './node'

type MapNodes = {
  [id: string]: Node
}

export class Map {
  private _nodes: MapNodes = {}
  private _root?: Node

  constructor(root: Node = new Node({ id: uuidv4(), isRoot: true })) {
    this._nodes = { root }
    this._root = root
  }

  public addNode(node: Node): void {
    this._nodes[node.id] = node
  }

  public clear(): void {
    this._nodes = {}
  }

  public getNode(id: string): Node | null {
    return this._nodes[id] ?? null
  }

  public get nodeCount(): number {
    return Object.keys(this._nodes).length
  }

  public get nodes(): MapNodes {
    return this._nodes
  }

  public removeNode(node: Node): boolean {
    delete this._nodes[node.id]
    if (node.isRoot && node.id === this._root?.id) {
      delete this._nodes.root
      delete this._root
    }
    return true
  }

  public get root(): Node | null {
    return this._root ?? null
  }
}
