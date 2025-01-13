// ==UserScript==
// @name         hook_eval
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  去除eval执行的debugger内容
// @author       laoer
// @match        *://*/*
// @icon         none
// @grant        none
// ==/UserScript==

(function() {
    'use strict';
    // 保存原始方法
    let eval_ = eval;
    // 重写 eval
    var myeval = function(src) {
        if(src.includes('debugger')){
            src = src.replace(/debugger\s*;?/g, '')
        }
        return eval_(src);
    }
    // 屏蔽 JS 中对原生函数 native 属性的检测
    var myeval_ = myeval.bind(null);
    myeval_.toString = function(){
        return eval_.toString();
    };
    Object.defineProperty(window, 'eval', {
        value: myeval_
    });
})();