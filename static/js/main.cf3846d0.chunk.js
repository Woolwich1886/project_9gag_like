(this.webpackJsonpfrontend=this.webpackJsonpfrontend||[]).push([[0],{12:function(e,t,n){},14:function(e,t,n){"use strict";n.r(t);var s=n(1),o=n.n(s),c=n(6),r=n.n(c),i=(n(12),n(2)),a=n(7),l=n(0);function d(e,t,n,s){var o;s&&(o=JSON.stringify(s));var c=new XMLHttpRequest;c.responseType="json",c.open(e,t),c.setRequestHeader("Content-Type","application/json"),c.onload=function(){200===c.status||201===c.status?n(c.response,c.status):console.log("some error",c.status,c.response)},c.onerror=function(e){n({message:"Error"},400)},c.send(o)}function u(){var e=Object(s.useState)([]),t=Object(i.a)(e,2),n=t[0],c=t[1],r=Object(s.useState)(null),u=Object(i.a)(r,2),j=u[0],b=u[1];return Object(s.useEffect)((function(){d("GET","http://localhost:8000/api/posts",(function(e,t){b(e.next),c(e.results)}))}),[]),Object(l.jsxs)(o.a.Fragment,{children:[n.map((function(e){return Object(l.jsx)(p,{post:e,detail:!1},e.id)})),null!==j&&Object(l.jsx)("button",{className:"btn btn-primary",onClick:function(){if(null!==j){d("GET",j,(function(e,t){if(200===t){b(e.next);var s=Object(a.a)(n).concat(e.results);c(s)}else alert("\u041e\u0448\u0438\u0431\u043a\u0430 \u043f\u0440\u0438 \u0437\u0430\u0433\u0440\u0443\u0437\u043a\u0435")}))}},children:"\u0417\u0430\u0433\u0440\u0443\u0437\u0438\u0442\u044c \u0435\u0449\u0435"})]})}function j(e){var t=e.post,n=Object(s.useState)(""),c=Object(i.a)(n,2),r=c[0],a=c[1],u={},j=Object(s.useState)([t.comments]),p=Object(i.a)(j,2),O=p[0],h=p[1];function f(e,t){201===t?(console.log(t),h(e.comments)):console.log(t)}Object(s.useEffect)((function(){h(t.comments)}),[h,t.comments]);return console.log("post-id",t.id),Object(l.jsxs)(o.a.Fragment,{children:[Object(l.jsxs)("form",{onSubmit:function(n){n.preventDefault(),u=JSON.stringify({post:t.id,text:r}),d("POST","http://localhost:8000/api/posts/send_comment",f,{post:t.id,text:r}),console.log(u),a(""),console.log(e)},children:[Object(l.jsx)("textarea",{className:"form-control",resize:"none",style:{weight:"100%",resize:"none"},placeholder:"\u043e\u0441\u0442\u0430\u0432\u044c\u0442\u0435 \u043a\u043e\u043c\u043c\u0435\u043d\u0442\u0430\u0440\u0438\u0439 \u0437\u0434\u0435\u0441\u044c",id:"floatingTextarea2",value:r,onChange:function(e){return a(e.target.value)},required:!0,maxLength:"100"}),Object(l.jsx)("button",{type:"submit",className:"btn btn-success",children:"\u041e\u0442\u043f\u0440\u0430\u0432\u0438\u0442\u044c"})]}),Object(l.jsx)("div",{children:O.map((function(e){return Object(l.jsx)(b,{ccc:e},e.id)}))})]})}function b(e){var t=e.ccc;return Object(l.jsxs)("div",{children:[Object(l.jsx)("div",{children:t.user}),Object(l.jsx)("div",{children:t.text}),Object(l.jsx)("div",{children:t.comment_date})]})}function p(e){var t=e.post,n=e.detail;return console.log(t),Object(l.jsxs)("div",{className:"container my-5 w-50 border border-dark",children:[!1===n?Object(l.jsx)("header",{className:"h2",onClick:function(){window.location.href="/".concat(t.id)},children:t.title}):Object(l.jsx)("header",{className:"h2",children:t.title}),Object(l.jsxs)("div",{children:["\u041a\u0430\u0442\u0435\u0433\u043e\u0440\u0438\u044f: ",t.category]}),Object(l.jsx)("div",{className:"text-center",children:Object(l.jsx)("img",{src:t.image_url,height:"60%",width:"60%",alt:t.title})}),Object(l.jsx)(O,{post:t}),Object(l.jsx)("div",{children:!0===n?Object(l.jsx)("div",{children:"asdasd"}):""}),Object(l.jsxs)("footer",{children:[Object(l.jsxs)("div",{children:["\u0410\u0432\u0442\u043e\u0440: ",t.author]}),Object(l.jsxs)("div",{children:["\u0414\u0430\u0442\u0430 \u043f\u0443\u0431\u043b\u0438\u043a\u0430\u0446\u0438\u0438: ",t.pub_date]}),Object(l.jsxs)("div",{children:["\u041a\u043e\u043c\u043c\u0435\u043d\u0442\u0430\u0440\u0438\u0438: ",t.comments_quantity]})]}),Object(l.jsx)("div",{children:!0===n?Object(l.jsx)(j,{post:t},t.id):Object(l.jsx)("div",{children:t.comments_quantity})})]})}function O(e){var t=e.post,n=Object(s.useState)(t.upvotes),c=Object(i.a)(n,2),r=c[0],a=c[1],d=Object(s.useState)(t.downvotes),u=Object(i.a)(d,2),j=u[0],b=u[1],p=Object(s.useState)(t.rating),O=Object(i.a)(p,2),h=O[0],f=O[1],v=Object(s.useState)("UP"===t.vote),m=Object(i.a)(v,2),g=m[0],x=m[1],y=Object(s.useState)("DOWN"===t.vote),w=Object(i.a)(y,2),S=w[0],N=w[1],T=!1===g?"btn btn-outline-primary":"btn btn-primary",C=!1===S?"btn btn-outline-danger":"btn btn-danger";function E(e){var n=JSON.stringify({id:t.id,vote_type:e}),s=new XMLHttpRequest;s.responseType="json",s.open("POST","http://localhost:8000/api/post/rate/"),s.setRequestHeader("Content-Type","application/json"),"upvote"===e?(s.onload=function(e){200===s.status?(console.log(s.response,s.status,s.response.rating),x(!0),f(s.response.rating),a(s.response.upvotes),N(!1),b(s.response.downvotes)):console.log("sorry")},s.send(n)):"downvote"===e?(s.onload=function(e){200===s.status?(console.log(s.response,s.status,s.response.rating),N(!0),f(s.response.rating),a(s.response.upvotes),x(!1),b(s.response.downvotes)):console.log("sorry")},s.send(n)):"delupvote"===e?(s.onload=function(e){200===s.status?(console.log(s.response,s.status,s.response.rating),x(!1),f(s.response.rating),a(s.response.upvotes),b(s.response.downvotes)):console.log("sorry")},s.send(n)):"deldownvote"===e&&(s.onload=function(e){200===s.status?(console.log(s.response,s.status,s.response.rating),N(!1),f(s.response.rating),b(s.response.downvotes),a(s.response.upvotes)):console.log("sorry")},s.send(n))}return Object(l.jsxs)(o.a.Fragment,{children:[h,Object(l.jsxs)("button",{className:T,onClick:function(){return E(!1===g?"upvote":"delupvote")},children:[r," \u0410\u043f\u0432\u043e\u0443\u0442"]}),Object(l.jsxs)("button",{className:C,onClick:function(){return E(!1===S?"downvote":"deldownvote")},children:[j," \u0414\u0430\u0443\u043d\u0432\u043e\u0443\u0442"]})]})}function h(){var e=Object(s.useState)([]),t=Object(i.a)(e,2),n=t[0],o=t[1],c=window.location.pathname;return console.log(c),Object(s.useEffect)((function(){d("GET","http://localhost:8000/api/posts".concat(c),(function(e,t){o(e)}))}),[c]),Object(l.jsxs)(l.Fragment,{children:[Object(l.jsx)("button",{className:"btn btn-primary",onClick:function(){window.location.href="/"},children:"\u041d\u0430\u0437\u0430\u0434"}),Object(l.jsx)(p,{post:n,detail:!0},n.id)]})}var f=function(){return Object(l.jsx)("div",{className:"App",children:Object(l.jsx)(u,{})})},v=function(e){e&&e instanceof Function&&n.e(3).then(n.bind(null,15)).then((function(t){var n=t.getCLS,s=t.getFID,o=t.getFCP,c=t.getLCP,r=t.getTTFB;n(e),s(e),o(e),c(e),r(e)}))};r.a.render(Object(l.jsx)(o.a.StrictMode,{children:Object(l.jsx)(f,{})}),document.getElementById("root")),r.a.render(Object(l.jsx)(o.a.StrictMode,{children:Object(l.jsx)(h,{})}),document.getElementById("detail")),v()}},[[14,1,2]]]);
//# sourceMappingURL=main.cf3846d0.chunk.js.map