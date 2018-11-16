import nodeResolve from 'rollup-plugin-node-resolve'
import babel from 'rollup-plugin-babel'
import replace from 'rollup-plugin-replace'
import { terser } from 'rollup-plugin-terser'

const plugins = [
    nodeResolve({
        jsnext: true
    }),

    babel({
        exclude: 'node_modules/**'
    })
]

export default [{
    input: 'src/index.js',
    output: {
        file: 'dist/locl.js',
        format: 'umd',
        name: 'locl',
        indent: false
    },
    plugins: plugins.concat([
        replace({
            'process.env.NODE_ENV': JSON.stringify('development')
        })
    ])
}, {
    input: 'src/index.js',
    output: {
        file: 'dist/locl.min.js',
        format: 'umd',
        name: 'locl',
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
    
