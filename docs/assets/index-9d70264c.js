import{f as wt,g as M,j as Mt,o as U,a as H,d as _,w as B,m as Pt,r as S,e as v,t as k,Q as Gt,I as L,c as tt,B as bt,N as lt,_ as Qt,u as Wt,k as Zt,F as vt,b as At,l as Xt,i as It}from"./index-93eae3cd.js";import{b as xt,c as te,d as ee,p as ne,e as oe,f as re,h as ie}from"./index-7754b825.js";var W={},se=function(){return typeof Promise=="function"&&Promise.prototype&&Promise.prototype.then},Rt={},P={};let yt;const le=[0,26,44,70,100,134,172,196,242,292,346,404,466,532,581,655,733,815,901,991,1085,1156,1258,1364,1474,1588,1706,1828,1921,2051,2185,2323,2465,2611,2761,2876,3034,3196,3362,3532,3706];P.getSymbolSize=function(t){if(!t)throw new Error('"version" cannot be null or undefined');if(t<1||t>40)throw new Error('"version" should be in range from 1 to 40');return t*4+17};P.getSymbolTotalCodewords=function(t){return le[t]};P.getBCHDigit=function(e){let t=0;for(;e!==0;)t++,e>>>=1;return t};P.setToSJISFunction=function(t){if(typeof t!="function")throw new Error('"toSJISFunc" is not a valid function.');yt=t};P.isKanjiModeEnabled=function(){return typeof yt<"u"};P.toSJIS=function(t){return yt(t)};var ot={};(function(e){e.L={bit:1},e.M={bit:0},e.Q={bit:3},e.H={bit:2};function t(i){if(typeof i!="string")throw new Error("Param is not a string");switch(i.toLowerCase()){case"l":case"low":return e.L;case"m":case"medium":return e.M;case"q":case"quartile":return e.Q;case"h":case"high":return e.H;default:throw new Error("Unknown EC Level: "+i)}}e.isValid=function(o){return o&&typeof o.bit<"u"&&o.bit>=0&&o.bit<4},e.from=function(o,n){if(e.isValid(o))return o;try{return t(o)}catch{return n}}})(ot);function Lt(){this.buffer=[],this.length=0}Lt.prototype={get:function(e){const t=Math.floor(e/8);return(this.buffer[t]>>>7-e%8&1)===1},put:function(e,t){for(let i=0;i<t;i++)this.putBit((e>>>t-i-1&1)===1)},getLengthInBits:function(){return this.length},putBit:function(e){const t=Math.floor(this.length/8);this.buffer.length<=t&&this.buffer.push(0),e&&(this.buffer[t]|=128>>>this.length%8),this.length++}};var ae=Lt;function Z(e){if(!e||e<1)throw new Error("BitMatrix size must be defined and greater than 0");this.size=e,this.data=new Uint8Array(e*e),this.reservedBit=new Uint8Array(e*e)}Z.prototype.set=function(e,t,i,o){const n=e*this.size+t;this.data[n]=i,o&&(this.reservedBit[n]=!0)};Z.prototype.get=function(e,t){return this.data[e*this.size+t]};Z.prototype.xor=function(e,t,i){this.data[e*this.size+t]^=i};Z.prototype.isReserved=function(e,t){return this.reservedBit[e*this.size+t]};var ue=Z,Ut={};(function(e){const t=P.getSymbolSize;e.getRowColCoords=function(o){if(o===1)return[];const n=Math.floor(o/7)+2,r=t(o),s=r===145?26:Math.ceil((r-13)/(2*n-2))*2,a=[r-7];for(let l=1;l<n-1;l++)a[l]=a[l-1]-s;return a.push(6),a.reverse()},e.getPositions=function(o){const n=[],r=e.getRowColCoords(o),s=r.length;for(let a=0;a<s;a++)for(let l=0;l<s;l++)a===0&&l===0||a===0&&l===s-1||a===s-1&&l===0||n.push([r[a],r[l]]);return n}})(Ut);var Dt={};const ce=P.getSymbolSize,Nt=7;Dt.getPositions=function(t){const i=ce(t);return[[0,0],[i-Nt,0],[0,i-Nt]]};var kt={};(function(e){e.Patterns={PATTERN000:0,PATTERN001:1,PATTERN010:2,PATTERN011:3,PATTERN100:4,PATTERN101:5,PATTERN110:6,PATTERN111:7};const t={N1:3,N2:3,N3:40,N4:10};e.isValid=function(n){return n!=null&&n!==""&&!isNaN(n)&&n>=0&&n<=7},e.from=function(n){return e.isValid(n)?parseInt(n,10):void 0},e.getPenaltyN1=function(n){const r=n.size;let s=0,a=0,l=0,d=null,c=null;for(let C=0;C<r;C++){a=l=0,d=c=null;for(let u=0;u<r;u++){let m=n.get(C,u);m===d?a++:(a>=5&&(s+=t.N1+(a-5)),d=m,a=1),m=n.get(u,C),m===c?l++:(l>=5&&(s+=t.N1+(l-5)),c=m,l=1)}a>=5&&(s+=t.N1+(a-5)),l>=5&&(s+=t.N1+(l-5))}return s},e.getPenaltyN2=function(n){const r=n.size;let s=0;for(let a=0;a<r-1;a++)for(let l=0;l<r-1;l++){const d=n.get(a,l)+n.get(a,l+1)+n.get(a+1,l)+n.get(a+1,l+1);(d===4||d===0)&&s++}return s*t.N2},e.getPenaltyN3=function(n){const r=n.size;let s=0,a=0,l=0;for(let d=0;d<r;d++){a=l=0;for(let c=0;c<r;c++)a=a<<1&2047|n.get(d,c),c>=10&&(a===1488||a===93)&&s++,l=l<<1&2047|n.get(c,d),c>=10&&(l===1488||l===93)&&s++}return s*t.N3},e.getPenaltyN4=function(n){let r=0;const s=n.data.length;for(let l=0;l<s;l++)r+=n.data[l];return Math.abs(Math.ceil(r*100/s/5)-10)*t.N4};function i(o,n,r){switch(o){case e.Patterns.PATTERN000:return(n+r)%2===0;case e.Patterns.PATTERN001:return n%2===0;case e.Patterns.PATTERN010:return r%3===0;case e.Patterns.PATTERN011:return(n+r)%3===0;case e.Patterns.PATTERN100:return(Math.floor(n/2)+Math.floor(r/3))%2===0;case e.Patterns.PATTERN101:return n*r%2+n*r%3===0;case e.Patterns.PATTERN110:return(n*r%2+n*r%3)%2===0;case e.Patterns.PATTERN111:return(n*r%3+(n+r)%2)%2===0;default:throw new Error("bad maskPattern:"+o)}}e.applyMask=function(n,r){const s=r.size;for(let a=0;a<s;a++)for(let l=0;l<s;l++)r.isReserved(l,a)||r.xor(l,a,i(n,l,a))},e.getBestMask=function(n,r){const s=Object.keys(e.Patterns).length;let a=0,l=1/0;for(let d=0;d<s;d++){r(d),e.applyMask(d,n);const c=e.getPenaltyN1(n)+e.getPenaltyN2(n)+e.getPenaltyN3(n)+e.getPenaltyN4(n);e.applyMask(d,n),c<l&&(l=c,a=d)}return a}})(kt);var rt={};const V=ot,X=[1,1,1,1,1,1,1,1,1,1,2,2,1,2,2,4,1,2,4,4,2,4,4,4,2,4,6,5,2,4,6,6,2,5,8,8,4,5,8,8,4,5,8,11,4,8,10,11,4,9,12,16,4,9,16,16,6,10,12,18,6,10,17,16,6,11,16,19,6,13,18,21,7,14,21,25,8,16,20,25,8,17,23,25,9,17,23,34,9,18,25,30,10,20,27,32,12,21,29,35,12,23,34,37,12,25,34,40,13,26,35,42,14,28,38,45,15,29,40,48,16,31,43,51,17,33,45,54,18,35,48,57,19,37,51,60,19,38,53,63,20,40,56,66,21,43,59,70,22,45,62,74,24,47,65,77,25,49,68,81],x=[7,10,13,17,10,16,22,28,15,26,36,44,20,36,52,64,26,48,72,88,36,64,96,112,40,72,108,130,48,88,132,156,60,110,160,192,72,130,192,224,80,150,224,264,96,176,260,308,104,198,288,352,120,216,320,384,132,240,360,432,144,280,408,480,168,308,448,532,180,338,504,588,196,364,546,650,224,416,600,700,224,442,644,750,252,476,690,816,270,504,750,900,300,560,810,960,312,588,870,1050,336,644,952,1110,360,700,1020,1200,390,728,1050,1260,420,784,1140,1350,450,812,1200,1440,480,868,1290,1530,510,924,1350,1620,540,980,1440,1710,570,1036,1530,1800,570,1064,1590,1890,600,1120,1680,1980,630,1204,1770,2100,660,1260,1860,2220,720,1316,1950,2310,750,1372,2040,2430];rt.getBlocksCount=function(t,i){switch(i){case V.L:return X[(t-1)*4+0];case V.M:return X[(t-1)*4+1];case V.Q:return X[(t-1)*4+2];case V.H:return X[(t-1)*4+3];default:return}};rt.getTotalCodewordsCount=function(t,i){switch(i){case V.L:return x[(t-1)*4+0];case V.M:return x[(t-1)*4+1];case V.Q:return x[(t-1)*4+2];case V.H:return x[(t-1)*4+3];default:return}};var Ft={},it={};const G=new Uint8Array(512),et=new Uint8Array(256);(function(){let t=1;for(let i=0;i<255;i++)G[i]=t,et[t]=i,t<<=1,t&256&&(t^=285);for(let i=255;i<512;i++)G[i]=G[i-255]})();it.log=function(t){if(t<1)throw new Error("log("+t+")");return et[t]};it.exp=function(t){return G[t]};it.mul=function(t,i){return t===0||i===0?0:G[et[t]+et[i]]};(function(e){const t=it;e.mul=function(o,n){const r=new Uint8Array(o.length+n.length-1);for(let s=0;s<o.length;s++)for(let a=0;a<n.length;a++)r[s+a]^=t.mul(o[s],n[a]);return r},e.mod=function(o,n){let r=new Uint8Array(o);for(;r.length-n.length>=0;){const s=r[0];for(let l=0;l<n.length;l++)r[l]^=t.mul(n[l],s);let a=0;for(;a<r.length&&r[a]===0;)a++;r=r.slice(a)}return r},e.generateECPolynomial=function(o){let n=new Uint8Array([1]);for(let r=0;r<o;r++)n=e.mul(n,new Uint8Array([1,t.exp(r)]));return n}})(Ft);const zt=Ft;function Ct(e){this.genPoly=void 0,this.degree=e,this.degree&&this.initialize(this.degree)}Ct.prototype.initialize=function(t){this.degree=t,this.genPoly=zt.generateECPolynomial(this.degree)};Ct.prototype.encode=function(t){if(!this.genPoly)throw new Error("Encoder not initialized");const i=new Uint8Array(t.length+this.degree);i.set(t);const o=zt.mod(i,this.genPoly),n=this.degree-o.length;if(n>0){const r=new Uint8Array(this.degree);return r.set(o,n),r}return o};var de=Ct,Vt={},K={},_t={};_t.isValid=function(t){return!isNaN(t)&&t>=1&&t<=40};var z={};const Ht="[0-9]+",fe="[A-Z $%*+\\-./:]+";let Q="(?:[u3000-u303F]|[u3040-u309F]|[u30A0-u30FF]|[uFF00-uFFEF]|[u4E00-u9FAF]|[u2605-u2606]|[u2190-u2195]|u203B|[u2010u2015u2018u2019u2025u2026u201Cu201Du2225u2260]|[u0391-u0451]|[u00A7u00A8u00B1u00B4u00D7u00F7])+";Q=Q.replace(/u/g,"\\u");const ge="(?:(?![A-Z0-9 $%*+\\-./:]|"+Q+`)(?:.|[\r
]))+`;z.KANJI=new RegExp(Q,"g");z.BYTE_KANJI=new RegExp("[^A-Z0-9 $%*+\\-./:]+","g");z.BYTE=new RegExp(ge,"g");z.NUMERIC=new RegExp(Ht,"g");z.ALPHANUMERIC=new RegExp(fe,"g");const he=new RegExp("^"+Q+"$"),me=new RegExp("^"+Ht+"$"),pe=new RegExp("^[A-Z0-9 $%*+\\-./:]+$");z.testKanji=function(t){return he.test(t)};z.testNumeric=function(t){return me.test(t)};z.testAlphanumeric=function(t){return pe.test(t)};(function(e){const t=_t,i=z;e.NUMERIC={id:"Numeric",bit:1,ccBits:[10,12,14]},e.ALPHANUMERIC={id:"Alphanumeric",bit:2,ccBits:[9,11,13]},e.BYTE={id:"Byte",bit:4,ccBits:[8,16,16]},e.KANJI={id:"Kanji",bit:8,ccBits:[8,10,12]},e.MIXED={bit:-1},e.getCharCountIndicator=function(r,s){if(!r.ccBits)throw new Error("Invalid mode: "+r);if(!t.isValid(s))throw new Error("Invalid version: "+s);return s>=1&&s<10?r.ccBits[0]:s<27?r.ccBits[1]:r.ccBits[2]},e.getBestModeForData=function(r){return i.testNumeric(r)?e.NUMERIC:i.testAlphanumeric(r)?e.ALPHANUMERIC:i.testKanji(r)?e.KANJI:e.BYTE},e.toString=function(r){if(r&&r.id)return r.id;throw new Error("Invalid mode")},e.isValid=function(r){return r&&r.bit&&r.ccBits};function o(n){if(typeof n!="string")throw new Error("Param is not a string");switch(n.toLowerCase()){case"numeric":return e.NUMERIC;case"alphanumeric":return e.ALPHANUMERIC;case"kanji":return e.KANJI;case"byte":return e.BYTE;default:throw new Error("Unknown mode: "+n)}}e.from=function(r,s){if(e.isValid(r))return r;try{return o(r)}catch{return s}}})(K);(function(e){const t=P,i=rt,o=ot,n=K,r=_t,s=7973,a=t.getBCHDigit(s);function l(u,m,p){for(let y=1;y<=40;y++)if(m<=e.getCapacity(y,p,u))return y}function d(u,m){return n.getCharCountIndicator(u,m)+4}function c(u,m){let p=0;return u.forEach(function(y){const A=d(y.mode,m);p+=A+y.getBitsLength()}),p}function C(u,m){for(let p=1;p<=40;p++)if(c(u,p)<=e.getCapacity(p,m,n.MIXED))return p}e.from=function(m,p){return r.isValid(m)?parseInt(m,10):p},e.getCapacity=function(m,p,y){if(!r.isValid(m))throw new Error("Invalid QR Code version");typeof y>"u"&&(y=n.BYTE);const A=t.getSymbolTotalCodewords(m),w=i.getTotalCodewordsCount(m,p),g=(A-w)*8;if(y===n.MIXED)return g;const f=g-d(y,m);switch(y){case n.NUMERIC:return Math.floor(f/10*3);case n.ALPHANUMERIC:return Math.floor(f/11*2);case n.KANJI:return Math.floor(f/13);case n.BYTE:default:return Math.floor(f/8)}},e.getBestVersionForData=function(m,p){let y;const A=o.from(p,o.M);if(Array.isArray(m)){if(m.length>1)return C(m,A);if(m.length===0)return 1;y=m[0]}else y=m;return l(y.mode,y.getLength(),A)},e.getEncodedBits=function(m){if(!r.isValid(m)||m<7)throw new Error("Invalid QR Code version");let p=m<<12;for(;t.getBCHDigit(p)-a>=0;)p^=s<<t.getBCHDigit(p)-a;return m<<12|p}})(Vt);var Kt={};const gt=P,Ot=1335,we=21522,Tt=gt.getBCHDigit(Ot);Kt.getEncodedBits=function(t,i){const o=t.bit<<3|i;let n=o<<10;for(;gt.getBCHDigit(n)-Tt>=0;)n^=Ot<<gt.getBCHDigit(n)-Tt;return(o<<10|n)^we};var $t={};const ye=K;function $(e){this.mode=ye.NUMERIC,this.data=e.toString()}$.getBitsLength=function(t){return 10*Math.floor(t/3)+(t%3?t%3*3+1:0)};$.prototype.getLength=function(){return this.data.length};$.prototype.getBitsLength=function(){return $.getBitsLength(this.data.length)};$.prototype.write=function(t){let i,o,n;for(i=0;i+3<=this.data.length;i+=3)o=this.data.substr(i,3),n=parseInt(o,10),t.put(n,10);const r=this.data.length-i;r>0&&(o=this.data.substr(i),n=parseInt(o,10),t.put(n,r*3+1))};var Ce=$;const _e=K,at=["0","1","2","3","4","5","6","7","8","9","A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z"," ","$","%","*","+","-",".","/",":"];function J(e){this.mode=_e.ALPHANUMERIC,this.data=e}J.getBitsLength=function(t){return 11*Math.floor(t/2)+6*(t%2)};J.prototype.getLength=function(){return this.data.length};J.prototype.getBitsLength=function(){return J.getBitsLength(this.data.length)};J.prototype.write=function(t){let i;for(i=0;i+2<=this.data.length;i+=2){let o=at.indexOf(this.data[i])*45;o+=at.indexOf(this.data[i+1]),t.put(o,11)}this.data.length%2&&t.put(at.indexOf(this.data[i]),6)};var Ee=J;const Be=K;function Y(e){this.mode=Be.BYTE,typeof e=="string"?this.data=new TextEncoder().encode(e):this.data=new Uint8Array(e)}Y.getBitsLength=function(t){return t*8};Y.prototype.getLength=function(){return this.data.length};Y.prototype.getBitsLength=function(){return Y.getBitsLength(this.data.length)};Y.prototype.write=function(e){for(let t=0,i=this.data.length;t<i;t++)e.put(this.data[t],8)};var be=Y;const ve=K,Ae=P;function j(e){this.mode=ve.KANJI,this.data=e}j.getBitsLength=function(t){return t*13};j.prototype.getLength=function(){return this.data.length};j.prototype.getBitsLength=function(){return j.getBitsLength(this.data.length)};j.prototype.write=function(e){let t;for(t=0;t<this.data.length;t++){let i=Ae.toSJIS(this.data[t]);if(i>=33088&&i<=40956)i-=33088;else if(i>=57408&&i<=60351)i-=49472;else throw new Error("Invalid SJIS character: "+this.data[t]+`
Make sure your charset is UTF-8`);i=(i>>>8&255)*192+(i&255),e.put(i,13)}};var Ie=j,Jt={exports:{}};(function(e){var t={single_source_shortest_paths:function(i,o,n){var r={},s={};s[o]=0;var a=t.PriorityQueue.make();a.push(o,0);for(var l,d,c,C,u,m,p,y,A;!a.empty();){l=a.pop(),d=l.value,C=l.cost,u=i[d]||{};for(c in u)u.hasOwnProperty(c)&&(m=u[c],p=C+m,y=s[c],A=typeof s[c]>"u",(A||y>p)&&(s[c]=p,a.push(c,p),r[c]=d))}if(typeof n<"u"&&typeof s[n]>"u"){var w=["Could not find a path from ",o," to ",n,"."].join("");throw new Error(w)}return r},extract_shortest_path_from_predecessor_list:function(i,o){for(var n=[],r=o;r;)n.push(r),i[r],r=i[r];return n.reverse(),n},find_path:function(i,o,n){var r=t.single_source_shortest_paths(i,o,n);return t.extract_shortest_path_from_predecessor_list(r,n)},PriorityQueue:{make:function(i){var o=t.PriorityQueue,n={},r;i=i||{};for(r in o)o.hasOwnProperty(r)&&(n[r]=o[r]);return n.queue=[],n.sorter=i.sorter||o.default_sorter,n},default_sorter:function(i,o){return i.cost-o.cost},push:function(i,o){var n={value:i,cost:o};this.queue.push(n),this.queue.sort(this.sorter)},pop:function(){return this.queue.shift()},empty:function(){return this.queue.length===0}}};e.exports=t})(Jt);var Ne=Jt.exports;(function(e){const t=K,i=Ce,o=Ee,n=be,r=Ie,s=z,a=P,l=Ne;function d(w){return unescape(encodeURIComponent(w)).length}function c(w,g,f){const h=[];let E;for(;(E=w.exec(f))!==null;)h.push({data:E[0],index:E.index,mode:g,length:E[0].length});return h}function C(w){const g=c(s.NUMERIC,t.NUMERIC,w),f=c(s.ALPHANUMERIC,t.ALPHANUMERIC,w);let h,E;return a.isKanjiModeEnabled()?(h=c(s.BYTE,t.BYTE,w),E=c(s.KANJI,t.KANJI,w)):(h=c(s.BYTE_KANJI,t.BYTE,w),E=[]),g.concat(f,h,E).sort(function(I,N){return I.index-N.index}).map(function(I){return{data:I.data,mode:I.mode,length:I.length}})}function u(w,g){switch(g){case t.NUMERIC:return i.getBitsLength(w);case t.ALPHANUMERIC:return o.getBitsLength(w);case t.KANJI:return r.getBitsLength(w);case t.BYTE:return n.getBitsLength(w)}}function m(w){return w.reduce(function(g,f){const h=g.length-1>=0?g[g.length-1]:null;return h&&h.mode===f.mode?(g[g.length-1].data+=f.data,g):(g.push(f),g)},[])}function p(w){const g=[];for(let f=0;f<w.length;f++){const h=w[f];switch(h.mode){case t.NUMERIC:g.push([h,{data:h.data,mode:t.ALPHANUMERIC,length:h.length},{data:h.data,mode:t.BYTE,length:h.length}]);break;case t.ALPHANUMERIC:g.push([h,{data:h.data,mode:t.BYTE,length:h.length}]);break;case t.KANJI:g.push([h,{data:h.data,mode:t.BYTE,length:d(h.data)}]);break;case t.BYTE:g.push([{data:h.data,mode:t.BYTE,length:d(h.data)}])}}return g}function y(w,g){const f={},h={start:{}};let E=["start"];for(let b=0;b<w.length;b++){const I=w[b],N=[];for(let F=0;F<I.length;F++){const R=I[F],O=""+b+F;N.push(O),f[O]={node:R,lastCount:0},h[O]={};for(let q=0;q<E.length;q++){const D=E[q];f[D]&&f[D].node.mode===R.mode?(h[D][O]=u(f[D].lastCount+R.length,R.mode)-u(f[D].lastCount,R.mode),f[D].lastCount+=R.length):(f[D]&&(f[D].lastCount=R.length),h[D][O]=u(R.length,R.mode)+4+t.getCharCountIndicator(R.mode,g))}}E=N}for(let b=0;b<E.length;b++)h[E[b]].end=0;return{map:h,table:f}}function A(w,g){let f;const h=t.getBestModeForData(w);if(f=t.from(g,h),f!==t.BYTE&&f.bit<h.bit)throw new Error('"'+w+'" cannot be encoded with mode '+t.toString(f)+`.
 Suggested mode is: `+t.toString(h));switch(f===t.KANJI&&!a.isKanjiModeEnabled()&&(f=t.BYTE),f){case t.NUMERIC:return new i(w);case t.ALPHANUMERIC:return new o(w);case t.KANJI:return new r(w);case t.BYTE:return new n(w)}}e.fromArray=function(g){return g.reduce(function(f,h){return typeof h=="string"?f.push(A(h,null)):h.data&&f.push(A(h.data,h.mode)),f},[])},e.fromString=function(g,f){const h=C(g,a.isKanjiModeEnabled()),E=p(h),b=y(E,f),I=l.find_path(b.map,"start","end"),N=[];for(let F=1;F<I.length-1;F++)N.push(b.table[I[F]].node);return e.fromArray(m(N))},e.rawSplit=function(g){return e.fromArray(C(g,a.isKanjiModeEnabled()))}})($t);const st=P,ut=ot,Te=ae,Se=ue,Me=Ut,Pe=Dt,ht=kt,mt=rt,Re=de,nt=Vt,Le=Kt,Ue=K,ct=$t;function De(e,t){const i=e.size,o=Pe.getPositions(t);for(let n=0;n<o.length;n++){const r=o[n][0],s=o[n][1];for(let a=-1;a<=7;a++)if(!(r+a<=-1||i<=r+a))for(let l=-1;l<=7;l++)s+l<=-1||i<=s+l||(a>=0&&a<=6&&(l===0||l===6)||l>=0&&l<=6&&(a===0||a===6)||a>=2&&a<=4&&l>=2&&l<=4?e.set(r+a,s+l,!0,!0):e.set(r+a,s+l,!1,!0))}}function ke(e){const t=e.size;for(let i=8;i<t-8;i++){const o=i%2===0;e.set(i,6,o,!0),e.set(6,i,o,!0)}}function Fe(e,t){const i=Me.getPositions(t);for(let o=0;o<i.length;o++){const n=i[o][0],r=i[o][1];for(let s=-2;s<=2;s++)for(let a=-2;a<=2;a++)s===-2||s===2||a===-2||a===2||s===0&&a===0?e.set(n+s,r+a,!0,!0):e.set(n+s,r+a,!1,!0)}}function ze(e,t){const i=e.size,o=nt.getEncodedBits(t);let n,r,s;for(let a=0;a<18;a++)n=Math.floor(a/3),r=a%3+i-8-3,s=(o>>a&1)===1,e.set(n,r,s,!0),e.set(r,n,s,!0)}function dt(e,t,i){const o=e.size,n=Le.getEncodedBits(t,i);let r,s;for(r=0;r<15;r++)s=(n>>r&1)===1,r<6?e.set(r,8,s,!0):r<8?e.set(r+1,8,s,!0):e.set(o-15+r,8,s,!0),r<8?e.set(8,o-r-1,s,!0):r<9?e.set(8,15-r-1+1,s,!0):e.set(8,15-r-1,s,!0);e.set(o-8,8,1,!0)}function Ve(e,t){const i=e.size;let o=-1,n=i-1,r=7,s=0;for(let a=i-1;a>0;a-=2)for(a===6&&a--;;){for(let l=0;l<2;l++)if(!e.isReserved(n,a-l)){let d=!1;s<t.length&&(d=(t[s]>>>r&1)===1),e.set(n,a-l,d),r--,r===-1&&(s++,r=7)}if(n+=o,n<0||i<=n){n-=o,o=-o;break}}}function He(e,t,i){const o=new Te;i.forEach(function(l){o.put(l.mode.bit,4),o.put(l.getLength(),Ue.getCharCountIndicator(l.mode,e)),l.write(o)});const n=st.getSymbolTotalCodewords(e),r=mt.getTotalCodewordsCount(e,t),s=(n-r)*8;for(o.getLengthInBits()+4<=s&&o.put(0,4);o.getLengthInBits()%8!==0;)o.putBit(0);const a=(s-o.getLengthInBits())/8;for(let l=0;l<a;l++)o.put(l%2?17:236,8);return Ke(o,e,t)}function Ke(e,t,i){const o=st.getSymbolTotalCodewords(t),n=mt.getTotalCodewordsCount(t,i),r=o-n,s=mt.getBlocksCount(t,i),a=o%s,l=s-a,d=Math.floor(o/s),c=Math.floor(r/s),C=c+1,u=d-c,m=new Re(u);let p=0;const y=new Array(s),A=new Array(s);let w=0;const g=new Uint8Array(e.buffer);for(let I=0;I<s;I++){const N=I<l?c:C;y[I]=g.slice(p,p+N),A[I]=m.encode(y[I]),p+=N,w=Math.max(w,N)}const f=new Uint8Array(o);let h=0,E,b;for(E=0;E<w;E++)for(b=0;b<s;b++)E<y[b].length&&(f[h++]=y[b][E]);for(E=0;E<u;E++)for(b=0;b<s;b++)f[h++]=A[b][E];return f}function Oe(e,t,i,o){let n;if(Array.isArray(e))n=ct.fromArray(e);else if(typeof e=="string"){let d=t;if(!d){const c=ct.rawSplit(e);d=nt.getBestVersionForData(c,i)}n=ct.fromString(e,d||40)}else throw new Error("Invalid data");const r=nt.getBestVersionForData(n,i);if(!r)throw new Error("The amount of data is too big to be stored in a QR Code");if(!t)t=r;else if(t<r)throw new Error(`
The chosen QR Code version cannot contain this amount of data.
Minimum version required to store current data is: `+r+`.
`);const s=He(t,i,n),a=st.getSymbolSize(t),l=new Se(a);return De(l,t),ke(l),Fe(l,t),dt(l,i,0),t>=7&&ze(l,t),Ve(l,s),isNaN(o)&&(o=ht.getBestMask(l,dt.bind(null,l,i))),ht.applyMask(o,l),dt(l,i,o),{modules:l,version:t,errorCorrectionLevel:i,maskPattern:o,segments:n}}Rt.create=function(t,i){if(typeof t>"u"||t==="")throw new Error("No input text");let o=ut.M,n,r;return typeof i<"u"&&(o=ut.from(i.errorCorrectionLevel,ut.M),n=nt.from(i.version),r=ht.from(i.maskPattern),i.toSJISFunc&&st.setToSJISFunction(i.toSJISFunc)),Oe(t,n,o,r)};var Yt={},Et={};(function(e){function t(i){if(typeof i=="number"&&(i=i.toString()),typeof i!="string")throw new Error("Color should be defined as hex string");let o=i.slice().replace("#","").split("");if(o.length<3||o.length===5||o.length>8)throw new Error("Invalid hex color: "+i);(o.length===3||o.length===4)&&(o=Array.prototype.concat.apply([],o.map(function(r){return[r,r]}))),o.length===6&&o.push("F","F");const n=parseInt(o.join(""),16);return{r:n>>24&255,g:n>>16&255,b:n>>8&255,a:n&255,hex:"#"+o.slice(0,6).join("")}}e.getOptions=function(o){o||(o={}),o.color||(o.color={});const n=typeof o.margin>"u"||o.margin===null||o.margin<0?4:o.margin,r=o.width&&o.width>=21?o.width:void 0,s=o.scale||4;return{width:r,scale:r?4:s,margin:n,color:{dark:t(o.color.dark||"#000000ff"),light:t(o.color.light||"#ffffffff")},type:o.type,rendererOpts:o.rendererOpts||{}}},e.getScale=function(o,n){return n.width&&n.width>=o+n.margin*2?n.width/(o+n.margin*2):n.scale},e.getImageWidth=function(o,n){const r=e.getScale(o,n);return Math.floor((o+n.margin*2)*r)},e.qrToImageData=function(o,n,r){const s=n.modules.size,a=n.modules.data,l=e.getScale(s,r),d=Math.floor((s+r.margin*2)*l),c=r.margin*l,C=[r.color.light,r.color.dark];for(let u=0;u<d;u++)for(let m=0;m<d;m++){let p=(u*d+m)*4,y=r.color.light;if(u>=c&&m>=c&&u<d-c&&m<d-c){const A=Math.floor((u-c)/l),w=Math.floor((m-c)/l);y=C[a[A*s+w]?1:0]}o[p++]=y.r,o[p++]=y.g,o[p++]=y.b,o[p]=y.a}}})(Et);(function(e){const t=Et;function i(n,r,s){n.clearRect(0,0,r.width,r.height),r.style||(r.style={}),r.height=s,r.width=s,r.style.height=s+"px",r.style.width=s+"px"}function o(){try{return document.createElement("canvas")}catch{throw new Error("You need to specify a canvas element")}}e.render=function(r,s,a){let l=a,d=s;typeof l>"u"&&(!s||!s.getContext)&&(l=s,s=void 0),s||(d=o()),l=t.getOptions(l);const c=t.getImageWidth(r.modules.size,l),C=d.getContext("2d"),u=C.createImageData(c,c);return t.qrToImageData(u.data,r,l),i(C,d,c),C.putImageData(u,0,0),d},e.renderToDataURL=function(r,s,a){let l=a;typeof l>"u"&&(!s||!s.getContext)&&(l=s,s=void 0),l||(l={});const d=e.render(r,s,l),c=l.type||"image/png",C=l.rendererOpts||{};return d.toDataURL(c,C.quality)}})(Yt);var jt={};const $e=Et;function St(e,t){const i=e.a/255,o=t+'="'+e.hex+'"';return i<1?o+" "+t+'-opacity="'+i.toFixed(2).slice(1)+'"':o}function ft(e,t,i){let o=e+t;return typeof i<"u"&&(o+=" "+i),o}function Je(e,t,i){let o="",n=0,r=!1,s=0;for(let a=0;a<e.length;a++){const l=Math.floor(a%t),d=Math.floor(a/t);!l&&!r&&(r=!0),e[a]?(s++,a>0&&l>0&&e[a-1]||(o+=r?ft("M",l+i,.5+d+i):ft("m",n,0),n=0,r=!1),l+1<t&&e[a+1]||(o+=ft("h",s),s=0)):n++}return o}jt.render=function(t,i,o){const n=$e.getOptions(i),r=t.modules.size,s=t.modules.data,a=r+n.margin*2,l=n.color.light.a?"<path "+St(n.color.light,"fill")+' d="M0 0h'+a+"v"+a+'H0z"/>':"",d="<path "+St(n.color.dark,"stroke")+' d="'+Je(s,r,n.margin)+'"/>',c='viewBox="0 0 '+a+" "+a+'"',u='<svg xmlns="http://www.w3.org/2000/svg" '+(n.width?'width="'+n.width+'" height="'+n.width+'" ':"")+c+' shape-rendering="crispEdges">'+l+d+`</svg>
`;return typeof o=="function"&&o(null,u),u};const Ye=se,pt=Rt,qt=Yt,je=jt;function Bt(e,t,i,o,n){const r=[].slice.call(arguments,1),s=r.length,a=typeof r[s-1]=="function";if(!a&&!Ye())throw new Error("Callback required as last argument");if(a){if(s<2)throw new Error("Too few arguments provided");s===2?(n=i,i=t,t=o=void 0):s===3&&(t.getContext&&typeof n>"u"?(n=o,o=void 0):(n=o,o=i,i=t,t=void 0))}else{if(s<1)throw new Error("Too few arguments provided");return s===1?(i=t,t=o=void 0):s===2&&!t.getContext&&(o=i,i=t,t=void 0),new Promise(function(l,d){try{const c=pt.create(i,o);l(e(c,t,o))}catch(c){d(c)}})}try{const l=pt.create(i,o);n(null,e(l,t,o))}catch(l){n(l)}}W.create=pt.create;W.toCanvas=Bt.bind(null,qt.render);W.toDataURL=Bt.bind(null,qt.renderToDataURL);W.toString=Bt.bind(null,function(e,t,i){return je.render(e,i)});const qe={class:"detail"},Ge={class:"top"},Qe={class:"tag"},We={class:"bottom"},Ze={class:"left"},Xe={key:0,class:"btn"},xe={class:"right"},tn={class:"qrcode"},en=["src"],nn=wt({__name:"index",setup(e){const t=Pt(),i=M({}),o=async()=>{const C=await xt(t.query.orderId);i.value=C.data};Mt(()=>o());const n=async()=>{const C=await te(t.query.orderId);C.code===200?(lt.success(C.message),o()):lt.error(C.message)},r=M(!1),s=M({}),a=M(""),l=M(null),d=async()=>{r.value=!0;const C=await ee(t.query.orderId);C.code===200&&(s.value=C.data,a.value=await W.toDataURL(C.data.codeUrl),l.value=setInterval(()=>{ne(t.query.orderId).then(u=>{u.data&&(r.value=!1,lt.success("支付成功"),clearInterval(l.value),o())})},2e3))},c=()=>{r.value=!1,clearInterval(l.value)};return(C,u)=>{const m=S("el-tag"),p=S("el-descriptions-item"),y=S("el-descriptions"),A=S("el-button"),w=S("el-popconfirm"),g=S("el-card"),f=S("el-dialog");return U(),H("div",qe,[_(g,null,{header:B(()=>u[1]||(u[1]=[v("div",{class:"title"},"挂号详情",-1)])),default:B(()=>[v("div",Ge,[_(m,{type:"success"},{default:B(()=>{var h,E;return[v("div",Qe,[u[2]||(u[2]=v("svg",{t:"1690427888770",class:"icon",viewBox:"0 0 1024 1024",version:"1.1",xmlns:"http://www.w3.org/2000/svg","p-id":"1507",width:"16",height:"16"},[v("path",{d:"M404.352 685.354667L789.632 213.333333 853.333333 267.52 409.941333 810.666667 170.666667 566.4l58.581333-59.818667z",fill:"#1afa29","p-id":"1508"})],-1)),v("span",null,k((E=(h=i.value)==null?void 0:h.param)==null?void 0:E.orderStatusString),1)])]}),_:1}),u[3]||(u[3]=v("div",{class:"code"},[v("img",{src:Gt,alt:""}),v("div",null,[v("p",null,"微信 关注“114514预约挂号”"),v("p",null,"快速预约挂号")])],-1))]),v("div",We,[v("div",Ze,[_(y,{column:1,border:""},{default:B(()=>[_(p,{label:"就诊人信息"},{default:B(()=>[L(k(i.value.patientName),1)]),_:1}),_(p,{label:"就诊日期"},{default:B(()=>[L(k(i.value.reserveDate),1)]),_:1}),_(p,{label:"就诊医院"},{default:B(()=>[L(k(i.value.hosname),1)]),_:1}),_(p,{label:"就诊科室"},{default:B(()=>[L(k(i.value.depname),1)]),_:1}),_(p,{label:"医生职称"},{default:B(()=>[L(k(i.value.title),1)]),_:1}),_(p,{label:"服务费"},{default:B(()=>[L(k(i.value.amount),1)]),_:1}),_(p,{label:"挂号单号"},{default:B(()=>[L(k(i.value.outTradeNo),1)]),_:1}),_(p,{label:"挂号时间"},{default:B(()=>[L(k(i.value.createTime),1)]),_:1})]),_:1}),i.value.orderStatus===0||i.value.orderStatus===1?(U(),H("div",Xe,[_(w,{title:"确定要取消预约吗？",onConfirm:n},{reference:B(()=>[_(A,null,{default:B(()=>u[4]||(u[4]=[L("取消预约")])),_:1})]),_:1}),i.value.orderStatus===0?(U(),tt(A,{key:0,type:"primary",onClick:d},{default:B(()=>u[5]||(u[5]=[L("支付")])),_:1})):bt("",!0)])):bt("",!0)]),v("div",xe,[_(g,null,{header:B(()=>u[6]||(u[6]=[v("div",null,"注意事项",-1)])),default:B(()=>[v("ol",null,[v("li",null,"取号时间："+k(i.value.fetchTime),1),v("li",null,"退号时间："+k(i.value.quitTime),1)])]),_:1})])])]),_:1}),_(f,{modelValue:r.value,"onUpdate:modelValue":u[0]||(u[0]=h=>r.value=h),width:"400",title:"微信支付",onClose:c},{footer:B(()=>[v("div",null,[_(A,{type:"primary",onClick:c},{default:B(()=>u[9]||(u[9]=[L("关闭窗口")])),_:1})])]),default:B(()=>[v("div",tn,[v("img",{src:a.value,alt:""},null,8,en),u[7]||(u[7]=v("p",null,"请使用微信扫一扫",-1)),u[8]||(u[8]=v("p",null,"扫描二维码支付",-1))])]),_:1},8,["modelValue"])])}}});const on=Qt(nn,[["__scopeId","data-v-672f49d5"]]),rn={class:"list"},sn=wt({__name:"index",setup(e){const t=Wt(),i=M(1),o=M(10),n=M(100),r=g=>{o.value=g,C()},s=g=>{i.value=g,C()},a=M(""),l=M(""),d=M([]),c=M(!1),C=async()=>{c.value=!0;const g=await oe(i.value,o.value,a.value,l.value);g.code===200&&(d.value=g.data.records,n.value=g.data.total,c.value=!1)},u=g=>{t.push({path:"/doctor/user/order",query:{orderId:g.id}})},m=M([]),p=async()=>{const g=await re();console.log(g),g.code===200&&(m.value=g.data)},y=M([]),A=async()=>{const g=await ie();console.log(g),g.code===200&&(y.value=g.data)};Mt(()=>{C(),p(),A()});const w=()=>{C()};return(g,f)=>{const h=S("el-option"),E=S("el-select"),b=S("el-form-item"),I=S("el-form"),N=S("el-table-column"),F=S("el-button"),R=S("el-table"),O=S("el-pagination"),q=S("el-card"),D=Zt("loading");return U(),H("div",rn,[_(q,null,{header:B(()=>f[4]||(f[4]=[v("div",null,"挂号订单",-1)])),default:B(()=>[_(I,{inline:""},{default:B(()=>[_(b,{label:"就诊人"},{default:B(()=>[_(E,{modelValue:a.value,"onUpdate:modelValue":f[0]||(f[0]=T=>a.value=T),placeholder:"请选择就诊人",onChange:w},{default:B(()=>[_(h,{label:"所有就诊人",value:""}),(U(!0),H(vt,null,At(m.value,T=>(U(),tt(h,{key:T.id,label:T.name,value:T.id},null,8,["label","value"]))),128))]),_:1},8,["modelValue"])]),_:1}),_(b,{label:"订单状态"},{default:B(()=>[_(E,{modelValue:l.value,"onUpdate:modelValue":f[1]||(f[1]=T=>l.value=T),placeholder:"请选择订单状态",onChange:w},{default:B(()=>[_(h,{label:"所有订单状态",value:""}),(U(!0),H(vt,null,At(y.value,T=>(U(),tt(h,{key:T.status,label:T.comment,value:T.status},null,8,["label","value"]))),128))]),_:1},8,["modelValue"])]),_:1})]),_:1}),Xt((U(),tt(R,{data:d.value,border:"",style:{margin:"20px 0"}},{default:B(()=>[_(N,{prop:"reserveDate",label:"就诊时间"}),_(N,{prop:"hosname",label:"医院"}),_(N,{prop:"depname",label:"科室"}),_(N,{prop:"title",label:"医生"}),_(N,{prop:"amount",label:"服务费"}),_(N,{prop:"param.orderStatusString",label:"订单状态"}),_(N,{label:"操作"},{default:B(({row:T})=>[_(F,{type:"text",onClick:cn=>u(T)},{default:B(()=>f[5]||(f[5]=[L("详情")])),_:2},1032,["onClick"])]),_:1})]),_:1},8,["data"])),[[D,c.value]]),_(O,{"current-page":i.value,"onUpdate:currentPage":f[2]||(f[2]=T=>i.value=T),"page-size":o.value,"onUpdate:pageSize":f[3]||(f[3]=T=>o.value=T),"page-sizes":[10,20,30,40],small:!0,background:!0,layout:"prev, pager, next, jumper, ->, total, sizes",total:n.value,onSizeChange:r,onCurrentChange:s},null,8,["current-page","page-size","total"])]),_:1})])}}}),ln={class:"order"},an={key:0,class:"order-list"},un={key:1,class:"order-info"},gn=wt({__name:"index",setup(e){const t=Pt();return(i,o)=>(U(),H("div",ln,[It(t).query.orderId?(U(),H("div",un,[_(on,{id:It(t).query.id},null,8,["id"])])):(U(),H("div",an,[_(sn)]))]))}});export{gn as default};
