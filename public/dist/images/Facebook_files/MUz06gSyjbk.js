if (self.CavalryLogger) { CavalryLogger.start_js(["0RB5L"]); }

__d("TimePlayingEnum",[],(function a(b,c,d,e,f,g){f.exports={FIVE_SECONDS:"five_seconds",TEN_SECONDS:"ten_seconds",THIRTY_SECONDS:"thirty_seconds",ONE_MINUTE:"one_minute",TWO_MINUTES:"two_minutes",FIVE_MINUTES:"five_minutes"};}),null);
__d('AppUseTrackerLogger',['AsyncRequest','PageTransitions','Run','isInIframe','pageID'],(function a(b,c,d,e,f,g){function h(){if(!h.instance)h.instance=this;return h.instance;}Object.assign(h,{setup:function i(j,k,l,m,n,o){new h().init(j,k,l,m,n,o);}});Object.assign(h.prototype,{instance:null,endpoint:'/ajax/apps/usage_update.php',heartbeat_endpoint:'/ajax/apps/heartbeat.php',INITIAL_PING:0,ONGOING_PING:1,DISCOVERY_PING:2,ENDING_PING:3,_application_id:0,_is_game:0,_createRequest:function i(j){return new (c('AsyncRequest'))().setURI(this.endpoint).setMethod('POST').setData({app:this._application_id,is_game:this._is_game,type:j,condition:this._signal_on_page_transition});},_createHeartbeatRequest:function i(){return new (c('AsyncRequest'))().setURI(this.heartbeat_endpoint).setMethod('POST').setData({app:this._application_id,page_id:c('pageID')});},init:function i(j,k,l,m,n,o){if(c('isInIframe')())return;this.cleanup();c('PageTransitions').registerHandler(this.catchPageTransition.bind(this));this._application_id=j;this._is_game=k;if(o){var p=function(){return this._createHeartbeatRequest().send();}.bind(this);p();this._timers.push(setInterval(p,o));}this._timers.push(setTimeout(function(){this._createRequest(this.INITIAL_PING).send();var q=this._createRequest(this.ONGOING_PING);this._timers.push(setInterval(q.send.bind(q),m));}.bind(this),l));if(n)this._timers.push(setTimeout(function(){this._createRequest(this.DISCOVERY_PING).send();}.bind(this),n));c('Run').onBeforeUnload(this.onBeforeUnload.bind(this));},catchPageTransition:function i(j){this._createRequest(this.ENDING_PING).send();this.cleanup();},onBeforeUnload:function i(){this._createRequest(this.ENDING_PING).send();this.cleanup();},cleanup:function i(){if(this._timers)for(var j=0;j<this._timers.length;j++)clearInterval(this._timers[j]);this._timers=[];}});f.exports=h;}),null);
__d('CanvasRHCHeightController.react',['React','DOMQuery'],(function a(b,c,d,e,f,g){var h,i,j=c('React').PropTypes;h=babelHelpers.inherits(k,c('React').Component);i=h&&h.prototype;k.prototype.render=function(){'use strict';var l=c('DOMQuery').find(document,'#contentArea'),m=0;if(this.props.rhc.scrollHeight<l.scrollHeight)m=l.scrollHeight-this.props.rhc.scrollHeight;var n={height:m+'px'};return c('React').createElement('div',{style:n});};function k(){'use strict';h.apply(this,arguments);}k.propTypes={rhc:j.object};f.exports=k;}),null);
__d("XGamerGraphMarkUserPlaysFBAppController",["XController"],(function a(b,c,d,e,f,g){f.exports=c("XController").create("\/gamer-graph\/mark-user-plays-fb-app\/",{});}),null);
__d('GamerGraphMarkUserPlaysFBApp',['AsyncRequest','XGamerGraphMarkUserPlaysFBAppController'],(function a(b,c,d,e,f,g){'use strict';f.exports.mark=function(h){var i=c('XGamerGraphMarkUserPlaysFBAppController').getURIBuilder().getURI();new (c('AsyncRequest'))().setURI(i).setData({app_id:h}).send();};}),null);
__d('GiftCredits',['AsyncRequest','Dialog','URI'],(function a(b,c,d,e,f,g){var h={dialog:null,callback:null,purchaseLock:false,purchaseLockExpiryThreshold:5000,purchaseLockTimeoutId:null,getPurchaseCreditPrompt:function i(j,k,l,m){h.main(j,null,null,null,l,null,null,null,'BuyCredits',{},m);},redeemGiftcard:function i(j,k,l){var m=new (c('URI'))(document.location).setPath('/giftcards').toString();h.main(j,null,null,m,null,null,null,null,k,{},l);},getPrompt:function i(j,k,l,m,n,o,p,q,r,s,t,u,v,w,x,y,z,aa,ba,ca,da,ea,fa,ga){h.main(j,k,l,m,n,o,p,q,r,s,t,u,v,w,x,y,z,aa,ba,ca,da,ea,fa,ga);},main:function i(j,k,l,m,n,o,p,q,r,s,t,u,v,w,x,y,z,aa,ba,ca,da,ea,fa,ga){if(h.isPurchaseLocked())return false;h.setPurchaseLock(true);var ha={_path:'pay',method:'pay',display:'async',app_id:j,receiver:k,api_key:p,credits_purchase:w,action:r,next:m,dev_purchase_params:JSON.stringify(s),additional_params:JSON.stringify(t),order_info:JSON.stringify(l),product:u,package_id:v,request_id:x,sdk:y,quantity:z,quantity_min:aa,quantity_max:ba,test_currency:ca,pricepoint_id:da,user:ea,user_hash:fa,ingame_gift_data:ga},ia=new (c('AsyncRequest'))().setURI('/fbml/ajax/dialog/').setData(ha).setMethod('GET').setReadOnly(true).setStatusElement('commerce_get_more_loading');h.callback=n;h.dialog=new (c('Dialog'))().setAsync(ia).setModal(true).setCloseHandler(function(ja){h.setPurchaseLock(false);n(ja);}).show();},isPurchaseLocked:function i(){return h.purchaseLock;},setPurchaseLock:function i(j){h.purchaseLock=j;if(j){h.purchaseLockTimeoutId=setTimeout(function(){h.setPurchaseLock(false);},h.purchaseLockExpiryThreshold);}else clearTimeout(h.purchaseLockTimeoutId);return true;}};f.exports=h;}),null);
__d('legacy:giftcredits',['GiftCredits'],(function a(b,c,d,e,f,g){b.GiftCredits=c('GiftCredits');}),3);
__d('CanvasActivityLogger',['Event','ScriptPath','Visibility','clickRefAction','getActiveElement','setIntervalAcrossTransitions','$','Banzai','TimePlayingEnum'],(function a(b,c,d,e,f,g){var h=1000,i=false,j=false,k=false,l=false,m=null,n=null,o=null,p=0,q=0,r=0,s={5:c('TimePlayingEnum').FIVE_SECONDS,10:c('TimePlayingEnum').TEN_SECONDS,30:c('TimePlayingEnum').THIRTY_SECONDS,60:c('TimePlayingEnum').ONE_MINUTE,120:c('TimePlayingEnum').TWO_MINUTES,300:c('TimePlayingEnum').FIVE_MINUTES},t={CANVAS_ACTIVE:'active',CANVAS_INACTIVE:'inactive'},u=t.CANVAS_INACTIVE;function v(){return l&&k&&(i||j);}function w(){if(u==t.CANVAS_ACTIVE&&!v()){u=t.CANVAS_INACTIVE;var aa=Date.now()-n;c('ScriptPath').closeOverlayView('canvas',n?{ms_since_open:aa}:null);q+=aa;for(var ba in s)if(Object.prototype.hasOwnProperty.call(s,ba)&&q>ba*h){var ca=s[ba];c('Banzai').post('canvas_playing_game',{played:ca,app_id:r});delete s[ba];}if(Date.now()-o>60*h){var da=aa+p;c('Banzai').post('canvas_time_spent',[da,r]);o=Date.now();p=0;}else p=n?aa+p:p;}else if(u==t.CANVAS_INACTIVE&&v()){u=t.CANVAS_ACTIVE;n=Date.now();if(!o)o=Date.now();c('ScriptPath').openOverlayView('canvas');}}c('Banzai').subscribe(c('Banzai').SHUTDOWN,function(){if(v())c('ScriptPath').closeOverlayView('canvas',n?{ms_since_open:Date.now()-n}:null);});function x(aa){c('clickRefAction')('canvas',m,aa,'FORCE').set_namespace('canvas');switch(aa.type){case 'beforeunload':l=false;i=false;j=false;break;case 'visible':l=true;break;case 'hidden':l=false;break;case 'mouseover':j=true;break;case 'mouseout':j=false;break;case 'focus':case 'blur':i=c('getActiveElement')()==c('$')('iframe_canvas');break;default:break;}w();}function y(aa){var ba=document.createEvent('FocusEvent');ba.initEvent(aa,true,true);return ba;}var z={trackState:function aa(ba,ca){r=ca;l=!c('Visibility').isHidden();k=document.hasFocus();i=c('getActiveElement')()==c('$')('iframe_canvas');j=ba.querySelector(':hover')!==null;w();c('Event').listen(ba,'mouseover',x);c('Event').listen(ba,'mouseout',x);c('Event').listen(window,'blur',x);c('Event').listen(window,'focus',x);c('Event').listen(window,'beforeunload',x);c('Visibility').addListener('hidden',function(){return x(y('hidden'));});c('Visibility').addListener('visible',function(){return x(y('visible'));});c('setIntervalAcrossTransitions')(function(){k=document.hasFocus();w();},h);}};f.exports=z;}),null);
__d('CanvasResizer',['createArrayFromMixed','CSS','DOMEventListener','Vector'],(function a(b,c,d,e,f,g){var h;function i(){var k,l=document.documentElement;if(window.innerHeight){k=window.innerHeight;}else if(l&&l.clientHeight){k=l.clientHeight;}else k=document.body.clientHeight;for(var m=0;m<h.length;m++){var n=h[m];if(!c('CSS').hasClass(n,'noresize')){var o=c('Vector').getElementPosition(n,'document').y,p=k-o;n.style.height=p/(h.length-m)+'px';}}}c('DOMEventListener').add(window,'resize',i);var j={smartSizingFrameAdded:function k(){h=[];var l=c('createArrayFromMixed')(document.getElementsByTagName('iframe'));l.forEach(function(m){if(c('CSS').hasClass(m,'smart_sizing_iframe')&&!c('CSS').hasClass(m,'noresize')){c('CSS').removeClass(m,'canvas_iframe_util');h.push(m);}});i();}};f.exports=j;}),null);
__d('getNormalizedClientRect',['getDocumentScrollElement'],(function a(b,c,d,e,f,g){'use strict';function h(i){var j=i.getBoundingClientRect(),k=0,l=0,m=c('getDocumentScrollElement')(i.ownerDocument),n=m.getBoundingClientRect();if(n.left>0){k=-n.left;}else{var o=m.scrollWidth+n.left,p=n.width;if(p>o)k=p-o;}if(n.top>0)l=-n.top;return {bottom:j.bottom+l,height:j.height,left:j.left+k,right:j.right+k,top:j.top+l,width:j.width};}f.exports=h;}),null);
__d('StickyArea',['cx','CSS','DOM','DOMQuery','Event','Run','Style','ViewportBounds','getNormalizedClientRect','getOverlayZIndex','removeFromArray','throttle'],(function a(b,c,d,e,f,g,h){var i=[],j=null,k=null,l=c('throttle').acrossTransitions(o,1000),m='$$StickyArea_scrollListener',n='$$StickyArea_scrollListenerCount';function o(){i.sort(function(u,v){var w=u.getNode(),x=v.getNode();if(w.compareDocumentPosition){return 3-(w.compareDocumentPosition(x)&6);}else return w.sourceIndex-x.sourceIndex;});}function p(u,v,w){var x=u.getPlaceholder(),y=u.getNode(),z=c('Style').get(y,'float'),aa=u.getData();if(aa.placeholderWidth!==v||aa.placeholderHeight!==w||aa.placeholderFloat!==z){c('Style').apply(x,{'float':z,height:w+'px',width:v+'px'});aa.placeholderHeight=w;aa.placeholderWidth=v;}if(y.nextSibling!==x)c('DOM').insertAfter(y,x);}function q(u,v){var w=u.getData();if(w.fixed!==v){c('Style').apply(u.getNode(),w.styles);c('CSS').conditionShow(u.getPlaceholder(),v);c('CSS').conditionClass(u.getNode(),"_1a1e",v);c('Event').fire(u.getNode(),'change');w.fixed=v;}}function r(u,v){if(!u){return 0;}else if(v.right<=u.rect.left||v.left>=u.rect.right){return r(u.prev,v);}else return u.bottom;}function s(){var u=0,v=i.length,w=100,x=null;function y(z,aa){var ba=w;while(u<v){var ca=i[u],da=ca.getNode(),ea=ca._scrollTarget;if(aa&&!c('DOMQuery').contains(aa,da))break;w=Math.max(ba,ca.getZIndex());var fa=ca.getData(),ga=da.parentNode,ha=fa.styles;if(ga==null){u++;continue;}for(var ia in ha)ha[ia]='';q(ca,false);var ja=da.offsetHeight,ka=da.offsetWidth,la=ea!==window?ea.getBoundingClientRect().top:0,ma=c('getNormalizedClientRect')(da),na=r(z||(ea===window?x:null),ma)+ca.getOffset(),oa=ma.top-la;if(oa<=na){ha.width=ka+'px';var pa=parseInt(c('Style').get(ga,'padding-bottom'),10),qa=c('getNormalizedClientRect')(ga);if(qa.bottom-pa>na+ja||!ca.getIsBoundToContainer()){var ra=parseInt(c('Style').get(da,'margin-left'),10);ha.position='fixed';ha.bottom='auto';ha.top=na+la+'px';ha.left=ma.left-ra+'px';}else{if(!fa.parent||ga!==fa.parent){if(c('Style').get(ga,'position')==='static')c('Style').set(ga,'position','relative');fa.parent=ga;}ha.position='absolute';ha.top='auto';ha.bottom=pa+'px';var sa=parseInt(c('Style').get(ga,'border-left-width'),10);ha.left=ma.left-qa.left-sa+'px';}p(ca,ka,ja);q(ca,true);}u++;var ta={bottom:na+ja,prev:z,rect:ma},ua=0;if(!ca.getIsBoundToContainer()){x=ta;ua=100;}y(ta,ga);var va=ca.getZIndexOverride()||w+++ua;c('Style').set(da,'z-index',va);}}y(null,null);}function t(u,v,w){var x=arguments.length<=3||arguments[3]===undefined?{}:arguments[3];'use strict';this._isDestroyed=false;this._node=u;this._data={fixed:false,placeholderFloat:null,placeholderHeight:null,placeholderWidth:null,styles:{}};this._offset=w;this._boundToContainer=x.boundToContainer!==false;if(x.stickTo===t.stickTo.SCROLL_PARENT){this._scrollTarget=c('Style').getScrollParent(u.parentNode)||window;}else this._scrollTarget=window;this._zIndexOverride=x.zIndexOverride;c('CSS').addClass(u,"_k");if(!v)c('Run').onLeave(this.destroy.bind(this));if(!this._scrollTarget[m]){this._scrollTarget[m]=c('Event').listen(this._scrollTarget,'scroll',function(){l();s();});this._scrollTarget[n]=1;}else this._scrollTarget[n]++;if(!i.length){j=c('Event').listen(window,'resize',function(){l();s();});k=c('ViewportBounds').subscribe('change',function(){l();s();});}i.push(this);t.reflow();}t.prototype.destroy=function(){'use strict';if(this._isDestroyed)return;c('removeFromArray')(i,this);this._scrollTarget[n]--;if(this._scrollTarget[n]===0){this._scrollTarget[m].remove();this._scrollTarget[m]=null;}if(!i.length){j.remove();j=null;k.unsubscribe();k=null;}if(this._placeholder)c('DOM').remove(this._placeholder);var u=0;for(var v in this._data.styles){this._data.styles[v]='';u++;}if(u)c('Style').apply(this._node,this._data.styles);this._isDestroyed=true;};t.prototype.getData=function(){'use strict';return this._data;};t.prototype.getNode=function(){'use strict';return this._node;};t.prototype.getOffset=function(){'use strict';return this._offset||0;};t.prototype.getPlaceholder=function(){'use strict';if(!this._placeholder)this._placeholder=c('DOM').create('div');return this._placeholder;};t.prototype.getIsBoundToContainer=function(){'use strict';return this._boundToContainer;};t.prototype.getZIndexOverride=function(){'use strict';return this._zIndexOverride;};t.prototype.getZIndex=function(){'use strict';if(!this._zIndex)this._zIndex=c('getOverlayZIndex')(this._node);return this._zIndex;};t.prototype.setOffset=function(u){'use strict';this._offset=u;};t.reflow=c('throttle').acrossTransitions(function(){o();s();},100);t.stickTo={SCROLL_PARENT:'SCROLL_PARENT',WINDOW:'WINDOW'};f.exports=t;}),null);