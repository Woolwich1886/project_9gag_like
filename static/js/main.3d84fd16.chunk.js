(this.webpackJsonpfrontend=this.webpackJsonpfrontend||[]).push([[0],{12:function(e,t,n){},14:function(e,t,n){"use strict";n.r(t);var s=n(1),o=n.n(s),r=n(6),c=n.n(r),a=(n(12),n(2)),i=n(0);function l(e){var t=e.post;return console.log(t.title),Object(i.jsxs)("div",{className:"container my-5 w-50 border border-dark",children:[Object(i.jsx)("header",{className:"h2",onClick:function(){window.location.href="http://localhost:8000/api/posts/".concat(t.id)},children:t.title}),Object(i.jsxs)("div",{children:["\u041a\u0430\u0442\u0435\u0433\u043e\u0440\u0438\u044f: ",t.category]}),Object(i.jsx)("div",{className:"text-center",children:Object(i.jsx)("img",{src:t.image_url,height:"60%",width:"60%",alt:t.title})}),Object(i.jsx)("div",{children:Object(i.jsx)(u,{post:t})}),Object(i.jsxs)("footer",{children:[Object(i.jsxs)("div",{children:["\u0410\u0432\u0442\u043e\u0440: ",t.author]}),Object(i.jsxs)("div",{children:["\u0414\u0430\u0442\u0430 \u043f\u0443\u0431\u043b\u0438\u043a\u0430\u0446\u0438\u0438: ",t.pub_date]})]})]})}function u(e){var t=e.post,n=Object(s.useState)(t.upvotes),o=Object(a.a)(n,2),r=o[0],c=o[1],l=Object(s.useState)(t.downvotes),u=Object(a.a)(l,2),p=u[0],d=u[1],j=Object(s.useState)(t.rating),b=Object(a.a)(j,2),v=b[0],O=b[1],g=Object(s.useState)("UP"===t.vote),f=Object(a.a)(g,2),h=f[0],x=f[1],m=Object(s.useState)("DOWN"===t.vote),w=Object(a.a)(m,2),y=w[0],S=w[1],N=!1===h?"btn btn-outline-primary":"btn btn-primary",C=!1===y?"btn btn-outline-danger":"btn btn-danger";function T(e){var n=JSON.stringify({id:t.id,vote_type:e}),s=new XMLHttpRequest;s.responseType="json",s.open("POST","http://localhost:8000/api/post/rate/"),s.setRequestHeader("Content-Type","application/json"),"upvote"===e?(s.onload=function(e){200===s.status?(console.log(s.response,s.status,s.response.rating),x(!0),O(s.response.rating),c(s.response.upvotes),S(!1),d(s.response.downvotes)):console.log("sorry")},s.send(n)):"downvote"===e?(s.onload=function(e){200===s.status?(console.log(s.response,s.status,s.response.rating),S(!0),O(s.response.rating),c(s.response.upvotes),x(!1),d(s.response.downvotes)):console.log("sorry")},s.send(n)):"delupvote"===e?(s.onload=function(e){200===s.status?(console.log(s.response,s.status,s.response.rating),x(!1),O(s.response.rating),c(s.response.upvotes),d(s.response.downvotes)):console.log("sorry")},s.send(n)):"deldownvote"===e&&(s.onload=function(e){200===s.status?(console.log(s.response,s.status,s.response.rating),S(!1),O(s.response.rating),d(s.response.downvotes),c(s.response.upvotes)):console.log("sorry")},s.send(n))}return Object(i.jsxs)("div",{children:[Object(i.jsx)("div",{}),v,Object(i.jsxs)("button",{className:N,onClick:function(){return T(!1===h?"upvote":"delupvote")},children:[r," \u0410\u043f\u0432\u043e\u0443\u0442"]}),Object(i.jsxs)("button",{className:C,onClick:function(){return T(!1===y?"downvote":"deldownvote")},children:[p," \u0414\u0430\u0443\u043d\u0432\u043e\u0443\u0442"]})]})}var p=n(7);function d(e,t,n,s){var o;s&&(o=JSON.stringify(s));var r=new XMLHttpRequest;r.responseType="json",r.open(e,t),r.setRequestHeader("Content-Type","application/json"),r.onload=function(){200===r.status?(console.log(r.response,r.status),n(r.response,r.status)):console.log("some error")},r.onerror=function(e){n({message:"Error"},400)},r.send(o)}function j(){var e=Object(s.useState)([]),t=Object(a.a)(e,2),n=t[0],r=t[1],c=Object(s.useState)(null),u=Object(a.a)(c,2),j=u[0],b=u[1];return Object(s.useEffect)((function(){d("GET","http://localhost:8000/api/posts",(function(e,t){b(e.next),r(e.results)}))}),[]),Object(i.jsxs)(o.a.Fragment,{children:[n.map((function(e){return Object(i.jsx)(l,{post:e},e.id)})),null!==j&&Object(i.jsx)("button",{className:"btn btn-primary",onClick:function(){if(null!==j){d("GET",j,(function(e,t){if(200===t){b(e.next);var s=Object(p.a)(n).concat(e.results);r(s)}else alert("\u041e\u0448\u0438\u0431\u043a\u0430 \u043f\u0440\u0438 \u0437\u0430\u0433\u0440\u0443\u0437\u043a\u0435")}))}},children:"\u0417\u0430\u0433\u0440\u0443\u0437\u0438\u0442\u044c \u0435\u0449\u0435"})]})}var b=function(){return Object(i.jsx)("div",{className:"App",children:Object(i.jsx)(j,{})})},v=function(e){e&&e instanceof Function&&n.e(3).then(n.bind(null,15)).then((function(t){var n=t.getCLS,s=t.getFID,o=t.getFCP,r=t.getLCP,c=t.getTTFB;n(e),s(e),o(e),r(e),c(e)}))};c.a.render(Object(i.jsx)(o.a.StrictMode,{children:Object(i.jsx)(b,{})}),document.getElementById("root")),v()}},[[14,1,2]]]);
//# sourceMappingURL=main.3d84fd16.chunk.js.map