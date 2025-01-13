## hook js脚本

主要用于方便调试和了解代码。

**下面是整理的脚本文件**：
```
hook
│
├── /hook_debug            # 包含用于调试相关的hook脚本
│   ├── hook_debugger_all.js           # 跳过debugger方法的断点
│   ├── hook_debugger_all_enhanced.js  # 跳过debugger方法的断点加强版
│   ├── hook_debugger_simple.js        # 简单版本跳过debugger方法
│   ├── hook_eval.js                   # 去除使用eval函数执行debugger的内容
│   └── hook_soJson.js                 # 用于防止soJson对代码是否修改的检测
│
├── /hook_function          # 包含用于函数相关的hook脚本
│   ├── hook_function_mini.js          # 简单版用于函数hook
│   ├── hook_function_constructor.js   # 构造函数hook方式去除debugger内容
│   ├── hook_json.js                   # 在json的函数使用中调试
│   ├── hook_property.js               # 对象的属性读或写
│   ├── hook_RegExp.js                 # 使用正则表达式的hook
│   └── hook_toString.js               # 对所有使用原型toString时的hook
│
├── /hook_network           # 包含用于网络请求相关的hook脚本
│   ├── hook_cookie.js                 # 对cookie的读写进行卡点
│   ├── hook_header.js                 # 对header请求头的读写进行卡点
│   ├── hook_websocket.js              # 对WebSocket使用的卡点
│   └── hook_xhr.js                    # 对xmlhttprequest.open的使用时卡点
│
└── /hook_windows           # 包含用于窗口操作相关的hook脚本
    ├── hook_clear.js                  # 防止清除控制台数据
    ├── hook_close.js                  # 防止检测到调试关闭页面
    ├── hook_freeze_log.js             # 冻结console防止对它的冻结或修改
    ├── hook_history.js                # 防止在本页面历史来回跳转的干扰
    └── hook_log_load.js               # 防止js重写log方法

```

## 油猴使用脚本
废话不多说，直接动手。
### 1.安装油猴
谷歌浏览器，谷歌商店打开安装
https://chromewebstore.google.com/detail/%E7%AF%A1%E6%94%B9%E7%8C%B4/dhdgffkkebhmkfjojejmpbldmpobfkfo

### 2.启用
1. 打开拓展管理页面，并启用油猴
   ![alt text](./images/001.png)

2. 打开开发者模式，启用油猴拓展
   ![alt text](./images/002.png)

3. 进入拓展中
   ![alt text](./images/003.png)
   ![alt text](./images/004.png)
   ![alt text](./images/005.png)

### 3.使用脚本
1. 文件导入添加一个脚本
   ![alt text](./images/007.png)

2. 复制或者自己写一个脚本
   ![alt text](./images/006.png)

3. 启用脚本，F12打开控制台
   ![alt text](./images/008.png)
   ![alt text](./images/009.png)

4. 执行断点成功
   ![alt text](./images/010.png)



## hook原理和作用

"hook"（钩子）是指一种机制，通过这种机制可以在程序执行的关键点插入自定义代码，以便监控、修改或扩展程序的行为。在JavaScript环境中，Hook通常指的是拦截和修改某些对象的方法或者属性的访问。



#### JavaScript Hook 的原理

JavaScript Hook 主要是基于JavaScript的动态性和灵活性来实现的。以下是一些常见的技术手段：



1. **重写对象方法**：

- 通过直接替换某个对象的方法为一个新的函数，可以在这个新的函数中添加额外的逻辑或者完全改变其行为。

```javascript
const originalMethod = obj.method;
obj.method = function(...args) {
    console.log('Before method call');
    const result = originalMethod.apply(this, args);
    console.log('After method call');
    return result;
};
```

2. **使用 Proxy 对象**：

- ES6 引入了 `Proxy`，它允许你创建一个代理对象，用于拦截对目标对象的基本操作（如属性查找、赋值等）。

```javascript
const handler = {
    get: function(target, name){
        console.log(`Getting ${name}`);
        return target[name];
    },
    set: function(target, name, value){
        console.log(`Setting ${name} to ${value}`);
        target[name] = value;
        return true;
    }
};

const obj = {a: 1};
const proxy = new Proxy(obj, handler);
```



#### JavaScript Hook 的作用

- **调试与监控**：通过Hook，开发者可以在不修改原始代码的情况下观察应用内部的状态变化，比如监听DOM元素的变化，或是记录API调用的情况。
- **增强功能**：可以在不影响原有功能的前提下，给现有的库或框架增加新特性。
- **安全性**：可以用来检测和防御潜在的安全威胁，例如防止XSS攻击或数据篡改。
- **性能优化**：通过Hook特定的方法，可以分析哪些部分消耗了大量的资源，并据此进行优化。
- **模拟环境**：在测试环境中，可以通过Hook模拟服务器响应或其他外部依赖，以确保单元测试的独立性。

#### 爬虫制作过程中的作用：

- 处理动态加载的内容。通过Hook JavaScript函数，如`fetch`、`XMLHttpRequest`或特定的API调用，您可以拦截这些请求并获取实际返回的数据，而不需要模拟整个浏览器环境。
- 绕过反爬机制。通过Hook相关的方法或对象属性，可以修改或隐藏爬虫的行为特征，使得其看起来更像是正常的用户浏览活动。例如，可以Hook `navigator`对象来伪装浏览器指纹。
- 调试与分析。通过Hook关键的JavaScript函数或事件处理器，可以在执行时输出日志信息，帮助分析页面逻辑，这对于制定有效的爬取策略至关重要。
- 性能优化。例如，可以Hook JSON解析相关的函数，在解析之前先进行预处理，以减少不必要的计算或内存占用。
