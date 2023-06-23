import React from 'react'
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
const n2c = new NodeModel({ topic: 'turtle 3' })
n2.setChildren([new NodeModel({ topic: 'turtle 2' })])
n1.setChildren([new NodeModel({ topic: 'turtle' })])

map.root?.setChildren([n1, n2, n2c])

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
    const newNode = new NodeModel({ topic: 'new-move', parentId: node.id })
    console.log('newNode', newNode)
    node.setChildren([newNode])
    setNodes([...nodes, newNode])
  }

  const setRoot = (rootNode: NodeModel) => {
    console.log('SET ROOT', rootNode)
    root.current = rootNode
  }

  const setRootRef = (ref: React.RefObject<HTMLElement>): void => {
    _setRootRef(ref)
  }

  React.useEffect(() => {
    if (root?.current) {
      setNodes([...nodes, ...root?.current?.children])
    }
  }, [root?.current])

  return (
    <MindMapContext.Provider
      value={{ nodes, setRoot, setRootRef, addNode, getPositionOf, root: root?.current, rootRef }}
    >
      {children}
    </MindMapContext.Provider>
  )
}
