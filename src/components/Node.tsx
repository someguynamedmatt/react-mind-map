import React from 'react'
import { INode, Node as NodeModel } from '../models/node'
import { useMindMap } from '../hooks'
import { SvgLine } from './SvgLine'

const nodeStyle =
  'inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700'

export const Node: React.FC<{ node: INode; xCoord: number; yCoord: number; hypotenuse: number }> =
  React.forwardRef(
    ({ node, xCoord = 0, yCoord = 0, hypotenuse = 150 }, ref: React.RefObject<HTMLElement>) => {
      const { getPosition } = useMindMap(ref)
      const childRefs = React.useRef([])
      const [rootPosition, setRootPosition] = React.useState(getPosition(ref?.current))
      const [positions, setPositions] = React.useState([])

      // TODO not sure if this is necessary
      if (childRefs.current.length !== node.children?.length) {
        childRefs.current = Array(node.children?.length)
          .fill()
          .map((_, i) => childRefs.current[i]?.current || React.createRef())
      }

      const updatePositions = () => {
        setRootPosition(getPosition(ref?.current))
        setPositions(node.children?.map((_n, i) => getPosition(childRefs?.current[i]?.current)))
      }

      React.useEffect(() => {
        updatePositions()

        const resize = () => {
          updatePositions()
        }
        window.addEventListener('resize', resize)

        return () => window.removeEventListener('resize', resize)
      }, [])

      const onClick = () => {
        const newNode = new NodeModel({ topic: 'cross-collar', parentId: node.id })
        node.setChildren([...node.children, newNode])
        childRefs.current = [...childRefs.current, newNode]
        updatePositions()
      }

      return (
        <div
          className='flex justify-center'
          style={...xCoord && yCoord
            ? {
                ...(yCoord > 0 ? { top: `${yCoord}px` } : { bottom: `${yCoord}px` }),
                ...(xCoord > 0 ? { right: `${xCoord}px` } : { left: `${xCoord}px` }),
                position: 'absolute',
              }
            : {}}
        >
          <div className='z-20 w-[200px]' ref={ref}>
            <div onClick={onClick} className={nodeStyle}>
              {node.topic}
            </div>
          </div>
          {node.children?.map((n: Node, i: number) => {
            const xFromRoot = Math.floor(
              Math.sin(((2 * Math.PI) / node.children.length) * (i + 1)) * hypotenuse
            )
            const yFromRoot = Math.floor(
              Math.cos(((2 * Math.PI) / node.children.length) * (i + 1)) * hypotenuse
            )
            console.log(
              JSON.stringify({
                xFromRoot,
                yFromRoot,
                x1: rootPosition.centerH,
                y1: rootPosition.centerV,
                x2: positions[i]?.centerH,
                y2: positions[i]?.centerV,
                id: n.topic,
              })
            )
            return (
              <>
                <SvgLine
                  id={n.topic}
                  x1={rootPosition.centerH}
                  y1={rootPosition.centerV}
                  x2={rootPosition.centerH + xFromRoot}
                  y2={rootPosition.centerV + yFromRoot}
                  key={i}
                />
                <Node
                  yCoord={rootPosition.centerV + yFromRoot}
                  xCoord={rootPosition.centerH + xFromRoot}
                  ref={childRefs?.current[i]}
                  key={`${i}-${node.topic}`}
                  node={n}
                />
              </>
            )
          })}
        </div>
      )
    }
  )
