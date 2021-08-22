// import { uglify } from "rollup-plugin-uglify";
console.log('dd');
export default {
   input: 'front/authorize.js',
   input: 'front/panel/panel.js',
   plugins: [
    // uglify()
  ],
   output: {
     file: './public/authorize.js',
     format: 'cjs'
   },
   output: {
     file: './public/panel/panel.js',
     format: 'cjs'
   },
 };