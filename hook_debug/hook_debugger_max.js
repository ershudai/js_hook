// ==UserScript==
// @name         hook_debugger_max
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  hook掉debugger
// @author       laoer
// @match        *://*/*
// @icon         none
// @grant        none
// ==/UserScript==

(function () {
    'use strict';

    // 保存原有的 eval、Function、setInterval 和 setTimeout
    var originalEval = window.eval;
    var originalFunctionConstructor = window.Function.prototype.constructor;
    var originalSetInterval = setInterval;
    var originalSetTimeout = setTimeout;

    // 重写 eval
    window.eval = function (code) {
        if (code.includes('debugger')) {
            console.log('eval debugger...');
        }
        return originalEval(code.replace(/debugger\s*;?/g, ''));
    };

    // 重写 Function 构造函数
    function Closure(injectFunction) {
        return function (...args) {
            if (args.length && typeof args[args.length - 1] === 'string') {
                args[args.length - 1] = args[args.length - 1].replace(/debugger/g, "");
            }
            return injectFunction.apply(this, args);
        };
    }

    window.Function.prototype.constructor = Closure(originalFunctionConstructor);
    window.Function = Closure(Function);

    // 重写 setInterval 和 setTimeout
    function hookTimer(fn) {
        return function (callback, ...args) {
            if (callback.toString().includes("debugger")) {
                return null;
            }
            return fn(callback, ...args);
        };
    }

    setInterval = hookTimer(originalSetInterval);
    setTimeout = hookTimer(originalSetTimeout);
})();