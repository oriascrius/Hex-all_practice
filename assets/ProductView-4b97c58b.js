import{_ as a,c,d as r,t as d,a as n,o as i}from"./index-c7cc0fff.js";const p={name:"ProductView",data(){return{product:{}}},mounted(){const{id:e}=this.$route.params,o=`https://vue3-course-api.hexschool.io/v2/api/qoqvuedemo/product/${e}`;this.$http.get(o).then(t=>{this.product=t.data.product}).catch(t=>{alert(t.response.data.message)})}},u={class:"about"},h=n("h1",null,"This is 單一產品頁面",-1);function _(e,o,t,l,s,m){return i(),c("div",u,[h,r(" "+d(s.product.title),1)])}const f=a(p,[["render",_]]);export{f as default};