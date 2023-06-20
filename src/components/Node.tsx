import React from 'react'
import { INode } from '../models/node'
import { useMindMap } from '../hooks'
import { SvgPath } from './SvgPath'

const nodeStyle =
  'inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2 relative'

export const Node: React.FC<{ node: INode }> = React.forwardRef(
  ({ node }, ref: React.RefObject<HTMLElement>) => {
    const { getPosition } = useMindMap()
    const childRefs = React.useRef([])
    const [thisPosition, setThisPosition] = React.useState(getPosition(ref?.current))
    const [positions, setPositions] = React.useState(getPosition(ref?.current))

    if (childRefs.current.length !== node.children?.length) {
      childRefs.current = Array(node.children?.length)
        .fill()
        .map((_, i) => childRefs.current[i]?.current || React.createRef())
    }

    React.useEffect(() => {
      setThisPosition(getPosition(ref?.current))
      setPositions(node.children?.map((n, i) => getPosition(childRefs.current[i].current)))
    }, [])

    React.useEffect(() => {
      const resize = () => {
        setThisPosition(getPosition(ref?.current))
        setPositions(node.children?.map((n, i) => getPosition(childRefs.current[i].current)))
      }
      window.addEventListener('resize', resize)

      return () => window.removeEventListener('resize', resize)
    }, [])

    return (
      <div className='flex'>
        <div className='z-20 w-[200px]'>
          <div className={nodeStyle} ref={ref}>
            {node.topic}
          </div>
        </div>
        {node.children?.map((n: Node, i: number) => (
          <>
            <SvgPath
              id={n.topic}
              x1={thisPosition.centerH}
              y1={thisPosition.centerV - 25}
              x2={positions[i]?.centerH}
              y2={positions[i]?.centerV - 25}
              key={i}
            />
            <Node ref={childRefs?.current[i]} key={`${i}-${node.topic}`} node={n} />
          </>
        ))}
      </div>
    )
  }
)
