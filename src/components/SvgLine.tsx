import React from 'react'
import { MindMapContext } from '../components/MindMap'

// see: https://developer.mozilla.org/en-US/docs/Web/SVG/Tutorial/Paths#curve_commands
interface ISvgPath {
  fill: string | undefined
  height: number
  id?: string
  width: number
  x1: number
  x2: number
  y1: number
  y2: number
}

export const SvgLine: React.FC<ISvgPath> = ({
  fill = '#555',
  height = 0,
  id,
  width = 0,
  x1 = 0,
  x2 = 0,
  y1 = 0,
  y2 = 0,
}) => {
  const {
    encapsulatingDimensions: { width, height },
  } = React.useContext(MindMapContext)
  return (
    <svg width={width} height={height} className='absolute z-10' id={id}>
      <defs>
        <marker id='head' orient='auto' markerWidth='2' markerHeight='4' refX='0.1' refY='2'>
          <path d='M0,0 V4 L2,2 Z' fill={fill} />
        </marker>
      </defs>
      <line
        stroke={fill}
        strokeWidth='2'
        markerEnd='url(#head)'
        fill={fill}
        {...{ x1, y1, x2, y2 }}
      ></line>
    </svg>
  )
}
