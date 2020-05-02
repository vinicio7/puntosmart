if (self.CavalryLogger) { CavalryLogger.start_js(["GC9pZ"]); }

__d("DisplayGenderConst",[],(function a(b,c,d,e,f,g){f.exports={UNKNOWN:"UNKNOWN",FEMALE:"FEMALE",MALE:"MALE"};}),null);
__d('HovercardLinkParams',['HovercardLink'],(function a(b,c,d,e,f,g){f.exports={getHovercardParams:function h(i,j,k){return {'data-hovercard':c('HovercardLink').constructEndpointWithGroupLocationAndExtraParams({id:i},null,null,null,j).addQueryData(k).toString()};}};}),null);
__d('CrisisEmergencyPhoneRow.react',['ix','cx','fbt','FBCircularGlyph.react','ImageBlock.react','InlineBlock.react','React','XUIText.react','fbglyph'],(function a(b,c,d,e,f,g,h,i,j){'use strict';var k,l,m=29;k=babelHelpers.inherits(n,c('React').Component);l=k&&k.prototype;n.prototype.render=function(){return c('React').createElement(c('ImageBlock.react'),this.props,c('React').createElement(c('FBCircularGlyph.react'),{circleSize:m,glyph:h("118558"),className:"_1kqp"}),c('React').createElement(c('InlineBlock.react'),{alignv:'middle',height:m,className:"_3-99"},c('React').createElement(c('XUIText.react'),{size:'small',weight:'normal',className:"_1kqq"},j._("Si necesitas ayuda urgente, llama al n\u00famero local de emergencias."))));};function n(){k.apply(this,arguments);}f.exports=n;}),null);
__d("CrisisStaticMap_crisis.graphql",[],(function a(b,c,d,e,f,g){'use strict';var h={argumentDefinitions:[],kind:"Fragment",metadata:null,name:"CrisisStaticMap_crisis",selections:[{kind:"LinkedField",alias:null,args:null,concreteType:"CrisisGeoArea",name:"crisis_geo_area",plural:false,selections:[{kind:"LinkedField",alias:null,args:null,concreteType:"CrisisGeoAreaDisplayConfig",name:"display_config",plural:false,selections:[{kind:"ScalarField",alias:null,args:null,name:"display_type",storageKey:null},{kind:"ScalarField",alias:null,args:null,name:"latitude",storageKey:null},{kind:"ScalarField",alias:null,args:null,name:"longitude",storageKey:null},{kind:"ScalarField",alias:null,args:null,name:"circle_latitude",storageKey:null},{kind:"ScalarField",alias:null,args:null,name:"circle_longitude",storageKey:null},{kind:"ScalarField",alias:null,args:null,name:"zoom",storageKey:null}],storageKey:null}],storageKey:null}],type:"Crisis"};f.exports=h;}),null);
__d('CrisisStaticMap.react',['cx','CrisisGeoAreaDisplayType','FBCircleOverlay.react','FBTilesMap.react','GeoCoordinates','LeafletView','React','emptyFunction','idx','keyMirror','RelayModern','CrisisStaticMap_crisis.graphql'],(function a(b,c,d,e,f,g,h){'use strict';var i,j,k=c('RelayModern').createFragmentContainer,l=c('RelayModern').graphql,m=c('keyMirror')(c('CrisisGeoAreaDisplayType'));i=babelHelpers.inherits(n,c('React').Component);j=i&&i.prototype;n.prototype.render=function(){var o,p,q,r,s,t,u,v=this.props,w=v.crisis,x=v.width,y=v.height,z=v.circleWidth,aa=(o=w)!=null?(o=o.crisis_geo_area)!=null?o.display_config:o:o,ba=((p=aa)!=null?p.display_type:p)===m.SINGLE_CIRCLE,ca=ba?(q=aa)!=null?q.circle_latitude:q:(r=aa)!=null?r.latitude:r,da=ba?(s=aa)!=null?s.circle_longitude:s:(t=aa)!=null?t.longitude:t;if(ca==null||da==null)return null;return c('React').createElement('div',{className:"_26-3",style:{width:x,height:y}},c('React').createElement(c('FBTilesMap.react'),{className:"_26-4",defaultOptions:{boxZoom:false,doubleClickZoom:false,dragging:false,keyboard:false,scrollWheelZoom:false,tab:false,touchZoom:false},onViewChange:c('emptyFunction'),attributionLogoPosition:{horizontal:'right',vertical:'bottom'},showReportButton:false,showZoomControls:false,view:new (c('LeafletView'))({center:new (c('GeoCoordinates'))(ca,da),zoom:((u=aa)!=null?u.zoom:u)||1})}),ba&&c('React').createElement(c('FBCircleOverlay.react'),{color:'rgba(185, 202, 210, 0.4)',invert:true,width:z}));};function n(){i.apply(this,arguments);}f.exports=k(n,{crisis:function o(){return c('CrisisStaticMap_crisis.graphql');}});}),null);
__d("CrisisAboutLocationList_crisis.graphql",[],(function a(b,c,d,e,f,g){'use strict';var h={argumentDefinitions:[],kind:"Fragment",metadata:null,name:"CrisisAboutLocationList_crisis",selections:[{kind:"ScalarField",alias:null,args:null,name:"creation_time",storageKey:null},{kind:"LinkedField",alias:null,args:null,concreteType:"CrisisGeoArea",name:"crisis_geo_area",plural:false,selections:[{kind:"LinkedField",alias:null,args:[{kind:"Literal",name:"first",value:50,type:"Int"}],concreteType:"CrisisGeoAreaToGeoAreaLocationPagesConnection",name:"main_location_pages",plural:false,selections:[{kind:"LinkedField",alias:null,args:null,concreteType:"CrisisGeoAreaToGeoAreaLocationPagesEdge",name:"edges",plural:true,selections:[{kind:"LinkedField",alias:null,args:null,concreteType:"Page",name:"node",plural:false,selections:[{kind:"ScalarField",alias:null,args:null,name:"display_name",storageKey:null},{kind:"ScalarField",alias:null,args:null,name:"is_city_page",storageKey:null},{kind:"ScalarField",alias:null,args:null,name:"is_country_page",storageKey:null},{kind:"ScalarField",alias:null,args:null,name:"is_region_page",storageKey:null}],storageKey:null}],storageKey:null}],storageKey:"main_location_pages{\"first\":50}"}],storageKey:null}],type:"Crisis"};f.exports=h;}),null);
__d('splitCrisisLocationList',[],(function a(b,c,d,e,f,g){'use strict';f.exports=function h(i){return (i||[]).reduce(function(j,k){var l=k.node||{},m=l.is_city_page,n=l.is_region_page,o=l.is_country_page,p=l.display_name;if(!p)return j;if(m){j.cities.push(p);}else if(n){j.regions.push(p);}else if(o)j.countries.push(p);return j;},{cities:[],regions:[],countries:[]});};}),null);
__d('CrisisAboutLocationList.react',['cx','fbt','React','XUIText.react','formatDate','idx','intlList','splitCrisisLocationList','RelayModern','CrisisAboutLocationList_crisis.graphql'],(function a(b,c,d,e,f,g,h,i){'use strict';var j,k,l=c('RelayModern').createFragmentContainer,m=c('RelayModern').graphql,n=5;j=babelHelpers.inherits(o,c('React').Component);k=j&&j.prototype;o.prototype.render=function(){var q,r=this.props,s=r.crisis,t=r.inlineLocations,u=c('splitCrisisLocationList')((q=s)!=null?(q=q.crisis_geo_area)!=null?(q=q.main_location_pages)!=null?q.edges:q:q:q);return c('React').createElement('div',null,c('React').createElement(p,{title:i._("Cu\u00e1ndo:"),listItems:[c('formatDate')(s.creation_time,'F j, Y')],inline:t}),c('React').createElement(p,{title:i._({"*":"Ciudades afectadas:","268435456":"Ciudad afectada:"},[i.plural(u.cities.length)]),listItems:u.cities,inline:t}),c('React').createElement(p,{title:i._({"*":"Regiones afectadas:","268435456":"Regi\u00f3n afectada:"},[i.plural(u.regions.length)]),listItems:u.regions,inline:t}),c('React').createElement(p,{title:i._({"*":"Pa\u00edses afectados:","268435456":"Pa\u00eds afectado:"},[i.plural(u.countries.length)]),listItems:u.countries,inline:t}));};function o(){j.apply(this,arguments);}o.defaultProps={inline:false};var p=function q(r){var s=r.title,t=r.listItems,u=r.inline;if(!t.length)return null;return c('React').createElement(c('XUIText.react'),{display:'block',className:(u?"_3-95":'')+(!u?' '+"_3-97":'')},c('React').createElement(c('XUIText.react'),{display:u?'inline':'block',size:u?'small':'medium',weight:'bold'},s),' ',u?c('React').createElement(c('XUIText.react'),{size:'small',weight:'normal'},t.length<=n?c('intlList')(t,c('intlList').CONJUNCTIONS.AND,c('intlList').DELIMITERS.SEMICOLON):i._({"*":"{location_names} y {number} m\u00e1s","268435456":"{location_names} y una m\u00e1s"},[i.param('location_names',c('intlList')(t.slice(0,n),c('intlList').CONJUNCTIONS.NONE,c('intlList').DELIMITERS.SEMICOLON)),i.plural(t.length-n,'number')])):t.map(function(v){return c('React').createElement(c('XUIText.react'),{key:v,display:'block',size:'medium'},v);}));};f.exports=l(o,{crisis:function q(){return c('CrisisAboutLocationList_crisis.graphql');}});}),null);
__d("CrisisNC4Description_nc4.graphql",[],(function a(b,c,d,e,f,g){'use strict';var h={argumentDefinitions:[],kind:"Fragment",metadata:null,name:"CrisisNC4Description_nc4",selections:[{kind:"ScalarField",alias:null,args:null,name:"locale",storageKey:null},{kind:"ScalarField",alias:null,args:null,name:"translated_value",storageKey:null},{kind:"ScalarField",alias:null,args:null,name:"updated_time",storageKey:null}],type:"NC4Description"};f.exports=h;}),null);
__d('CrisisNC4Description.react',['cx','fbt','CrisisContent','LineClamp.react','Link.react','React','XUIGrayText.react','XUIText.react','RelayModern','formatDate','idx','nullthrows','CrisisNC4Description_nc4.graphql'],(function a(b,c,d,e,f,g,h,i){'use strict';var j,k,l=c('RelayModern').createFragmentContainer,m=c('RelayModern').graphql;j=babelHelpers.inherits(n,c('React').Component);k=j&&j.prototype;n.prototype.render=function(){var o,p,q,r=this.props,s=r.nc4,t=r.numberOfLines,u=r.seeMoreURI,v=(o=s)!=null?o.translated_value:o;if(!v)return null;var w=(p=s)!=null?p.locale:p,x=(q=s)!=null?q.updated_time:q,y=c('React').createElement(c('XUIText.react'),{display:'block',size:t?'small':'medium',weight:'normal',className:"_1i1-"},v);return c('React').createElement(c('XUIText.react'),{display:'block',className:"_13hb"},c('React').createElement(c('XUIText.react'),{display:'block',className:"_3-96"},t?c('React').createElement(c('XUIText.react'),null,c('React').createElement(c('LineClamp.react'),{className:"_3-94",fitHeightToShorterText:true,lines:t,lineHeight:18},y),c('React').createElement(c('XUIText.react'),{size:'small'},c('React').createElement(c('Link.react'),{href:c('nullthrows')(u)},c('CrisisContent').getSeeMoreInformationText()))):y),x&&c('React').createElement(c('XUIGrayText.react'),{display:'block',shade:'light',size:'small',className:"_1i20"},i._("\u00daltima actualizaci\u00f3n: {date} a las {time}",[i.param('date',c('formatDate')(x,'F j, Y')),i.param('time',c('formatDate')(x,'g:ia'))])),c('React').createElement(c('XUIGrayText.react'),{display:'block',shade:'light',size:'small'},i._("Esta informaci\u00f3n la facilita NC4, una empresa de seguridad independiente."),' ',w!=='en_US'&&i._("La traducci\u00f3n la ha de realizar una empresa de servicios de traducci\u00f3n externa.")));};function n(){j.apply(this,arguments);}f.exports=l(n,{nc4:function o(){return c('CrisisNC4Description_nc4.graphql');}});}),null);
__d("CrisisFriendRow_crisis.graphql",[],(function a(b,c,d,e,f,g){'use strict';var h={argumentDefinitions:[],kind:"Fragment",metadata:null,name:"CrisisFriendRow_crisis",selections:[{kind:"ScalarField",alias:null,args:null,name:"id",storageKey:null},{kind:"ScalarField",alias:null,args:null,name:"can_user_mark_other_safe",storageKey:null},{kind:"FragmentSpread",name:"createCrisisProfileFragmentContainer_crisis",args:null}],type:"Crisis"};f.exports=h;}),null);
__d("CrisisFriendRow_user.graphql",[],(function a(b,c,d,e,f,g){'use strict';var h={argumentDefinitions:[{kind:"RootArgument",name:"crisisID",type:"ID"}],kind:"Fragment",metadata:null,name:"CrisisFriendRow_user",selections:[{kind:"ScalarField",alias:null,args:null,name:"id",storageKey:null},{kind:"ScalarField",alias:null,args:null,name:"gender",storageKey:null},{kind:"ScalarField",alias:null,args:null,name:"name",storageKey:null},{kind:"ScalarField",alias:null,args:null,name:"url",storageKey:null},{kind:"LinkedField",alias:null,args:[{kind:"Variable",name:"crisis_id",variableName:"crisisID",type:"ID"}],concreteType:"CrisisUserInfo",name:"crisis_user_info",plural:false,selections:[{kind:"ScalarField",alias:null,args:null,name:"can_viewer_mark_safe",storageKey:null},{kind:"LinkedField",alias:null,args:[{kind:"Literal",name:"first",value:1,type:"Int"}],concreteType:"CrisisUserInfoToInvitersConnection",name:"inviters",plural:false,selections:[{kind:"ScalarField",alias:null,args:null,name:"count",storageKey:null},{kind:"LinkedField",alias:null,args:null,concreteType:"CrisisUserInfoToInvitersEdge",name:"edges",plural:true,selections:[{kind:"LinkedField",alias:null,args:null,concreteType:"User",name:"node",plural:false,selections:[{kind:"ScalarField",alias:null,args:null,name:"id",storageKey:null},{kind:"ScalarField",alias:null,args:null,name:"name",storageKey:null},{kind:"ScalarField",alias:null,args:null,name:"url",storageKey:null}],storageKey:null}],storageKey:null}],storageKey:"inviters{\"first\":1}"},{kind:"FragmentSpread",name:"createCrisisProfileFragmentContainer_userInfo",args:null}],storageKey:null},{kind:"FragmentSpread",name:"CrisisProfileRow_user",args:null},{kind:"FragmentSpread",name:"createCrisisProfileFragmentContainer_user",args:null}],type:"User"};f.exports=h;}),null);
__d("CrisisInviteFriendMutation.graphql",[],(function a(b,c,d,e,f,g){'use strict';var h={fragment:{argumentDefinitions:[{kind:"LocalArgument",name:"input",type:"InviteFriendData!",defaultValue:null}],kind:"Fragment",metadata:null,name:"CrisisInviteFriendMutation",selections:[{kind:"LinkedField",alias:null,args:[{kind:"Variable",name:"data",variableName:"input",type:"InviteFriendData!"}],concreteType:"InviteFriendResponsePayload",name:"invite_friend",plural:false,selections:[{kind:"LinkedField",alias:null,args:null,concreteType:"CrisisUserInfo",name:"crisis_user_info",plural:false,selections:[{kind:"ScalarField",alias:null,args:null,name:"invited_by_viewer",storageKey:null},{kind:"LinkedField",alias:null,args:null,concreteType:"CrisisUserInfoToInvitersConnection",name:"inviters",plural:false,selections:[{kind:"ScalarField",alias:null,args:null,name:"count",storageKey:null}],storageKey:null},{kind:"LinkedField",alias:"firstInviter",args:[{kind:"Literal",name:"first",value:1,type:"Int"}],concreteType:"CrisisUserInfoToInvitersConnection",name:"inviters",plural:false,selections:[{kind:"ScalarField",alias:null,args:null,name:"count",storageKey:null},{kind:"LinkedField",alias:null,args:null,concreteType:"CrisisUserInfoToInvitersEdge",name:"edges",plural:true,selections:[{kind:"LinkedField",alias:null,args:null,concreteType:"User",name:"node",plural:false,selections:[{kind:"ScalarField",alias:null,args:null,name:"id",storageKey:null},{kind:"ScalarField",alias:null,args:null,name:"name",storageKey:null},{kind:"ScalarField",alias:null,args:null,name:"url",storageKey:null}],storageKey:null}],storageKey:null}],storageKey:"inviters{\"first\":1}"}],storageKey:null}],storageKey:null}],type:"Mutation"},id:"1467091926681675",kind:"Batch",metadata:{},name:"CrisisInviteFriendMutation",query:{argumentDefinitions:[{kind:"LocalArgument",name:"input",type:"InviteFriendData!",defaultValue:null}],kind:"Root",name:"CrisisInviteFriendMutation",operation:"mutation",selections:[{kind:"LinkedField",alias:null,args:[{kind:"Variable",name:"data",variableName:"input",type:"InviteFriendData!"}],concreteType:"InviteFriendResponsePayload",name:"invite_friend",plural:false,selections:[{kind:"LinkedField",alias:null,args:null,concreteType:"CrisisUserInfo",name:"crisis_user_info",plural:false,selections:[{kind:"ScalarField",alias:null,args:null,name:"invited_by_viewer",storageKey:null},{kind:"LinkedField",alias:null,args:null,concreteType:"CrisisUserInfoToInvitersConnection",name:"inviters",plural:false,selections:[{kind:"ScalarField",alias:null,args:null,name:"count",storageKey:null}],storageKey:null},{kind:"LinkedField",alias:"firstInviter",args:[{kind:"Literal",name:"first",value:1,type:"Int"}],concreteType:"CrisisUserInfoToInvitersConnection",name:"inviters",plural:false,selections:[{kind:"ScalarField",alias:null,args:null,name:"count",storageKey:null},{kind:"LinkedField",alias:null,args:null,concreteType:"CrisisUserInfoToInvitersEdge",name:"edges",plural:true,selections:[{kind:"LinkedField",alias:null,args:null,concreteType:"User",name:"node",plural:false,selections:[{kind:"ScalarField",alias:null,args:null,name:"id",storageKey:null},{kind:"ScalarField",alias:null,args:null,name:"name",storageKey:null},{kind:"ScalarField",alias:null,args:null,name:"url",storageKey:null}],storageKey:null}],storageKey:null}],storageKey:"inviters{\"first\":1}"},{kind:"ScalarField",alias:null,args:null,name:"id",storageKey:null}],storageKey:null}],storageKey:null}]},text:null};f.exports=h;}),null);
__d('CrisisInviteFriendMutation',['CrisisMutationHandlers','RelayModern','CrisisInviteFriendMutation.graphql'],(function a(b,c,d,e,f,g){'use strict';var h=c('RelayModern').commitMutation,i=c('RelayModern').graphql,j=function l(){return c('CrisisInviteFriendMutation.graphql');};function k(l,m,n){var o=m.crisisID,p=m.userID,q=n||{},r=q.onSuccess,s=q.onFailure;return h(l,babelHelpers['extends']({mutation:j,updater:c('CrisisMutationHandlers').getFriendMutationManualUpdater(o,p,'invite_friend'),variables:{input:{crisis_id:o,user_id:p}}},c('CrisisMutationHandlers').get(r,s)));}f.exports={commit:k};}),null);
__d("CrisisMarkFriendSafeMutation.graphql",[],(function a(b,c,d,e,f,g){'use strict';var h={fragment:{argumentDefinitions:[{kind:"LocalArgument",name:"input",type:"MarkFriendSafeData!",defaultValue:null}],kind:"Fragment",metadata:null,name:"CrisisMarkFriendSafeMutation",selections:[{kind:"LinkedField",alias:null,args:[{kind:"Variable",name:"data",variableName:"input",type:"MarkFriendSafeData!"}],concreteType:"MarkFriendSafeResponsePayload",name:"mark_friend_safe",plural:false,selections:[{kind:"LinkedField",alias:null,args:null,concreteType:"CrisisUserInfo",name:"crisis_user_info",plural:false,selections:[{kind:"ScalarField",alias:null,args:null,name:"declared_location",storageKey:null},{kind:"ScalarField",alias:null,args:null,name:"can_viewer_mark_safe",storageKey:null},{kind:"ScalarField",alias:null,args:null,name:"marked_safe_by_viewer",storageKey:null},{kind:"LinkedField",alias:null,args:null,concreteType:"UserInfoToTaggersConnection",name:"taggers",plural:false,selections:[{kind:"ScalarField",alias:null,args:null,name:"count",storageKey:null},{kind:"LinkedField",alias:null,args:null,concreteType:"UserInfoToTaggersEdge",name:"edges",plural:true,selections:[{kind:"ScalarField",alias:null,args:null,name:"time",storageKey:null},{kind:"LinkedField",alias:null,args:null,concreteType:"User",name:"node",plural:false,selections:[{kind:"ScalarField",alias:null,args:null,name:"id",storageKey:null},{kind:"ScalarField",alias:null,args:null,name:"name",storageKey:null},{kind:"ScalarField",alias:null,args:null,name:"url",storageKey:null}],storageKey:null}],storageKey:null}],storageKey:null},{kind:"LinkedField",alias:"firstTagger",args:[{kind:"Literal",name:"first",value:1,type:"Int"}],concreteType:"UserInfoToTaggersConnection",name:"taggers",plural:false,selections:[{kind:"ScalarField",alias:null,args:null,name:"count",storageKey:null},{kind:"LinkedField",alias:null,args:null,concreteType:"UserInfoToTaggersEdge",name:"edges",plural:true,selections:[{kind:"ScalarField",alias:null,args:null,name:"time",storageKey:null},{kind:"LinkedField",alias:null,args:null,concreteType:"User",name:"node",plural:false,selections:[{kind:"ScalarField",alias:null,args:null,name:"id",storageKey:null},{kind:"ScalarField",alias:null,args:null,name:"name",storageKey:null},{kind:"ScalarField",alias:null,args:null,name:"url",storageKey:null}],storageKey:null}],storageKey:null}],storageKey:"taggers{\"first\":1}"},{kind:"LinkedField",alias:null,args:null,concreteType:"Story",name:"safe_story",plural:false,selections:[{kind:"ScalarField",alias:null,args:null,name:"id",storageKey:null},{kind:"LinkedField",alias:null,args:null,concreteType:"TextWithEntities",name:"message",plural:false,selections:[{kind:"ScalarField",alias:null,args:null,name:"text",storageKey:null}],storageKey:null}],storageKey:null}],storageKey:null}],storageKey:null}],type:"Mutation"},id:"1339964456111089",kind:"Batch",metadata:{},name:"CrisisMarkFriendSafeMutation",query:{argumentDefinitions:[{kind:"LocalArgument",name:"input",type:"MarkFriendSafeData!",defaultValue:null}],kind:"Root",name:"CrisisMarkFriendSafeMutation",operation:"mutation",selections:[{kind:"LinkedField",alias:null,args:[{kind:"Variable",name:"data",variableName:"input",type:"MarkFriendSafeData!"}],concreteType:"MarkFriendSafeResponsePayload",name:"mark_friend_safe",plural:false,selections:[{kind:"LinkedField",alias:null,args:null,concreteType:"CrisisUserInfo",name:"crisis_user_info",plural:false,selections:[{kind:"ScalarField",alias:null,args:null,name:"declared_location",storageKey:null},{kind:"ScalarField",alias:null,args:null,name:"can_viewer_mark_safe",storageKey:null},{kind:"ScalarField",alias:null,args:null,name:"marked_safe_by_viewer",storageKey:null},{kind:"LinkedField",alias:null,args:null,concreteType:"UserInfoToTaggersConnection",name:"taggers",plural:false,selections:[{kind:"ScalarField",alias:null,args:null,name:"count",storageKey:null},{kind:"LinkedField",alias:null,args:null,concreteType:"UserInfoToTaggersEdge",name:"edges",plural:true,selections:[{kind:"ScalarField",alias:null,args:null,name:"time",storageKey:null},{kind:"LinkedField",alias:null,args:null,concreteType:"User",name:"node",plural:false,selections:[{kind:"ScalarField",alias:null,args:null,name:"id",storageKey:null},{kind:"ScalarField",alias:null,args:null,name:"name",storageKey:null},{kind:"ScalarField",alias:null,args:null,name:"url",storageKey:null}],storageKey:null}],storageKey:null}],storageKey:null},{kind:"LinkedField",alias:"firstTagger",args:[{kind:"Literal",name:"first",value:1,type:"Int"}],concreteType:"UserInfoToTaggersConnection",name:"taggers",plural:false,selections:[{kind:"ScalarField",alias:null,args:null,name:"count",storageKey:null},{kind:"LinkedField",alias:null,args:null,concreteType:"UserInfoToTaggersEdge",name:"edges",plural:true,selections:[{kind:"ScalarField",alias:null,args:null,name:"time",storageKey:null},{kind:"LinkedField",alias:null,args:null,concreteType:"User",name:"node",plural:false,selections:[{kind:"ScalarField",alias:null,args:null,name:"id",storageKey:null},{kind:"ScalarField",alias:null,args:null,name:"name",storageKey:null},{kind:"ScalarField",alias:null,args:null,name:"url",storageKey:null}],storageKey:null}],storageKey:null}],storageKey:"taggers{\"first\":1}"},{kind:"LinkedField",alias:null,args:null,concreteType:"Story",name:"safe_story",plural:false,selections:[{kind:"ScalarField",alias:null,args:null,name:"id",storageKey:null},{kind:"LinkedField",alias:null,args:null,concreteType:"TextWithEntities",name:"message",plural:false,selections:[{kind:"ScalarField",alias:null,args:null,name:"text",storageKey:null}],storageKey:null}],storageKey:null},{kind:"ScalarField",alias:null,args:null,name:"id",storageKey:null}],storageKey:null}],storageKey:null}]},text:null};f.exports=h;}),null);
__d('CrisisMarkFriendSafeMutation',['CrisisMutationHandlers','RelayModern','CrisisMarkFriendSafeMutation.graphql'],(function a(b,c,d,e,f,g){'use strict';var h=c('RelayModern').commitMutation,i=c('RelayModern').graphql,j=function l(){return c('CrisisMarkFriendSafeMutation.graphql');};function k(l,m,n){var o=m.crisisID,p=m.userID,q=n||{},r=q.onSuccess,s=q.onFailure;return h(l,babelHelpers['extends']({mutation:j,updater:c('CrisisMutationHandlers').getFriendMutationManualUpdater(o,p,'mark_friend_safe'),variables:{input:{crisis_id:o,user_id:p}}},c('CrisisMutationHandlers').get(r,s)));}f.exports={commit:k};}),null);
__d("CrisisUninviteFriendMutation.graphql",[],(function a(b,c,d,e,f,g){'use strict';var h={fragment:{argumentDefinitions:[{kind:"LocalArgument",name:"input",type:"UninviteFriendData!",defaultValue:null}],kind:"Fragment",metadata:null,name:"CrisisUninviteFriendMutation",selections:[{kind:"LinkedField",alias:null,args:[{kind:"Variable",name:"data",variableName:"input",type:"UninviteFriendData!"}],concreteType:"UninviteFriendResponsePayload",name:"uninvite_friend",plural:false,selections:[{kind:"LinkedField",alias:null,args:null,concreteType:"CrisisUserInfo",name:"crisis_user_info",plural:false,selections:[{kind:"ScalarField",alias:null,args:null,name:"invited_by_viewer",storageKey:null},{kind:"LinkedField",alias:null,args:null,concreteType:"CrisisUserInfoToInvitersConnection",name:"inviters",plural:false,selections:[{kind:"ScalarField",alias:null,args:null,name:"count",storageKey:null}],storageKey:null},{kind:"LinkedField",alias:"firstInviter",args:[{kind:"Literal",name:"first",value:1,type:"Int"}],concreteType:"CrisisUserInfoToInvitersConnection",name:"inviters",plural:false,selections:[{kind:"ScalarField",alias:null,args:null,name:"count",storageKey:null},{kind:"LinkedField",alias:null,args:null,concreteType:"CrisisUserInfoToInvitersEdge",name:"edges",plural:true,selections:[{kind:"LinkedField",alias:null,args:null,concreteType:"User",name:"node",plural:false,selections:[{kind:"ScalarField",alias:null,args:null,name:"id",storageKey:null},{kind:"ScalarField",alias:null,args:null,name:"name",storageKey:null},{kind:"ScalarField",alias:null,args:null,name:"url",storageKey:null}],storageKey:null}],storageKey:null}],storageKey:"inviters{\"first\":1}"}],storageKey:null}],storageKey:null}],type:"Mutation"},id:"1358831120819068",kind:"Batch",metadata:{},name:"CrisisUninviteFriendMutation",query:{argumentDefinitions:[{kind:"LocalArgument",name:"input",type:"UninviteFriendData!",defaultValue:null}],kind:"Root",name:"CrisisUninviteFriendMutation",operation:"mutation",selections:[{kind:"LinkedField",alias:null,args:[{kind:"Variable",name:"data",variableName:"input",type:"UninviteFriendData!"}],concreteType:"UninviteFriendResponsePayload",name:"uninvite_friend",plural:false,selections:[{kind:"LinkedField",alias:null,args:null,concreteType:"CrisisUserInfo",name:"crisis_user_info",plural:false,selections:[{kind:"ScalarField",alias:null,args:null,name:"invited_by_viewer",storageKey:null},{kind:"LinkedField",alias:null,args:null,concreteType:"CrisisUserInfoToInvitersConnection",name:"inviters",plural:false,selections:[{kind:"ScalarField",alias:null,args:null,name:"count",storageKey:null}],storageKey:null},{kind:"LinkedField",alias:"firstInviter",args:[{kind:"Literal",name:"first",value:1,type:"Int"}],concreteType:"CrisisUserInfoToInvitersConnection",name:"inviters",plural:false,selections:[{kind:"ScalarField",alias:null,args:null,name:"count",storageKey:null},{kind:"LinkedField",alias:null,args:null,concreteType:"CrisisUserInfoToInvitersEdge",name:"edges",plural:true,selections:[{kind:"LinkedField",alias:null,args:null,concreteType:"User",name:"node",plural:false,selections:[{kind:"ScalarField",alias:null,args:null,name:"id",storageKey:null},{kind:"ScalarField",alias:null,args:null,name:"name",storageKey:null},{kind:"ScalarField",alias:null,args:null,name:"url",storageKey:null}],storageKey:null}],storageKey:null}],storageKey:"inviters{\"first\":1}"},{kind:"ScalarField",alias:null,args:null,name:"id",storageKey:null}],storageKey:null}],storageKey:null}]},text:null};f.exports=h;}),null);
__d('CrisisUninviteFriendMutation',['CrisisMutationHandlers','RelayModern','CrisisUninviteFriendMutation.graphql'],(function a(b,c,d,e,f,g){'use strict';var h=c('RelayModern').commitMutation,i=c('RelayModern').graphql,j=function l(){return c('CrisisUninviteFriendMutation.graphql');};function k(l,m,n){var o=n||{},p=o.onSuccess,q=o.onFailure;return h(l,babelHelpers['extends']({mutation:j,variables:{input:{crisis_id:m.crisisID,user_id:m.userID}}},c('CrisisMutationHandlers').get(p,q)));}f.exports={commit:k};}),null);
__d("CrisisUnmarkFriendSafeMutation.graphql",[],(function a(b,c,d,e,f,g){'use strict';var h={fragment:{argumentDefinitions:[{kind:"LocalArgument",name:"input",type:"UnmarkFriendSafeData!",defaultValue:null}],kind:"Fragment",metadata:null,name:"CrisisUnmarkFriendSafeMutation",selections:[{kind:"LinkedField",alias:null,args:[{kind:"Variable",name:"data",variableName:"input",type:"UnmarkFriendSafeData!"}],concreteType:"UnmarkFriendSafeResponsePayload",name:"unmark_friend_safe",plural:false,selections:[{kind:"LinkedField",alias:null,args:null,concreteType:"CrisisUserInfo",name:"crisis_user_info",plural:false,selections:[{kind:"ScalarField",alias:null,args:null,name:"declared_location",storageKey:null},{kind:"ScalarField",alias:null,args:null,name:"can_viewer_mark_safe",storageKey:null},{kind:"ScalarField",alias:null,args:null,name:"marked_safe_by_viewer",storageKey:null},{kind:"LinkedField",alias:null,args:null,concreteType:"UserInfoToTaggersConnection",name:"taggers",plural:false,selections:[{kind:"ScalarField",alias:null,args:null,name:"count",storageKey:null},{kind:"LinkedField",alias:null,args:null,concreteType:"UserInfoToTaggersEdge",name:"edges",plural:true,selections:[{kind:"ScalarField",alias:null,args:null,name:"time",storageKey:null},{kind:"LinkedField",alias:null,args:null,concreteType:"User",name:"node",plural:false,selections:[{kind:"ScalarField",alias:null,args:null,name:"id",storageKey:null},{kind:"ScalarField",alias:null,args:null,name:"name",storageKey:null},{kind:"ScalarField",alias:null,args:null,name:"url",storageKey:null}],storageKey:null}],storageKey:null}],storageKey:null},{kind:"LinkedField",alias:"firstTagger",args:[{kind:"Literal",name:"first",value:1,type:"Int"}],concreteType:"UserInfoToTaggersConnection",name:"taggers",plural:false,selections:[{kind:"ScalarField",alias:null,args:null,name:"count",storageKey:null},{kind:"LinkedField",alias:null,args:null,concreteType:"UserInfoToTaggersEdge",name:"edges",plural:true,selections:[{kind:"ScalarField",alias:null,args:null,name:"time",storageKey:null},{kind:"LinkedField",alias:null,args:null,concreteType:"User",name:"node",plural:false,selections:[{kind:"ScalarField",alias:null,args:null,name:"id",storageKey:null},{kind:"ScalarField",alias:null,args:null,name:"name",storageKey:null},{kind:"ScalarField",alias:null,args:null,name:"url",storageKey:null}],storageKey:null}],storageKey:null}],storageKey:"taggers{\"first\":1}"},{kind:"LinkedField",alias:null,args:null,concreteType:"Story",name:"safe_story",plural:false,selections:[{kind:"ScalarField",alias:null,args:null,name:"id",storageKey:null},{kind:"LinkedField",alias:null,args:null,concreteType:"TextWithEntities",name:"message",plural:false,selections:[{kind:"ScalarField",alias:null,args:null,name:"text",storageKey:null}],storageKey:null}],storageKey:null}],storageKey:null}],storageKey:null}],type:"Mutation"},id:"1363927250358896",kind:"Batch",metadata:{},name:"CrisisUnmarkFriendSafeMutation",query:{argumentDefinitions:[{kind:"LocalArgument",name:"input",type:"UnmarkFriendSafeData!",defaultValue:null}],kind:"Root",name:"CrisisUnmarkFriendSafeMutation",operation:"mutation",selections:[{kind:"LinkedField",alias:null,args:[{kind:"Variable",name:"data",variableName:"input",type:"UnmarkFriendSafeData!"}],concreteType:"UnmarkFriendSafeResponsePayload",name:"unmark_friend_safe",plural:false,selections:[{kind:"LinkedField",alias:null,args:null,concreteType:"CrisisUserInfo",name:"crisis_user_info",plural:false,selections:[{kind:"ScalarField",alias:null,args:null,name:"declared_location",storageKey:null},{kind:"ScalarField",alias:null,args:null,name:"can_viewer_mark_safe",storageKey:null},{kind:"ScalarField",alias:null,args:null,name:"marked_safe_by_viewer",storageKey:null},{kind:"LinkedField",alias:null,args:null,concreteType:"UserInfoToTaggersConnection",name:"taggers",plural:false,selections:[{kind:"ScalarField",alias:null,args:null,name:"count",storageKey:null},{kind:"LinkedField",alias:null,args:null,concreteType:"UserInfoToTaggersEdge",name:"edges",plural:true,selections:[{kind:"ScalarField",alias:null,args:null,name:"time",storageKey:null},{kind:"LinkedField",alias:null,args:null,concreteType:"User",name:"node",plural:false,selections:[{kind:"ScalarField",alias:null,args:null,name:"id",storageKey:null},{kind:"ScalarField",alias:null,args:null,name:"name",storageKey:null},{kind:"ScalarField",alias:null,args:null,name:"url",storageKey:null}],storageKey:null}],storageKey:null}],storageKey:null},{kind:"LinkedField",alias:"firstTagger",args:[{kind:"Literal",name:"first",value:1,type:"Int"}],concreteType:"UserInfoToTaggersConnection",name:"taggers",plural:false,selections:[{kind:"ScalarField",alias:null,args:null,name:"count",storageKey:null},{kind:"LinkedField",alias:null,args:null,concreteType:"UserInfoToTaggersEdge",name:"edges",plural:true,selections:[{kind:"ScalarField",alias:null,args:null,name:"time",storageKey:null},{kind:"LinkedField",alias:null,args:null,concreteType:"User",name:"node",plural:false,selections:[{kind:"ScalarField",alias:null,args:null,name:"id",storageKey:null},{kind:"ScalarField",alias:null,args:null,name:"name",storageKey:null},{kind:"ScalarField",alias:null,args:null,name:"url",storageKey:null}],storageKey:null}],storageKey:null}],storageKey:"taggers{\"first\":1}"},{kind:"LinkedField",alias:null,args:null,concreteType:"Story",name:"safe_story",plural:false,selections:[{kind:"ScalarField",alias:null,args:null,name:"id",storageKey:null},{kind:"LinkedField",alias:null,args:null,concreteType:"TextWithEntities",name:"message",plural:false,selections:[{kind:"ScalarField",alias:null,args:null,name:"text",storageKey:null}],storageKey:null}],storageKey:null},{kind:"ScalarField",alias:null,args:null,name:"id",storageKey:null}],storageKey:null}],storageKey:null}]},text:null};f.exports=h;}),null);
__d('CrisisUnmarkFriendSafeMutation',['CrisisMutationHandlers','RelayModern','CrisisUnmarkFriendSafeMutation.graphql'],(function a(b,c,d,e,f,g){'use strict';var h=c('RelayModern').commitMutation,i=c('RelayModern').graphql,j=function l(){return c('CrisisUnmarkFriendSafeMutation.graphql');};function k(l,m,n){var o=n||{},p=o.onSuccess,q=o.onFailure;return h(l,babelHelpers['extends']({mutation:j,variables:{input:{crisis_id:m.crisisID,user_id:m.userID}}},c('CrisisMutationHandlers').get(p,q)));}f.exports={commit:k};}),null);
__d('IntlGender',['invariant','DisplayGenderConst','GenderConst'],(function a(b,c,d,e,f,g,h){'use strict';function i(k){0<k.length||h(0);return k.length===1?k[0]:c('GenderConst').UNKNOWN_PLURAL;}function j(k){switch(k){default:case c('DisplayGenderConst').UNKNOWN:return c('GenderConst').UNKNOWN;case c('DisplayGenderConst').MALE:return c('GenderConst').MALE_SINGULAR;case c('DisplayGenderConst').FEMALE:return c('GenderConst').FEMALE_SINGULAR;}}f.exports={fromMultiple:i,fromDisplayGender:j};}),null);
__d('CrisisFriendRow.react',['cx','fbt','CrisisContent','CrisisInviteFriendMutation','CrisisMarkFriendSafeMutation','CrisisProfileRow.react','CrisisRelayMutationButton.react','CrisisTestIDs','CrisisUninviteFriendMutation','CrisisUnmarkFriendSafeMutation','DisplayGenderConst','HovercardLinkParams','IntlGender','Link.react','LongLiveTimer','React','XCrisisUFIController','XUIButton.react','XUIGrayText.react','XUIText.react','createCrisisProfileFragmentContainer','idx','RelayModern','CrisisFriendRow_crisis.graphql','CrisisFriendRow_user.graphql'],(function a(b,c,d,e,f,g,h,i){'use strict';var j,k,l=c('RelayModern').createFragmentContainer,m=c('RelayModern').graphql;j=babelHelpers.inherits(n,c('React').Component);k=j&&j.prototype;function n(r){k.constructor.call(this,r);this.$CrisisFriendRow2=function(s){this.$CrisisFriendRow1&&this.setState({isMutating:s});}.bind(this);this.state={isMutating:false};}n.prototype.componentDidMount=function(){this.$CrisisFriendRow1=true;};n.prototype.componentWillUnmount=function(){this.$CrisisFriendRow1=false;};n.prototype.render=function(){var r=this.props,s=r.crisis,t=r.user,u=r.compact,v=r.config,w=this.state.isMutating;return c('React').createElement(c('CrisisProfileRow.react'),{user:t,compact:u,isSafe:v.isSafeByAny,primaryChild:c('React').createElement(o,{user:t,config:v}),secondaryChild:c('React').createElement(p,{crisis:s,user:t,config:v,compact:Boolean(u),isMutating:w,setMutating:this.$CrisisFriendRow2}),altText:v.safeStoryMessage,className:"_1tre"});};var o=function r(s){var t,u,v=s.user,w=s.config,x=(t=v)!=null?t.crisis_user_info:t,y=c('IntlGender').fromDisplayGender(((u=v)!=null?u.gender:u)||c('DisplayGenderConst').UNKNOWN),z=void 0,aa=void 0;if(w.doesNotApply){z=c('CrisisContent').getUnaffected();}else if(w.isSafeBySelf){z=c('CrisisContent').getSelfSafeLabel(y);aa=w.safeTime;}else if(w.isSafeByViewer){z=c('CrisisContent').getYouMarkedAsSafe(y);aa=w.safeTime;}else if(w.isSafeByOther){z=c('CrisisContent').getMarkedSafeBy(c('React').createElement(c('Link.react'),babelHelpers['extends']({},w.safeTaggerID?c('HovercardLinkParams').getHovercardParams(w.safeTaggerID):{},{href:w.safeTaggerURL}),w.safeTaggerName));aa=w.safeTime;}else if(w.isInvitedByViewer){var ba;z=c('CrisisContent').getInvitedByYouAndOthers(y,((ba=x)!=null?(ba=ba.inviters)!=null?ba.count:ba:ba)||1);}else if(w.isInvited){var ca,da,ea,fa=(ca=x)!=null?ca.inviters:ca,ga=((da=fa)!=null?(da=da.edges)!=null?(da=da[0])!=null?da.node:da:da:da)||{};z=c('CrisisContent').getInvitedByOthers(c('React').createElement(c('Link.react'),babelHelpers['extends']({},ga.id?c('HovercardLinkParams').getHovercardParams(ga.id):{},{href:ga.url}),ga.name),y,((ea=fa)!=null?ea.count:ea)||1);}else z=c('CrisisContent').getNotYetSafe();return c('React').createElement(c('XUIText.react'),{display:'block'},c('React').createElement(c('XUIText.react'),{display:'block',size:'medium',weight:'bold'},c('React').createElement(c('Link.react'),babelHelpers['extends']({},v.id?c('HovercardLinkParams').getHovercardParams(v.id):{},{href:v.url}),v.name)),c('React').createElement(c('XUIText.react'),{display:'block',size:'small',className:w.isSafeByAny?"_39-6":''},z),aa&&c('React').createElement(c('XUIGrayText.react'),{display:'block',shade:'light',size:'small'},c('LongLiveTimer').renderRelativeTimeToServer(aa).text));},p=function r(s){var t=s.crisis,u=s.user,v=s.config,w=s.compact,x=s.isMutating,y=s.setMutating,z={disabled:x,onMutationBegin:function ea(){return y(true);},onSuccess:function ea(){return y(false);},onFailure:function ea(){return y(false);},size:w?'medium':'large',className:"_39-7"+(w?' '+"_39-8":'')+(!w?' '+"_39-9":'')},aa=void 0,ba=void 0;if(v.isEnded||v.doesNotApply){return null;}else if(v.isSafeBySelf){if(w)return null;aa=v.safeStoryExists&&c('React').createElement(c('XUIButton.react'),babelHelpers['extends']({},z,{key:c('CrisisTestIDs').PROFILE_COMMENT,'data-testid':c('CrisisTestIDs').PROFILE_COMMENT,label:i._("Ver publicaci\u00f3n"),href:'#',rel:'dialog-post',ajaxify:c('XCrisisUFIController').getURIBuilder().setInt('crisis_id',t.id).setInt('user_id',u.id).getURI()}));}else if(v.isSafeByViewer){aa=c('React').createElement(c('CrisisRelayMutationButton.react'),babelHelpers['extends']({},z,{key:c('CrisisTestIDs').PROFILE_UNDO,'data-testid':c('CrisisTestIDs').PROFILE_UNDO,label:c('CrisisContent').getUndo(),mutation:c('CrisisUnmarkFriendSafeMutation'),input:{crisisID:t.id,userID:u.id}}));}else if(v.isInvitedByViewer){aa=c('React').createElement(c('CrisisRelayMutationButton.react'),babelHelpers['extends']({},z,{key:c('CrisisTestIDs').PROFILE_UNDO,'data-testid':c('CrisisTestIDs').PROFILE_UNDO,label:c('CrisisContent').getUninvite(),mutation:c('CrisisUninviteFriendMutation'),input:{crisisID:t.id,userID:u.id}}));}else{var ca,da;aa=c('React').createElement(c('CrisisRelayMutationButton.react'),babelHelpers['extends']({},z,{key:c('CrisisTestIDs').PROFILE_INVITE,'data-testid':c('CrisisTestIDs').PROFILE_UNDO,label:c('CrisisContent').getInvite(),mutation:c('CrisisInviteFriendMutation'),input:{crisisID:t.id,userID:u.id}}));ba=Boolean((ca=t)!=null?ca.can_user_mark_other_safe:ca)&&((da=u)!=null?(da=da.crisis_user_info)!=null?da.can_viewer_mark_safe:da:da)!==false&&c('React').createElement(c('CrisisRelayMutationButton.react'),babelHelpers['extends']({},z,{key:c('CrisisTestIDs').PROFILE_MARK_SAFE,'data-testid':c('CrisisTestIDs').PROFILE_MARK_SAFE,label:c('CrisisContent').getMarkSafe(),mutation:c('CrisisMarkFriendSafeMutation'),input:{crisisID:t.id,userID:u.id}}));}return c('React').createElement('div',{className:w?"_3-8w":''},aa,ba);},q=c('createCrisisProfileFragmentContainer')(n,function(r){var s,t=r.crisis,u=r.user;return {crisis:t,user:u,userInfo:(s=u)!=null?s.crisis_user_info:s};});f.exports=l(q,{crisis:function r(){return c('CrisisFriendRow_crisis.graphql');},user:function r(){return c('CrisisFriendRow_user.graphql');}});}),null);