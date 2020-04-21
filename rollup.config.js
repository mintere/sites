import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import builtins from 'rollup-plugin-node-builtins';

import pkg from './package.json';

import typescript from '@wessberg/rollup-plugin-ts';
import alias from "@rollup/plugin-alias";
import json from "@rollup/plugin-json";

export default [
	{
		input: 'src/index.ts',
		output: {
			name: 'mintere-sites-renderer',
			file: pkg.browser,
			format: 'umd'
		},
		plugins: [
			builtins(),
      typescript(),
			alias({
				entries: [
					{ find: 'handlebars', replacement: 'node_modules/handlebars/dist/handlebars.min.js' }
				],
			}),
			resolve({browser: true}),
			commonjs(),
			json(),
		]
	},
	{
		input: 'src/index.ts',
		external: [
			"handlebars",
			"raw-body",
			"json5",
			"stream"
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