import React, { createRef } from 'react'
import { INode, Node as NodeModel } from '../models/node'
import { useMindMap } from '../hooks'
import { SvgLine } from './SvgLine'
import { MindMapContext, MindMapProvider } from './MindMap'

const nodeStyle =
  'inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 relative'

export const Node: React.FC<{ node: INode; childNumber?: number; isRoot?: boolean }> =
  React.forwardRef(({ childNumber = 1, node, isRoot }, ref: React.RefObject<HTMLElement>) => {
    const hypotenuse = 150
    const { addNode, getPositionOf } = React.useContext(MindMapContext)

    const xDistanceFromParent = node.siblings
      ? Math.floor(Math.sin(((2 * Math.PI) / node.siblings + 1) * childNumber + 1) * hypotenuse)
      : hypotenuse

    const yDistanceFromParent = node.siblings
      ? Math.floor(Math.cos(((2 * Math.PI) / node.siblings + 1) * childNumber + 1) * hypotenuse)
      : 0

    const y2 = React.useMemo(
      () => getPositionOf(node.parentRef?.current).verticalCenter + yDistanceFromParent,
      [node.parentRef?.current, yDistanceFromParent]
    )

    const x2 = React.useMemo(
      () => getPositionOf(node.parentRef?.current).horizontalCenter + xDistanceFromParent,
      [node.parentRef?.current, xDistanceFromParent]
    )

    const onClick = () => {
      // create a node from the passed-in node
      addNode(node)
    }

    const x1 = getPositionOf(node.parentRef?.current).horizontalCenter
    const y1 = getPositionOf(node.parentRef?.current).verticalCenter
    return (
      <div id='ref' onClick={onClick} className='flex m-auto justify-center z-20'>
        <div
          ref={ref}
          className={nodeStyle}
          style={{
            top: isRoot ? node.defaultPosition.verticalCenter : y2,
            left: isRoot ? node.defaultPosition.horizontalCenter : x2,
            position: 'absolute',
          }}
        >
          {node.topic}
        </div>
        {!isRoot ? <SvgLine id={node.topic} {...{ x1, y1, x2, y2 }} /> : null}
        <div>
          {node.children.map((n: NodeModel, i: number) => {
            const newRef = React.useRef(null)
            n.parentRef = ref
            return <Node ref={newRef} childNumber={i} node={n} key={i} />
          })}
        </div>
      </div>
    )
  })
