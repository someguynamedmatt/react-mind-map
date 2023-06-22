import React, { RefObject } from 'react'

export type NodePosition = {
  centerH: number
  centerV: number
}

const undefinedPosition: NodePosition = {
  centerH: 0,
  centerV: 0,
}

export function useMindMap(ref: React.RefObject<HTMLElement>) {
  const getPosition = (ref?: HTMLElement): NodePosition => {
    if (!ref) return undefinedPosition

    const { top, left, width, height } = ref.getBoundingClientRect()
    const midPointX = Math.floor(width / 2)
    // const midPointY = Math.floor(height / 2)

    const centerH = Math.floor(left + midPointX)
    const centerV = Math.floor(top)

    return { centerH, centerV }
  }

  return {
    getPosition,
  }
}
