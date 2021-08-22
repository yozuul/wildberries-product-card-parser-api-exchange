// import { uglify } from "rollup-plugin-uglify";
console.log('dd');
export default [
  {
    input: 'front/authorize.js',
    output: {
      file: './public/authorize.js',
      format: 'cjs'
    }
  },
  {
    input: './front/index.js',
    output: [
      {
        file: './public/panel/panel.js',
        format: 'cjs'
      }
    ]
  }
];