if(!Worker)var Worker=function(scriptFile){var self=this,onmessage,webWorker={};self.postMessage=function(e){"function"==typeof webWorker.onmessage&&webWorker.onmessage({data:e})},self.terminate=function(){return!0};var _evalInContext=function(scriptText){var self=this;self=eval(scriptText)},_loadWorkerFile=function(e){var t=(window.location.host+"/"+e,new XMLHttpRequest||new ActiveXObject("Microsoft.XMLHTTP"));if(t.open("GET",e,!1),t.send(null),4==t.readyState){var n=t.responseText;200===t.status&&_evalInContext.call(webWorker,n)}};return _loadWorkerFile(scriptFile),{onmessage:self.onmessage,postMessage:self.postMessage,terminate:self.terminate}};!function(e){"use strict";for(var t=function(){var t=!1;e.onmessage=function(){};var n=function(n,r){if(!t){var o=document.getElementById("ultrawave");e.postMessage({cmd:"init",endpoint:o.getAttribute("data-ultrawave-endpoint"),streamName:o.getAttribute("data-ultrawave-stream-name"),appName:o.getAttribute("data-ultrawave-app-name"),msg:{token:o.getAttribute("data-ultrawave-token"),location:window.location.href,timestamp:new Date}}),t=!0}var i={msg:a(n)};return i.cmd=r?"finish":"add",e.postMessage(i),!0},a=function(e){var t=e.target||e.srcElement,n={eventType:e.type,timestamp:new Date};return t&&(n.target={tagName:t.tagName||"",id:t.id||"",className:t.className||"",name:t.name||"",value:t.value||""}),n};return{dispatch:n}}(),n=function(e,t){for(var n=0,a=e.length;a>n;n++)if(e[n]===t)return n;return-1},a=function(e){var t,n=[];for(t in e)e.hasOwnProperty(t)&&n.push(t);return n},r=function(e,t,n){e.addEventListener?e.addEventListener(t,n,!1):e.attachEvent&&e.attachEvent("on"+t,n)},o=function(e,t){for(var a=e.target||e.srcElement;a;){if(a.tagName){var r=a.tagName.toLowerCase();if(r&&n(t,r)>-1)return a}a=a.parentNode}return null},i=function(e,t,n){return"button"===t||"a"===t||"submit"===t||"click"===e&&"submit"===n},s=function(e){return function(n){n=n||window.event;var a=e.toLowerCase(),r=u[a],s=o(n,r);if(s){var c=s.tagName&&s.type?i(a,s.tagName.toLowerCase(),s.type.toLowerCase()):!1;t.dispatch(n,c)}return!0}},u={focus:["input"],click:["button","a","input","select"],tap:["button","a","input","select"],change:["input","select"],select:["select"],input:["input"],submit:["button","form","input"]},c=a(u),l=0,f=c.length;f>l;l++)r(document.body,c[l],s(c[l]));r(document,"visibilitychange",function(e){t.dispatch(e,!0)}),r(window,"load",function(e){t.dispatch(e,!0)}),r(window,"beforeunload",function(e){t.dispatch(e,!0)}),r(window,"onunload",function(n){t.dispatch(n,!0),e.terminate()})}(new Worker("/assets/ultrawave_worker.js"));