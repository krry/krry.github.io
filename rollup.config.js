import babel from '@rollup/plugin-babel';
import eslint from '@rbnlffl/rollup-plugin-eslint';

const config = {
  input: 'src/index.js',
  output: {
    dir: 'assets/scripts',
    format: 'iife'
  },
  plugins: [
    babel({babelHelpers: 'bundled'}),
    eslint({fix: true})
  ]
};

export default config;
