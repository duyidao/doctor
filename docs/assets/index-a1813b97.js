import{f as $,g as c,j as G,o as r,c as y,w as t,m as H,u as J,L as K,r as n,e as M,d as l,I as d,i as Q,O as W,a as V,F,b as N,N as U,_ as X}from"./index-93eae3cd.js";import{a as Z,i as h,j as ee,k as le,r as ae}from"./index-7754b825.js";import{V as te}from"./visitor-b643eb15.js";const oe={class:"header"},ue={key:0,class:"user"},se={key:1,class:"form"},ne=$({__name:"index",setup(de){const v=H(),q=J(),b=c([]),k=async()=>{const u=await K();if(b.value=u.data,v.query.type==="chnagePage"&&v.query.id){_.value=!0;let e=b.value.find(i=>i.id==v.query.id);e&&(o.value=e)}},z=c(-1),C=c([]),B=async()=>{const u=await Z();u.code===200&&(C.value=u.data)},I={lazy:!0,async lazyLoad(u,e){const i=await h(u.data.id||"86");let g=[];i.code===200&&(g=i.data.map(p=>({id:p.id,label:p.name,value:p.value,leaf:!p.hasChildren}))),e(g)}};G(()=>{k(),B(),v.query.type==="chnagePage"&&(_.value=!0)});const P=u=>{z.value=u},_=c(!1),T=(u={})=>{_.value=!0,o.value=u},o=c({}),Y=async()=>{let u=null;o.value.id?u=await ee(o.value):u=await le(o.value),u.code===200?(v.query.type==="chnagePage"?q.back():(U.success("就诊人操作成功"),k()),_.value=!1):U.error(u.message)},E=async u=>{const e=await ae(u.id);e.code===200?U.success("删除成功"):U.error(e.message),k()},O=()=>{o.value={}};return(u,e)=>{const i=n("el-button"),g=n("el-empty"),p=n("el-divider"),m=n("el-input"),s=n("el-form-item"),A=n("el-option"),D=n("el-select"),f=n("el-radio"),w=n("el-radio-group"),R=n("el-date-picker"),x=n("el-form"),S=n("el-cascader"),j=n("el-card");return r(),y(j,null,{header:t(()=>[M("div",oe,[e[15]||(e[15]=M("div",null,"就诊人管理",-1)),l(i,{type:"primary",icon:Q(W),onClick:T},{default:t(()=>e[14]||(e[14]=[d("添加就诊人")])),_:1},8,["icon"])])]),default:t(()=>[_.value?(r(),V("div",se,[l(p,{"content-position":"left"},{default:t(()=>e[16]||(e[16]=[d("就诊人信息")])),_:1}),l(x,{style:{margin:"25px auto",width:"80%"}},{default:t(()=>[l(s,{label:"用户姓名"},{default:t(()=>[l(m,{modelValue:o.value.name,"onUpdate:modelValue":e[0]||(e[0]=a=>o.value.name=a),placeholder:"请输入用户姓名"},null,8,["modelValue"])]),_:1}),l(s,{label:"证件类型"},{default:t(()=>[l(D,{modelValue:o.value.certificatesType,"onUpdate:modelValue":e[1]||(e[1]=a=>o.value.certificatesType=a),placeholder:"请选择证件类型",style:{width:"100%"}},{default:t(()=>[(r(!0),V(F,null,N(C.value,a=>(r(),y(A,{key:a.id,label:a.name,value:a.value},null,8,["label","value"]))),128))]),_:1},8,["modelValue"])]),_:1}),l(s,{label:"证件号码"},{default:t(()=>[l(m,{modelValue:o.value.certificatesNo,"onUpdate:modelValue":e[2]||(e[2]=a=>o.value.certificatesNo=a),placeholder:"请输入证件号码"},null,8,["modelValue"])]),_:1}),l(s,{label:"用户性别"},{default:t(()=>[l(w,{modelValue:o.value.sex,"onUpdate:modelValue":e[3]||(e[3]=a=>o.value.sex=a)},{default:t(()=>[l(f,{label:1,size:"large"},{default:t(()=>e[17]||(e[17]=[d("男")])),_:1}),l(f,{label:0,size:"large"},{default:t(()=>e[18]||(e[18]=[d("女")])),_:1})]),_:1},8,["modelValue"])]),_:1}),l(s,{label:"出生日期"},{default:t(()=>[l(R,{type:"date","value-format":"YYYY-MM-DD",modelValue:o.value.birthdate,"onUpdate:modelValue":e[4]||(e[4]=a=>o.value.birthdate=a),placeholder:"请选择出生日期",size:"default"},null,8,["modelValue"])]),_:1}),l(s,{label:"手机号码"},{default:t(()=>[l(m,{modelValue:o.value.phone,"onUpdate:modelValue":e[5]||(e[5]=a=>o.value.phone=a),placeholder:"请输入手机号码"},null,8,["modelValue"])]),_:1})]),_:1}),l(p,{"content-position":"left"},{default:t(()=>e[19]||(e[19]=[d("建档信息（完善后部分医院首次就诊不排队建档）")])),_:1}),l(x,{style:{margin:"25px auto",width:"80%"}},{default:t(()=>[l(s,{label:"婚姻状况"},{default:t(()=>[l(w,{modelValue:o.value.isMarry,"onUpdate:modelValue":e[6]||(e[6]=a=>o.value.isMarry=a)},{default:t(()=>[l(f,{label:1,size:"large"},{default:t(()=>e[20]||(e[20]=[d("已婚")])),_:1}),l(f,{label:0,size:"large"},{default:t(()=>e[21]||(e[21]=[d("未婚")])),_:1})]),_:1},8,["modelValue"])]),_:1}),l(s,{label:"自费/医保"},{default:t(()=>[l(w,{modelValue:o.value.isInsure,"onUpdate:modelValue":e[7]||(e[7]=a=>o.value.isInsure=a)},{default:t(()=>[l(f,{label:1,size:"large"},{default:t(()=>e[22]||(e[22]=[d("自费")])),_:1}),l(f,{label:0,size:"large"},{default:t(()=>e[23]||(e[23]=[d("医保")])),_:1})]),_:1},8,["modelValue"])]),_:1}),l(s,{label:"当前住址"},{default:t(()=>[l(S,{modelValue:o.value.addressSelected,"onUpdate:modelValue":e[8]||(e[8]=a=>o.value.addressSelected=a),props:I},null,8,["modelValue"])]),_:1}),l(s,{label:"详细地址"},{default:t(()=>[l(m,{modelValue:o.value.address,"onUpdate:modelValue":e[9]||(e[9]=a=>o.value.address=a),placeholder:"请输入详细地址"},null,8,["modelValue"])]),_:1})]),_:1}),l(p,{"content-position":"left"},{default:t(()=>e[24]||(e[24]=[d("紧急联系人信息（选填）")])),_:1}),l(x,{style:{margin:"25px auto",width:"80%"},"label-width":"80"},{default:t(()=>[l(s,{label:"用户姓名"},{default:t(()=>[l(m,{modelValue:o.value.contactsName,"onUpdate:modelValue":e[10]||(e[10]=a=>o.value.contactsName=a),placeholder:"请输入用户姓名"},null,8,["modelValue"])]),_:1}),l(s,{label:"证件类型"},{default:t(()=>[l(D,{modelValue:o.value.contactsCertificatesType,"onUpdate:modelValue":e[11]||(e[11]=a=>o.value.contactsCertificatesType=a),placeholder:"请选择证件类型",style:{width:"100%"}},{default:t(()=>[(r(!0),V(F,null,N(C.value,a=>(r(),y(A,{key:a.id,label:a.name,value:a.value},null,8,["label","value"]))),128))]),_:1},8,["modelValue"])]),_:1}),l(s,{label:"证件号码"},{default:t(()=>[l(m,{modelValue:o.value.contactsCertificatesNo,"onUpdate:modelValue":e[12]||(e[12]=a=>o.value.contactsCertificatesNo=a),placeholder:"请输入证件号码"},null,8,["modelValue"])]),_:1}),l(s,{label:"手机号码"},{default:t(()=>[l(m,{modelValue:o.value.contactsPhone,"onUpdate:modelValue":e[13]||(e[13]=a=>o.value.contactsPhone=a),placeholder:"请输入手机号码"},null,8,["modelValue"])]),_:1}),l(s,null,{default:t(()=>[l(i,{type:"primary",onClick:Y},{default:t(()=>e[25]||(e[25]=[d("提交")])),_:1}),l(i,{onClick:O},{default:t(()=>e[26]||(e[26]=[d("重置")])),_:1})]),_:1})]),_:1})])):(r(),V("div",ue,[b.value.length<=0?(r(),y(g,{key:0,style:{margin:"0 auto"},description:"暂无就诊人信息"})):(r(!0),V(F,{key:1},N(b.value,(a,L)=>(r(),y(te,{class:"visitor-item",key:a.id,item:a,hasChose:z.value===L,hasDelete:"",onClick:re=>P(L),onOnEdit:T,onOnDelete:E},null,8,["item","hasChose","onClick"]))),128))]))]),_:1})}}});const fe=X(ne,[["__scopeId","data-v-aeb061fc"]]);export{fe as default};
