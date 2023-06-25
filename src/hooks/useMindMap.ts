import React, { RefObject } from 'react'
import { Node } from '../models'

export type NodePosition = {
  horizontalCenter: number
  verticalCenter: number
}

const undefinedPosition: NodePosition = {
  horizontalCenter: 0,
  verticalCenter: 0,
}

export function useMindMap() {
  const [nodes, setNodes] = React.useState<Node[]>([])

  console.log('USE MIND MAP')
  const getPositionOf = (ref?: HTMLDivElement): NodePosition => {
    if (!ref) return undefinedPosition

    const { top, left, width, height } = ref.getBoundingClientRect()
    const midPointX = Math.floor(width / 2)
    // const midPointY = Math.floor(height / 2)

    const horizontalCenter = Math.floor(left + midPointX)
    const verticalCenter = Math.floor(top)

    return { horizontalCenter, verticalCenter }
  }

  const addNode = (parentId: string) => {
    const newNode = new Node({ topic: 'new-move', parentId })
    setNodes([...nodes, newNode])
  }

  const setRoot = (rootNode: Node) => {
    setNodes([...rootNode.children])
  }

  return {
    addNode,
    getPositionOf,
    nodes,
    setRoot,
  }
}
