// ==UserScript==
// @name         hook_debugger
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  构造函数如果为debugger时返回null，跳过debugger
// @author       laoer
// @match        *://*/*
// @icon         none
// @grant        none
// ==/UserScript==

(function() {
    'use strict';
    var _constructor = constructor;
    Function.prototype.constructor = function(s) {
        if ( s== "debugger") {
            console.log(s);
            return null;
        }
        return _constructor(s);
    }
})();