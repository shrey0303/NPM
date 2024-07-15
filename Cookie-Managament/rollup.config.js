import path from 'path'
import babel from 'rollup-plugin-babel'
import resolve from 'rollup-plugin-node-resolve'
import commonjs from 'rollup-plugin-commonjs'
import license from 'rollup-plugin-license'
import pkg from './package.json'

const extensions = ['.ts']

export default [
  {
    input: 'src/pocket-cookie.ts',
    output: {
      file: pkg.module,
      format: 'esm',
    },
    plugins: [
      resolve({ extensions }),
      babel({
        babelrc: false,
        extensions,
        presets: [
          [
            '@babel/preset-env',
            {
              loose: true,
              modules: false,
              targets: '>1%',
            },
          ],
          '@babel/preset-typescript',
        ],
        plugins: [
          ['@babel/proposal-class-properties', { loose: true }],
          ['@babel/proposal-object-rest-spread', { loose: true }],
          ['babel-plugin-ts-nameof', { loose: true }],
        ],
        exclude: 'node_modules/**',
      }),
      commonjs({
        include: 'node_modules/**',
        extensions: ['.js', '.coffee'],
        ignoreGlobal: false,
        sourceMap: false,
        namedExports: undefined,
        ignore: ['conditional-runtime-dependency'],
      }),
      license({
        sourcemap: false,
        banner: {
          commentStyle: 'regular',
          content: {
            file: path.join(__dirname, 'LICENSE'),
            encoding: 'utf-8',
          },
        },
        thirdParty: {
          includePrivate: true,
          output: {
            file: path.join(__dirname, 'dist', 'dependencies.txt'),
            encoding: 'utf-8',
          },
        },
      }),
    ],
  },
]
