const fs = require('fs');
const path = require("path");
const execSync = require("child_process").execSync;

function exec(cmd) {
  execSync(cmd, { stdio: "inherit", env: process.env });
}

fs.readdirSync('./packages/').forEach(
    package => {
        exec('npm run build --prefix ./packages/' + package);
    })