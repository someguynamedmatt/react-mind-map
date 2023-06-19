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

  // const getDistanceBetweenNodes = (
  //   node1: React.RefObject<HTMLElement>,
  //   node2: React.RefObject<HTMLElement>
  // ): { y: number; x: number } => {
  //   const n1Pos = getPosition(node1)
  //   const n2Pos = getPosition(node2)
  //   const yDist = Math.abs(n1Pos.centerV - n2Pos.centerV)
  //   const xDist = Math.abs(n1Pos.centerH - n2Pos.centerH)

  //   // return Math.sqrt(Math.pow(yDist, 2) + Math.pow(xDist, 2))
  //   return { y: yDist, x: xDist }
  // }

  return {
    getPosition,
    // getDistanceBetweenNodes,
  }
}
