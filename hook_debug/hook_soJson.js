// ==UserScript==
// @name         hook_soJson
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  过soJson头部字符串检测
// @author       laoer
// @match        *://*/*
// @icon         none
// @grant        none
// ==/UserScript==

(function() {
    'use strict';
    var _RegExp = RegExp;
    RegExp = function(pattern, modifiers) {
        if (pattern == decodeURIComponent("%5Cw%2B%20*%5C(%5C)%20*%7B%5Cw%2B%20*%5B'%7C%22%5D.%2B%5B'%7C%22%5D%3B%3F%20*%7D") || pattern == decodeURIComponent("function%20*%5C(%20*%5C)") || pattern == decodeURIComponent("%5C%2B%5C%2B%20*(%3F%3A_0x(%3F%3A%5Ba-f0-9%5D)%7B4%2C6%7D%7C(%3F%3A%5Cb%7C%5Cd)%5Ba-z0-9%5D%7B1%2C4%7D(%3F%3A%5Cb%7C%5Cd))") || pattern == decodeURIComponent("(%5C%5C%5Bx%7Cu%5D(%5Cw)%7B2%2C4%7D)%2B")) {
            pattern = '.*?';
            console.log("发现sojson检测特征，已帮您处理。")
        }
        if (modifiers) {
            console.log("疑似最后一个检测...已帮您处理。")
            console.log("已通过全部检测，请手动处理debugger后尽情调试吧！")
            return _RegExp(pattern, modifiers);
        } else {
            return _RegExp(pattern);
        }
    };
    RegExp.toString = function() {
        return _RegExp.toString();
    };
})();