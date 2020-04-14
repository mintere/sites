import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';

import pkg from './package.json';

import typescript from '@wessberg/rollup-plugin-ts';
import alias from "@rollup/plugin-alias";

export default [
	{
		input: 'src/index.ts',
		output: {
			name: 'mintere-sites-renderer',
			file: pkg.browser,
			format: 'umd'
		},
		plugins: [
      typescript(),
			alias({
				entries: [
					{ find: 'handlebars', replacement: 'node_modules/handlebars/dist/handlebars.min.js' }
				],
			}),
			resolve({browser: true}),
			commonjs(),
		]
	},
	{
		input: 'src/index.ts',
		external: [
			"handlebars",
			"fs"
		],
		output: [
			{ dir: "dist", format: 'cjs' },
			{ dir: "dist", format: 'es' }
    ],
    plugins: [
			typescript()
    ]
	}
];