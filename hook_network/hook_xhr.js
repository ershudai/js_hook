// ==UserScript==
// @name         hook_xhr
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  断点调试xhr请求的XMLHttpRequest.open写入时，url包含parse时断点
// @author       laoer
// @match        *://*/*
// @icon         none
// @grant        none
// ==/UserScript==

(function() {
    'use strict';
    var open = window.XMLHttpRequest.prototype.open;
    window.XMLHttpRequest.prototype.open = function (method, url, async) {
        if (url.indexOf("parse") != -1) {
            debugger;
        }
        return open.apply(this, arguments);
    };
})();