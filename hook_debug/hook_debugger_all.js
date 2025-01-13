// ==UserScript==
// @name         hook_debugger_all
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       laoer
// @match        *://*/*
// @icon         none
// @grant        none
// ==/UserScript==

(function() {
    'use strict';
    // hook eval中的debugger
    var eval_ = window.eval;
    window.eval = function (x) {
        if(x.includes('debugger')){
            console.log('eval debugger...')
        }
        return eval_(x.replace(/debugger\s*;?/g, ''));
    };
    window.eval.toString = function () {
        return eval_.toString();
    };

    // hook构造函数中的debugger;
    function Closure(injectFunction) {
        return function() {
            if (!arguments.length)
                return injectFunction.apply(this, arguments)
            arguments[arguments.length - 1] = arguments[arguments.length - 1].replace(/debugger/g, "");
            return injectFunction.apply(this, arguments)
        }
    }
    var oldFunctionConstructor = window.Function.prototype.constructor;
    window.Function.prototype.constructor = Closure(oldFunctionConstructor)
    window.Function.prototype.constructor.prototype = window.Function.prototype; // 使原型链更完整
    //fix native function
    window.Function.prototype.constructor.toString = oldFunctionConstructor.toString.bind(oldFunctionConstructor);
    var oldFunction = Function;
    window.Function = Closure(oldFunction)
    window.Function.toString = oldFunction.toString.bind(oldFunction);

    // hook setInterval中的debugger
    var _setInterval = setInterval;
    setInterval = function (a, b) {
        if (a.toString().indexOf("debugger") != -1) {
            return null;
        }
        return _setInterval(a, b);
    };

    // hook setTimeout中的debugger
    var _setTimeout = setTimeout;
    setTimeout = function (a, b) {
        if (a.toString().indexOf("debugger") != -1) {
            return null;
        }
        return _setTimeout(a, b);
    }
})();