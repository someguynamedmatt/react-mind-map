import React from 'react'
import { Map } from '../../models'
import { Node } from '../Node'

export interface IMindMap {
  data: Record<string, string>
}

const MindMap: React.FC<IMindMap> = ({ data }) => {
  const map = new Map()
  return (
    <div>
      <div>MindMap: inner</div>
      <Node />
    </div>
  )
}

export default MindMap
