import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';

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
      typescript(),
			alias({
				entries: [
					{ find: 'handlebars', replacement: 'node_modules/handlebars/dist/handlebars.min.js' },
					{ find: 'stream', replacement: 'node_modules/readable-stream/readable-browser.js' },
					{ find: 'readable-stream', replacement: 'node_modules/readable-stream/readable-browser.js' }
				],
			}),
			resolve({browser: true, preferBuiltins: false}),
			commonjs({
				dynamicRequireTargets: [
					"node_modules/readable-stream/**/*.js",
					"node_modules/path/node_modules/util/util.js",
					"node_modules/inherits/inherits.js",
					"node_modules/path/node_modules/inherits/inherits.js"
				],
				namedExports: {
					"node_modules/readable-stream/readable-browser.js": ["PassThrough", "Transform", "Readable"]
				}
			}),
			json(),
		]
	},
	{
		input: 'src/index.ts',
		external: [
			"handlebars",
			"raw-body",
			"json5",
			"stream",
			"events",
			"readable-stream",
			"util",
			"buffer",
			"events",
			"path"
		],
		output: [
			{ dir: "dist", format: 'es' }
    ],
    plugins: [
			typescript()
    ]
	}
];