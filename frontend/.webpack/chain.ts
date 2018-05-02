import * as WebpackChain from 'webpack-chain';
import * as webpack from 'webpack'
import { resolve } from 'path'
import { statSync, readdirSync } from 'fs'

export class ChainStatic {
  private api = new WebpackChain();
  get Entry() {
    return (name: string) => {
      return this.api.entry(name)
    }
  }
  get OutPut() {
    return this.api.output
  }

  get Devtool() {
    return (devtool: WebpackChain.DevTool) => {
      return this.api.devtool(devtool);
    }
  }
  get Module() {
    return this.api.module;
  }

  get toConfig() {
    return () => {
      return this.api.toConfig();
    }
  }

  get Watch() {
    return (watch: boolean) => {
      this.api.watch(watch)
    }
  }
  get Rule() {
    return (name: string) => {
      return this.api.module.rule(name);
    }
  }
  get RuleExclude() {
    return (ruleName: string, exclude: any) => {
      return this.api.module.rule(ruleName).exclude.add(exclude).end()
    }
  }
  get RuleInclude() {
    return (ruleName: string, include: any) => {
      return this.api.module.rule(ruleName).include.add(include).end()
    }
  }
  get Plugin() {
    return (name: string) => {
      return this.api.plugin(name)
    }
  }

  get ResolveAlias() {
    return this.api.resolve.alias;
  }

  get ResolveAliasBase() {
    return (dir: string) => {
      let files = readdirSync(dir);
      files.filter(f => f != 'node_modules' && !f.startsWith('.')).map(f => {
        let r = statSync(f).isDirectory()
        if (r) {
          this.api.resolve.alias.set(f, resolve(dir, f))
        }
      })
    }
  }
  get ResolveExtensions() {
    return this.api.resolve.extensions;
  }

  get Externals() {
    return (value: string | RegExp | webpack.ExternalsObjectElement | webpack.ExternalsFunctionElement | webpack.ExternalsElement[]) => {
      this.api.externals(value)
    }
  }

  get WatchOptions() {
    return (val: webpack.ICompiler.WatchOptions) => {
      this.api.watchOptions(val)
    };
  }
}