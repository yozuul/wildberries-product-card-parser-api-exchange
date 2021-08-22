import runAll from 'npm-run-all'

runAll(["clean", "lint", "build:*"], {parallel: false})
    .then(() => {
        console.log("done!");
    })
    .catch(err => {
        console.log("failed!");
    });

runAll(["build:* -- --watch"], {parallel: true})
    .then(() => {
        console.log("done!");
    })
    .catch(err => {
        console.log("failed!");
    });