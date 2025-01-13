// ==UserScript==
// @name         hook_RegExp
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  正则表达式的hook
// @author       laoer
// @match        *://*/*
// @icon         none
// @grant        none
// ==/UserScript==

(function() {
    'use strict';
    var _RegExp = RegExp;
    RegExp = function (pattern, modifiers) {
        console.log("hook到RegExp");
        debugger;
        if (modifiers) {
            return _RegExp(pattern, modifiers);
        } else {
            return _RegExp(pattern);
        }
    };
    RegExp.toString = function () {
        return "function setInterval() { [native code] }"
    };
})();