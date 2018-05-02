#!/usr/bin/env node
const yargs = require('yargs')
const webpack = require('webpack');
const readFileSync = require('fs').readFileSync
const resolve = require('path').resolve;
const callWebpack = require('./call-webpack')
const requireFake = require('./fake-require')
const { spawn } = require('child_process')
const Server = require('./server')

const dev = {
  handler(args) {
    process.env.API_URL = 'http://49.4.4.108:8080'
    let config = require(resolve(process.cwd(), '.webpackrc.ts'))
    config = (config.__esModule && config.default) ? config.default : config;
    requireFake();
    callWebpack(config);
    Server({
      root: resolve(process.cwd(), '../dist'),
      port: 7002
    })
  },
  builder(yargs) {
    return yargs.help().argv
  }
}

const build = {
  handler(args) {
    process.env.NODE_ENV = 'production'
    let config = require(resolve(process.cwd(), '.webpackrc.ts'))
    config = (config.__esModule && config.default) ? config.default : config;
    requireFake();
    callWebpack(config)
  },
  builder(yargs) {
    return yargs.help().argv
  }
};
const cli = yargs
  .command('dev', 'run webpack dev process', dev)
  .command('build', 'run webpack test process', build)
  .wrap(yargs.terminalWidth())
  .help();

const args = cli.argv;

// if no command then show help
if (!args._[0]) {
  cli.showHelp();
}