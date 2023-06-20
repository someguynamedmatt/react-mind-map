import React from 'react'

// see: https://developer.mozilla.org/en-US/docs/Web/SVG/Tutorial/Paths#curve_commands
interface ISvgPath {
  x1: number
  y1: number
  x2: number
  y2: number
  id?: string
}

export const SvgPath: React.FC<ISvgPath> = ({ x1 = 0, y1 = 0, x2 = 0, y2 = 0, id }) => {
  const width = document.body.clientWidth
  const height = document.body.clientHeight

  return (
    <svg
      width={width}
      height={height}
      style={{ position: 'absolute', zIndex: '10', right: '0' }}
      id={id}
    >
      <defs>
        <marker id='head' orient='auto' markerWidth='2' markerHeight='4' refX='0.1' refY='2'>
          <path d='M0,0 V4 L2,2 Z' fill='#555' />
        </marker>
      </defs>
      <path
        stroke='#555'
        strokeWidth='2'
        markerEnd='url(#head)'
        fill='#555'
        d={`M ${x1} ${y1} C ${x1} ${y1}, ${x2 - 50} ${y2}, ${x2 - 50} ${y2}`}
      ></path>
    </svg>
  )
}
