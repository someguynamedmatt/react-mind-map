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

    const offsetTop = ref.offsetTop
    const offsetLeft = ref.offsetLeft
    const { width, height } = ref.getBoundingClientRect()
    const midPointX = Math.floor(width / 2)
    const midPointY = Math.floor(height / 2)

    const centerH = offsetLeft + midPointX
    const centerV = offsetTop + midPointY

    debugger
    return { centerH, centerV }
  }

  return {
    getPosition,
  }
}
