import React from 'react'
import { v4 as uuidv4 } from 'uuid'
import { Map, Node as NodeModel } from '../models'
import { Node, defaultFill } from './Node'
import { useMindMap } from '../hooks'

export interface IMindMap {
  data: Record<string, string>
}

export type NodePosition = {
  horizontalCenter: number
  verticalCenter: number
  height: number
  width: number
}

const undefinedPosition: NodePosition = {
  horizontalCenter: 500,
  verticalCenter: 500,
  height: 200,
  width: 200,
}

// TODO remove this hard-coded map/data
const map = new Map()
// @ts-ignore code for testing, removed when done
map.root?.topic = 'closed guard'

const n1 = new NodeModel({ topic: 'triangle' })

const n2 = new NodeModel({ topic: 'kimura' })

// @ts-ignore code for testing, removed when done
map.root?.setChildren([n1])
// @ts-ignore code for testing, removed when done
map.root?.setChildren([n2])

export const MindMapContext = React.createContext<IMindMapProvider>({} as IMindMapProvider)

const Nodes: React.FC = () => {
  const { nodes, setRoot } = React.useContext(MindMapContext)
  const rootRef = React.useRef<HTMLDivElement>(null)

  React.useEffect(() => {
    setRoot(map.root)
  }, [])

  return (
    <>
      {!map.root ? null : (
        <Node
          isRoot={true}
          node={map.root}
          ref={rootRef}
          style={{ position: 'absolute', top: '50%' }}
        />
      )}
    </>
  )
}

export const MindMap: React.FC<IMindMap> = ({ data }) => {
  const mindMap = React.useRef(null)
  const [width, setWidth] = React.useState()
  const [height, setHeight] = React.useState()

  const setDimensions = () => {
    console.log('set dimensions event')
    setWidth(Math.floor(mindMap?.current.getBoundingClientRect().width))
    setHeight(Math.floor(mindMap?.current.getBoundingClientRect().height))
  }

  React.useEffect(() => {
    setDimensions()
    mindMap?.current.addEventListener('resize', setDimensions)
    mindMap?.current.addEventListener('scroll', setDimensions)

    return () => {
      mindMap?.current.removeEventListener('resize', setDimensions)
      mindMap?.current.removeEventListener('scroll', setDimensions)
    }
  }, [])

  return (
    <div
      id='mind-map-main'
      style={{ display: 'block', position: 'relative', height: '100%', overflow: 'auto' }}
    >
      <div id='inner' style={{ position: 'relative' }} ref={mindMap}>
        <MindMapProvider encapsulatingDimensions={{ width, height }}>
          <Nodes />
        </MindMapProvider>
      </div>
    </div>
  )
}

export type Hash = '#'
export type HexColor = `${Hash}${string}`

export interface IMindMapProvider {
  addNode: (parentNode: NodeModel) => void
  fill: HexColor | undefined
  getPositionOf: (ref?: HTMLDivElement | null) => NodePosition
  nodes: NodeModel[]
  onMouseEnter: () => void
  onMouseOut: () => void
  root?: NodeModel
  setRoot: (root: NodeModel) => void
}

export const MindMapProvider = ({
  children,
  encapsulatingDimensions,
}: {
  children: React.ReactNode[]
  encapsulatingDimensions: Record<{ width: number; height: number }>
}): React.ReactNode => {
  const [nodes, setNodes] = React.useState<NodeModel[]>([])
  const [fill, setFill] = React.useState<HexColor | undefined>(defaultFill)
  const root = React.useRef<NodeModel | null>(null)

  const getPositionOf = (ref?: HTMLDivElement | null): NodePosition => {
    if (!ref) return undefinedPosition

    const { top, left, width, height } = ref.getBoundingClientRect()
    const midPointX = Math.floor(width / 2)
    // const midPointY = Math.floor(height / 2)

    const horizontalCenter = Math.floor(left + midPointX)
    const verticalCenter = Math.floor(top)

    return { horizontalCenter, verticalCenter, height, width }
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
    setFill(undefined)
  }

  React.useEffect(() => {
    setNodes([...(root?.current?.children ?? [])])
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
        root: root?.current ?? undefined,
        setRoot,
        encapsulatingDimensions,
      }}
    >
      {children}
    </MindMapContext.Provider>
  )
}
