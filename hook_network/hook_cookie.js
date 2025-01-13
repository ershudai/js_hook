// ==UserScript==
// @name         hook_cookie
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  断点调试cookie的写入，并根据写入的字符串是否含有xxx来断点
// @author       laoer
// @match        *://*/*
// @icon         none
// @grant        none
// ==/UserScript==

(function() {
    'use strict';
    let cookieTemp = document.cookie;
    Object.defineProperty(document, 'cookie', {
        set: function (val) {
            if (val.indexOf('xxx') != -1) {
                debugger;
            }
            console.log('Hook捕获到cookie写入数据 ===>', val);
            cookieTemp = val;
        },
        get: function () {
            return cookieTemp;
        },
    });
})();