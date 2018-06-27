const TypeScript = require('typescript');
const readFileSync = require('fs').readFileSync
const resolve = require('path').resolve;

const compileOptions = {
  "target": "ESNEXT", /* Specify ECMAScript target version: 'ES3' (default), 'ES5', 'ES2015', 'ES2016', 'ES2017', or 'ESNEXT'. */
  "module": "commonjs", /* Specify module code generation: 'none', 'commonjs', 'amd', 'system', 'umd', 'es2015', or 'ESNext'. */
  "allowJs": false, /* Allow javascript files to be compiled. */
  "importHelpers": true, /* Import emit helpers from 'tslib'. */
  "strict": true, /* Enable all strict type-checking options. */
  "noImplicitAny": true, /* Raise error on expressions and declarations with an implied 'any' type. */
  "moduleResolution": "node", /* Specify module resolution strategy: 'node' (Node.js) or 'classic' (TypeScript pre-1.6). */
  "experimentalDecorators": true, /* Enables experimental support for ES7 decorators. */
  "emitDecoratorMetadata": true,
}

require.extensions['.ts'] = function (module, filePath) {
  let content = readFileSync(filePath).toString();
  let { outputText } = TypeScript.transpileModule(content, {
    compilerOptions: compileOptions,
    fileName: filePath
  })
  module._compile(outputText, filePath);
}

module.exports = function (){
  delete require.extensions['.ts']
}