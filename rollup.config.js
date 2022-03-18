import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import typescript from '@rollup/plugin-typescript';
import css from 'rollup-plugin-css-only'
import pkg from './package.json';


export default [
	{
		input: 'src/index.ts',
		external: ['antd', 'react'],
        plugins: [
			resolve(), // so Rollup can find `ms`
			commonjs(), // so Rollup can convert `ms` to an ES module
			typescript(),
			css({ output: 'styles.css' })
		],
		output: [
			{ file: pkg.main, format: 'cjs' },
			{ file: pkg.module, format: 'es' }
		]
	}
];