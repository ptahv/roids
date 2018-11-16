const path = require('path');
const chokidar = require('chokidar');
const { execSync } = require('child_process');

function exec(cmd) {
  execSync(cmd, { stdio: "inherit", env: process.env });
}

['bsify', 'komponents'].map((package) => {
    chokidar.watch('./packages/' + package + '/src/').on('change', 
        () => {
            exec('npm run build --prefix ./packages/' + package);
            console.log('Built ' + package)
        })
    
    chokidar.watch('./packages/' + package + '/dist/').on('change', 
        () => {
            exec('npm run build --prefix ./packages/' + package);
            console.log('Built ' + package)
        })
})

console.log('Watching');