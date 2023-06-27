/// <reference types="react" />
export type INode = {
    children?: Node[];
    id?: string;
    isRoot?: boolean;
    parentId?: string | null;
    parentRef?: React.ForwardedRef<HTMLDivElement> | null;
    ref?: React.ForwardedRef<HTMLDivElement> | null;
    siblings?: number;
    topic?: string | null;
};
export declare class Node {
    private _children;
    private _id;
    private _isRoot;
    private _parentId;
    private _parentRef;
    private _ref;
    private _topic;
    private _siblings;
    constructor({ children, id, isRoot, parentId, parentRef, siblings, topic, }?: INode);
    get children(): Node[];
    setChildren(nodes: Node[]): void;
    get id(): string;
    get topic(): string | null;
    set topic(topic: string);
    get isRoot(): boolean;
    set isRoot(isRoot: boolean);
    get parentId(): string | null;
    set parentId(parentId: string);
    get parentRef(): React.ForwardedRef<HTMLDivElement> | null;
    set parentRef(ref: React.ForwardedRef<HTMLDivElement> | null);
    get ref(): React.ForwardedRef<HTMLDivElement> | null;
    set ref(ref: React.ForwardedRef<HTMLDivElement> | null);
    get defaultPosition(): Record<string, string>;
    get siblings(): number;
    private set siblings(value);
    private updateChildren;
}
