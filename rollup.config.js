import babel from '@rollup/plugin-babel'
import eslint from '@rbnlffl/rollup-plugin-eslint'
import {nodeResolve} from '@rollup/plugin-node-resolve'
import {zzfx} from 'zzfx'

const config = {
	input: 'src/index.js',
	format: 'iife',
	external: ['zzfx'],
	output: {
		dir: 'assets/scripts',
		globals: {
			zzfx: zzfx,
		},
	},
	plugins: [babel({babelHelpers: 'bundled'}), eslint({fix: true}), nodeResolve()],
}

export default config
