import runAll from 'npm-run-all'

runAll(['backend', 'frontend'], {
      parallel: true
   })
   .then(() => {
      console.log("done!");
   })
   .catch(err => {
      console.log("failed!");
   });