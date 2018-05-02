const path = require('path'),
  os = require('os'),
  format = require('util').format;

let COLORNAME = ['black', 'red', 'green', 'yellow', 'blue', 'magenta', 'cyan', 'white', 'gray'];
const COLOR = {
  reset: [0, 0],

  bold: [1, 22],
  dim: [2, 22],
  italic: [3, 23],
  underline: [4, 24],
  inverse: [7, 27],
  hidden: [8, 28],
  strikethrough: [9, 29],

  black: [30, 39],
  red: [31, 39],
  green: [32, 39],
  yellow: [33, 39],
  blue: [34, 39],
  magenta: [35, 39],
  cyan: [36, 39],
  white: [37, 39],
  gray: [90, 39],
  grey: [90, 39],

  bgBlack: [40, 49],
  bgRed: [41, 49],
  bgGreen: [42, 49],
  bgYellow: [43, 49],
  bgBlue: [44, 49],
  bgMagenta: [45, 49],
  bgCyan: [46, 49],
  bgWhite: [47, 49],
}
const getColor = (color) => {
  let result = color.reduce(function (init, current) {
    if (['dim', 'd', 'bright'].indexOf(current) > -1) {
      init.dim = true;
    }
    else if (['bold', 'b'].indexOf(current) > -1) {
      init.bold = true;
    }
    else if (['underline', 'u'].indexOf(current) > -1) {
      init.underline = true;
    }
    else if (['italic', 'i'].indexOf(current) > -1) {
      init.italic = true;
    }
    else if (['strikethrough', 's'].indexOf(current) > -1) {
      init.strikethrough = true;
    }
    else if (['inverse'].indexOf(current) > -1) {
      init.inverse = true;
    }
    else if (COLORNAME.indexOf(current) > -1) {
      init.color = current;
    }
    else if (current.startsWith('bg') && COLORNAME.indexOf(current.replace(/^bg/, '').toLocaleLowerCase()) > -1) {
      init.bg = current;
    }
    return init;
  }, {});
  let RESULT = result.bg && COLOR[result.bg] ? [' $ '] : ['$'];
  Object.keys(result).map(key => {
    if (COLOR[result[key]]) {
      let val = COLOR[result[key]];
      RESULT = [`\u001b[${val[0]}m`, ...RESULT, `\u001b[${val[1]}m`];
    }
  })
  return RESULT.join('');
}


const NOW = () => {
  let d = new Date;
  let to2 = val => ((100 + val) / 100).toFixed(2).replace(/^[0-9]+\./gi, '')
  return `${to2(d.getHours())}:${to2(d.getMinutes())}:${to2(d.getSeconds())}`;
}
const HELPER = {
  NOW() {
    let d = new Date;
    let to2 = val => ((100 + val) / 100).toFixed(2).replace(/^[0-9]+\./gi, '')
    return `${to2(d.getHours())}:${to2(d.getMinutes())}:${to2(d.getSeconds())}`;
  },

  DAY() {
    let d = new Date;
    let to2 = val => ((100 + val) / 100).toFixed(2).replace(/^[0-9]+\./gi, '')
    return `${d.getFullYear()}-${to2(d.getMonth() + 1)}-${to2(d.getHours())}`;
  },

  DATE() {
    return HELPER.DAY + ' ' + HELPER.NOW;
  },

  FILE(_stack) {
    let callsite = _stack[0];
    return callsite.getFileName().replace(path.dirname(process.cwd()), '');
  },

  LINENUMBER(_stack) {
    let callsite = _stack[0];
    return callsite.getLineNumber()
  }
}

const stack = function () {
  var orig = Error.prepareStackTrace;
  Error.prepareStackTrace = function (_, stack) {
    return stack;
  };
  var err = new Error;
  Error.captureStackTrace(err, arguments.callee);
  var stack = err.stack;
  Error.prepareStackTrace = orig;
  return stack;
}


const define = (f) => {
  let arguLength = 0;
  f = f.replace(/{(.*?)}/gi, function (whole, matched) {
    let arr = matched.split('.');
    let [name, ...color] = arr,
      form = '';
    arguLength++;
    let r = getColor(color).replace('$', name)
    return r;
  })
  return function () {
    let [...arr] = arguments;
    if (arr.length > arguLength) {
      arr[arguLength - 1] = arr.slice(arguLength - 1).join('');
    }
    let _f = f;


    let orig = Error.prepareStackTrace;
    Error.prepareStackTrace = function (_, stack) {
      return stack;
    };
    let err = new Error;
    Error.captureStackTrace(err, arguments.callee);
    let _stack = err.stack;
    Error.prepareStackTrace = orig;

    Object.keys(HELPER).map(k => {
      _f = _f.replace(new RegExp(k, 'gi'), HELPER[k](_stack))
    })
    let result = arr.reduce(function (cons, current) {
      return cons.replace(/\$[1-9]+/, current);
    }, _f)
    console.log(result);
  }
}
const log = define;
log.fatal = function (prefix, ...args) {
  if (args[0] instanceof Error) args[0] = args[0].message.trim()
  const msg = format.apply(format, args)
  log.custom(prefix, msg);
  // console.error(log.red(prefix), sep, msg)
  process.exit(1)
};

log.custom = define('{$1.red}{·.gray}{$2}');
log.success = define('\n{$1.black.bgGreen} {$2.green.bright}\n')
log.error = define('\n{$1.black.bgRed} {[.gray}{FILE.gray}{].gray}{[.gray}{LINENUMBER.gray}{].gray} \n    {$2.red.bright} \n');
log.warn = define('\n{$1.black.bgYellow} {[.gray}{FILE.gray}{].gray}{[.gray}{LINENUMBER.gray}{].gray} \n    {$2.yellow.bright}       \n');
log.info = define('\n{$1.black.bgCyan} {$2.cyan.bright}\n');
COLORNAME.forEach(color => {
  log[color] = define(`{$1.${color}}`);
})
module.exports = log;




