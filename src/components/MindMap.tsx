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

const Nodes: React.FC<{ customComponent: React.ReactNode }> = ({ customComponent }) => {
  const { nodes, setRoot } = React.useContext(MindMapContext)
  const rootRef = React.useRef()

  React.useEffect(() => {
    setRoot(map.root)
  }, [])

  return (
    <Node
      customComponent={customComponent}
      id='top-level'
      ref={rootRef}
      isRoot={true}
      node={map.root}
      style={{ position: 'absolute', top: '50%' }}
    />
  )
}

export const MindMap: React.FC<IMindMap> = ({ data }) => {
  const nodeStyle =
    'inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 relative cursor-pointer'
  const customComponent = React.forwardRef(
    (
      { onMouseEnter, onMouseOut, topic, node, isRoot, y2, x2, onClick, borderRadius },
      ref: React.RefObject
    ) => (
      <div
        onMouseEnter={onMouseEnter}
        onMouseOut={onMouseOut}
        ref={ref}
        className={nodeStyle}
        style={{
          backgroundColor: 'red',
          top: isRoot ? node.defaultPosition.verticalCenter : y2,
          left: isRoot ? node.defaultPosition.horizontalCenter : x2,
          position: 'absolute',
          borderRadius: borderRadius,
          border: borderRadius ? '1px solid black' : '',
        }}
      >
        {node.topic}
        {borderRadius ? (
          <div style={{ position: 'relative' }} onClick={onClick}>
            add
          </div>
        ) : null}
      </div>
    )
  )

  return (
    <MindMapProvider>
      <h1>MindMap</h1>
      <Nodes customComponent={customComponent} />
    </MindMapProvider>
  )
}

export const MindMapProvider: React.FC = ({ children }) => {
  const [nodes, setNodes] = React.useState<Node[]>([])
  const [fill, setFill] = React.useState()
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

  // TODO: make this part of the API
  const onMouseEnter = () => {
    setFill('#45E00B')
  }

  // TODO: make this part of the API
  const onMouseOut = () => {
    setFill()
  }

  React.useEffect(() => {
    setNodes([...root?.current?.children])
  }, [])

  return (
    <MindMapContext.Provider
      value={{
        addNode,
        fill,
        getPositionOf,
        nodes,
        onMouseEnter,
        onMouseOut,
        root: root?.current,
        setRoot,
      }}
    >
      {children}
    </MindMapContext.Provider>
  )
}
