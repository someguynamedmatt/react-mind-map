import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import typescript from "@rollup/plugin-typescript";
import peerDepsExternal from 'rollup-plugin-peer-deps-external';
import dts from "rollup-plugin-dts";
import postcss from 'rollup-plugin-postcss'
import tailwind from 'rollup-plugin-tailwindcss'

import packageJson from "./package.json" assert { type: "json" };

export default [
  {
    input: "src/index.ts",
    output: [
      {
        file: packageJson.main,
        format: "cjs",
        sourcemap: true,
      },
      {
        file: packageJson.module,
        format: "esm",
        sourcemap: true,
      },
    ],
    plugins: [
      peerDepsExternal(),
      resolve({
        browser: true,
        dedupe: ['react', 'react-dom'],
      }),
      commonjs(),
      typescript({ tsconfig: "./tsconfig.json" }),
      postcss(),
      tailwind({
        input: './src/input.css',
        purge: false,
      }),
    ],
    external: ['react', 'react-dom'],
  },
  {
    input: "dist/esm/types/index.d.ts",
    output: [{ file: "dist/index.d.ts", format: "esm" }],
    plugins: [dts()],
    external: [/\.css$/],
  },
];
