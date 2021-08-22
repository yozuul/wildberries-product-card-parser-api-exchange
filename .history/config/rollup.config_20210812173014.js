// import { uglify } from "rollup-plugin-uglify";

export default {
   input: 'trackers/index.js',
   plugins: [
    // uglify()
  ],
   output: {
     file: './public/tracker.js',
     format: 'cjs'
   },
 };