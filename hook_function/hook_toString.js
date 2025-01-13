// ==UserScript==
// @name         hook_toString
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  hook全局的所有toString方法，进行处理。
// @author       laoer
// @match        *://*/*
// @icon         none
// @grant        none
// ==/UserScript==

(function() {
    'use strict';
    let temp_toString = Function.prototype.toString;
    Function.prototype.toString = function () {
        if (this === temp_toString) {
            return 'function toString() { [native code] }';
        } else if (this === xxx) { // xxx为需要toString()的对象
            console.log('Detected call to xxx.toString(), returning custom string.');
            return ''; // 在控制台执行xxx.toString()，将输出的内容替换掉空字符串
        }
        return temp_toString.apply(this, arguments);
    }
})();