const pkg = require('./package.json')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
import { ChainStatic } from './.webpack/chain'
import * as webpack from 'webpack'
import { resolve } from 'path'

const isProd = process.env.NODE_ENV == "production";

let Api = new ChainStatic();
const {
  Rule, Watch, WatchOptions, Entry, OutPut, Plugin,
  Devtool, Module, toConfig, RuleExclude,
  ResolveAlias, ResolveAliasBase, ResolveExtensions, Externals
} = Api;

const Extract = function (loader: any) {
  return {
    use: ExtractTextPlugin.extract({
      fallback: 'style-loader',
      use: loader
    })
  }
};

['.js', '.json', '.ts', '.tsx', '.scss', '.css', '.sass', '.jpg'].forEach(e => {
  ResolveExtensions.add(e)
})

Entry('app')
  .add('./index.ts')
  .end();

const FileName = isProd ? '[name]_[hash:8]' : '[name]'
const ChunkName = isProd ? '[name]_[chunkhash:8]' : 'child/[name]'

OutPut
  .path(resolve(__dirname, './dist/public'))
  .publicPath('/public/')
  .filename(`scripts/${FileName}.js`)
  .chunkFilename(`scripts/${ChunkName}.js`)
  .end()

Rule('tsx')
  .test(/\.tsx?$/)
  .exclude
  .add(/node_modules/)
  .end()
  .use('tsx-jsx-use').loader('babel-loader').end()
  .use('tsx-use')
  .loader('ts-loader')
  .options({
    appendTsxSuffixTo: [/\.vue$/]
  })
  .end();

Rule('js')
  .test(/\.js$/)
  .use('js-use')
  .loader('babel-loader')
  .end()
  .exclude
  .add(/node_modules/)
  .end();


const CssLoader = {
  loader: 'css-loader',
  options: { sourceMap: !isProd, minimize: isProd }
}
const PostCssLoader = {
  loader: 'postcss-loader',
  options: {
    sourceMap: !isProd,
    ident: 'postcss',
    plugins: [
      require('autoprefixer')({
        browsers: ['last 5 versions', 'not ie <= 8'],
        cascade: false
      })
    ]
  }
}

Rule('css')
  .test(/\.css/)
  .merge(Extract([CssLoader, PostCssLoader]))


Rule('sass')
  .test(/\.sass/)
  .merge(Extract(
    [
      CssLoader,
      PostCssLoader,
      {
        loader: 'sass-loader',
        options: {
          indentedSyntax: true,
          sourceMap: true
        }
      }
    ]
  ))

Rule('scss')
  .test(/\.scss/)
  .merge(Extract([CssLoader, PostCssLoader, 'sass-loader']))

Rule('image')
  .test(/\.(png|jpe?g|gif|svg)(\?.*)?$/)
  .use('url-loader')
  .loader('url-loader')
  .options({
    limit: 10000,
    name: `statics/${FileName}.[ext]`
  })

Rule('fonts')
  .test(/\.(woff2?|eot|ttf|otf)(\?.*)?$/)
  .use('url-loader')
  .loader('url-loader')
  .options({
    limit: 10000,
    name: `fonts/${FileName}.[ext]`
  })

Plugin('extrac-css')
  .use(ExtractTextPlugin, [`styles/${FileName}.css`])

if (pkg.alias) {
  Object.keys(pkg.alias).forEach((k: string) => {
    ResolveAlias.set(k, resolve(process.cwd(), pkg.alias[k]));
  })
}
if (pkg['alias-base']) {
  ResolveAliasBase(process.cwd())
}

if (pkg['html-template']) {
  const HtmlWebpackPlugin = require('html-webpack-plugin');
  let c = pkg['html-template'];
  c = Object.assign({
    title: 'app',
    filename: 'index.html',
    template: resolve(process.cwd(), 'configs/index.html')
  }, c)
  Plugin('html-webpack-plugin')
    .use(HtmlWebpackPlugin, [c])
}

if (pkg['CommonsChunk'] || pkg['commons-chunk']) {
  let CommonsChunk = pkg['CommonsChunk'] || pkg['commons-chunk'];
  if (CommonsChunk instanceof Array) {
    CommonsChunk = {
      'default-vendor': CommonsChunk
    }
  }
  Object.keys(CommonsChunk).map(entryName => {
    if (Array.isArray(CommonsChunk[entryName])) {
      CommonsChunk[entryName].forEach(value => {
        Entry(entryName).add(value);
      })
    } else {
      Entry(entryName).add(CommonsChunk[entryName]).end();
    }
  })
  Plugin('CommonsChunkPlugin')
    .use(<any>webpack.optimize.CommonsChunkPlugin, [{ name: Object.keys(CommonsChunk) }])
}

let defineContent: any = {};
if (pkg.Define || pkg.define) {
  defineContent = pkg.Define || pkg.define;
}
defineContent['process.env'] = {
  _API_URL: JSON.stringify(process.env.API_URL || 'API_URL')
};
if (isProd) {
  defineContent = Object.assign({}, defineContent, {
    'process.env': {
      NODE_ENV: "'production'",
      _API_URL: JSON.stringify(process.env.API_URL || 'API_URL')
    }
  })
}
Plugin('DefinePlugin')
  .use(<any>webpack.DefinePlugin, [defineContent])

if (pkg.anylize) {
  const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
  const options = Object.assign({
    analyzerMode: 'static',
    reportFilename: '_report.html',
    openAnalyzer: false
  }, pkg.anylize);
  Plugin('BundleAnalyzerPlugin')
    .use(BundleAnalyzerPlugin, [options])
}

if (!isProd) {
  Devtool('source-map');
  Watch(true);
  WatchOptions({
    aggregateTimeout: 600,
    poll: 2000,
    ignored: /node_modules/
  })
} else {
  Devtool(false)
  Watch(false)
  Plugin('UglifyJsPlugin')
    .use(<any>webpack.optimize.UglifyJsPlugin, [{
      compress: {
        warnings: false
      }
    }])
}

const AllConfig = toConfig();
export default AllConfig;