import { v4 as uuidv4 } from 'uuid'
import { Node } from './node'

type MapNodes = {
  [id: string]: Node
}

export class Map {
  private _nodes: MapNodes = {}
  private _root: Node

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
    if (this._nodes[node.id].isRoot) {
      console.warn('[WARN]: removeNode failed: attempted to remove the root node')
      return false
    }
    delete this._nodes[node.id]
    return true
  }

  public get root(): Node {
    return this._root
  }
}
