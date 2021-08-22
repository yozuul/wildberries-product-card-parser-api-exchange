// import { uglify } from "rollup-plugin-uglify";

export default [
  {
    input: 'front/services/authorize.js',
    output: {
      file: './public/authorize.js',
      format: 'cjs'
    }
  },
  {
    input: './front/index.js',
    output: [
      {
        file: './public/panel.js',
        format: 'cjs'
      }
    ]
  }
];