import babel from '@rollup/plugin-babel'
import eslint from '@rbnlffl/rollup-plugin-eslint'
import {nodeResolve} from '@rollup/plugin-node-resolve'

const config = {
	input: 'src/index.js',
	format: 'iife',
	external: ['zzfx'], // added to DOM in scripts.html
	output: {
		dir: 'assets/scripts',
		globals: {
			/* zzfx: ZzFX,*/
		},
	},
	plugins: [babel({babelHelpers: 'bundled'}), eslint({fix: true}), nodeResolve()],
}

export default config
