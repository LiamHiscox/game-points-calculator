(this["webpackJsonpgame-points-calculator"]=this["webpackJsonpgame-points-calculator"]||[]).push([[0],{101:function(e,n,t){},102:function(e,n,t){},105:function(e,n,t){},112:function(e,n,t){},113:function(e,n,t){},114:function(e,n,t){},115:function(e,n,t){},117:function(e,n,t){},119:function(e,n,t){},120:function(e,n,t){"use strict";t.r(n);var c=t(0),r=t.n(c),a=t(11),o=t.n(a),i=(t(101),t(10)),s=t(14),l=(t(102),t(32)),u="game",j=JSON.parse(localStorage.getItem(u)||JSON.stringify({id:Object(l.v4)(),name:(new Date).toLocaleString(),players:[]})),b=t(180),p=t(160),O=t(121),d=t(161),f=t(162),m=t(122),h=t(163),x=t(159),y=t(42),g=t.n(y),v=(t(105),t(157)),C=t(158),w=t(2);function k(e){var n=e.message,t=e.open,c=e.onConfirm,r=e.onDecline;return Object(w.jsxs)(b.a,{open:t,fullWidth:!0,onClose:r,children:[Object(w.jsx)(v.a,{children:n}),Object(w.jsxs)(C.a,{children:[Object(w.jsx)(x.a,{color:"primary",onClick:r,children:" No "}),Object(w.jsx)(x.a,{color:"primary",onClick:c,children:" Yes "})]})]})}function S(e){var n=e.players,t=e.open,r=e.onClose,a=e.onDelete,o=Object(c.useState)(!1),i=Object(s.a)(o,2),l=i[0],u=i[1],j=Object(c.useState)(""),y=Object(s.a)(j,2),v=y[0],C=y[1],S=Object(c.useState)(""),N=Object(s.a)(S,2),P=N[0],D=N[1];return Object(w.jsxs)(b.a,{open:t,fullWidth:!0,onClose:r,children:[Object(w.jsx)(p.a,{children:n.map((function(e,n){return Object(w.jsxs)(O.a,{children:[Object(w.jsx)(d.a,{primary:e.name}),Object(w.jsx)(f.a,{children:Object(w.jsx)(m.a,{onClick:function(){return n=e.id,t=e.name,C(n),D(t),void u(!0);var n,t},children:Object(w.jsx)(g.a,{color:"primary"})})})]},n)}))}),Object(w.jsx)(h.a,{}),Object(w.jsx)(x.a,{color:"primary",onClick:r,children:" Close "}),Object(w.jsx)(k,{message:"Are you sure you want to delete ".concat(P,"?"),open:l,onConfirm:function(){u(!1),a(v)},onDecline:function(){return u(!1)}})]})}var N=t(62),P=(t(112),t(165)),D=t(181),T=t(78),W=t.n(T),A=t(77),L=t.n(A);function B(e){var n=e.players,t=e.open,r=e.onClose,a=Object(c.useState)("asc"),o=Object(s.a)(a,2),l=o[0],u=o[1],j=n.map((function(e){return{position:0,name:e.name,score:e.points.reduce((function(e,n){return e+(n||0)}),0)}})).sort((function(e,n){return"asc"===l?e.score-n.score:n.score-e.score})).reduce((function(e,n,t){return t>0&&e[t-1].score===n.score?e.concat(Object(i.a)(Object(i.a)({},n),{},{position:e[t-1].position})):e.concat(Object(i.a)(Object(i.a)({},n),{},{position:t+1}))}),Array());return Object(w.jsxs)(b.a,{open:t,fullWidth:!0,onClose:r,children:["asc"===l?Object(w.jsx)(x.a,{color:"primary",endIcon:Object(w.jsx)(L.a,{}),onClick:function(){return u("desc")},children:"Highest First"}):Object(w.jsx)(x.a,{color:"primary",endIcon:Object(w.jsx)(W.a,{}),onClick:function(){return u("asc")},children:"Lowest First"}),Object(w.jsx)(h.a,{}),Object(w.jsx)(p.a,{children:j.map((function(e,n){return Object(w.jsxs)(O.a,{children:[Object(w.jsx)(P.a,{className:e.position<=3?"place-"+e.position:"default-place",children:Object(w.jsxs)(D.a,{children:[" ",e.score," "]})}),Object(w.jsx)(d.a,{primary:e.name})]},n)}))}),Object(w.jsx)(h.a,{}),Object(w.jsx)(x.a,{color:"primary",onClick:r,children:" Close "})]})}t(113),t(114);var E=function(e){var n=e.player,t=e.onPointsChange;return 0!==n.points.length&&null===n.points[n.points.length-1]||t(n.points.concat(null)),Object(w.jsx)("div",{className:"player-container",children:n.points.map((function(e,c){return Object(w.jsx)("div",{className:"player-points player-input-cell",children:Object(w.jsx)("input",{className:null!==e?"points-input":"points-input empty-input",type:"number",value:null!==e?e:"",onChange:function(e){return function(e,c){var r=e.target.value?+e.target.value:null,a=n.points.map((function(e,n){return n===c?r:e}));c===n.points.length-1?t(a.concat(null)):t(a)}(e,c)},onClick:function(e){e.currentTarget.select()}})},c)}))})};function G(e){var n=e.players,t=e.onPlayerNameChange,c=e.onPointsChange;return Object(w.jsxs)("div",{className:"player-table-container",children:[Object(w.jsx)("div",{className:"player-names",children:n.map((function(e,n){return Object(w.jsx)("input",{className:"player-name",type:"text",value:e.name,onChange:function(n){return t(n.target.value,e.id)},onClick:function(e){e.currentTarget.select()}},n)}))}),Object(w.jsx)("div",{className:"player-table",children:n.map((function(e,n){return Object(w.jsx)(E,{player:e,onPointsChange:function(n){return c(n,e.id)}},n)}))}),Object(w.jsx)("div",{className:"player-scores",children:n.map((function(e,n){return Object(w.jsx)("div",{className:"player-score player-header-cell",children:e.points.reduce((function(e,n){return e+(n||0)}),0)},n)}))})]})}t(115);var F=t(87),I=t(166),J=t(167),R=t(63),H=t(79),U=t.n(H),z=t(80),q=t.n(z),M=t(59),Y=t.n(M),$=t(81),K=t.n($),Q=t(82),V=t.n(Q),X=t(83),Z=t.n(X);function _(e){var n=e.gameName,t=e.onAddPlayer,c=e.onClearPoints,a=e.onOpenDelete,o=e.onOpenLeaderBoard,i=e.onNewGame,l=e.onNameChange,u=e.onOpenHistory,j=r.a.useState(!1),b=Object(s.a)(j,2),p=b[0],O=b[1],f=r.a.useState(null),h=Object(s.a)(f,2),x=h[0],y=h[1];return Object(w.jsxs)(w.Fragment,{children:[Object(w.jsxs)("div",{className:"top-bar",children:[Object(w.jsx)("div",{className:"empty-container"}),Object(w.jsx)("input",{type:"text",className:"game-name-input",value:n,onChange:function(e){return l(e.target.value)},onClick:function(e){e.currentTarget.select()}}),Object(w.jsx)(m.a,{onClick:function(e){y(e.currentTarget)},children:Object(w.jsx)(U.a,{className:"top-bar-icon"})})]}),Object(w.jsxs)(F.a,{anchorEl:x,open:!!x,onClose:function(){y(null)},children:[Object(w.jsxs)(I.a,{onClick:function(){O(!0)},children:[Object(w.jsxs)(J.a,{children:[" ",Object(w.jsx)(q.a,{color:"secondary"})," "]}),Object(w.jsx)(d.a,{primary:Object(w.jsx)(R.a,{color:"primary",children:" Clear Points "})})]}),Object(w.jsxs)(I.a,{onClick:a,children:[Object(w.jsxs)(J.a,{children:[" ",Object(w.jsx)(g.a,{color:"secondary"})," "]}),Object(w.jsx)(d.a,{primary:Object(w.jsx)(R.a,{color:"primary",children:" Remove Players "})})]}),Object(w.jsxs)(I.a,{onClick:t,children:[Object(w.jsxs)(J.a,{children:[" ",Object(w.jsx)(Y.a,{color:"secondary"})," "]}),Object(w.jsx)(d.a,{primary:Object(w.jsx)(R.a,{color:"primary",children:" Add Player "})})]}),Object(w.jsxs)(I.a,{onClick:o,children:[Object(w.jsxs)(J.a,{children:[" ",Object(w.jsx)(K.a,{color:"secondary"})," "]}),Object(w.jsx)(d.a,{primary:Object(w.jsx)(R.a,{color:"primary",children:" Leaderboard "})})]}),Object(w.jsxs)(I.a,{onClick:i,children:[Object(w.jsxs)(J.a,{children:[" ",Object(w.jsx)(V.a,{color:"secondary"})," "]}),Object(w.jsx)(d.a,{primary:Object(w.jsx)(R.a,{color:"primary",children:" New Game "})})]}),Object(w.jsxs)(I.a,{onClick:u,children:[Object(w.jsxs)(J.a,{children:[" ",Object(w.jsx)(Z.a,{color:"secondary"})," "]}),Object(w.jsx)(d.a,{primary:Object(w.jsx)(R.a,{color:"primary",children:" History "})})]})]}),Object(w.jsx)(k,{message:"Are you sure you want to clear all points?",open:p,onConfirm:function(){O(!1),c()},onDecline:function(){return O(!1)}})]})}t(117);var ee=t(177);function ne(e){var n=e.open,t=e.players,r=e.onClose,a=e.onSubmit,o=Object(c.useState)(t.map((function(e){return Object(i.a)(Object(i.a)({},e),{},{points:[]})}))),u=Object(s.a)(o,2),j=u[0],d=u[1];Object(c.useEffect)((function(){return d(t.map((function(e){return Object(i.a)(Object(i.a)({},e),{},{points:[null]})})))}),[t,n]);return Object(w.jsxs)(b.a,{fullWidth:!0,open:n,onClose:r,children:[Object(w.jsxs)(p.a,{children:[j.map((function(e,n){return Object(w.jsxs)(O.a,{children:[Object(w.jsx)(ee.a,{label:"Name",variant:"outlined",value:e.name,onChange:function(e){return function(e,n){d(j.map((function(t,c){return n===c?Object(i.a)(Object(i.a)({},t),{},{name:e}):t})))}(e.target.value,n)}}),Object(w.jsx)(f.a,{children:Object(w.jsx)(m.a,{onClick:function(){return function(e){d(j.filter((function(n,t){return t!==e})))}(n)},children:Object(w.jsx)(g.a,{color:"primary"})})})]},n)})),Object(w.jsx)(O.a,{button:!0,style:{justifyContent:"center"},onClick:function(){d(j.concat({id:Object(l.v4)(),name:"Player ".concat(j.length+1),points:[]}))},children:Object(w.jsx)(Y.a,{color:"primary"})})]}),Object(w.jsx)(h.a,{}),Object(w.jsx)(x.a,{color:"primary",onClick:function(){return a(j)},children:" New Game "})]})}var te=t(67),ce=t.n(te),re=t(84),ae=(t(119),t(182)),oe=t(168),ie=t(169),se=t(170),le=t(171),ue=t(172),je=t(173),be=t(174),pe=t(175),Oe=function(e){return new Promise((function(n,t){var c=e.transaction("games","readonly").objectStore("games").getAll();c.onsuccess=function(){var e=c.result.map((function(e){return Object(i.a)(Object(i.a)({},e),{},{timestamp:new Date(e.timestamp)})}));e.sort((function(e,n){return n.timestamp.getTime()-e.timestamp.getTime()})),n(e)},c.onerror=function(){return t(c.error)}}))},de=function(e){var n=indexedDB.open("games");n.onsuccess=function(){n.result.transaction("games","readwrite").objectStore("games").delete(e)}},fe=t(85),me=t.n(fe);function he(e){var n=e.open,t=e.onClose,r=e.onReturnPlaying,a=e.onDeleteGame,o=Object(c.useState)(null),i=Object(s.a)(o,2),l=i[0],u=i[1];return Object(c.useEffect)((function(){return n&&Object(re.a)(ce.a.mark((function e(){var n,t;return ce.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,new Promise((function(e,n){var t=indexedDB.open("games");t.onupgradeneeded=function(){t.result.createObjectStore("games",{keyPath:"id"})},t.onsuccess=function(){return e(t.result)},t.onerror=function(){return n(t.error)}}));case 2:return n=e.sent,e.next=5,Oe(n);case 5:t=e.sent,u(t);case 7:case"end":return e.stop()}}),e)})))(),function(){}}),[n]),Object(w.jsxs)(b.a,{fullWidth:!0,open:n,onClose:t,children:[(!l||l.length<=0)&&Object(w.jsx)(R.a,{children:"No past games found!"}),null===l||void 0===l?void 0:l.map((function(e,n){return Object(w.jsxs)(ae.a,{children:[Object(w.jsx)(oe.a,{expandIcon:Object(w.jsx)(me.a,{color:"primary"}),children:Object(w.jsx)(R.a,{children:e.name})}),Object(w.jsx)(ie.a,{children:Object(w.jsxs)(R.a,{children:["Date: ",e.timestamp.toLocaleDateString()," - ",e.timestamp.toLocaleTimeString()]})}),Object(w.jsx)(ie.a,{children:Object(w.jsxs)(se.a,{size:"small",children:[Object(w.jsx)(le.a,{children:Object(w.jsx)(ue.a,{children:e.players.map((function(e,n){return Object(w.jsx)(je.a,{children:e.name},n)}))})}),Object(w.jsx)(be.a,{children:Object(w.jsx)(ue.a,{children:e.players.map((function(e,n){return Object(w.jsx)(je.a,{component:"th",scope:"row",children:e.points.reduce((function(e,n){return e+(n||0)}),0)},n)}))})})]})}),Object(w.jsxs)(pe.a,{children:[Object(w.jsx)(x.a,{color:"primary",onClick:function(){return a(e.id)},children:" Delete "}),Object(w.jsx)(x.a,{color:"primary",variant:"contained",onClick:function(){return r(e)},children:" Return Playing "})]})]},n)}))]})}var xe=function(){var e=function(){var e=Object(c.useState)(j),n=Object(s.a)(e,2),t=n[0],r=n[1];return Object(c.useEffect)((function(){var e=setTimeout((function(){return localStorage.setItem(u,JSON.stringify(t))}),1e3);return function(){return clearTimeout(e)}})),[t,function(e){r(e)}]}(),n=Object(s.a)(e,2),t=n[0],r=n[1],a=Object(c.useState)(!1),o=Object(s.a)(a,2),b=o[0],p=o[1],O=Object(c.useState)(!1),d=Object(s.a)(O,2),f=d[0],m=d[1],h=Object(c.useState)(!1),x=Object(s.a)(h,2),y=x[0],g=x[1],v=Object(c.useState)(!1),C=Object(s.a)(v,2),k=C[0],P=C[1],D=Object(N.b)().enqueueSnackbar;return 0===t.players.length&&r(Object(i.a)(Object(i.a)({},t),{},{players:[{id:Object(l.v4)(),name:"Liam",points:[null]}]})),Object(w.jsxs)("div",{className:"app",children:[Object(w.jsx)(_,{gameName:t.name,onNameChange:function(e){r(Object(i.a)(Object(i.a)({},t),{},{name:e}))},onAddPlayer:function(){r(Object(i.a)(Object(i.a)({},t),{},{players:t.players.concat({id:Object(l.v4)(),name:"Player ".concat(t.players.length+1),points:[null]})})),D("".concat(t.players.length+1," players"))},onClearPoints:function(){r(Object(i.a)(Object(i.a)({},t),{},{players:t.players.map((function(e){return Object(i.a)(Object(i.a)({},e),{},{points:[]})}))}))},onOpenDelete:function(){return p(!0)},onOpenLeaderBoard:function(){return m(!0)},onNewGame:function(){return g(!0)},onOpenHistory:function(){return P(!0)}}),Object(w.jsx)(G,{onPlayerNameChange:function(e,n){r(Object(i.a)(Object(i.a)({},t),{},{players:t.players.map((function(t){return t.id===n?Object(i.a)(Object(i.a)({},t),{},{name:e}):t}))}))},onPointsChange:function(e,n){r(Object(i.a)(Object(i.a)({},t),{},{players:t.players.map((function(t){return t.id===n?Object(i.a)(Object(i.a)({},t),{},{points:e}):t}))}))},players:t.players}),Object(w.jsx)(S,{players:t.players,open:b,onDelete:function(e){r(Object(i.a)(Object(i.a)({},t),{},{players:t.players.filter((function(n){return n.id!==e}))}))},onClose:function(){return p(!1)}}),Object(w.jsx)(B,{players:t.players,open:f,onClose:function(){return m(!1)}}),Object(w.jsx)(ne,{open:y,players:t.players,onClose:function(){return g(!1)},onSubmit:function(e){!function(e){var n=indexedDB.open("games");n.onsuccess=function(){n.result.transaction("games","readwrite").objectStore("games").put(e)}}(t);var n=new Date,c="Game ".concat(n.toLocaleDateString());r({id:Object(l.v4)(),name:c,timestamp:n,players:e}),g(!1)}}),Object(w.jsx)(he,{open:k,onClose:function(){return P(!1)},onReturnPlaying:function(e){return de((n=e).id),r(n),void P(!1);var n},onDeleteGame:function(e){!function(e){de(e),P(!1)}(e)}})]})},ye=Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));function ge(e,n){navigator.serviceWorker.register(e).then((function(e){e.onupdatefound=function(){var t=e.installing;null!=t&&(t.onstatechange=function(){"installed"===t.state&&(navigator.serviceWorker.controller?(console.log("New content is available and will be used when all tabs for this page are closed. See https://cra.link/PWA."),n&&n.onUpdate&&n.onUpdate(e)):(console.log("Content is cached for offline use."),n&&n.onSuccess&&n.onSuccess(e)))})}})).catch((function(e){console.error("Error during service worker registration:",e)}))}var ve=t(176),Ce=t(86),we=Object(Ce.a)({palette:{primary:{main:"#3F51B5",contrastText:"#ffffff"},secondary:{main:"#FFA000",contrastText:"#ffffff"}}});o.a.render(Object(w.jsx)(r.a.StrictMode,{children:Object(w.jsx)(ve.a,{theme:we,children:Object(w.jsx)(N.a,{maxSnack:1,dense:!0,anchorOrigin:{vertical:"bottom",horizontal:"center"},children:Object(w.jsx)(xe,{})})})}),document.getElementById("root")),function(e){if("serviceWorker"in navigator){if(new URL("/game-points-calculator/build",window.location.href).origin!==window.location.origin)return;window.addEventListener("load",(function(){var n="".concat("/game-points-calculator/build","/service-worker.js");ye?(!function(e,n){fetch(e,{headers:{"Service-Worker":"script"}}).then((function(t){var c=t.headers.get("content-type");404===t.status||null!=c&&-1===c.indexOf("javascript")?navigator.serviceWorker.ready.then((function(e){e.unregister().then((function(){window.location.reload()}))})):ge(e,n)})).catch((function(){console.log("No internet connection found. App is running in offline mode.")}))}(n,e),navigator.serviceWorker.ready.then((function(){console.log("This web app is being served cache-first by a service worker. To learn more, visit https://cra.link/PWA")}))):ge(n,e)}))}}()}},[[120,1,2]]]);
//# sourceMappingURL=main.55c1693f.chunk.js.map