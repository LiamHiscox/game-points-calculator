(this["webpackJsonpgame-points-calculator"]=this["webpackJsonpgame-points-calculator"]||[]).push([[0],[,,,,,,,,,,function(n,e,t){},function(n,e,t){},function(n,e,t){},,function(n,e,t){"use strict";t.r(e);var o=t(1),i=t.n(o),r=t(5),a=t.n(r),c=(t(10),t(4)),s=t(2),l=(t(11),t(12),t(0));var u=function(n){var e=n.player,t=n.onPointsChange;return 0!==e.points.length&&null===e.points[e.points.length-1]||t(e.points.concat(null)),Object(l.jsxs)("div",{className:"player-container",children:[Object(l.jsx)("div",{className:"player-name",children:e.name}),e.points.map((function(n,o){return Object(l.jsx)("div",{className:"player-points",children:Object(l.jsx)("input",{className:"points-input",type:"number",defaultValue:n||void 0,onBlur:function(n){return function(n,o){if(n.target.value){var i=e.points.map((function(e,t){return t===o?+n.target.value:e}));o===e.points.length-1?t(i.concat(null)):t(i)}}(n,o)}})},o)}))]})},p="players";var d=function(){var n=function(){Object(o.useEffect)((function(){var n=setTimeout((function(){localStorage.setItem(p,JSON.stringify(t))}),1e3);return clearTimeout(n)}));var n=Object(o.useState)(JSON.parse(localStorage.getItem(p)||"[]")),e=Object(s.a)(n,2),t=e[0],i=e[1];return[t,function(n){localStorage.setItem(p,JSON.stringify(n)),i(n)}]}(),e=Object(s.a)(n,2),t=e[0],i=e[1];return 0===t.length&&i([{name:"Liam",points:[null]}]),Object(l.jsxs)("div",{className:"app",children:[Object(l.jsx)("div",{className:"player-table",children:t.map((function(n,e){return Object(l.jsx)(u,{player:n,onPointsChange:function(n){return function(n,e){i(t.map((function(t,o){return o===e?Object(c.a)(Object(c.a)({},t),{},{points:n}):t})))}(n,e)}},e)}))}),Object(l.jsx)("div",{className:"player-scores",children:t.map((function(n,e){return Object(l.jsx)("div",{className:"player-score",children:n.points.reduce((function(n,e){return n+(e||0)}),0)},e)}))})]})},f=Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));function h(n,e){navigator.serviceWorker.register(n).then((function(n){n.onupdatefound=function(){var t=n.installing;null!=t&&(t.onstatechange=function(){"installed"===t.state&&(navigator.serviceWorker.controller?(console.log("New content is available and will be used when all tabs for this page are closed. See https://cra.link/PWA."),e&&e.onUpdate&&e.onUpdate(n)):(console.log("Content is cached for offline use."),e&&e.onSuccess&&e.onSuccess(n)))})}})).catch((function(n){console.error("Error during service worker registration:",n)}))}a.a.render(Object(l.jsx)(i.a.StrictMode,{children:Object(l.jsx)(d,{})}),document.getElementById("root")),function(n){if("serviceWorker"in navigator){if(new URL("/game-points-calculator/build",window.location.href).origin!==window.location.origin)return;window.addEventListener("load",(function(){var e="".concat("/game-points-calculator/build","/service-worker.js");f?(!function(n,e){fetch(n,{headers:{"Service-Worker":"script"}}).then((function(t){var o=t.headers.get("content-type");404===t.status||null!=o&&-1===o.indexOf("javascript")?navigator.serviceWorker.ready.then((function(n){n.unregister().then((function(){window.location.reload()}))})):h(n,e)})).catch((function(){console.log("No internet connection found. App is running in offline mode.")}))}(e,n),navigator.serviceWorker.ready.then((function(){console.log("This web app is being served cache-first by a service worker. To learn more, visit https://cra.link/PWA")}))):h(e,n)}))}}()}],[[14,1,2]]]);
//# sourceMappingURL=main.66fbe619.chunk.js.map