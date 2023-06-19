import React from 'react'
import { Map, Node as NodeModel } from '../../models'
import { Node } from '../Node'
import { useMindMap } from '../../hooks'

export interface IMindMap {
  data: Record<string, string>
}

// TODO remove this hard-coded map/data
const map = new Map()
const n1 = new NodeModel({ topic: 'triangle' })
map.root?.setChildren([n1])
map.root?.topic = 'closed guard'

const MindMap: React.FC<IMindMap> = ({ data }) => {
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
        <svg style={{ position: 'absolute' }} width='1039' height='500'>
          <defs>
            <marker id='head' orient='auto' markerWidth='2' markerHeight='4' refX='0.1' refY='2'>
              <path d='M0,0 V4 L2,2 Z' fill='#555' />
            </marker>
          </defs>
          <path
            stroke='#555'
            strokeWidth='2'
            marker-end='url(#head)'
            fill='blue'
            d={`M ${rootCoord.centerH} ${rootCoord.centerV} C ${rootCoord.centerH} ${rootCoord.centerV}, ${nCoord.centerH} ${nCoord.centerV}, ${nCoord.centerH} ${nCoord.centerV}`}
          ></path>
        </svg>
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

export default MindMap
