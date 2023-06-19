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
map.root?.setChildren([n1])
map.root?.topic = 'closed guard'

export const MindMap: React.FC<IMindMap> = ({ data }) => {
  const { getPosition } = useMindMap()
  const [rootCoord, setRootCoord] = React.useState()
  const [nCoord, setNCoord] = React.useState()

  const rootRef = React.useRef(null)
  const nRef = React.useRef(null)

  React.useEffect(() => {
    setRootCoord(getPosition(rootRef))
    setNCoord(getPosition(nRef))
  }, [])

  console.log({ rootCoord, nCoord })
  return (
    <div>
      {rootCoord?.centerH && nCoord?.centerH ? (
        <SvgPath
          x1={rootCoord.centerH}
          y1={rootCoord.centerV}
          x2={nCoord.centerH}
          y2={nCoord.centerV}
        />
      ) : null}
      <div>MindMap: inner</div>
      {/* root */}
      <Node rref={rootRef} node={map.root} />

      {map.root?.children.map((n, i) => (
        <Node key={i} node={n} rref={nRef} />
      ))}
    </div>
  )
}
