if (self.CavalryLogger) { CavalryLogger.start_js(["d25Q1"]); }

__d('AsyncDOM',['CSS','DOM','ErrorUtils'],(function a(b,c,d,e,f,g){var h={invoke:function i(j,k){for(var l=0;l<j.length;++l){var m=j[l],n=m[0],o=m[1],p=m[2],q=m[3],r=p&&k||null;if(o)r=c('DOM').scry(r||document.documentElement,o)[0];switch(n){case 'eval':new Function(q).apply(r);break;case 'hide':c('CSS').hide(r);break;case 'show':c('CSS').show(r);break;case 'setContent':c('DOM').setContent(r,q);break;case 'appendContent':c('DOM').appendContent(r,q);break;case 'prependContent':c('DOM').prependContent(r,q);break;case 'insertAfter':c('DOM').insertAfter(r,q);break;case 'insertBefore':c('DOM').insertBefore(r,q);break;case 'remove':c('DOM').remove(r);break;case 'replace':c('DOM').replace(r,q);break;default:}}}};f.exports=h;}),null);
__d('Live',['Arbiter','AsyncDOM','AsyncSignal','ChannelConstants','DataStore','DOM','ServerJS','emptyFunction'],(function a(b,c,d,e,f,g){function h(j,k){k=JSON.parse(JSON.stringify(k));new (c('ServerJS'))().setRelativeTo(j).handle(k);}var i={logAll:false,startup:function j(k){i.logAll=k;i.startup=c('emptyFunction');c('Arbiter').subscribe(c('ChannelConstants').getArbiterType('live'),i.handleMessage.bind(i));},lookupLiveNode:function j(k,l){var m=c('DOM').scry(document.body,'.live_'+k+'_'+l);m.forEach(function(n){if(c('DataStore').get(n,'seqnum')===undefined){var o=JSON.parse(n.getAttribute('data-live'));c('DataStore').set(n,'seqnum',o.seq);}});return m;},handleMessage:function j(k,l){var m=l.obj,n=m.fbid,o=m.assoc,p=this.lookupLiveNode(n,o);if(!p)return false;p.forEach(function(q){c('AsyncDOM').invoke(m.updates,q);if(m.js)h(q,m.js);});},log:function j(){if(i.logAll){var k=Array.from(arguments).join(':');new (c('AsyncSignal'))('/common/scribe_endpoint.php',{c:'live_sequence',m:k}).send();}}};f.exports=i;}),null);