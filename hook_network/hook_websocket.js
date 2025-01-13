// ==UserScript==
// @name         hook_websocket
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  websocket的hook
// @author       laoer
// @match        *://*/*
// @icon         none
// @grant        none
// ==/UserScript==

(function() {
    'use strict';
    WebSocket.prototype._send = WebSocket.prototype.send;
    WebSocket.prototype.send = function (data){
        console.log(`hook WebSocket.send|data:${data}`)
        debugger;
        return WebSocket.prototype._send.apply(this, arguments)
    }
})();