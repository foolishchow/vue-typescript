String.prototype.replaceAll = function (val, val1) { let r = this; while (r.indexOf(val) > -1) { r = r.replace(val, val1) } return r; }

const Webpack = require('webpack/lib/webpack')
const Logger = require('./logger')
const SUCCESS = Logger('\n{$1.black.bgGreen} {$2.green.bright} [{NOW.green.bright}]\n');

const ErrorOutPut = {
  chunks: false, // Makes the build much quieter
  colors: true,
  timings: true,
  children: false,
  modules: false,
}
const OutPut = {
  chunks: false, // Makes the build much quieter
  colors: true,
  timings: false,
  children: false,
  modules: false,
  builtAt: false,
  hash: false,
  version: false
};
const JSOutPut = Object.assign({
  excludeAssets(name) {
    return !/\.js(\.map)?(\?.*)?$/.test(name)
  }
}, OutPut)
const CSSOutPut = Object.assign({
  excludeAssets(name) {
    return !/\.css(\.map)?(\?.*)?$/.test(name)
  }
}, OutPut)

const SourceOutPut = Object.assign({
  excludeAssets(name) {
    return !/\.(jpe?g|png|gif|woff2?|eot|ttf|otf)(\?.*)?$/.test(name)
  }
}, OutPut)

const OtherOutPut = Object.assign({
  excludeAssets(name) {
    if (/\.js(\.map)?(\?.*)?$/.test(name)) return true;
    if (/\.css(\.map)?(\?.*)?$/.test(name)) return true;
    if (/\.(jpe?g|png|gif|woff2?|eot|ttf|otf)(\?.*)?$/.test(name)) return true;
    return false;
  }
}, OutPut)
const watchOptions = { // watch options:
  progress: true,
  aggregateTimeout: 300, // wait so long for more changes
  poll: true, // use polling instead of native watchers
};
const globalConstants = {
  buildStart: 0,
  lastHash: null,
  globalCompiler: null
}
/* let buildStart = 0;
let lastHash = null;
let globalCompiler = null; */

const compilerCallback = function (err, stats) {

  if (err) {
    globalConstants.lastHash = null;
    console.error(err.stack || err);
    if (err.details) console.error(err.details);
    process.exit(1); // eslint-disable-line
  }
  let cost = +new Date - globalConstants.buildStart;
  cost > 1000 ? cost = (~~cost / 1000) + 's' : cost += 'ms';
  globalConstants.buildStart = 0;
  globalConstants.lastHash = stats.hash;

  process.stdout.write(stats.toString(OtherOutPut) + '\n');
  console.info(''); console.info('')
  process.stdout.write(stats.toString(SourceOutPut) + '\n');
  console.info(''); console.info('')
  process.stdout.write(stats.toString(CSSOutPut) + '\n');
  console.info(''); console.info('')
  process.stdout.write(stats.toString(JSOutPut) + '\n');
  // process.stdout.write(stats.toString(ErrorOutPut));
  console.info('')
  SUCCESS('webpack', `compiler success in ${cost} `)
};

const callWebpack = (config, callBack = function () { }) => {
  // let webpack_config = webpackConfig();
  // let watch = process.env.NODE_ENV == "production" ? false : true;
  var compiler = Webpack(config);
  // let progressPlugin = new ProgressPlugin({ profile: false });
  // compiler.apply(progressPlugin);
  compiler.plugin("compilation", function (compilation) {
    if (globalConstants.buildStart != 0) return;
    Logger.info('webpack', 'Compiling ...')
    globalConstants.buildStart = +new Date;
  });
  let argu = [function (...argu) {
    compilerCallback(...argu);
    callBack(...argu);
  }];
  if (config.watch) argu.unshift(watchOptions)
  globalCompiler = compiler[config.watch ? 'watch' : 'run'](...argu);
}
module.exports = callWebpack;

