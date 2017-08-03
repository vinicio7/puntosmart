if (self.CavalryLogger) { CavalryLogger.start_js(["3iV30"]); }

__d('Facepile.react',['cx','fbt','ix','intlSummarizeNumber','joinClasses','HovercardLink','Image.react','Link.react','List.react','React'],(function a(b,c,d,e,f,g,h,i,j){var k=c('React').PropTypes,l={small:24,medium:32,large:50},m=c('React').createClass({displayName:'Facepile',defaultProps:{moreColor:'blue',moreCount:0,showHovercard:false,tooltipPosition:'above',showToolTip:true,spacing:'none'},propTypes:{className:k.string,moreColor:k.oneOf(['blue','gray']),moreCount:k.number,moreDialogLink:k.string,morePageLink:k.string,numFaces:k.number,onFaceClick:k.func,onComponentDidMount:k.func,profiles:k.arrayOf(k.shape({URL:k.any,name:k.node.isRequired,uniqueID:k.any.isRequired,profilePicURI:k.any.isRequired})).isRequired,showHovercard:k.bool,size:k.oneOf([28,'small','medium','large']).isRequired,spacing:k.oneOf(['none','small','medium','large']),showToolTip:k.bool,tooltipPosition:k.oneOf(['above','below','left','right'])},_onFaceClick:function n(o,p){if(this.props.onFaceClick)this.props.onFaceClick(o,p);},componentDidMount:function n(){if(this.props.onComponentDidMount)this.props.onComponentDidMount();},getPicSize:function n(){return l[this.props.size]||this.props.size;},renderFace:function n(o,p){var q=this.getPicSize(),r=c('HovercardLink').constructEndpoint({id:o.uniqueID}).toString();return c('React').createElement('li',{className:"_43q7",key:o.uniqueID,onClick:this._onFaceClick.bind(this,o,p)},c('React').createElement(c('Link.react'),{'aria-label':o.name,className:"_2rt_ link",'data-hover':!this.props.showHovercard?'tooltip':null,'data-hovercard':this.props.showHovercard?r:null,'data-ignoreclass':"_2rt_",'data-tooltip-alignh':'left','data-tooltip-content':o.name,'data-tooltip-position':this.props.tooltipPosition,href:o.URL},c('React').createElement(c('Image.react'),{src:o.profilePicURI,width:q,height:q,className:'img'})));},renderMore:function n(){if(!this.props.moreCount)return null;var o=this.props.numFaces!=null&&this.props.numFaces<=this.props.profiles.length?this.props.moreCount+1:this.props.moreCount,p=c('intlSummarizeNumber')(o,0),q=p.length,r;if(o===0||this.props.size==='small'&&q>2||this.props.size===28&&q>3||this.props.size==='medium'&&q>3||this.props.size==='large'&&q>6){r=c('React').createElement(c('Image.react'),{src:j("97502")});}else r='+'+p;var s;if(this.props.showToolTip===undefined||this.props.showToolTip===true)if(o===1){s=i._("1 persona m\u00e1s");}else s=i._("{num} personas m\u00e1s",[i.param('num',o)]);var t=c('joinClasses')("_43q8"+(' '+"_43q7")+(q<2?' '+"_43qa":'')+(q===2?' '+"_43qb":'')+(q===3?' '+"_43qd":'')+(q>3?' '+"_43qe":'')+(this.props.moreColor==='blue'?' '+"_49c8":'')+(this.props.moreColor==='gray'?' '+"_49cb":''));return c('React').createElement('li',{className:t},c('React').createElement('a',{'data-hover':s?'tooltip':null,'data-tooltip-position':s?'right':null,'data-tooltip-content':s,ajaxify:this.props.moreDialogLink||this.props.morePageLink,href:this.props.morePageLink,role:'button',rel:this.props.moreDialogLink?'dialog':null},r));},render:function n(){var o=this.props.spacing||this.defaultProps.spacing,p=c('joinClasses')(this.props.className,"_43qm"+(this.props.size==28?' '+"_3cxu":'')+(this.props.size=='small'?' '+"_43q9":'')+(this.props.size=='medium'?' '+"_43qc":'')+(this.props.size=='large'?' '+"_43qf":'')+(o!=this.defaultProps.spacing?' '+"_4nab":'')),q=this.props.numFaces==undefined?this.props.profiles:this.props.profiles.slice(0,this.props.moreCount?this.props.numFaces-1:this.props.numFaces);return c('React').createElement('div',{className:p,style:this.props.style},c('React').createElement(c('List.react'),{className:"_4cg3",direction:'horizontal',spacing:this.props.spacing||'none',border:'none'},q.map(this.renderFace),this.renderMore()));}});f.exports=m;}),null);
__d('ReviewConsumptionTypedLogger',['Banzai','GeneratedLoggerUtils','nullthrows'],(function a(b,c,d,e,f,g){'use strict';function h(){this.clear();}h.prototype.log=function(){c('GeneratedLoggerUtils').log('logger:ReviewConsumptionLoggerConfig',this.$ReviewConsumptionTypedLogger1,c('Banzai').BASIC);};h.prototype.logVital=function(){c('GeneratedLoggerUtils').log('logger:ReviewConsumptionLoggerConfig',this.$ReviewConsumptionTypedLogger1,c('Banzai').VITAL);};h.prototype.clear=function(){this.$ReviewConsumptionTypedLogger1={};return this;};h.prototype.updateData=function(j){this.$ReviewConsumptionTypedLogger1=babelHelpers['extends']({},this.$ReviewConsumptionTypedLogger1,j);return this;};h.prototype.setElement=function(j){this.$ReviewConsumptionTypedLogger1.element=j;return this;};h.prototype.setEvent=function(j){this.$ReviewConsumptionTypedLogger1.event=j;return this;};h.prototype.setPageID=function(j){this.$ReviewConsumptionTypedLogger1.page_id=j;return this;};h.prototype.setReviewID=function(j){this.$ReviewConsumptionTypedLogger1.review_id=j;return this;};h.prototype.setSurface=function(j){this.$ReviewConsumptionTypedLogger1.surface=j;return this;};h.prototype.setVC=function(j){this.$ReviewConsumptionTypedLogger1.vc=j;return this;};h.prototype.updateExtraData=function(j){j=c('nullthrows')(c('GeneratedLoggerUtils').serializeMap(j));c('GeneratedLoggerUtils').checkExtraDataFieldNames(j,i);this.$ReviewConsumptionTypedLogger1=babelHelpers['extends']({},this.$ReviewConsumptionTypedLogger1,j);return this;};h.prototype.addToExtraData=function(j,k){var l={};l[j]=k;return this.updateExtraData(l);};var i={element:true,event:true,page_id:true,review_id:true,surface:true,vc:true};f.exports=h;}),null);
__d('SearchResultLayout.react',['cx','DOMQuery','Layout.react','LayoutScrollableView.react','React'],(function a(b,c,d,e,f,g,h){'use strict';var i,j,k=c('Layout.react').Column,l=c('Layout.react').FillColumn,m=12,n={height:window.innerHeight*.8+'px'};i=babelHelpers.inherits(o,c('React').Component);j=i&&i.prototype;o.prototype.$SearchResultLayout1=function(){var p=this.props.loggedIn?"_5c_6":"_187p",q=this.props.children[0];if(this.props.isSpider===true)return c('React').createElement(k,{style:n,className:p},q);return c('React').createElement('div',{style:n,className:p,topOffset:m},q);};o.prototype.$SearchResultLayout2=function(){var p=this.props.children[2];if(this.props.isSpider===true)return c('React').createElement(k,{style:n,className:"_187q",topOffset:m},p);if(this.props.loggedIn){return c('React').createElement('div',{className:"_5c_8"},c('React').createElement('div',{className:"_4jg7"},c('React').createElement(c('LayoutScrollableView.react'),{height:window.innerHeight*.8},p)));}else return c('React').createElement('div',{style:n,className:"_187q",topOffset:m},p);};o.prototype.render=function(){if(this.props.children.length!==3)throw new Error('SearchResultLayout expects exactly 3 children.');var p=this.state.hasTopFilters?"_5c_5 _3vk7":"_5c_5",q=this.props.loggedIn?"_5c_7":"_4jg8";return c('React').createElement(c('Layout.react'),babelHelpers['extends']({},this.props,{className:p}),this.$SearchResultLayout1(),c('React').createElement(k,{className:q},this.props.children[1]),this.$SearchResultLayout2());};o.prototype.componentWillMount=function(){var p=false;if(!this.props.isSpider)p=document.getElementById('top_filter')!==null&&document.getElementsByClassName("_5vx7")!==null;this.setState({hasTopFilters:p});};function o(){i.apply(this,arguments);}f.exports=o;}),null);