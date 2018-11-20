import nodeResolve from 'rollup-plugin-node-resolve'
import babel from 'rollup-plugin-babel'
import postcss from 'rollup-plugin-postcss'
import replace from 'rollup-plugin-replace'
import commonjs from 'rollup-plugin-commonjs'
import { terser } from 'rollup-plugin-terser'

const plugins = [
    nodeResolve({
        jsnext: true
    }),

    babel({
        exclude: 'node_modules/**'
    }),

    commonjs(),

    postcss({
        autoModules: true,
        minimize: true
    })
]

export default [{
    external: ['react', 'react-dom'],
    input: 'src/index.js',
    output: {
        globals: { react: 'React', 'react-dom': 'ReactDOM' },
        file: 'dist/komponents.js',
        format: 'umd',
        name: 'komponents',
        indent: false
    },
    plugins: plugins.concat([
        replace({
            'process.env.NODE_ENV': JSON.stringify('development')
        })
    ])
}, {
    external: ['react', 'react-dom'],
    input: 'src/index.js',
    output: {
        globals: { react: 'React', 'react-dom': 'ReactDOM' },
        file: 'dist/komponents.min.js',
        format: 'umd',
        name: 'komponents',
        indent: false
    },
    plugins: plugins.concat([
        replace({
            'process.env.NODE_ENV': JSON.stringify('production')
        }),
        terser({
            compress: {
                pure_getters: true,
                unsafe: true,
                unsafe_comps: true,
                warnings: false
            }
        })
    ])
}]
    
