const { exec } = require("child_process");

function exec_handler(error, stdout, stderr){
    if (error) {
        console.log(`error: ${error.message}`);
        return;
    }
    if (stderr) {
        console.log(`stderr: ${stderr}`);
        return;
    }
    console.log(`stdout: ${stdout}`);
}

exec("cd sigmar_codex && neu run", exec_handler);