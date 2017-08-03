if (self.CavalryLogger) { CavalryLogger.start_js(["jNgMf"]); }

__d("XUFITypingIndicatorController",["XController"],(function a(b,c,d,e,f,g){f.exports=c("XController").create("\/ufi\/typing\/{feedback_id}\/{update}\/",{feedback_id:{type:"String",required:true},parent_comment_id:{type:"String"},update:{type:"Enum",required:true,enumType:1},session_id:{type:"String"}});}),null);
__d('AbstractCommentLiveTypingPublisher',['ActorURI','ChannelClientID','XUFITypingIndicatorController','destroyOnUnload'],(function a(b,c,d,e,f,g){'use strict';var h=10*1000,i=10*1000,j=200;function k(m,n,o){this.$PublishURIBuilder1=m;this.$PublishURIBuilder2=n;this.$PublishURIBuilder3=o;}k.prototype.$PublishURIBuilder4=function(){var m=c('XUFITypingIndicatorController').getURIBuilder().setString('session_id',c('ChannelClientID').getID()).setString('feedback_id',''+this.$PublishURIBuilder1);if(this.$PublishURIBuilder2)m.setString('parent_comment_id',''+this.$PublishURIBuilder2);return m;};k.prototype.$PublishURIBuilder5=function(m){var n=m.getURI();if(this.$PublishURIBuilder3)n=c('ActorURI').create(n,this.$PublishURIBuilder3);return n;};k.prototype.buildStartURI=function(){return this.$PublishURIBuilder5(this.$PublishURIBuilder4().setEnum('update','start'));};k.prototype.buildStopURI=function(){return this.$PublishURIBuilder5(this.$PublishURIBuilder4().setEnum('update','stop'));};function l(m,n,o){this.$AbstractCommentLiveTypingPublisher1=new k(m,n,o);this.$AbstractCommentLiveTypingPublisher2=null;this.$AbstractCommentLiveTypingPublisher3=null;this.$AbstractCommentLiveTypingPublisher4=-1;c('destroyOnUnload')(this.destroy.bind(this));if(window.addEventListener)window.addEventListener('unload',function(){this.destroy();}.bind(this));}l.prototype.destroy=function(){this.$AbstractCommentLiveTypingPublisher5();this.$AbstractCommentLiveTypingPublisher6();this.$AbstractCommentLiveTypingPublisher7();};l.prototype.handleStartEvent=function(){if(!this.$AbstractCommentLiveTypingPublisher8())this.$AbstractCommentLiveTypingPublisher9();this.$AbstractCommentLiveTypingPublisher10();};l.prototype.handleStopEvent=function(){this.$AbstractCommentLiveTypingPublisher5();};l.prototype.getStartURI=function(){return this.$AbstractCommentLiveTypingPublisher1.buildStartURI();};l.prototype.getStopURI=function(){return this.$AbstractCommentLiveTypingPublisher1.buildStopURI();};l.prototype.ajaxPublishStartEvent=function(){throw new Error('ajaxPublishStartEvent should be overridden by subclass');};l.prototype.ajaxPublishStopEvent=function(){throw new Error('ajaxPublishStopEvent should be overridden by subclass');};l.prototype.$AbstractCommentLiveTypingPublisher8=function(){return !!this.$AbstractCommentLiveTypingPublisher2;};l.prototype.$AbstractCommentLiveTypingPublisher6=function(){if(this.$AbstractCommentLiveTypingPublisher3){clearTimeout(this.$AbstractCommentLiveTypingPublisher3);this.$AbstractCommentLiveTypingPublisher3=null;}};l.prototype.$AbstractCommentLiveTypingPublisher7=function(){if(this.$AbstractCommentLiveTypingPublisher2){clearTimeout(this.$AbstractCommentLiveTypingPublisher2);this.$AbstractCommentLiveTypingPublisher2=null;}};l.prototype.$AbstractCommentLiveTypingPublisher10=function(){var m=Date.now(),n=this.$AbstractCommentLiveTypingPublisher4;if(m>n+j){this.$AbstractCommentLiveTypingPublisher4=m;this.$AbstractCommentLiveTypingPublisher6();this.$AbstractCommentLiveTypingPublisher3=setTimeout(function(){this.$AbstractCommentLiveTypingPublisher5();}.bind(this),i);}};l.prototype.$AbstractCommentLiveTypingPublisher5=function(){if(this.$AbstractCommentLiveTypingPublisher8()){this.ajaxPublishStopEvent();this.$AbstractCommentLiveTypingPublisher7();}this.$AbstractCommentLiveTypingPublisher6();};l.prototype.$AbstractCommentLiveTypingPublisher9=function(){this.ajaxPublishStartEvent();this.$AbstractCommentLiveTypingPublisher7();this.$AbstractCommentLiveTypingPublisher2=setTimeout(function(){this.$AbstractCommentLiveTypingPublisher9();}.bind(this),h);};f.exports=l;}),null);
__d('UFIAddCommentLiveTypingPublisher',['AbstractCommentLiveTypingPublisher','AsyncRequest'],(function a(b,c,d,e,f,g){'use strict';var h,i;h=babelHelpers.inherits(j,c('AbstractCommentLiveTypingPublisher'));i=h&&h.prototype;function j(k,l,m){i.constructor.call(this,k,l,m);this.$UFIAddCommentLiveTypingPublisher1=null;this.$UFIAddCommentLiveTypingPublisher2=null;}j.prototype.handleStartEvent=function(){i.handleStartEvent.call(this);};j.prototype.handleStopEvent=function(){i.handleStopEvent.call(this);};j.prototype.ajaxPublishStartEvent=function(){if(this.$UFIAddCommentLiveTypingPublisher1)return;if(this.$UFIAddCommentLiveTypingPublisher2){this.$UFIAddCommentLiveTypingPublisher2.abort();this.$UFIAddCommentLiveTypingPublisher2=null;}var k=this.getStartURI();this.$UFIAddCommentLiveTypingPublisher1=new (c('AsyncRequest'))().setURI(k).setFinallyHandler(function(){this.$UFIAddCommentLiveTypingPublisher1=null;}.bind(this));this.$UFIAddCommentLiveTypingPublisher1.send();};j.prototype.ajaxPublishStopEvent=function(){if(this.$UFIAddCommentLiveTypingPublisher2)return;if(this.$UFIAddCommentLiveTypingPublisher1){this.$UFIAddCommentLiveTypingPublisher1.abort();this.$UFIAddCommentLiveTypingPublisher1=null;}var k=this.getStopURI();this.$UFIAddCommentLiveTypingPublisher2=new (c('AsyncRequest'))().setURI(k).setFinallyHandler(function(){this.$UFIAddCommentLiveTypingPublisher2=null;}.bind(this));this.$UFIAddCommentLiveTypingPublisher2.send();};f.exports=j;}),null);