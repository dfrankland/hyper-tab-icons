import commonjs from 'rollup-plugin-commonjs';
import nodeResolve from 'rollup-plugin-node-resolve';
import babel from 'rollup-plugin-babel';
import { dependencies } from './package.json';

export default {
  input: './src/index.js',
  output: {
    file: './dist/index.js',
    format: 'cjs',
    sourcemap: true,
  },
  plugins: [
    commonjs(),
    nodeResolve(),
    babel({
      babelrc: false,
      presets: [
        [
          'env',
          {
            modules: false,
            targets: {
              node: '6',
              electron: '1.7',
            },
          },
        ],
        'stage-0',
        'react',
      ],
      plugins: [
        'external-helpers',
        'styled-components',
        [
          'inline-react-svg',
          {
            svgo: {
              plugins: [
                {
                  removeAttrs: {
                    attrs: '(data-name|fill|xmlns|height|width)',
                  },
                },
                {
                  cleanupIDs: true,
                },
              ],
            },
          },
        ],
      ],
    }),
  ],
  external: Object.keys(dependencies),
};
