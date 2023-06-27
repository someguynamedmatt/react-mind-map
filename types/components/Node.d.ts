import React from 'react';
import { Node as NodeModel } from '../models/node';
import { HexColor } from './MindMap';
export declare const defaultFill: HexColor;
interface INodeProps {
    childNumber?: number;
    isRoot?: boolean;
    node: NodeModel;
    style?: Partial<CSSStyleDeclaration>;
}
export declare const Node: React.ForwardRefExoticComponent<INodeProps & React.RefAttributes<HTMLDivElement>>;
export {};
