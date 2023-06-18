import React from 'react'
import { Map, Node as NodeModel } from '../../models'
import { Node } from '../Node'

export interface IMindMap {
  data: Record<string, string>
}

// TODO remove this hard-coded map/data
const map = new Map()
const n1 = new NodeModel({ topic: 'triangle' })
const n2 = new NodeModel({ topic: 'kimura' })
map.root?.setChildren([n1, n2])
map.root?.topic = 'closed guard'

const MindMap: React.FC<IMindMap> = ({ data }) => {
  return (
    <div>
      <div>MindMap: inner</div>
      <Node node={map.root} />
      {map.root?.children.map((n, i) => (
        <Node key={i} node={n} />
      ))}
    </div>
  )
}

export default MindMap
