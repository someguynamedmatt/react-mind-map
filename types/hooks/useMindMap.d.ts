import { Node } from '../models';
export type NodePosition = {
    horizontalCenter: number;
    verticalCenter: number;
};
export declare function useMindMap(): {
    addNode: (parentId: string) => void;
    getPositionOf: (ref?: HTMLDivElement) => NodePosition;
    nodes: Node[];
    setRoot: (rootNode: Node) => void;
};
