import React from 'react'
import { Map, Node as NodeModel } from '../models'
import { Node } from './Node'
import { SvgPath } from './SvgPath'
import { useMindMap } from '../hooks'

export interface IMindMap {
  data: Record<string, string>
}

// TODO remove this hard-coded map/data
const map = new Map()
const n1 = new NodeModel({ topic: 'triangle' })
n1.setChildren([new NodeModel({ topic: 'turtle' })])
map.root?.setChildren([n1])
map.root?.topic = 'closed guard'

export const MindMap: React.FC<IMindMap> = ({ data }) => {
  const rootRef = React.useRef()
  return (
    <div>
      <div>MindMap</div>
      <div>
        <Node ref={rootRef} node={map.root} />
      </div>
    </div>
  )
}
