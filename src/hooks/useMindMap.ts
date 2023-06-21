import React from 'react'

export type NodePosition = {
  centerH: number
  centerV: number
}

const undefinedPosition: NodePosition = {
  centerH: 0,
  centerV: 0,
}

export function useMindMap() {
  const getPosition = (ref: HTMLElement): NodePosition => {
    if (!ref) return undefinedPosition

    const { right, bottom, left, top } = ref.getBoundingClientRect()
    const centerH = left + (right - left) / 2
    const centerV = top + (bottom - top) / 2

    return { centerH, centerV }
  }

  return {
    getPosition,
  }
}
