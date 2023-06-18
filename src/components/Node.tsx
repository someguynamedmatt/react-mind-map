import React from 'react'
import { INode } from '../models/node'

const nodeStyle =
  'inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2'

export const Node: React.FC<{ node: INode }> = ({ node }) => {
  return <div className={nodeStyle}>{node.topic}</div>
}
