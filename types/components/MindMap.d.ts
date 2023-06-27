import React from 'react';
import { Node as NodeModel } from '../models';
export interface IMindMap {
    data: Record<string, string>;
}
export type NodePosition = {
    horizontalCenter: number;
    verticalCenter: number;
};
export declare const MindMapContext: React.Context<IMindMapProvider>;
export declare const MindMap: React.FC<IMindMap>;
export type Hash = '#';
export type HexColor = `${Hash}${string}`;
export interface IMindMapProvider {
    addNode: (parentNode: NodeModel) => void;
    fill: HexColor | undefined;
    getPositionOf: (ref?: HTMLDivElement | null) => NodePosition;
    nodes: NodeModel[];
    onMouseEnter: () => void;
    onMouseOut: () => void;
    root?: NodeModel;
    setRoot: (root: NodeModel) => void;
}
export declare const MindMapProvider: ({ children }: {
    children: React.ReactNode[];
}) => React.ReactNode;
