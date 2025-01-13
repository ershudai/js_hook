// ==UserScript==
// @name         hook_function_mini
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  函数hook
// @author       laoer
// @match        *://*/*
// @icon         none
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    let temp_xxx = xxx; // 将xxx修改为要hook的方法，temp_xxx变量名可以根据需要进行修改命名

    xxx = function () { // 将xxx修改为要hook的方法
        // 在这里写你想让hook后的方法执行的代码
        return temp_xxx.call(this, ...arguments); // 将网站js调用目标方法时所传入的内容传给原方法执行并返回结果
    }
})();