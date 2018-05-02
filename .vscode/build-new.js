#!/usr/bin/env node
const fs = require('fs');
const { unlinkSync, rmdirSync, readdirSync, statSync } = require('fs')
const { resolve } = require('path');
const { fork, spawn, spawnSync } = require('child_process');
const os = require('os')
let cmd = 'yarn';

function deleteall(e) { fs.existsSync(e) && (fs.readdirSync(e).filter(e => !e.startsWith(".")).forEach(function (s, t) { var n = resolve(e, s); fs.statSync(n).isDirectory() ? deleteall(n) : fs.unlinkSync(n) }), fs.rmdirSync(e)) }

const removeBuilded = async function () {
  let root = resolve(__dirname, '../dist/public')
  let files = readdirSync(root);
  files.filter(f => !f.startsWith('.')).forEach(file => {
    file = resolve(root, file)
    if (statSync(file).isDirectory()) {
      deleteall(file)
    } else {
      unlinkSync(file)
    }
  })
}

const buildFrontEnd = function () {
  removeBuilded()
  let args = cmd == 'yarn' ? ['build'] : ['run', 'build']
  spawnSync(cmd, args, {
    cwd: resolve(__dirname, '../frontend'),
    stdio: [0, 1, 2]
  })
}

const tarOrConsole = function () {
  const serverRoot = resolve(__dirname, '../dist');
  if (os.platform == 'win32') {
    console.info(`build success , please upload ${serverRoot} to your server`)
  } else {
    spawnSync('tar', ['-zcf', './release.tgz', './dist'], {
      cwd: resolve(__dirname, '..'), stdio: [0, 1, 2]
    })
    console.info(``)
    console.info(`build success , please upload ./release.tgz to your server`)
    console.info(``)
  }
}


buildFrontEnd();
tarOrConsole();





