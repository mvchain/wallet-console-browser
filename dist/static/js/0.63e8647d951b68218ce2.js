webpackJsonp([0],{"1o/9":function(e,t,r){"use strict";var a=function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("el-upload",{attrs:{action:e.imgBase,data:e.imgObj,limit:1,"on-success":e.handleAvatarSuccess,"on-error":e.handleAvatarError,"before-upload":e.beforeAvatarUpload,"file-list":e.fileList,"list-type":"picture"}},[r("el-button",{attrs:{size:"small",type:"primary"},nativeOn:{click:function(t){e.updateImg(t)}}},[e._v("点击上传")]),e._v(" "),r("div",{staticClass:"el-upload__tip",attrs:{slot:"tip"},slot:"tip"},[e._v("只能上传"+e._s(e.payload)+"文件，且不超过"+e._s(e.limit)+"M")])],1)},s=[],o={render:a,staticRenderFns:s};t.a=o},"28f0":function(e,t,r){"use strict";function a(e){r("598/")}Object.defineProperty(t,"__esModule",{value:!0});var s=r("g/R7"),o=r("H2VM"),i=r("/Xao"),l=a,m=i(s.a,o.a,!1,l,"data-v-acaaaeca",null);t.default=m.exports},"598/":function(e,t,r){var a=r("GD3D");"string"==typeof a&&(a=[[e.i,a,""]]),a.locals&&(e.exports=a.locals);r("8bSs")("71d94b26",a,!0)},GD3D:function(e,t,r){t=e.exports=r("BkJT")(!0),t.push([e.i,".edit-project[data-v-acaaaeca]{padding:30px;width:700px}","",{version:3,sources:["D:/njh/token-exchange-protocol-interior-vue/src/views/projectManage/projectEdit/index.vue"],names:[],mappings:"AACA,+BACE,aAAc,AACd,WAAa,CACd",file:"index.vue",sourcesContent:["\n.edit-project[data-v-acaaaeca] {\n  padding: 30px;\n  width: 700px;\n}\n"],sourceRoot:""}])},H2VM:function(e,t,r){"use strict";var a=function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("div",{staticClass:"edit-project"},[r("el-form",{ref:"ruleForm",staticClass:"demo-ruleForm",attrs:{model:e.ruleForm,rules:e.rules,"label-width":"120px"}},[r("el-form-item",{attrs:{label:"标题",prop:"title"}},[r("el-input",{model:{value:e.ruleForm.title,callback:function(t){e.$set(e.ruleForm,"title",t)},expression:"ruleForm.title"}})],1),e._v(" "),r("el-form-item",{attrs:{label:"币种名称",prop:"tokenName"}},[r("el-input",{model:{value:e.ruleForm.tokenName,callback:function(t){e.$set(e.ruleForm,"tokenName",t)},expression:"ruleForm.tokenName"}})],1),e._v(" "),r("el-form-item",{attrs:{label:"ETH购买总数",prop:"ethNumber"}},[r("el-input",{model:{value:e.ruleForm.ethNumber,callback:function(t){e.$set(e.ruleForm,"ethNumber",t)},expression:"ruleForm.ethNumber"}})],1),e._v(" "),r("el-form-item",{attrs:{label:"兑换比例",prop:"ratio"}},[r("el-input",{model:{value:e.ruleForm.ratio,callback:function(t){e.$set(e.ruleForm,"ratio",t)},expression:"ruleForm.ratio"}})],1),e._v(" "),r("el-form-item",{attrs:{label:"开放购买时间"}},[r("el-date-picker",{attrs:{type:"datetimerange","start-placeholder":"开始日期","end-placeholder":"结束日期","default-time":["12:00:00"]},model:{value:e.ruleForm.startTime,callback:function(t){e.$set(e.ruleForm,"startTime",t)},expression:"ruleForm.startTime"}})],1),e._v(" "),r("el-form-item",{attrs:{label:"白皮书",prop:"whitePaperAddress"}},[r("pro-oss",{attrs:{payload:"pdf",limit:10,type:"white"},on:{"set-img-url":e.getImg}})],1),e._v(" "),r("el-form-item",{attrs:{label:"官网",prop:"homepage"}},[r("el-input",{model:{value:e.ruleForm.homepage,callback:function(t){e.$set(e.ruleForm,"homepage",t)},expression:"ruleForm.homepage"}})],1),e._v(" "),r("el-form-item",{attrs:{label:"项目介绍",prop:"projectImageAddress"}},[r("pro-oss",{attrs:{payload:"image/jpeg/image/png/image/jpg",limit:10,type:"introduction"},on:{"set-img-url":e.getImg}})],1),e._v(" "),r("el-form-item",{attrs:{label:"项目封面",prop:"projectCoverAddress"}},[r("pro-oss",{attrs:{payload:"image/jpeg/image/png/image/jpg",limit:1,type:"cover"},on:{"set-img-url":e.getImg}})],1),e._v(" "),r("el-form-item",{attrs:{label:"创始人头像",prop:"leaderImageAddress"}},[r("pro-oss",{attrs:{payload:"image/jpeg/image/png/image/jpg",limit:1,type:"leader"},on:{"set-img-url":e.getImg}})],1),e._v(" "),r("el-form-item",{attrs:{label:"创始人名字",prop:"leaderName"}},[r("el-input",{model:{value:e.ruleForm.leaderName,callback:function(t){e.$set(e.ruleForm,"leaderName",t)},expression:"ruleForm.leaderName"}})],1),e._v(" "),r("el-form-item",{attrs:{label:"职位",prop:"position"}},[r("el-input",{model:{value:e.ruleForm.position,callback:function(t){e.$set(e.ruleForm,"position",t)},expression:"ruleForm.position"}})],1),e._v(" "),r("el-form-item",{attrs:{label:"描述",prop:"description"}},[r("el-input",{attrs:{type:"textarea"},model:{value:e.ruleForm.description,callback:function(t){e.$set(e.ruleForm,"description",t)},expression:"ruleForm.description"}})],1),e._v(" "),r("el-form-item",[r("el-button",{attrs:{type:"primary"},on:{click:function(t){e.submitForm("ruleForm")}}},[e._v("修改项目")]),e._v(" "),r("el-button",{on:{click:function(t){e.$router.back()}}},[e._v("取消")])],1)],1)],1)},s=[],o={render:a,staticRenderFns:s};t.a=o},Nmn3:function(e,t,r){"use strict";var a=r("4YfN"),s=r.n(a),o=r("9rMa");t.a={name:"ossload",props:{limit:Number,type:String,payload:String,proObj:Object},data:function(){return{imgName:"",fileList:[],imgBase:window.urlData.ossObj.host,imgObj:{name:"",key:"",policy:"",OSSAccessKeyId:window.urlData.ossObj.accessid,success_action_status:"200",signature:""}}},computed:s()({},Object(o.b)({ossObj:"ossObj"})),destroyed:function(){window.sessionStorage.removeItem("fileList")},created:function(){if(this.$route.query.id){var e=JSON.parse(window.sessionStorage.getItem("fileList"));this.fileList[0]=e[this.type]}},methods:{updateImg:function(){var e=this;this.$store.dispatch("getOssObj").then(function(t){e.imgObj.policy=e.ossObj.policy,e.imgObj.signature=e.ossObj.signature}).catch(function(t){e.$message.error(t)})},random_string:function(e){e=e||32;for(var t="ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678",r=t.length,a="",s=0;s<e;s++)a+=t.charAt(Math.floor(Math.random()*r));return a},dateFormat:function(e,t){var r={"M+":e.getMonth()+1,"d+":e.getDate(),"h+":e.getHours(),"m+":e.getMinutes(),"s+":e.getSeconds(),"q+":Math.floor((e.getMonth()+3)/3),S:e.getMilliseconds()};/(y+)/.test(t)&&(t=t.replace(RegExp.$1,(e.getFullYear()+"").substr(4-RegExp.$1.length)));for(var a in r)new RegExp("("+a+")").test(t)&&(t=t.replace(RegExp.$1,1===RegExp.$1.length?r[a]:("00"+r[a]).substr((""+r[a]).length)));return t},get_suffix:function(e){var t=e.lastIndexOf("."),r="";return-1!==t&&(r=e.substring(t)),r},calculate_object_name:function(e){var t=new Date,r=this.dateFormat(t,"yyyyMMddhhmmss"),a=this.get_suffix(e);return this.ossObj.dir+r+this.random_string(10)+a},handleAvatarSuccess:function(e,t){this.imageUrl=this.imgBase+"/"+this.imgObj.key,this.$emit("set-img-url",{name:t.name,url:this.imageUrl,type:this.type})},beforeAvatarUpload:function(e){var t=!1;"introduction"===this.type||"leader"===this.type||"cover"===this.type?t="image/jpeg"===e.type||"image/png"===e.type||"image/jpg"===e.type:"white"===this.type&&(t=e.name.includes("pdf"));var r=e.size/1024/1024<this.limit;return this.imgObj.key=this.calculate_object_name(e.name),t||this.$message.error("只支持"+this.payload+"格式!"),r||this.$message.error("上传文件大小不能超过 "+this.limit+"MB!"),this.imgName=e.name,t&&r},handleAvatarError:function(e){this.$message.error(e)}}}},SLiC:function(e,t,r){var a=r("d6GR");"string"==typeof a&&(a=[[e.i,a,""]]),a.locals&&(e.exports=a.locals);r("8bSs")("5b1f2f65",a,!0)},d6GR:function(e,t,r){t=e.exports=r("BkJT")(!0),t.push([e.i,"","",{version:3,sources:[],names:[],mappings:"",file:"ossload.vue",sourceRoot:""}])},"g/R7":function(e,t,r){"use strict";var a=r("3cXf"),s=r.n(a),o=r("4YfN"),i=r.n(o),l=r("z0xH"),m=r("9rMa");t.a={name:"projectEdit",components:{"pro-oss":l.a},computed:i()({},Object(m.b)({projectInfo:"projectInfo"})),data:function(){return{ruleForm:{description:"",ethNumber:"",leaderImageAddress:"",leaderImageName:"",leaderName:"",position:"",projectCoverAddress:"",projectCoverName:"",projectImageAddress:"",projectImageName:"",ratio:"",startTime:"",homepage:"",stopTime:"",title:"",tokenName:"",whitePaperAddress:"",whitePaperName:""},rules:{description:[{required:!0,message:"请输入创始人介绍",trigger:"blur"},{max:500,message:"字数请少于500字",trigger:"blur"}],ethNumber:[{required:!0,message:"请输入ETH总数",trigger:"blur"}],leaderImageAddress:[{required:!0,message:"请上传创始人头像"}],leaderName:[{required:!0,message:"请输入创始人名称",trigger:"blur"}],position:[{required:!0,message:"请输入创始人职务",trigger:"blur"}],projectCoverAddress:[{required:!0,message:"请上传项目封面图片"}],projectImageAddress:[{required:!0,message:"请上传项目介绍图片"}],ratio:[{required:!0,message:"请输入兑换比例",trigger:"blur"}],startTime:[{required:!0,message:"请选择开放时间"}],homepage:[{required:!0,message:"请输入官网地址",trigger:"blur"}],stopTime:[{required:!0,message:"请选择结束时间"}],title:[{required:!0,message:"请输入标题",trigger:"blur"}],tokenName:[{required:!0,message:"请币种名称",trigger:"blur"}],whitePaperAddress:[{required:!0,message:"请上传白皮书"}]}}},created:function(){this.getInfo(this.$route.query.id)},methods:{getImg:function(e){"introduction"===e.type?(this.ruleForm.projectImageName=e.name,this.ruleForm.projectImageAddress=e.url):"white"===e.type?(this.ruleForm.whitePaperAddress=e.url,this.ruleForm.whitePaperName=e.name):"leader"===e.type?(this.ruleForm.leaderImageAddress=e.url,this.ruleForm.leaderImageName=e.name):"cover"===e.type&&(this.ruleForm.projectCoverAddress=e.url,this.ruleForm.projectCoverName=e.name)},submitForm:function(e){var t=this;this.$refs[e].validate(function(r){if(!r)return t.$message.error("请完善表单"),!1;t[e].stopTime=Date.parse(t[e].startTime[1]),t[e].startTime=Date.parse(t[e].startTime[0]),t.$store.dispatch("putProject",t[e]).then(function(){t.$router.back(),t.$message.success("修改成功"),window.sessionStorage.removeItem("fileList")}).catch(function(e){t.$message.error(e)})})},getInfo:function(e){var t=this;this.$store.dispatch("getProjectInfo",e).then(function(){var e=s()(t.projectInfo),r=new Date(t.projectInfo.startTime),a=new Date(t.projectInfo.stopTime);t.ruleForm=JSON.parse(e),t.ruleForm.ethNumber=String(t.ruleForm.ethNumber),t.ruleForm.ratio=String(t.ruleForm.ratio),t.ruleForm.startTime=[r,a],t.fileList.white={name:t.ruleForm.whitePaperName,url:t.ruleForm.whitePaperAddress},t.fileList.introduction={name:t.ruleForm.projectImageName,url:t.ruleForm.projectImageAddress},t.fileList.leader={name:t.ruleForm.leaderImageName,url:t.ruleForm.leaderImageAddress},t.fileList.cover={name:t.ruleForm.projectCoverName,url:t.ruleForm.projectCoverAddress},window.sessionStorage.setItem("fileList",s()(t.fileList))}).catch(function(e){t.$message.error(e)})}}}},z0xH:function(e,t,r){"use strict";function a(e){r("SLiC")}var s=r("Nmn3"),o=r("1o/9"),i=r("/Xao"),l=a,m=i(s.a,o.a,!1,l,"data-v-aaecfa28",null);t.a=m.exports}});
//# sourceMappingURL=0.63e8647d951b68218ce2.js.map