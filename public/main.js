(function(){function c(o,s,a){function u(r,t){if(!s[r]){if(!o[r]){var e="function"==typeof require&&require;if(!t&&e)return e(r,!0);if(f)return f(r,!0);var n=new Error("Cannot find module '"+r+"'");throw n.code="MODULE_NOT_FOUND",n}var i=s[r]={exports:{}};o[r][0].call(i.exports,function(t){var e=o[r][1][t];return u(e||t)},i,i.exports,c,o,s,a)}return s[r].exports}for(var f="function"==typeof require&&require,t=0;t<a.length;t++)u(a[t]);return u}return c})()({1:[function(t,e,r){"use strict";var a=t("lodash.get");var u=t("superagent");function n(t){var e=new Date(t.date);var r=e.getFullYear();var n=(e.getMonth()<9?"0":"")+(e.getMonth()+1);var i=(e.getDate()<10?"0":"")+e.getDate();return'\n    <li>\n      <h3>\n        <a href="http://www.npmjs.com/package/'+t.name+'">\n          '+t.name+'\n        </a>\n      </h3>\n      <p class="description">\n        '+t.description+'\n      </p>\n      <p class="updated">\n        Latest Version: v'+t.version+'\n      </p>\n      <p class="updated">\n        Updated At: '+r+"-"+n+"-"+i+"\n      </p>\n    </li>\n  "}function i(t){if(t.length===0){return"\n      <h2>No Results</h2>\n    "}return t.map(n).join("\n\n")}function o(r,n,i){var t=0;var e=setTimeout(function(){});var o=false;r.addEventListener("keydown",function(){t=Date.now();clearTimeout(e);e=setTimeout(function(){if(Date.now()-t>=300){t=Date.now();s()}},350)});function s(){if(o){return}var t=r.value;if(!t){return}o=true;var e=encodeURIComponent("mongoose "+t);u.get("https://registry.npmjs.org/-/v1/search?text="+e+"&size=25").end(function(t,e){o=false;if(t){return}var r=a(e,"body.objects",[]).map(function(t){return t.package});r.sort(function(t,e){return new Date(e.date)-new Date(t.date)});console.log(r);n.innerHTML=i(r)})}}o(document.querySelector("#term"),document.querySelector("#result"),i)},{"lodash.get":4,superagent:6}],2:[function(t,e,r){if(typeof e!=="undefined"){e.exports=n}function n(t){if(t)return i(t)}function i(t){for(var e in n.prototype){t[e]=n.prototype[e]}return t}n.prototype.on=n.prototype.addEventListener=function(t,e){this._callbacks=this._callbacks||{};(this._callbacks["$"+t]=this._callbacks["$"+t]||[]).push(e);return this};n.prototype.once=function(t,e){function r(){this.off(t,r);e.apply(this,arguments)}r.fn=e;this.on(t,r);return this};n.prototype.off=n.prototype.removeListener=n.prototype.removeAllListeners=n.prototype.removeEventListener=function(t,e){this._callbacks=this._callbacks||{};if(0==arguments.length){this._callbacks={};return this}var r=this._callbacks["$"+t];if(!r)return this;if(1==arguments.length){delete this._callbacks["$"+t];return this}var n;for(var i=0;i<r.length;i++){n=r[i];if(n===e||n.fn===e){r.splice(i,1);break}}if(r.length===0){delete this._callbacks["$"+t]}return this};n.prototype.emit=function(t){this._callbacks=this._callbacks||{};var e=new Array(arguments.length-1),r=this._callbacks["$"+t];for(var n=1;n<arguments.length;n++){e[n-1]=arguments[n]}if(r){r=r.slice(0);for(var n=0,i=r.length;n<i;++n){r[n].apply(this,e)}}return this};n.prototype.listeners=function(t){this._callbacks=this._callbacks||{};return this._callbacks["$"+t]||[]};n.prototype.hasListeners=function(t){return!!this.listeners(t).length}},{}],3:[function(t,e,r){e.exports=n;n.default=n;n.stable=i;n.stableStringify=i;var l="[...]";var p="[Circular]";var h=[];var a=[];function u(){return{depthLimit:Number.MAX_SAFE_INTEGER,edgesLimit:Number.MAX_SAFE_INTEGER}}function n(t,e,r,n){if(typeof n==="undefined"){n=u()}c(t,"",0,[],undefined,0,n);var i;try{if(a.length===0){i=JSON.stringify(t,e,r)}else{i=JSON.stringify(t,f(e),r)}}catch(t){return JSON.stringify("[unable to serialize, circular reference is too complex to analyze]")}finally{while(h.length!==0){var o=h.pop();if(o.length===4){Object.defineProperty(o[0],o[1],o[3])}else{o[0][o[1]]=o[2]}}}return i}function d(t,e,r,n){var i=Object.getOwnPropertyDescriptor(n,r);if(i.get!==undefined){if(i.configurable){Object.defineProperty(n,r,{value:t});h.push([n,r,e,i])}else{a.push([e,r,t])}}else{n[r]=t;h.push([n,r,e])}}function c(t,e,r,n,i,o,s){o+=1;var a;if(typeof t==="object"&&t!==null){for(a=0;a<n.length;a++){if(n[a]===t){d(p,t,e,i);return}}if(typeof s.depthLimit!=="undefined"&&o>s.depthLimit){d(l,t,e,i);return}if(typeof s.edgesLimit!=="undefined"&&r+1>s.edgesLimit){d(l,t,e,i);return}n.push(t);if(Array.isArray(t)){for(a=0;a<t.length;a++){c(t[a],a,a,n,t,o,s)}}else{var u=Object.keys(t);for(a=0;a<u.length;a++){var f=u[a];c(t[f],f,a,n,t,o,s)}}n.pop()}}function y(t,e){if(t<e){return-1}if(t>e){return 1}return 0}function i(t,e,r,n){if(typeof n==="undefined"){n=u()}var i=m(t,"",0,[],undefined,0,n)||t;var o;try{if(a.length===0){o=JSON.stringify(i,e,r)}else{o=JSON.stringify(i,f(e),r)}}catch(t){return JSON.stringify("[unable to serialize, circular reference is too complex to analyze]")}finally{while(h.length!==0){var s=h.pop();if(s.length===4){Object.defineProperty(s[0],s[1],s[3])}else{s[0][s[1]]=s[2]}}}return o}function m(t,e,r,n,i,o,s){o+=1;var a;if(typeof t==="object"&&t!==null){for(a=0;a<n.length;a++){if(n[a]===t){d(p,t,e,i);return}}try{if(typeof t.toJSON==="function"){return}}catch(t){return}if(typeof s.depthLimit!=="undefined"&&o>s.depthLimit){d(l,t,e,i);return}if(typeof s.edgesLimit!=="undefined"&&r+1>s.edgesLimit){d(l,t,e,i);return}n.push(t);if(Array.isArray(t)){for(a=0;a<t.length;a++){m(t[a],a,a,n,t,o,s)}}else{var u={};var f=Object.keys(t).sort(y);for(a=0;a<f.length;a++){var c=f[a];m(t[c],c,a,n,t,o,s);u[c]=t[c]}if(typeof i!=="undefined"){h.push([i,e,t]);i[e]=u}else{return u}}n.pop()}}function f(i){i=typeof i!=="undefined"?i:function(t,e){return e};return function(t,e){if(a.length>0){for(var r=0;r<a.length;r++){var n=a[r];if(n[1]===t&&n[0]===e){e=n[2];a.splice(r,1);break}}}return i.call(this,t,e)}}},{}],4:[function(t,wt,e){(function(bt){(function(){var t="Expected a function";var n="__lodash_hash_undefined__";var r=1/0;var i="[object Function]",o="[object GeneratorFunction]",e="[object Symbol]";var s=/\.|\[(?:[^[\]]*|(["'])(?:(?!\1)[^\\]|\\.)*?\1)\]/,a=/^\w*$/,u=/^\./,f=/[^.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|$))/g;var c=/[\\^$.*+?()[\]{}|]/g;var l=/\\(\\)?/g;var p=/^\[object .+?Constructor\]$/;var h=typeof bt=="object"&&bt&&bt.Object===Object&&bt;var d=typeof self=="object"&&self&&self.Object===Object&&self;var y=h||d||Function("return this")();function m(t,e){return t==null?undefined:t[e]}function _(t){var e=false;if(t!=null&&typeof t.toString!="function"){try{e=!!(t+"")}catch(t){}}return e}var v=Array.prototype,b=Function.prototype,w=Object.prototype;var g=y["__core-js_shared__"];var T=function(){var t=/[^.]+$/.exec(g&&g.keys&&g.keys.IE_PROTO||"");return t?"Symbol(src)_1."+t:""}();var E=b.toString;var O=w.hasOwnProperty;var x=w.toString;var j=RegExp("^"+E.call(O).replace(c,"\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g,"$1.*?")+"$");var k=y.Symbol,S=v.splice;var A=nt(y,"Map"),R=nt(Object,"create");var C=k?k.prototype:undefined,q=C?C.toString:undefined;function P(t){var e=-1,r=t?t.length:0;this.clear();while(++e<r){var n=t[e];this.set(n[0],n[1])}}function D(){this.__data__=R?R(null):{}}function L(t){return this.has(t)&&delete this.__data__[t]}function H(t){var e=this.__data__;if(R){var r=e[t];return r===n?undefined:r}return O.call(e,t)?e[t]:undefined}function N(t){var e=this.__data__;return R?e[t]!==undefined:O.call(e,t)}function U(t,e){var r=this.__data__;r[t]=R&&e===undefined?n:e;return this}P.prototype.clear=D;P.prototype["delete"]=L;P.prototype.get=H;P.prototype.has=N;P.prototype.set=U;function M(t){var e=-1,r=t?t.length:0;this.clear();while(++e<r){var n=t[e];this.set(n[0],n[1])}}function I(){this.__data__=[]}function z(t){var e=this.__data__,r=V(e,t);if(r<0){return false}var n=e.length-1;if(r==n){e.pop()}else{S.call(e,r,1)}return true}function $(t){var e=this.__data__,r=V(e,t);return r<0?undefined:e[r][1]}function X(t){return V(this.__data__,t)>-1}function F(t,e){var r=this.__data__,n=V(r,t);if(n<0){r.push([t,e])}else{r[n][1]=e}return this}M.prototype.clear=I;M.prototype["delete"]=z;M.prototype.get=$;M.prototype.has=X;M.prototype.set=F;function J(t){var e=-1,r=t?t.length:0;this.clear();while(++e<r){var n=t[e];this.set(n[0],n[1])}}function B(){this.__data__={hash:new P,map:new(A||M),string:new P}}function G(t){return rt(this,t)["delete"](t)}function Q(t){return rt(this,t).get(t)}function K(t){return rt(this,t).has(t)}function W(t,e){rt(this,t).set(t,e);return this}J.prototype.clear=B;J.prototype["delete"]=G;J.prototype.get=Q;J.prototype.has=K;J.prototype.set=W;function V(t,e){var r=t.length;while(r--){if(lt(t[r][0],e)){return r}}return-1}function Y(t,e){e=it(e,t)?[e]:et(e);var r=0,n=e.length;while(t!=null&&r<n){t=t[ut(e[r++])]}return r&&r==n?t:undefined}function Z(t){if(!dt(t)||st(t)){return false}var e=ht(t)||_(t)?j:p;return e.test(ft(t))}function tt(t){if(typeof t=="string"){return t}if(mt(t)){return q?q.call(t):""}var e=t+"";return e=="0"&&1/t==-r?"-0":e}function et(t){return pt(t)?t:at(t)}function rt(t,e){var r=t.__data__;return ot(e)?r[typeof e=="string"?"string":"hash"]:r.map}function nt(t,e){var r=m(t,e);return Z(r)?r:undefined}function it(t,e){if(pt(t)){return false}var r=typeof t;if(r=="number"||r=="symbol"||r=="boolean"||t==null||mt(t)){return true}return a.test(t)||!s.test(t)||e!=null&&t in Object(e)}function ot(t){var e=typeof t;return e=="string"||e=="number"||e=="symbol"||e=="boolean"?t!=="__proto__":t===null}function st(t){return!!T&&T in t}var at=ct(function(t){t=_t(t);var i=[];if(u.test(t)){i.push("")}t.replace(f,function(t,e,r,n){i.push(r?n.replace(l,"$1"):e||t)});return i});function ut(t){if(typeof t=="string"||mt(t)){return t}var e=t+"";return e=="0"&&1/t==-r?"-0":e}function ft(t){if(t!=null){try{return E.call(t)}catch(t){}try{return t+""}catch(t){}}return""}function ct(i,o){if(typeof i!="function"||o&&typeof o!="function"){throw new TypeError(t)}var s=function(){var t=arguments,e=o?o.apply(this,t):t[0],r=s.cache;if(r.has(e)){return r.get(e)}var n=i.apply(this,t);s.cache=r.set(e,n);return n};s.cache=new(ct.Cache||J);return s}ct.Cache=J;function lt(t,e){return t===e||t!==t&&e!==e}var pt=Array.isArray;function ht(t){var e=dt(t)?x.call(t):"";return e==i||e==o}function dt(t){var e=typeof t;return!!t&&(e=="object"||e=="function")}function yt(t){return!!t&&typeof t=="object"}function mt(t){return typeof t=="symbol"||yt(t)&&x.call(t)==e}function _t(t){return t==null?"":tt(t)}function vt(t,e,r){var n=t==null?undefined:Y(t,e);return n===undefined?r:n}wt.exports=vt}).call(this)}).call(this,typeof global!=="undefined"?global:typeof self!=="undefined"?self:typeof window!=="undefined"?window:{})},{}],5:[function(t,e,r){"use strict";function n(t){return a(t)||s(t)||o(t)||i()}function i(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}function o(t,e){if(!t)return;if(typeof t==="string")return u(t,e);var r=Object.prototype.toString.call(t).slice(8,-1);if(r==="Object"&&t.constructor)r=t.constructor.name;if(r==="Map"||r==="Set")return Array.from(t);if(r==="Arguments"||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r))return u(t,e)}function s(t){if(typeof Symbol!=="undefined"&&Symbol.iterator in Object(t))return Array.from(t)}function a(t){if(Array.isArray(t))return u(t)}function u(t,e){if(e==null||e>t.length)e=t.length;for(var r=0,n=new Array(e);r<e;r++){n[r]=t[r]}return n}function f(){this._defaults=[]}["use","on","once","set","query","type","accept","auth","withCredentials","sortQuery","retry","ok","redirects","timeout","buffer","serialize","parse","ca","key","pfx","cert","disableTLSCerts"].forEach(function(n){f.prototype[n]=function(){for(var t=arguments.length,e=new Array(t),r=0;r<t;r++){e[r]=arguments[r]}this._defaults.push({fn:n,args:e});return this}});f.prototype._setDefaults=function(e){this._defaults.forEach(function(t){e[t.fn].apply(e,n(t.args))})};e.exports=f},{}],6:[function(t,e,r){"use strict";function i(t){"@babel/helpers - typeof";if(typeof Symbol==="function"&&typeof Symbol.iterator==="symbol"){i=function t(e){return typeof e}}else{i=function t(e){return e&&typeof Symbol==="function"&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e}}return i(t)}var n;if(typeof window!=="undefined"){n=window}else if(typeof self==="undefined"){console.warn("Using browser-only version of superagent in non-browser environment");n=void 0}else{n=self}var o=t("component-emitter");var s=t("fast-safe-stringify");var a=t("./request-base");var u=t("./is-object");var f=t("./response-base");var c=t("./agent-base");function l(){}e.exports=function(t,e){if(typeof e==="function"){return new r.Request("GET",t).end(e)}if(arguments.length===1){return new r.Request("GET",t)}return new r.Request(t,e)};r=e.exports;var p=r;r.Request=w;p.getXHR=function(){if(n.XMLHttpRequest&&(!n.location||n.location.protocol!=="file:"||!n.ActiveXObject)){return new XMLHttpRequest}try{return new ActiveXObject("Microsoft.XMLHTTP")}catch(t){}try{return new ActiveXObject("Msxml2.XMLHTTP.6.0")}catch(t){}try{return new ActiveXObject("Msxml2.XMLHTTP.3.0")}catch(t){}try{return new ActiveXObject("Msxml2.XMLHTTP")}catch(t){}throw new Error("Browser-only version of superagent could not find XHR")};var h="".trim?function(t){return t.trim()}:function(t){return t.replace(/(^\s*|\s*$)/g,"")};function d(t){if(!u(t))return t;var e=[];for(var r in t){if(Object.prototype.hasOwnProperty.call(t,r))y(e,r,t[r])}return e.join("&")}function y(e,r,t){if(t===undefined)return;if(t===null){e.push(encodeURI(r));return}if(Array.isArray(t)){t.forEach(function(t){y(e,r,t)})}else if(u(t)){for(var n in t){if(Object.prototype.hasOwnProperty.call(t,n))y(e,"".concat(r,"[").concat(n,"]"),t[n])}}else{e.push(encodeURI(r)+"="+encodeURIComponent(t))}}p.serializeObject=d;function m(t){var e={};var r=t.split("&");var n;var i;for(var o=0,s=r.length;o<s;++o){n=r[o];i=n.indexOf("=");if(i===-1){e[decodeURIComponent(n)]=""}else{e[decodeURIComponent(n.slice(0,i))]=decodeURIComponent(n.slice(i+1))}}return e}p.parseString=m;p.types={html:"text/html",json:"application/json",xml:"text/xml",urlencoded:"application/x-www-form-urlencoded",form:"application/x-www-form-urlencoded","form-data":"application/x-www-form-urlencoded"};p.serialize={"application/x-www-form-urlencoded":d,"application/json":s};p.parse={"application/x-www-form-urlencoded":m,"application/json":JSON.parse};function _(t){var e=t.split(/\r?\n/);var r={};var n;var i;var o;var s;for(var a=0,u=e.length;a<u;++a){i=e[a];n=i.indexOf(":");if(n===-1){continue}o=i.slice(0,n).toLowerCase();s=h(i.slice(n+1));r[o]=s}return r}function v(t){return/[/+]json($|[^-\w])/.test(t)}function b(t){this.req=t;this.xhr=this.req.xhr;this.text=this.req.method!=="HEAD"&&(this.xhr.responseType===""||this.xhr.responseType==="text")||typeof this.xhr.responseType==="undefined"?this.xhr.responseText:null;this.statusText=this.req.xhr.statusText;var e=this.xhr.status;if(e===1223){e=204}this._setStatusProperties(e);this.headers=_(this.xhr.getAllResponseHeaders());this.header=this.headers;this.header["content-type"]=this.xhr.getResponseHeader("content-type");this._setHeaderProperties(this.header);if(this.text===null&&t._responseType){this.body=this.xhr.response}else{this.body=this.req.method==="HEAD"?null:this._parseBody(this.text?this.text:this.xhr.response)}}f(b.prototype);b.prototype._parseBody=function(t){var e=p.parse[this.type];if(this.req._parser){return this.req._parser(this,t)}if(!e&&v(this.type)){e=p.parse["application/json"]}return e&&t&&(t.length>0||t instanceof Object)?e(t):null};b.prototype.toError=function(){var t=this.req;var e=t.method;var r=t.url;var n="cannot ".concat(e," ").concat(r," (").concat(this.status,")");var i=new Error(n);i.status=this.status;i.method=e;i.url=r;return i};p.Response=b;function w(t,e){var n=this;this._query=this._query||[];this.method=t;this.url=e;this.header={};this._header={};this.on("end",function(){var e=null;var t=null;try{t=new b(n)}catch(t){e=new Error("Parser is unable to parse the response");e.parse=true;e.original=t;if(n.xhr){e.rawResponse=typeof n.xhr.responseType==="undefined"?n.xhr.responseText:n.xhr.response;e.status=n.xhr.status?n.xhr.status:null;e.statusCode=e.status}else{e.rawResponse=null;e.status=null}return n.callback(e)}n.emit("response",t);var r;try{if(!n._isResponseOK(t)){r=new Error(t.statusText||t.text||"Unsuccessful HTTP response")}}catch(t){r=t}if(r){r.original=e;r.response=t;r.status=t.status;n.callback(r,t)}else{n.callback(null,t)}})}o(w.prototype);a(w.prototype);w.prototype.type=function(t){this.set("Content-Type",p.types[t]||t);return this};w.prototype.accept=function(t){this.set("Accept",p.types[t]||t);return this};w.prototype.auth=function(t,e,r){if(arguments.length===1)e="";if(i(e)==="object"&&e!==null){r=e;e=""}if(!r){r={type:typeof btoa==="function"?"basic":"auto"}}var n=function t(e){if(typeof btoa==="function"){return btoa(e)}throw new Error("Cannot use basic auth, btoa is not a function")};return this._auth(t,e,r,n)};w.prototype.query=function(t){if(typeof t!=="string")t=d(t);if(t)this._query.push(t);return this};w.prototype.attach=function(t,e,r){if(e){if(this._data){throw new Error("superagent can't mix .send() and .attach()")}this._getFormData().append(t,e,r||e.name)}return this};w.prototype._getFormData=function(){if(!this._formData){this._formData=new n.FormData}return this._formData};w.prototype.callback=function(t,e){if(this._shouldRetry(t,e)){return this._retry()}var r=this._callback;this.clearTimeout();if(t){if(this._maxRetries)t.retries=this._retries-1;this.emit("error",t)}r(t,e)};w.prototype.crossDomainError=function(){var t=new Error("Request has been terminated\nPossible causes: the network is offline, Origin is not allowed by Access-Control-Allow-Origin, the page is being unloaded, etc.");t.crossDomain=true;t.status=this.status;t.method=this.method;t.url=this.url;this.callback(t)};w.prototype.agent=function(){console.warn("This is not supported in browser version of superagent");return this};w.prototype.ca=w.prototype.agent;w.prototype.buffer=w.prototype.ca;w.prototype.write=function(){throw new Error("Streaming is not supported in browser version of superagent")};w.prototype.pipe=w.prototype.write;w.prototype._isHost=function(t){return t&&i(t)==="object"&&!Array.isArray(t)&&Object.prototype.toString.call(t)!=="[object Object]"};w.prototype.end=function(t){if(this._endCalled){console.warn("Warning: .end() was called twice. This is not supported in superagent")}this._endCalled=true;this._callback=t||l;this._finalizeQueryString();this._end()};w.prototype._setUploadTimeout=function(){var t=this;if(this._uploadTimeout&&!this._uploadTimeoutTimer){this._uploadTimeoutTimer=setTimeout(function(){t._timeoutError("Upload timeout of ",t._uploadTimeout,"ETIMEDOUT")},this._uploadTimeout)}};w.prototype._end=function(){if(this._aborted)return this.callback(new Error("The request has been aborted even before .end() was called"));var n=this;this.xhr=p.getXHR();var r=this.xhr;var t=this._formData||this._data;this._setTimeouts();r.onreadystatechange=function(){var t=r.readyState;if(t>=2&&n._responseTimeoutTimer){clearTimeout(n._responseTimeoutTimer)}if(t!==4){return}var e;try{e=r.status}catch(t){e=0}if(!e){if(n.timedout||n._aborted)return;return n.crossDomainError()}n.emit("end")};var e=function t(e,r){if(r.total>0){r.percent=r.loaded/r.total*100;if(r.percent===100){clearTimeout(n._uploadTimeoutTimer)}}r.direction=e;n.emit("progress",r)};if(this.hasListeners("progress")){try{r.addEventListener("progress",e.bind(null,"download"));if(r.upload){r.upload.addEventListener("progress",e.bind(null,"upload"))}}catch(t){}}if(r.upload){this._setUploadTimeout()}try{if(this.username&&this.password){r.open(this.method,this.url,true,this.username,this.password)}else{r.open(this.method,this.url,true)}}catch(t){return this.callback(t)}if(this._withCredentials)r.withCredentials=true;if(!this._formData&&this.method!=="GET"&&this.method!=="HEAD"&&typeof t!=="string"&&!this._isHost(t)){var i=this._header["content-type"];var o=this._serializer||p.serialize[i?i.split(";")[0]:""];if(!o&&v(i)){o=p.serialize["application/json"]}if(o)t=o(t)}for(var s in this.header){if(this.header[s]===null)continue;if(Object.prototype.hasOwnProperty.call(this.header,s))r.setRequestHeader(s,this.header[s])}if(this._responseType){r.responseType=this._responseType}this.emit("request",this);r.send(typeof t==="undefined"?null:t)};p.agent=function(){return new c};["GET","POST","OPTIONS","PATCH","PUT","DELETE"].forEach(function(n){c.prototype[n.toLowerCase()]=function(t,e){var r=new p.Request(n,t);this._setDefaults(r);if(e){r.end(e)}return r}});c.prototype.del=c.prototype.delete;p.get=function(t,e,r){var n=p("GET",t);if(typeof e==="function"){r=e;e=null}if(e)n.query(e);if(r)n.end(r);return n};p.head=function(t,e,r){var n=p("HEAD",t);if(typeof e==="function"){r=e;e=null}if(e)n.query(e);if(r)n.end(r);return n};p.options=function(t,e,r){var n=p("OPTIONS",t);if(typeof e==="function"){r=e;e=null}if(e)n.send(e);if(r)n.end(r);return n};function g(t,e,r){var n=p("DELETE",t);if(typeof e==="function"){r=e;e=null}if(e)n.send(e);if(r)n.end(r);return n}p.del=g;p.delete=g;p.patch=function(t,e,r){var n=p("PATCH",t);if(typeof e==="function"){r=e;e=null}if(e)n.send(e);if(r)n.end(r);return n};p.post=function(t,e,r){var n=p("POST",t);if(typeof e==="function"){r=e;e=null}if(e)n.send(e);if(r)n.end(r);return n};p.put=function(t,e,r){var n=p("PUT",t);if(typeof e==="function"){r=e;e=null}if(e)n.send(e);if(r)n.end(r);return n}},{"./agent-base":5,"./is-object":7,"./request-base":8,"./response-base":9,"component-emitter":2,"fast-safe-stringify":3}],7:[function(t,e,r){"use strict";function n(t){"@babel/helpers - typeof";if(typeof Symbol==="function"&&typeof Symbol.iterator==="symbol"){n=function t(e){return typeof e}}else{n=function t(e){return e&&typeof Symbol==="function"&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e}}return n(t)}function i(t){return t!==null&&n(t)==="object"}e.exports=i},{}],8:[function(t,e,r){"use strict";function n(t){"@babel/helpers - typeof";if(typeof Symbol==="function"&&typeof Symbol.iterator==="symbol"){n=function t(e){return typeof e}}else{n=function t(e){return e&&typeof Symbol==="function"&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e}}return n(t)}var i=t("./is-object");e.exports=o;function o(t){if(t)return s(t)}function s(t){for(var e in o.prototype){if(Object.prototype.hasOwnProperty.call(o.prototype,e))t[e]=o.prototype[e]}return t}o.prototype.clearTimeout=function(){clearTimeout(this._timer);clearTimeout(this._responseTimeoutTimer);clearTimeout(this._uploadTimeoutTimer);delete this._timer;delete this._responseTimeoutTimer;delete this._uploadTimeoutTimer;return this};o.prototype.parse=function(t){this._parser=t;return this};o.prototype.responseType=function(t){this._responseType=t;return this};o.prototype.serialize=function(t){this._serializer=t;return this};o.prototype.timeout=function(t){if(!t||n(t)!=="object"){this._timeout=t;this._responseTimeout=0;this._uploadTimeout=0;return this}for(var e in t){if(Object.prototype.hasOwnProperty.call(t,e)){switch(e){case"deadline":this._timeout=t.deadline;break;case"response":this._responseTimeout=t.response;break;case"upload":this._uploadTimeout=t.upload;break;default:console.warn("Unknown timeout option",e)}}}return this};o.prototype.retry=function(t,e){if(arguments.length===0||t===true)t=1;if(t<=0)t=0;this._maxRetries=t;this._retries=0;this._retryCallback=e;return this};var a=["ECONNRESET","ETIMEDOUT","EADDRINFO","ESOCKETTIMEDOUT"];o.prototype._shouldRetry=function(t,e){if(!this._maxRetries||this._retries++>=this._maxRetries){return false}if(this._retryCallback){try{var r=this._retryCallback(t,e);if(r===true)return true;if(r===false)return false}catch(t){console.error(t)}}if(e&&e.status&&e.status>=500&&e.status!==501)return true;if(t){if(t.code&&a.includes(t.code))return true;if(t.timeout&&t.code==="ECONNABORTED")return true;if(t.crossDomain)return true}return false};o.prototype._retry=function(){this.clearTimeout();if(this.req){this.req=null;this.req=this.request()}this._aborted=false;this.timedout=false;this.timedoutError=null;return this._end()};o.prototype.then=function(t,e){var i=this;if(!this._fullfilledPromise){var o=this;if(this._endCalled){console.warn("Warning: superagent request was sent twice, because both .end() and .then() were called. Never call .end() if you use promises")}this._fullfilledPromise=new Promise(function(r,n){o.on("abort",function(){if(i._maxRetries&&i._maxRetries>i._retries){return}if(i.timedout&&i.timedoutError){n(i.timedoutError);return}var t=new Error("Aborted");t.code="ABORTED";t.status=i.status;t.method=i.method;t.url=i.url;n(t)});o.end(function(t,e){if(t)n(t);else r(e)})})}return this._fullfilledPromise.then(t,e)};o.prototype.catch=function(t){return this.then(undefined,t)};o.prototype.use=function(t){t(this);return this};o.prototype.ok=function(t){if(typeof t!=="function")throw new Error("Callback required");this._okCallback=t;return this};o.prototype._isResponseOK=function(t){if(!t){return false}if(this._okCallback){return this._okCallback(t)}return t.status>=200&&t.status<300};o.prototype.get=function(t){return this._header[t.toLowerCase()]};o.prototype.getHeader=o.prototype.get;o.prototype.set=function(t,e){if(i(t)){for(var r in t){if(Object.prototype.hasOwnProperty.call(t,r))this.set(r,t[r])}return this}this._header[t.toLowerCase()]=e;this.header[t]=e;return this};o.prototype.unset=function(t){delete this._header[t.toLowerCase()];delete this.header[t];return this};o.prototype.field=function(t,e){if(t===null||undefined===t){throw new Error(".field(name, val) name can not be empty")}if(this._data){throw new Error(".field() can't be used if .send() is used. Please use only .send() or only .field() & .attach()")}if(i(t)){for(var r in t){if(Object.prototype.hasOwnProperty.call(t,r))this.field(r,t[r])}return this}if(Array.isArray(e)){for(var n in e){if(Object.prototype.hasOwnProperty.call(e,n))this.field(t,e[n])}return this}if(e===null||undefined===e){throw new Error(".field(name, val) val can not be empty")}if(typeof e==="boolean"){e=String(e)}this._getFormData().append(t,e);return this};o.prototype.abort=function(){if(this._aborted){return this}this._aborted=true;if(this.xhr)this.xhr.abort();if(this.req)this.req.abort();this.clearTimeout();this.emit("abort");return this};o.prototype._auth=function(t,e,r,n){switch(r.type){case"basic":this.set("Authorization","Basic ".concat(n("".concat(t,":").concat(e))));break;case"auto":this.username=t;this.password=e;break;case"bearer":this.set("Authorization","Bearer ".concat(t));break;default:break}return this};o.prototype.withCredentials=function(t){if(t===undefined)t=true;this._withCredentials=t;return this};o.prototype.redirects=function(t){this._maxRedirects=t;return this};o.prototype.maxResponseSize=function(t){if(typeof t!=="number"){throw new TypeError("Invalid argument")}this._maxResponseSize=t;return this};o.prototype.toJSON=function(){return{method:this.method,url:this.url,data:this._data,headers:this._header}};o.prototype.send=function(t){var e=i(t);var r=this._header["content-type"];if(this._formData){throw new Error(".send() can't be used if .attach() or .field() is used. Please use only .send() or only .field() & .attach()")}if(e&&!this._data){if(Array.isArray(t)){this._data=[]}else if(!this._isHost(t)){this._data={}}}else if(t&&this._data&&this._isHost(this._data)){throw new Error("Can't merge these send calls")}if(e&&i(this._data)){for(var n in t){if(Object.prototype.hasOwnProperty.call(t,n))this._data[n]=t[n]}}else if(typeof t==="string"){if(!r)this.type("form");r=this._header["content-type"];if(r==="application/x-www-form-urlencoded"){this._data=this._data?"".concat(this._data,"&").concat(t):t}else{this._data=(this._data||"")+t}}else{this._data=t}if(!e||this._isHost(t)){return this}if(!r)this.type("json");return this};o.prototype.sortQuery=function(t){this._sort=typeof t==="undefined"?true:t;return this};o.prototype._finalizeQueryString=function(){var t=this._query.join("&");if(t){this.url+=(this.url.includes("?")?"&":"?")+t}this._query.length=0;if(this._sort){var e=this.url.indexOf("?");if(e>=0){var r=this.url.slice(e+1).split("&");if(typeof this._sort==="function"){r.sort(this._sort)}else{r.sort()}this.url=this.url.slice(0,e)+"?"+r.join("&")}}};o.prototype._appendQueryString=function(){console.warn("Unsupported")};o.prototype._timeoutError=function(t,e,r){if(this._aborted){return}var n=new Error("".concat(t+e,"ms exceeded"));n.timeout=e;n.code="ECONNABORTED";n.errno=r;this.timedout=true;this.timedoutError=n;this.abort();this.callback(n)};o.prototype._setTimeouts=function(){var t=this;if(this._timeout&&!this._timer){this._timer=setTimeout(function(){t._timeoutError("Timeout of ",t._timeout,"ETIME")},this._timeout)}if(this._responseTimeout&&!this._responseTimeoutTimer){this._responseTimeoutTimer=setTimeout(function(){t._timeoutError("Response timeout of ",t._responseTimeout,"ETIMEDOUT")},this._responseTimeout)}}},{"./is-object":7}],9:[function(t,e,r){"use strict";var i=t("./utils");e.exports=n;function n(t){if(t)return o(t)}function o(t){for(var e in n.prototype){if(Object.prototype.hasOwnProperty.call(n.prototype,e))t[e]=n.prototype[e]}return t}n.prototype.get=function(t){return this.header[t.toLowerCase()]};n.prototype._setHeaderProperties=function(t){var e=t["content-type"]||"";this.type=i.type(e);var r=i.params(e);for(var n in r){if(Object.prototype.hasOwnProperty.call(r,n))this[n]=r[n]}this.links={};try{if(t.link){this.links=i.parseLinks(t.link)}}catch(t){}};n.prototype._setStatusProperties=function(t){var e=t/100|0;this.statusCode=t;this.status=this.statusCode;this.statusType=e;this.info=e===1;this.ok=e===2;this.redirect=e===3;this.clientError=e===4;this.serverError=e===5;this.error=e===4||e===5?this.toError():false;this.created=t===201;this.accepted=t===202;this.noContent=t===204;this.badRequest=t===400;this.unauthorized=t===401;this.notAcceptable=t===406;this.forbidden=t===403;this.notFound=t===404;this.unprocessableEntity=t===422}},{"./utils":10}],10:[function(t,e,r){"use strict";r.type=function(t){return t.split(/ *; */).shift()};r.params=function(t){return t.split(/ *; */).reduce(function(t,e){var r=e.split(/ *= */);var n=r.shift();var i=r.shift();if(n&&i)t[n]=i;return t},{})};r.parseLinks=function(t){return t.split(/ *, */).reduce(function(t,e){var r=e.split(/ *; */);var n=r[0].slice(1,-1);var i=r[1].split(/ *= */)[1].slice(1,-1);t[i]=n;return t},{})};r.cleanHeader=function(t,e){delete t["content-type"];delete t["content-length"];delete t["transfer-encoding"];delete t.host;if(e){delete t.authorization;delete t.cookie}return t}},{}]},{},[1]);
