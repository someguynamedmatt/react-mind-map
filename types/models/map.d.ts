import { Node } from './node';
type MapNodes = {
    [id: string]: Node;
};
export declare class Map {
    private _nodes;
    private _root;
    constructor(root?: Node);
    addNode(node: Node): void;
    clear(): void;
    getNode(id: string): Node | null;
    get nodeCount(): number;
    get nodes(): MapNodes;
    removeNode(node: Node): boolean;
    get root(): Node;
}
export {};
