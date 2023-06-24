import React, { createRef } from 'react'
import { v4 as uuidv4 } from 'uuid'
import { INode, Node as NodeModel } from '../models/node'
import { useMindMap } from '../hooks'
import { SvgLine } from './SvgLine'
import { MindMapContext, MindMapProvider } from './MindMap'

const nodeStyle =
  'inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 relative cursor-pointer'

export const Node: React.FC<{ node: INode; childNumber?: number; isRoot?: boolean }> =
  React.forwardRef(({ childNumber = 1, node, isRoot }, ref: React.RefObject<HTMLElement>) => {
    const hypotenuse = childNumber > 11 ? Math.ceil(childNumber / 11) * 150 : 150
    const { addNode, getPositionOf } = React.useContext(MindMapContext)
    const newRefs = React.useRef([])
    const [xDistanceFromParent, setXDistanceFromParent] = React.useState(
      Math.floor(hypotenuse * Math.cos(childNumber * (Math.PI / 6)))
    )
    const [yDistanceFromParent, setYDistanceFromParent] = React.useState(
      Math.floor(hypotenuse * Math.sin(childNumber * (Math.PI / 6)))
    )
    const [x1, setX1] = React.useState(getPositionOf(node.parentRef?.current).horizontalCenter)
    const [y1, setY1] = React.useState(getPositionOf(node.parentRef?.current).verticalCenter)
    const [x2, setX2] = React.useState(getPositionOf(node.parentRef?.current).horizontalCenter)
    const [y2, setY2] = React.useState(getPositionOf(node.parentRef?.current).verticalCenter)
    const [fill, setFill] = React.useState()
    const [z, setZ] = React.useState('z-20')

    const onClick = () => {
      // create a node from the passed-in node
      addNode(node)
    }

    React.useEffect(() => {
      node.ref = ref
    }, [ref.current])

    React.useEffect(() => {
      setX1(getPositionOf(node.parentRef?.current).horizontalCenter)
      setY1(getPositionOf(node.parentRef?.current).verticalCenter)
    }, [
      getPositionOf(node.parentRef?.current).horizontalCenter,
      getPositionOf(node.parentRef?.current).verticalCenter,
      node.parentRef?.current?.children,
      node.siblings,
    ])

    React.useEffect(() => {
      setX2(getPositionOf(node.parentRef?.current).horizontalCenter + xDistanceFromParent)
      setY2(getPositionOf(node.parentRef?.current).verticalCenter + yDistanceFromParent)
    }, [
      getPositionOf(node.parentRef?.current).horizontalCenter,
      getPositionOf(node.parentRef?.current).verticalCenter,
      xDistanceFromParent,
      yDistanceFromParent,
    ])

    // TODO: make this part of the API
    const onMouseEnter = () => {
      setFill('#45E00B')
      setZ('z-50')
    }

    // TODO: make this part of the API
    const onMouseOut = () => {
      setFill()
      setZ('z-20')
    }

    return (
      <div id='ref' className='flex m-auto justify-center'>
        <div
          onMouseEnter={onMouseEnter}
          onMouseOut={onMouseOut}
          onClick={onClick}
          ref={ref}
          className={nodeStyle + ` ${z}`}
          style={{
            top: isRoot ? node.defaultPosition.verticalCenter : y2,
            left: isRoot ? node.defaultPosition.horizontalCenter : x2,
            position: 'absolute',
          }}
        >
          {node.topic}
        </div>
        {!isRoot ? <SvgLine id={node.topic} {...{ fill, x1, y1, x2, y2 }} /> : null}
        <div>
          {node.ref
            ? node.children.map((n: NodeModel, i: number) => {
                // TODO: put this in a helper function
                newRefs.current[i] = React.createRef()
                n.ref = newRefs.current[i]
                n.parentRef = node.ref
                return <Node ref={newRefs.current[i]} childNumber={i} node={n} key={i} />
              })
            : null}
        </div>
      </div>
    )
  })
