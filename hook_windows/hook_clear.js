// ==UserScript==
// @name         hook_clear
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  javascript禁止清除控制台数据
// @author       laoer
// @match        *://*/*
// @icon         none
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    console.clear = function() {};
})();