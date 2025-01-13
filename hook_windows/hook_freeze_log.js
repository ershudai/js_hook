// ==UserScript==
// @name         hook_freeze_log
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  通过冻结console对象来禁止js重写log方法
// @author       laoer
// @match        *://*/*
// @icon         none
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    Object.freeze(console);
})();