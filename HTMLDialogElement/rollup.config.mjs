// rollup.config.mjs
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import babel from '@rollup/plugin-babel';
import { terser } from 'rollup-plugin-terser';

export default {
  input: './js/es6.custom.dialog1.0.0.js', // 輸入文件
  output: {
    file: './js/webpack/es6.custom.dialog.bundle1.0.0.js', // 輸出文件
    format: 'esm', // 輸出格式
    sourcemap: true,
  },
  plugins: [
    resolve(),
    commonjs(),
    babel.babel({ babelHelpers: 'bundled', presets: ['@babel/preset-env'] }),
    terser(),
  ],
};
