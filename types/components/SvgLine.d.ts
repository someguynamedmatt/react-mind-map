import React from 'react';
interface ISvgPath {
    x1: number;
    y1: number;
    x2: number;
    y2: number;
    id?: string;
    fill: string | undefined;
}
export declare const SvgLine: React.FC<ISvgPath>;
export {};
