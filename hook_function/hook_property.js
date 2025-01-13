// ==UserScript==
// @name         hook_property
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  hook对象的属性读或写
// @author       laoer
// @match        *://*/*
// @icon         none
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    let obj_name = 需要hook的对象;
    let obj_prototype = "属性名";

    let property_accessor = Object.getOwnPropertyDescriptor(obj_name, obj_prototype); // 获取目标属性的访问器
    let get_accessor = property_accessor.get;
    let set_accessor = property_accessor.set;

    Object.defineProperty(obj_name, obj_prototype, {
        get: function () {
            // 在这里写你想让hook后的属性在被获取值时执行的代码
            return get_accessor.call(obj_name); // 当网站js获取目标属性值时调用原属性getter返回结果
        },
        set: function () {
            // 在这里写你想让hook后的属性在被设置值时执行的代码
            set_accessor.call(obj_name, ...arguments);// 将网站js设置目标属性值时所传入的内容传给原setter设置并返回结果
        }
    });
})();