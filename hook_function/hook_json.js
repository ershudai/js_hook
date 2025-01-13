// ==UserScript==
// @name         hook_json
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  断点拦截json函数
// @author       laoer
// @match        *://*/*
// @icon         none
// @grant        none
// ==/UserScript==

(function() {
    'use strict';
    let _parse = JSON.parse;
    JSON.parse = function(ps) {
        console.log("Hook断点调用JSON.parse 输入 ===> ", ps);
        debugger;
        return _parse(ps);
    }
    let _stringify = JSON.stringify;
    JSON.stringify = function (ps){
        console.log("Hook断点调用JSON.stringify 输入 ===> ", ps);
        return _stringify(ps);
    };
})();