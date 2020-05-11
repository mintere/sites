import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';

import pkg from './package.json';

import typescript from '@wessberg/rollup-plugin-ts';
import alias from "@rollup/plugin-alias";
import json from "@rollup/plugin-json";

const externalModules = [
	"handlebars",
	"raw-body",
	"json5",
	"stream",
	"events",
	"readable-stream",
	"util",
	"buffer",
	"events",
	"path",
	"markdown-it",
	"punycode",
	"tslib"
]

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
					{ find: 'handlebars', replacement: 'node_modules/handlebars/dist/handlebars.min.js' },
				],
			}),
			resolve({browser: true, preferBuiltins: false}),
			commonjs({
				dynamicRequireTargets: [
					"node_modules/path/node_modules/util/util.js",
					"node_modules/inherits/inherits.js",
					"node_modules/path/node_modules/inherits/inherits.js"
				]
			}),
			json(),
		]
	},
	{
		input: 'src/index.ts',
		external: externalModules,
		output: [
			{ dir: "dist", format: 'cjs' },
			{ format: 'esm', file: "dist/index.esm.js" }
    ],
    plugins: [
			typescript()
    ]
	},
	{
		input: 'src/precompiler/index.ts',
		external: externalModules,
		output: [
			{ format: 'cjs', file: "dist/precompiler.js" },
			{ format: 'esm', file: "dist/precompiler.esm.js" }
    ],
    plugins: [
			typescript()
    ]
	}
];