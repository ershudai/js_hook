// ==UserScript==
// @name         hook_function
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  hook所有方法
// @author       laoer
// @match        *://*/*
// @icon         none
// @grant        none
// ==/UserScript==

(function() {
    'use strict';
    let _myConstructor = Function.prototype.constructor
    Function.prototype.constructor = function () {
        let src = arguments[arguments.length - 1]
        if (src.includes('debugger')) {
            console.log('构造函数中发现debugger字符，正进行替换。。。')
        }
        arguments[arguments.length - 1] = src.replace(/debugger/ig, '        '); // 替换等长的空格
        console.log("======== Function end =============");
        return _myConstructor.apply(this, arguments)
    }
    Function.prototype.constructor.toString = function () {
        return _myConstructor.toString()
    }

    let _myFunction = Function
    Function = function () {
        let src = arguments[arguments.length - 1]
        if (src.includes('debugger')) {
            console.log('构造函数中发现debugger字符，正进行替换。。。')
        }
        arguments[arguments.length - 1] = src.replace(/debugger/ig, '        '); // 替换等长的空格
        console.log("======== Function end =============");
        return _myFunction.apply(this, arguments)
    }
    Function.toString = function () {
        return _myFunction.toString()
    }
})();