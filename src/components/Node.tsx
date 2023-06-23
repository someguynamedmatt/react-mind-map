import React, { createRef } from 'react'
import { INode, Node as NodeModel } from '../models/node'
import { useMindMap } from '../hooks'
import { SvgLine } from './SvgLine'
import { MindMapContext, MindMapProvider } from './MindMap'

const nodeStyle =
  'inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 relative z-20'

export const Node: React.FC<{ node: INode; childNumber?: number; isRoot?: boolean }> =
  React.forwardRef(({ childNumber = 1, node, isRoot }, ref: React.RefObject<HTMLElement>) => {
    const hypotenuse = 150
    const { addNode, getPositionOf } = React.useContext(MindMapContext)
    const newRefs = React.useRef([])

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
      console.log('ADDING to', node.topic)
      addNode(node)
    }

    const [x1, setX1] = React.useState(getPositionOf(node.parentRef?.current).horizontalCenter)
    const [y1, setY1] = React.useState(getPositionOf(node.parentRef?.current).verticalCenter)

    const [x2, setX2] = React.useState(getPositionOf(node.parentRef?.current).horizontalCenter)
    const [y2, setY2] = React.useState(getPositionOf(node.parentRef?.current).verticalCenter)

    React.useEffect(() => {
      setX1(getPositionOf(node.parentRef?.current).horizontalCenter)
      setY1(getPositionOf(node.parentRef?.current).verticalCenter)
    }, [
      getPositionOf(node.parentRef?.current).verticalCenter,
      getPositionOf(node.parentRef?.current).horizontalCenter,
    ])

    React.useEffect(() => {
      setX2(getPositionOf(node.parentRef?.current).horizontalCenter + xDistanceFromParent)
      setY2(getPositionOf(node.parentRef?.current).verticalCenter + yDistanceFromParent)
    }, [
      getPositionOf(node.parentRef?.current).horizontalCenter,
      xDistanceFromParent,
      getPositionOf(node.parentRef?.current).verticalCenter,
      yDistanceFromParent,
    ])

    if (node.topic === 'kimura') {
      console.log('\n\n****KIMURA')
      console.log('kimura node', node)
      console.log('parent x1, y1', x1, y1)
      console.log('xDistanceFromParent', xDistanceFromParent)
      console.log('yDistanceFromParent', yDistanceFromParent)
      console.log('**** END KIMURA \n\n')
    }

    if (node.topic === 'new-move') {
      console.log('\n\n****NEW-MOVE')
      console.log('new-move node', node)
      console.log('parent position', getPositionOf(node.parentRef?.current))
      console.log('parent x1, y1', x1, y1)
      console.log('xDistanceFromParent', xDistanceFromParent)
      console.log('yDistanceFromParent', yDistanceFromParent)
      console.log('**** END NEW-MOVE \n\n')
    }
    return (
      <div id='ref' className='flex m-auto justify-center'>
        <div
          onClick={onClick}
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
            // TODO: put this in a helper function
            newRefs.current[i] = React.createRef()
            n.ref = newRefs.current[i]
            n.parentRef = node.ref
            return <Node ref={newRefs.current[i]} childNumber={i} node={n} key={i} />
          })}
        </div>
      </div>
    )
  })
