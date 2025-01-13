// ==UserScript==
// @name         hook_log_load
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  通过toString方法判断console.log方法是否被重写，以此来防止js重写log方法
// @author       laoer
// @match        *://*/*
// @icon         none
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    let waiting_time = 3; // 等待时间，单位为秒
    let temp_log = console.log;
    let flag = 0;

    function judge_overwrite() {
        if (console.log.toString() !== 'function log() { [native code] }') {
            console.log = temp_log;
        }
    }

    window.addEventListener("load", () => {
        judge_overwrite();
        flag = 1;
    });

    setTimeout(() => {
        if (flag === 0) {
            judge_overwrite();
        }
    }, waiting_time * 1000);
})();