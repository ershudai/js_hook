// ==UserScript==
// @name         hook_close
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  在调试时页面被关掉，可以尝试hook修改掉window.close方法
// @author       laoer
// @match        *://*/*
// @icon         none
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    window.close = function() {};
})();