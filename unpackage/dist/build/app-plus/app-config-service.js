
var isReady=false;var onReadyCallbacks=[];
var isServiceReady=false;var onServiceReadyCallbacks=[];
var __uniConfig = {"pages":["pages/index/index","pages/question/question","pages/404/404","pages/appbb/appbb","pages/resource/list","pages/addResource/addResource","pages/detail/detail","pages/ucenter/login-page/index/index","pages/list/search/search","pages/ucenter/ucenter","pages/ucenter/userinfo/userinfo","pages/ucenter/userinfo/cropImage","pages/ucenter/login-page/pwd-login/pwd-login","pages/ucenter/login-page/pwd-login/pwd-weibo","pages/ucenter/login-page/register/register","uni_modules/uni-feedback/pages/opendb-feedback/opendb-feedback","pages/jz-opendb-resources/add","pages/jz-opendb-resources/edit","pages/jz-opendb-resources/list","pages/myfavorite/myfavorite","pages/history/history","pages/sort/sort","pages/jilianri/jilianri","pages/jilianri/detail","pages/junzhe/junzhe","pages/shanzong/shanzong","pages/jz-custom-yqm/add","pages/jz-custom-yqm/edit","pages/jz-custom-yqm/list","pages/jz-custom-yqm/detail","pages/jz-custom-language/add","pages/jz-custom-language/edit","pages/jz-custom-language/list","uview-ui/components/u-full-screen/u-full-screen","uview-ui/components/u-full-screen/u-full-screen-tsfwb","uview-ui/components/u-full-screen/u-full-screen-shts","uview-ui/components/u-full-screen/u-full-screen-shtg","uview-ui/components/u-full-screen/u-full-screen-xtsd","uview-ui/components/u-full-screen/u-full-screen-yqm","pages/addResource/addResource"],"window":{"navigationStyle":"custom","navigationBarTextStyle":"black","navigationBarTitleText":"俊哲宇宙","navigationBarBackgroundColor":"#FFFFFF","backgroundColor":"#F8F8F8","enablePullDownRefresh":false},"tabBar":{"color":"#7A7E83","selectedColor":"#007AFF","borderStyle":"black","backgroundColor":"#FFFFFF","list":[{"pagePath":"pages/index/index","text":"首页"},{"pagePath":"pages/sort/sort","text":"分类"},{"pagePath":"pages/jilianri/jilianri","text":"纪恋日"},{"pagePath":"pages/junzhe/junzhe","text":"俊哲"},{"pagePath":"pages/shanzong/shanzong","text":"山总"}]},"nvueCompiler":"uni-app","nvueStyleCompiler":"uni-app","renderer":"auto","splashscreen":{"alwaysShowBeforeRender":false,"autoclose":true},"appname":"俊哲宇宙","compilerVersion":"3.2.16","entryPagePath":"pages/index/index","networkTimeout":{"request":60000,"connectSocket":60000,"uploadFile":60000,"downloadFile":60000}};
var __uniRoutes = [{"path":"/pages/index/index","meta":{"isQuit":true,"isTabBar":true},"window":{"enablePullDownRefresh":true}},{"path":"/pages/question/question","meta":{},"window":{"navigationBarTitleText":"对暗号"}},{"path":"/pages/404/404","meta":{},"window":{"navigationBarTitleText":"404"}},{"path":"/pages/appbb/appbb","meta":{},"window":{"navigationBarTitleText":"APP版本升级","enablePullDownRefresh":true}},{"path":"/pages/resource/list","meta":{},"window":{"navigationBarTitleText":"列表","enablePullDownRefresh":true}},{"path":"/pages/addResource/addResource","meta":{},"window":{"navigationStyle":"custom","animationType":"fade-in","background":"transparent","backgroundColor":"rgba(0,0,0,0)","popGesture":"none"}},{"path":"/pages/detail/detail","meta":{},"window":{"navigationBarTitleText":"详情","enablePullDownRefresh":true}},{"path":"/pages/ucenter/login-page/index/index","meta":{},"window":{"navigationBarTitleText":"","animationType":"none","popGesture":"none"}},{"path":"/pages/list/search/search","meta":{},"window":{"navigationBarTitleText":"搜索"}},{"path":"/pages/ucenter/ucenter","meta":{},"window":{"navigationStyle":"custom"}},{"path":"/pages/ucenter/userinfo/userinfo","meta":{},"window":{"navigationBarTitleText":"个人资料"}},{"path":"/pages/ucenter/userinfo/cropImage","meta":{},"window":{"navigationStyle":"custom"}},{"path":"/pages/ucenter/login-page/pwd-login/pwd-login","meta":{},"window":{"navigationBarTitleText":""}},{"path":"/pages/ucenter/login-page/pwd-login/pwd-weibo","meta":{},"window":{"navigationBarTitleText":""}},{"path":"/pages/ucenter/login-page/register/register","meta":{},"window":{"navigationBarTitleText":"注册","enablePullDownRefresh":false}},{"path":"/uni_modules/uni-feedback/pages/opendb-feedback/opendb-feedback","meta":{},"window":{"navigationBarTitleText":"意见反馈","enablePullDownRefresh":false}},{"path":"/pages/jz-opendb-resources/add","meta":{},"window":{"navigationBarTitleText":"新增"}},{"path":"/pages/jz-opendb-resources/edit","meta":{},"window":{"navigationBarTitleText":"编辑"}},{"path":"/pages/jz-opendb-resources/list","meta":{},"window":{"navigationBarTitleText":"列表","enablePullDownRefresh":true}},{"path":"/pages/myfavorite/myfavorite","meta":{},"window":{"navigationBarTitleText":"我的收藏","enablePullDownRefresh":true}},{"path":"/pages/history/history","meta":{},"window":{"navigationBarTitleText":"我的足迹","enablePullDownRefresh":true}},{"path":"/pages/sort/sort","meta":{"isQuit":true,"isTabBar":true},"window":{"navigationBarTitleText":"分类"}},{"path":"/pages/jilianri/jilianri","meta":{"isQuit":true,"isTabBar":true},"window":{"navigationBarTitleText":"纪恋日"}},{"path":"/pages/jilianri/detail","meta":{},"window":{"navigationBarTitleText":"纪恋日详情"}},{"path":"/pages/junzhe/junzhe","meta":{"isQuit":true,"isTabBar":true},"window":{"navigationBarTitleText":"俊哲","enablePullDownRefresh":true}},{"path":"/pages/shanzong/shanzong","meta":{"isQuit":true,"isTabBar":true},"window":{"navigationBarTitleText":"山总","enablePullDownRefresh":true}},{"path":"/pages/jz-custom-yqm/add","meta":{},"window":{"navigationBarTitleText":"新增"}},{"path":"/pages/jz-custom-yqm/edit","meta":{},"window":{"navigationBarTitleText":"编辑"}},{"path":"/pages/jz-custom-yqm/list","meta":{},"window":{"navigationBarTitleText":"列表","enablePullDownRefresh":true}},{"path":"/pages/jz-custom-yqm/detail","meta":{},"window":{"navigationBarTitleText":"详情"}},{"path":"/pages/jz-custom-language/add","meta":{},"window":{"navigationBarTitleText":"新增"}},{"path":"/pages/jz-custom-language/edit","meta":{},"window":{"navigationBarTitleText":"编辑"}},{"path":"/pages/jz-custom-language/list","meta":{},"window":{"navigationBarTitleText":"列表"}},{"path":"/uview-ui/components/u-full-screen/u-full-screen","meta":{},"window":{"navigationStyle":"custom","animationType":"fade-in","background":"transparent","backgroundColor":"rgba(0,0,0,0)","popGesture":"none"}},{"path":"/uview-ui/components/u-full-screen/u-full-screen-tsfwb","meta":{},"window":{"navigationStyle":"custom","animationType":"fade-in","background":"transparent","backgroundColor":"rgba(0,0,0,0)","popGesture":"none"}},{"path":"/uview-ui/components/u-full-screen/u-full-screen-shts","meta":{},"window":{"navigationStyle":"custom","animationType":"fade-in","background":"transparent","backgroundColor":"rgba(0,0,0,0)","popGesture":"none"}},{"path":"/uview-ui/components/u-full-screen/u-full-screen-shtg","meta":{},"window":{"navigationStyle":"custom","animationType":"fade-in","background":"transparent","backgroundColor":"rgba(0,0,0,0)","popGesture":"none"}},{"path":"/uview-ui/components/u-full-screen/u-full-screen-xtsd","meta":{},"window":{"navigationStyle":"custom","animationType":"fade-in","background":"transparent","backgroundColor":"rgba(0,0,0,0)","popGesture":"none"}},{"path":"/uview-ui/components/u-full-screen/u-full-screen-yqm","meta":{},"window":{"navigationStyle":"custom","animationType":"fade-in","background":"transparent","backgroundColor":"rgba(0,0,0,0)","popGesture":"none"}}];
__uniConfig.onReady=function(callback){if(__uniConfig.ready){callback()}else{onReadyCallbacks.push(callback)}};Object.defineProperty(__uniConfig,"ready",{get:function(){return isReady},set:function(val){isReady=val;if(!isReady){return}const callbacks=onReadyCallbacks.slice(0);onReadyCallbacks.length=0;callbacks.forEach(function(callback){callback()})}});
__uniConfig.onServiceReady=function(callback){if(__uniConfig.serviceReady){callback()}else{onServiceReadyCallbacks.push(callback)}};Object.defineProperty(__uniConfig,"serviceReady",{get:function(){return isServiceReady},set:function(val){isServiceReady=val;if(!isServiceReady){return}const callbacks=onServiceReadyCallbacks.slice(0);onServiceReadyCallbacks.length=0;callbacks.forEach(function(callback){callback()})}});
service.register("uni-app-config",{create(a,b,c){if(!__uniConfig.viewport){var d=b.weex.config.env.scale,e=b.weex.config.env.deviceWidth,f=Math.ceil(e/d);Object.assign(__uniConfig,{viewport:f,defaultFontSize:Math.round(f/20)})}return{instance:{__uniConfig:__uniConfig,__uniRoutes:__uniRoutes,global:void 0,window:void 0,document:void 0,frames:void 0,self:void 0,location:void 0,navigator:void 0,localStorage:void 0,history:void 0,Caches:void 0,screen:void 0,alert:void 0,confirm:void 0,prompt:void 0,fetch:void 0,XMLHttpRequest:void 0,WebSocket:void 0,webkit:void 0,print:void 0}}}});
