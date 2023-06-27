import React, { createRef } from 'react'
import { v4 as uuidv4 } from 'uuid'
import { INode, Node as NodeModel } from '../models/node'
import { useMindMap } from '../hooks'
import { SvgLine } from './SvgLine'
import { HexColor, MindMapContext, MindMapProvider } from './MindMap'

const nodeStyle =
  'inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 relative cursor-pointer'

// TODO move this to a defaults file
export const defaultFill: HexColor = '#555'

interface INodeProps {
  childNumber?: number
  isRoot?: boolean
  node: NodeModel
  style?: Partial<CSSStyleDeclaration>
}

export const Node = React.forwardRef<HTMLDivElement, INodeProps>(
  ({ childNumber = 1, node, isRoot }, ref) => {
    const hypotenuse = childNumber > 11 ? Math.ceil(childNumber / 11) * 150 : 150
    const { onMouseEnter, onMouseOut, fill, addNode, getPositionOf } =
      React.useContext(MindMapContext)
    const newRefs = React.useRef<React.RefObject<HTMLDivElement>[]>([])
    const [xDistanceFromParent, setXDistanceFromParent] = React.useState(
      Math.floor(hypotenuse * Math.cos(childNumber * (Math.PI / 6)))
    )
    const [yDistanceFromParent, setYDistanceFromParent] = React.useState(
      Math.floor(hypotenuse * Math.sin(childNumber * (Math.PI / 6)))
    )
    const [x1, setX1] = React.useState(
      getPositionOf((node.parentRef as React.RefObject<HTMLDivElement>)?.current).horizontalCenter
    )
    const [y1, setY1] = React.useState(
      getPositionOf((node.parentRef as React.RefObject<HTMLDivElement>)?.current).verticalCenter
    )
    const [x2, setX2] = React.useState(
      getPositionOf((node.parentRef as React.RefObject<HTMLDivElement>)?.current).horizontalCenter
    )
    const [y2, setY2] = React.useState(
      getPositionOf((node.parentRef as React.RefObject<HTMLDivElement>)?.current).verticalCenter
    )
    const [z, setZ] = React.useState('z-20')

    const onClick = () => {
      // create a node from the passed-in node
      addNode(node)
    }

    React.useEffect(() => {
      node.ref = ref
    }, [ref])

    React.useEffect(() => {
      setX1(
        getPositionOf((node.parentRef as React.RefObject<HTMLDivElement>)?.current).horizontalCenter
      )
      setY1(
        getPositionOf((node.parentRef as React.RefObject<HTMLDivElement>)?.current).verticalCenter
      )
    }, [
      getPositionOf((node.parentRef as React.RefObject<HTMLDivElement>)?.current).horizontalCenter,
      getPositionOf((node.parentRef as React.RefObject<HTMLDivElement>)?.current).verticalCenter,
      (node.parentRef as React.RefObject<HTMLDivElement>)?.current?.children,
      node.siblings,
    ])

    React.useEffect(() => {
      setX2(
        getPositionOf((node.parentRef as React.RefObject<HTMLDivElement>)?.current)
          .horizontalCenter + xDistanceFromParent
      )
      setY2(
        getPositionOf((node.parentRef as React.RefObject<HTMLDivElement>)?.current).verticalCenter +
          yDistanceFromParent
      )
    }, [
      getPositionOf((node.parentRef as React.RefObject<HTMLDivElement>)?.current).horizontalCenter,
      getPositionOf((node.parentRef as React.RefObject<HTMLDivElement>)?.current).verticalCenter,
      xDistanceFromParent,
      yDistanceFromParent,
    ])

    const [height, setHeight] = React.useState<string>('')
    const [borderRadius, setBorderRadius] = React.useState<string | undefined>()
    return (
      <>
        <div
          onMouseEnter={() => {
            onMouseEnter()
            setHeight('h-[75px]')
            setBorderRadius('15px')
          }}
          onMouseOut={() => {
            setTimeout(() => {
              onMouseOut()
              setHeight('')
              setBorderRadius('')
            }, 1500)
          }}
          ref={ref}
          className={nodeStyle + ` ${z} ${height}`}
          style={{
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
        {!isRoot ? <SvgLine {...{ fill, x1, y1, x2, y2 }} /> : null}
        {node.ref
          ? node.children.map((n: NodeModel, i: number) => {
              // TODO: put this in a helper function
              newRefs.current[i] = React.createRef()
              n.ref = newRefs.current[i]
              n.parentRef = node.ref
              return <Node ref={newRefs.current[i]} childNumber={i} node={n} key={i} />
            })
          : null}
      </>
    )
  }
)
