import{G as i,i as o,H as p,I as r}from"./index-04d23bd8.js";const D=i("detail",()=>{const a=o({}),n=async e=>{const t=await p(e);t.code===200&&(a.value=t.data)},s=o([]);return{hospitalInfo:a,hospitalDepartmentData:s,getHospDetailFn:n,getHospDepartmentFn:async e=>{const t=await r(e);console.log(t),t.code===200&&(s.value=t.data)}}},{persist:!0});export{D as u};