import React from 'react'
import { v4 as uuidv4 } from 'uuid'
import { Map, Node as NodeModel } from '../models'
import { Node } from './Node'
import { SvgPath } from './SvgPath'
import { useMindMap } from '../hooks'

export interface IMindMap {
  data: Record<string, string>
}

export type NodePosition = {
  horizontalCenter: number
  verticalCenter: number
}

const undefinedPosition: NodePosition = {
  horizontalCenter: 500,
  verticalCenter: 500,
}

// TODO remove this hard-coded map/data
const map = new Map()
map.root?.topic = 'closed guard'

const n1 = new NodeModel({ topic: 'triangle' })

const n2 = new NodeModel({ topic: 'kimura' })

map.root?.setChildren([n1])
map.root?.setChildren([n2])

export const MindMapContext = React.createContext()

const Nodes: React.FC = () => {
  const { nodes, setRoot, setRootRef } = React.useContext(MindMapContext)
  const rootRef = React.useRef()

  React.useEffect(() => {
    setRoot(map.root)
  }, [])

  React.useMemo(() => setRootRef(rootRef), [rootRef?.current])

  return (
    <Node
      id='top-level'
      ref={rootRef}
      isRoot={true}
      node={map.root}
      style={{ position: 'absolute', top: '50%' }}
    />
  )
}

export const MindMap: React.FC<IMindMap> = ({ data }) => {
  return (
    <MindMapProvider>
      <h1>MindMap</h1>
      <Nodes />
    </MindMapProvider>
  )
}

export const MindMapProvider: React.FC = ({ children }) => {
  const [nodes, setNodes] = React.useState<Node[]>([])
  const [rootRef, _setRootRef] = React.useState<React.RefObject<HTMLElement>>(null)
  const root = React.useRef(null)

  const getPositionOf = (ref?: HTMLElement): NodePosition => {
    if (!ref) return undefinedPosition

    const { top, left, width, height } = ref.getBoundingClientRect()
    const midPointX = Math.floor(width / 2)
    // const midPointY = Math.floor(height / 2)

    const horizontalCenter = Math.floor(left + midPointX)
    const verticalCenter = Math.floor(top)

    return { horizontalCenter, verticalCenter }
  }

  const addNode = (node: NodeModel) => {
    const newNode = new NodeModel({ topic: uuidv4().split('-')[0], parentId: node.id })
    node.setChildren([newNode])
    setNodes([...nodes, newNode])
  }

  const setRoot = (rootNode: NodeModel) => {
    root.current = rootNode
  }

  const setRootRef = (ref: React.RefObject<HTMLElement>): void => {
    _setRootRef(ref)
  }

  React.useEffect(() => {
    if (root?.current) {
      setNodes([...root?.current?.children])
    }
  }, [root?.current, root?.current?.children?.length])

  return (
    <MindMapContext.Provider
      value={{ nodes, setRoot, setRootRef, addNode, getPositionOf, root: root?.current, rootRef }}
    >
      {children}
    </MindMapContext.Provider>
  )
}
