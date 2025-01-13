// ==UserScript==
// @name         hook_history
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  重写go和back方法，以此来避免网站反复跳转返回上一页或某个特定历史页面
// @author       laoer
// @match        *://*/*
// @icon         none
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    window.history.go = function() {};
    window.history.back = function () {};
})();