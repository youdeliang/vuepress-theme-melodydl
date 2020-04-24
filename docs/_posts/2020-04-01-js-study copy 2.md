---
layout:     post
title:      "深入理解浏览器存储"
subtitle:   "JavaScript学习笔记"
date:       2020-04-01
author:     "Top"
header-img: "img/post-bg-ios9-web.jpg"
category: demo
tags:
    - Web
    - JavaScript
    - 笔记
---

本篇博客用来。。。。
<!-- more -->

## 前言
随着Web应用程序出现以来，人们对与能够直接在客户端上存储信息能力的要求始终没有停止过。应用开发人员在找各种方式将数据存储在客户端上。从刚开始的Cookie存储方案，到现在的Web Storage和indexedDB，本文将主要介绍这三种浏览器存储方式优缺点。
## Cookie

### 1、Cookie是什么？
`HTTP Cookie`，通常直接叫做`cookie`，起初是在客户端用于存储会话信息的。该标准要求服务器对 任意 `HTTP`请求发送 `Set-Cookie` 而`HTTP`头作为响应的一部分，其中包含会话信息。例如，这种服务器响 应的头可能如下： 

```
HTTP/1.1 200 OK 
Content-type: text/html 
Set-Cookie: name=value 
Other-header: other-header-value 
```
 这个` HTTP`响应设置以`name`为名称、以`value`为值的一个`cookie`，名称和值在传送时都必须是 `URL` 编码的。浏览器会存储这样的会话信息，并在这之后，通过为每个请求添加 `Cookie` ,`HTTP` 头将信 息发送回服务器，如下所示： 
 
```
GET /index.html HTTP/1.1 
Cookie: name=value 
Other-header: other-header-value 
```
 发送回服务器的额外信息可以用于唯一验证客户来自于发送的哪个请求。  
 
**2、Cookie主要构成：**
-  `name`（名称）：一个唯一确定`cookie`的名称。`cookie`的名称必须是经过 `URL`编码的。
-  `value`（值）：储存在 `cookie`中的字符串值。值必须被 `URL`编码。
-  `Domain`（域）：`cookie` 对于哪个域是有效的。所有向该域发送的请求中都会包含这个 `cookie` 信息。
- `path`（路径）：对于指定域中的那个路径，应该向服务器发送 `cookie`。
- `Expires/Max-Age`（失效时间）：表示 `cookie` 何时应该被删除的时间戳（也就是，何时应该停止向服务器发送这个 `cookie`）。
- `HttpOnly`：这个属性是面试的时候常考的，如果这个属性设置为`true`，就不能通过`js`脚本来获取`cookie`的值，能有效的防止`xss`攻击。
- `Secure`（安全标志）：指定后，`cookie` 只有在使用 `SSL` 连接的时候才发送到服务器。


![](https://user-gold-cdn.xitu.io/2019/12/23/16f3185c7d9314ba?w=1179&h=295&f=png&s=42322)
 ### 3、Cookie的原理
 
![](https://user-gold-cdn.xitu.io/2019/12/23/16f317abf4999a98?w=544&h=190&f=png&s=72583)
第一次访问网站的时候，浏览器发出请求，服务器响应请求后，会在响应头里面添加一个`Set-Cookie`，将`cookie`放入到响应请求中，在浏览器第二次发请求的时候，会通过`Cookie`请求头部将`Cookie`信息发送给服务器，服务端会辨别用户身份，另外，`Cookie`的过期时间、域、路径、有效期、适用站点都可以根据需要来指定。
### 4、Cookie生成方式
**Cookie的生成方式主要有两种：**
1. 服务端设置 cookie

客户端第一次向服务端请求时，在相应的请求头中就有`set-cookie`字段，用来标识是哪个用户。

下图为登录腾讯云服务端响应头截图，`cookie`设置了相关的属性：`expires`、`path`等。`response headers`服务端可以设置`cookie` 的所有选项：`expires`、`domain`、`path`、`secure`、`HttpOnly`。
![](https://user-gold-cdn.xitu.io/2019/12/23/16f319a11756173f?w=1136&h=253&f=png&s=19569)

2. 客户端设置 cookie

`cookie`不像`web Storage`有`setItem`，`getItem`，`removeItem`，`clear`等方法，需要自己封装。简单地在浏览器的控制台里输入:

```
document.cookie="name=lynnshen; age=18"
```

![](https://user-gold-cdn.xitu.io/2019/12/23/16f31a0d48a9bfcd?w=1181&h=140&f=png&s=7563)
最简单的设置多个`cookie`的方法就是重复执行`document.cookie = "key=name"`

```
document.cookie = "name=lynnshen";
document.cookie = "age=18";
```
再看控制台：

![](https://user-gold-cdn.xitu.io/2019/12/23/16f31a26093807da?w=1280&h=344&f=png&s=24455)
### 5、Cookie设置、读取、删除方法的简单封装
1. 设置cookie

```
function setCookie(name, value, expires, path, domain, secure) {
    var cookieText = encodeURIComponent(name) + "=" +
    encodeURIComponent(value); 
    if (expires instanceof Date) {             
        cookieText += "; expires=" + expires.toGMTString();         
    } 
    if (path) {             
        cookieText += "; path=" + path;         
    } 
    if (domain) {            
        cookieText += "; domain=" + domain;        
    } 
    if (secure) {          
     cookieText += "; secure";      
    } 
    document.cookie = cookieText; 
}
```
2. 删除cookie

```
 function removeCookie(name, path, domain, secure){         
    this.set(name, "", new Date(0), path, domain, secure);    
 } 
 
```
3. 读取cookie

```
function getCookie(name){
    var cookieName = encodeURIComponent(name) + "=";         
    var cookieStart = document.cookie.indexOf(cookieName);
    var cookieValue = null; 
    if (cookieStart > -1){            
        var cookieEnd = document.cookie.indexOf(";", cookieStart);      
        if (cookieEnd == -1){                 
            cookieEnd = document.cookie.length;            
        }             
        cookieValue = decodeURIComponent(document.cookie.substring(
        cookieStart + cookieName.length, cookieEnd));     
    } 
    return cookieValue;     
 }
```

### 6、Cookie的缺点

1. 每个特定域名下的cookie数量有限：
  
  - IE6或IE6-(IE6以下版本)：最多20个cookie

  - IE7或IE7+(IE7以上版本)：最多50个cookie

  - FF:最多50个cookie

  - Opera:最多30个cookie

  - Chrome和safari没有硬性限制

当超过单个域名限制之后，再设置`cookie`，浏览器就会清除以前设置的`cookie`。`IE`和`Opera`会清理近期最少使用的`cookie`，`FF`会随机清理`cookie`。

2. 存储量太小，只有`4KB`。

3. 每次`HTTP`请求都会发送到服务端，影响获取资源的效率。

4. 需要自己封装获取、设置、删除`cookie`的方法。

## Web Storage
最初的`Web Storage` 规范包含了两种对象的定义:`sessionStorage`和`globalStorage`。这两个对象在支持的浏览器中都是以`windows`对象属性的形式存在的。而`localStorage`对象在修订过的`HTML 5`规范中作为持久保存客户端数据的方案取代了
`globalStorage`。所以现在主要谈论的是`sessionStorage`和`localStorage`两种。

**1、web Storage的主要作用：**
- 提供一种在 `cookie` 之外存储会话数据的途径;
- 提供一种存储大量可以跨会话存在的数据的机制。

**2、web Storage 的主要方法：**
- `clear()`: 删除所有值;`Firefox` 中没有实现 。
- `getItem(name)`:根据指定的名字 `name`获取对应的值。
- `key(index)`:获得 `index` 位置处的值的名字。
- `removeItem(name)`:删除由 `name` 指定的名值对儿。

注意： `Storage 类型只能存储字符串。非字符串的数据在存储之前会被转换成字符串。`
### localStorage
**1、localStorage的特点**

- 保存的数据长期存在，下一次访问该网站的时候，网页可以直接读取以前保存的数据。
- 大小为5M左右
- 仅在客户端使用，不和服务端进行通信
- 接口封装较好

基于上面的特点，LocalStorage可以作为浏览器本地缓存方案，用来提升网页首屏渲染速度(根据第一请求返回时，将一些不变信息直接存储在本地)。

**2、localStorage的使用**

```
//使用方法存储数据 
localStorage.setItem("name", "Nicholas");

//使用属性存储数据
localStorage.book = "Professional JavaScript";

//使用方法读取数据
var name = localStorage.getItem("name");

//使用属性读取数据
var book = localStorage.book;
```
数据的保留是通过 `JavaScript` 删除或者是用户清除浏览器缓存。
### sessionStorage
**1、什么是 sessionStorage ？**
- `sessionStorage` 对象存储特定于某个会话的数据，也就是该数据只保持到浏览器关闭。
- `sessionStorage`就像会话 `cookie`，也会在浏览器关闭后消失。
- 存储在 `sessionStorage`中的数据可以跨越页面刷新而存在，同时如果浏览器支持，浏览器崩溃并重启之后依然可用(Firefox 和 WebKit都支持，IE则不行)。
- `seesionStorage`对象绑定于某个服务器会话，所以当文件在本地运行的时候是不可用的。
- 存储在`sessionStorage`中的数据只能由最初给对象存储数据的页面访问到，所以对多页面应用有限制。 

**2、sessionStorage的特点：**
- 会话级别的浏览器存储
- 大小为5M左右
- 仅在客户端使用，不和服务端进行通信
- 接口封装较好
 
基于上面的特点，`sessionStorage`可以有效对表单信息进行维护，比如刷新时，表单信息不丢失。

**3、localStorage 的使用**

```
//使用方法存储数据 
sessionStorage.setItem("name", "Nicholas");

//使用属性存储数据
sessionStorage.book = "Professional JavaScript";

//使用方法读取数据
var name = sessionStorage.getItem("name");

//使用属性读取数据
var book = sessionStorage.book;
```
`sessionStorage` 对象应该主要用于仅针对会话的小段数据的存储。如果需要跨越会话存储数据， 那么`localStorage`更为合适。

## IndexedDB
**1、IndexedDB 是什么？**

`Indexed Database API`，或者简称为`IndexedDB`，是在浏览器中保存结构化数据的一种数据库。`IndexedDB` 的思想是创建一套 `API`，方便保存和读取 `JavaScript` 对象，同时还支持查询及搜索。

**2、IndexedDB 的特点**
- `键值对储存`：`IndexedDB` 内部采用对象仓库（object store）存放数据。所有类型的数据都可以直接存入，包括`JavaScript`对象。对象仓库中，数据以"键值对"的形式保存，每一个数据记录都有对应的主键，主键是独一无二的，不能有重复，否则会抛出一个错误。
- `异步`:`IndexedDB `操作时不会锁死浏览器，用户依然可以进行其他操作，这与 `LocalStorage `形成对比，后者的操作是同步的。异步设计是为了防止大量数据的读写，拖慢网页的表现。
- `支持事务`: `IndexedDB`支持事务（transaction），这意味着一系列操作步骤之中，只要有一步失败，整个事务就都取消，数据库回滚到事务发生之前的状态，不存在只改写一部分数据的情况。
- `同源限制`: `IndexedDB`受到同源限制，每一个数据库对应创建它的域名。网页只能访问自身域名下的数据库，而不能访问跨域的数据库。
- `储存空间大`: `IndexedDB` 的储存空间比 `localStorage`大得多，一般来说不少于 250MB，甚至没有上限。
-`支持二进制储存`: `IndexedDB`不仅可以储存字符串，还可以储存二进制数据（ArrayBuffer 对象和 Blob 对象）。

**3、IndexedDB 基本指令**

1. 建立打开IndexedDB : `window.indexedDB.open("testDB")`
2. 关闭IndexedDB: `indexdb.close()`
3. 删除IndexedDB: `window.indexedDB.deleteDatabase(indexdb)`

**4、webStorage、cookie 和 IndexedDB之间的区别**

![](https://user-gold-cdn.xitu.io/2019/12/28/16f4c1e458f6c5a6?w=685&h=275&f=png&s=16136)
从上图可以看到，`cookie`已经不建议用于存储。如果没有大量数据存储需求的话，可以使用 `localStorage` 和 `sessionStorage` 。对于不怎么改变的数据尽量使用 `localStorage` 存储，否则可以用 `sessionStorage` 存储。
## 总结
web存储可以说是必须要重点理解和掌握的知识点了，特别是web Storage经常会使用到。最后总结用一句话总结三种存储方案。
- Cookie 的本职工作并非本地存储，而是“维持状态”。
- Web Storage 是 HTML5专门为浏览器存储而提供的数据存储机制，不与服务端发生通信。
- IndexedDB 用于客户端存储大量结构化数据。