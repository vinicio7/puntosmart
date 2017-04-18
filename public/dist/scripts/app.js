!function(){"use strict";angular.module("app",["ngRoute","ngAnimate","ngSanitize","ngAria","ngMaterial","oc.lazyLoad","ui.bootstrap","angular-loading-bar","FBAngular","app.ctrls","app.directives","app.ui.ctrls","app.ui.directives","app.form.ctrls","app.table.ctrls","app.email.ctrls","app.todo"]).config(["cfpLoadingBarProvider",function(cfpLoadingBarProvider){cfpLoadingBarProvider.includeSpinner=!1,cfpLoadingBarProvider.latencyThreshold=500}]).config(["$ocLazyLoadProvider",function($oc){$oc.config({debug:!0,event:!1,modules:[{name:"angularBootstrapNavTree",files:["scripts/lazyload/abn_tree_directive.js","styles/lazyload/abn_tree.css"]},{name:"ui.calendar",serie:!0,files:["scripts/lazyload/moment.min.js","scripts/lazyload/fullcalendar.min.js","styles/lazyload/fullcalendar.css","scripts/lazyload/calendar.js"]},{name:"ui.select",files:["scripts/lazyload/select.min.js","styles/lazyload/select.css"]},{name:"ngTagsInput",files:["scripts/lazyload/ng-tags-input.min.js","styles/lazyload/ng-tags-input.css"]},{name:"colorpicker.module",files:["scripts/lazyload/bootstrap-colorpicker-module.min.js","styles/lazyload/colorpicker.css"]},{name:"ui.slider",serie:!0,files:["scripts/lazyload/bootstrap-slider.min.js","scripts/lazyload/directives/bootstrap-slider.directive.js","styles/lazyload/bootstrap-slider.css"]},{name:"textAngular",serie:!0,files:["scripts/lazyload/textAngular-rangy.min.js","scripts/lazyload/textAngular.min.js","scripts/lazyload/textAngularSetup.js","styles/lazyload/textAngular.css"]},{name:"flow",files:["scripts/lazyload/ng-flow-standalone.min.js"]},{name:"ngImgCrop",files:["scripts/lazyload/ng-img-crop.js","styles/lazyload/ng-img-crop.css"]},{name:"ngMask",files:["scripts/lazyload/ngMask.min.js"]},{name:"angular-c3",files:["scripts/lazyload/directives/c3.directive.js"]},{name:"easypiechart",files:["scripts/lazyload/angular.easypiechart.min.js"]},{name:"ngMap",files:["scripts/lazyload/ng-map.min.js"]},{name:"app.service.companies",files:["scripts/lazyload/services/companies.js"]},{name:"app.service.customers",files:["scripts/lazyload/services/customers.js"]},{name:"app.service.products",files:["scripts/lazyload/services/products.js"]},{name:"app.service.users",files:["scripts/lazyload/services/users.js"]}]})}]).constant("JQ_LOAD",{fullcalendar:[],moment:["scripts/lazyload/moment.min.js"],sparkline:["scripts/lazyload/jquery.sparkline.min.js"],c3:["scripts/lazyload/d3.min.js","scripts/lazyload/c3.min.js","styles/lazyload/c3.css"],gmaps:["https://maps.google.com/maps/api/js"]}).config(["$routeProvider","$locationProvider","JQ_LOAD",function($routeProvider,$locationProvider,jqload){function setRoutes(route){var url="/"+route,config={templateUrl:"views/"+route+".html"};return $routeProvider.when(url,config),$routeProvider}["ui/buttons","ui/typography","ui/grids","ui/panels","ui/tabs","ui/modals","ui/progress-bars","ui/extras","icons/font-awesome","icons/ionicons","forms/wizard","tables/tables","pages/signin","pages/signup","pages/404","pages/forget-pass","pages/lock-screen","pages/invoice","pages/search","pages/timeline"].forEach(function(route){setRoutes(route)}),$routeProvider.when("/",{redirectTo:"/dashboard"}).when("/404",{templateUrl:"views/404.html"}).otherwise({redirectTo:"/404"}),$routeProvider.when("/dashboard",{templateUrl:"views/app/dashboard.html",resolve:{deps:["$ocLazyLoad",function(a){return a.load([jqload.c3,jqload.sparkline]).then(function(){return a.load({name:"app.directives",files:["scripts/lazyload/directives/sparkline.directive.js"]})}).then(function(){return a.load("angular-c3")}).then(function(){return a.load("easypiechart")})}]}}),$routeProvider.when("/companies",{templateUrl:"views/app/companies.html",controller:"CompaniesController",resolve:{deps:["$ocLazyLoad",function(a){return a.load("app.service.companies").then(function(){return a.load({name:"app.companies",files:["scripts/lazyload/controllers/companies.js"]})})}]}}),$routeProvider.when("/customers",{templateUrl:"views/app/customers.html",controller:"CustomersController",resolve:{deps:["$ocLazyLoad",function(a){return a.load("app.service.customers").then(function(){return a.load({name:"app.customers",files:["scripts/lazyload/controllers/customers.js"]})})}]}}),$routeProvider.when("/products",{templateUrl:"views/app/products.html",controller:"ProductsController",resolve:{deps:["$ocLazyLoad",function(a){return a.load("app.service.products").then(function(){return a.load({name:"app.products",files:["scripts/lazyload/controllers/products.js"]})})}]}}),$routeProvider.when("/users",{templateUrl:"views/app/users.html",controller:"UsersController",resolve:{deps:["$ocLazyLoad",function(a){return a.load("app.service.users").then(function(){return a.load({name:"app.users",files:["scripts/lazyload/controllers/users.js"]})})}]}})}])}();


!function(){"use strict";angular.module("app.constants",[]).constant("WS_URL","http://localhost/facturador/public/ws/").constant("API_URL","http://localhost/facturador/public/api/").constant("APP_URL","http://localhost/facturador/public/")}();


!function(){"use strict";angular.module("app.email.ctrls",[]).controller("EmailCtrl",["$scope","$modal",function($scope,$modal){$scope.labelColors=["#5974d9","#19c395","#fc3644","#232429","#f1d44b"],$scope.labels=[{type:"Work",color:$scope.labelColors[0]},{type:"Reciept",color:$scope.labelColors[1]},{type:"My Data",color:$scope.labelColors[2]}],$scope.newlabel="",$scope.emailLists=[{subject:"Some nice subject here.",content:"Nor again is there anyone who loves or pursues or desires to obtain pain of itself...",read:!0,sender:"Jonathan Doe",date:"3 mins ago",attachment:!0,active:!1},{subject:"Meetup at C.P, New Delhi",content:"Lorem ipsum dolar sit amet...",read:!1,sender:"Organizer.com",date:"12th Feb",attachment:!1,active:!0},{subject:"Calling all android developers to join me",content:"Pellentesque habitant morbi tristique senectus et netus...",read:!0,sender:"android.io",date:"11th Jan",attachment:!0,active:!1},{subject:"Meetup at C.P, New Delhi",content:"Lorem ipsum dolar sit amet...",read:!1,sender:"Organizer.com",date:"22nd Dec",attachment:!1,active:!1},{subject:"RE: Question about account information V334RE99e: s3ss",content:"Hi, Thanks for the reply, I want to know something....",read:!1,sender:"trigger.io",date:"12 Dec",attachment:!0,active:!1}],$scope.addLabel=function(){var l=$scope.labelColors.length,c=$scope.labelColors[Math.floor(Math.random()*l)];$scope.newlabel&&$scope.labels.push({type:$scope.newlabel,color:c}),$scope.newlabel=""},$scope.compose=function(){$modal.open({templateUrl:"views/email/compose.html",size:"md",controller:"EmailCtrl",resolve:function(){},windowClass:"modalRapid"})},$scope.composeClose=function(){$scope.$close()}}])}();


!function(){"use strict";angular.module("app.form.ctrls",[]).controller("WizardMinimalCtrl",["$scope",function($scope){$scope.currentInput=0,$scope.totalInput=4,$scope.progress=0,$scope.inputToggle=[!0,!1,!1,!1],$scope._progress=function(){$scope.progress=$scope.currentInput*(100/$scope.totalInput)},$scope.nextInput=function(){$scope.currentInput+=1,$scope._progress(),$scope.inputToggle.forEach(function(v,i){$scope.inputToggle[i]=!1}),$scope.inputToggle[$scope.currentInput]=!0}}]).controller("FormWizardCtrl",["$scope",function($scope){$scope.steps=[!0,!1,!1],$scope.stepNext=function(index){for(var i=0;i<$scope.steps.length;i++)$scope.steps[i]=!1;$scope.steps[index]=!0},$scope.stepReset=function(){$scope.steps=[!0,!1,!1]}}])}();


!function(){"use strict";angular.module("app.ctrls",[]).controller("AppCtrl",["$rootScope","$scope","$timeout",function($rs,$scope,$timeout){var mm=window.matchMedia("(max-width: 767px)");$rs.isMobile=!!mm.matches,$rs.safeApply=function(fn){var phase=this.$root.$$phase;"$apply"==phase||"$digest"==phase?fn&&"function"==typeof fn&&fn():this.$apply(fn)},mm.addListener(function(m){$rs.safeApply(function(){$rs.isMobile=!!m.matches})}),$scope.navFull=!0,$scope.toggleNav=function(){$scope.navFull=!$scope.navFull,$rs.navOffCanvas=!$rs.navOffCanvas,console.log("navOffCanvas: "+$scope.navOffCanvas),$timeout(function(){$rs.$broadcast("c3.resize")},260)},$scope.toggleSettingsBox=function(){$scope.isSettingsOpen=!$scope.isSettingsOpen},$scope.themeActive="theme-zero",$scope.fixedHeader=!0,$scope.navHorizontal=!1;var SETTINGS_STATES="_setting-states",statesQuery={get:function(){return JSON.parse(localStorage.getItem(SETTINGS_STATES))},put:function(states){localStorage.setItem(SETTINGS_STATES,JSON.stringify(states))}},sQuery=statesQuery.get()||{navHorizontal:$scope.navHorizontal,fixedHeader:$scope.fixedHeader,navFull:$scope.navFull,themeActive:$scope.themeActive};sQuery&&($scope.navHorizontal=sQuery.navHorizontal,$scope.fixedHeader=sQuery.fixedHeader,$scope.navFull=sQuery.navFull,$scope.themeActive=sQuery.themeActive),$scope.onNavHorizontal=function(){sQuery.navHorizontal=$scope.navHorizontal,statesQuery.put(sQuery)},$scope.onNavFull=function(){sQuery.navFull=$scope.navFull,statesQuery.put(sQuery),$timeout(function(){$rs.$broadcast("c3.resize")},260)},$scope.onFixedHeader=function(){sQuery.fixedHeader=$scope.fixedHeader,statesQuery.put(sQuery)},$scope.onThemeActive=function(){sQuery.themeActive=$scope.themeActive,statesQuery.put(sQuery)},$scope.onThemeChange=function(theme){$scope.themeActive=theme,$scope.onThemeActive()}}]).controller("HeadCtrl",["$scope","Fullscreen",function($scope,Fullscreen){$scope.toggleFloatingSidebar=function(){$scope.floatingSidebar=!$scope.floatingSidebar,console.log("floating-sidebar: "+$scope.floatingSidebar)},$scope.goFullScreen=function(){Fullscreen.isEnabled()?Fullscreen.cancel():Fullscreen.all()}}]).controller("DashboardCtrl",["$scope",function($scope){$scope.analyticsconfig={data:{columns:[["Network Load",30,100,80,140,150,200],["CPU Load",90,100,170,140,150,50]],type:"spline",types:{"Network Load":"bar"}},color:{pattern:["#3F51B5","#38B4EE","#4CAF50","#E91E63"]},legend:{position:"inset"},size:{height:330}},$scope.storageOpts={size:100,lineWidth:2,lineCap:"square",barColor:"#E91E63"},$scope.storagePercent=80,$scope.serverOpts={size:100,lineWidth:2,lineCap:"square",barColor:"#4CAF50"},$scope.serverPercent=35,$scope.clientOpts={size:100,lineWidth:2,lineCap:"square",barColor:"#FDD835"},$scope.clientPercent=54,$scope.browserconfig={data:{columns:[["Chrome",48.9],["Firefox",16.1],["Safari",10.9],["IE",17.1],["Other",7]],type:"donut"},size:{width:260,height:260},donut:{width:50},color:{pattern:["#3F51B5","#4CAF50","#f44336","#E91E63","#38B4EE"]}}}])}();


!function(){"use strict";angular.module("app.directives",[]).directive("collapseNavAccordion",["$rootScope",function($rs){return{restrict:"A",link:function(scope,el,attrs){var lists=el.find("ul").parent("li"),a=lists.children("a"),aul=lists.find("ul a"),listsRest=el.children("li").not(lists),aRest=listsRest.children("a"),stopClick=0;a.on("click",function(e){if(!scope.navHorizontal){if(e.timeStamp-stopClick>300){var self=$(this),parent=self.parent("li");lists.not(parent).removeClass("open"),parent.toggleClass("open"),stopClick=e.timeStamp}e.preventDefault()}e.stopPropagation(),e.stopImmediatePropagation()}),aul.on("touchend",function(e){scope.isMobile&&($rs.navOffCanvas=!$rs.navOffCanvas),e.stopPropagation(),e.stopImmediatePropagation()}),aRest.on("touchend",function(e){scope.isMobile&&($rs.navOffCanvas=!$rs.navOffCanvas),e.stopPropagation(),e.stopImmediatePropagation()}),aRest.on("click",function(e){if(!scope.navHorizontal){var parent=aRest.parent("li");lists.not(parent).removeClass("open")}e.stopPropagation(),e.stopImmediatePropagation()})}}}]).directive("highlightActive",["$location",function($location){return{restrict:"A",link:function(scope,el,attrs){var links=el.find("a"),path=function(){return $location.path()},highlightActive=function(links,path){var path="#"+path;angular.forEach(links,function(link){var link=angular.element(link),li=link.parent("li"),href=link.attr("href");li.hasClass("active")&&li.removeClass("active"),0==path.indexOf(href)&&li.addClass("active")})};highlightActive(links,$location.path()),scope.$watch(path,function(newVal,oldVal){newVal!=oldVal&&highlightActive(links,$location.path())})}}}]).directive("customScrollbar",["$interval",function($interval){return{restrict:"A",link:function(scope,el,attrs){el.perfectScrollbar({suppressScrollX:!0}),$interval(function(){el[0].scrollHeight>=el[0].clientHeight&&el.perfectScrollbar("update")},400)}}}]).directive("customPage",["$location",function($location){return{restrict:"A",link:function(scope,element,attrs){var path=function(){return $location.path()},addBg=function(path){switch(scope.bodyFull=!1,path){case"/404":case"/pages/404":case"/pages/signin":case"/pages/signup":case"/pages/forget-pass":case"/pages/lock-screen":scope.bodyFull=!0}};addBg(path()),scope.$watch(path,function(newVal,oldVal){angular.equals(newVal,oldVal)||addBg(path())})}}}])}();





!function(){"use strict";angular.module("app.table.ctrls",[]).controller("ResponsiveTableDemoCtrl",["$scope",function($scope){$scope.responsiveData=[{post:"My First Blog",author:"Johnny",categories:"WebDesign",tags:["wordpress","blog"],date:"20-3-2004",tagColor:"pink"},{post:"How to Design",author:"Jenifer",categories:"design",tags:["photoshop","illustrator"],date:"2-4-2012",tagColor:"primary"},{post:"Something is missing",author:"Joe",categories:"uncategorized",tags:["abc","def","ghi"],date:"20-5-2013",tagColor:"success"},{post:"Learn a new language",author:"Rinky",categories:"language",tags:["C++","Java","PHP"],date:"10-5-2014",tagColor:"danger"},{post:"I love singing. Do you?",author:"AJ",categories:"singing",tags:["music"],date:"2-10-2014",tagColor:"info"}]}]).controller("DataTableCtrl",["$scope","$filter",function($scope,$filter){$scope.datas=[{engine:"Gecko",browser:"Firefox 3.0",platform:"Win 98+/OSX.2+",version:1.7,grade:"A"},{engine:"Gecko",browser:"Firefox 5.0",platform:"Win 98+/OSX.2+",version:1.8,grade:"A"},{engine:"KHTML",browser:"Konqureror 3.5",platform:"KDE 3.5",version:3.5,grade:"A"},{engine:"Presto",browser:"Opera 8.0",platform:"Win 95+/OS.2+",version:"-",grade:"A"},{engine:"Misc",browser:"IE Mobile",platform:"Windows Mobile 6",version:"-",grade:"C"},{engine:"Trident",browser:"IE 5.5",platform:"Win 95+",version:5,grade:"A"},{engine:"Trident",browser:"IE 6",platform:"Win 98+",version:7,grade:"A"},{engine:"Webkit",browser:"Safari 3.0",platform:"OSX.4+",version:419.3,grade:"A"},{engine:"Webkit",browser:"iPod Touch / iPhone",platform:"OSX.4+",version:420,grade:"B"}];for(var prelength=$scope.datas.length,i=prelength;i<100;i++){var rand=Math.floor(Math.random()*prelength);$scope.datas.push($scope.datas[rand])}$scope.searchKeywords="",$scope.filteredData=[],$scope.row="",$scope.numPerPageOpts=[5,7,10,25,50,100],$scope.numPerPage=$scope.numPerPageOpts[1],$scope.currentPage=1,$scope.currentPageStores=[],$scope.select=function(page){var start=(page-1)*$scope.numPerPage,end=start+$scope.numPerPage;$scope.currentPageStores=$scope.filteredData.slice(start,end)},$scope.onFilterChange=function(){$scope.select(1),$scope.currentPage=1,$scope.row=""},$scope.onNumPerPageChange=function(){$scope.select(1),$scope.currentPage=1},$scope.onOrderChange=function(){$scope.select(1),$scope.currentPage=1},$scope.search=function(){$scope.filteredData=$filter("filter")($scope.datas,$scope.searchKeywords),$scope.onFilterChange()},$scope.order=function(rowName){$scope.row!=rowName&&($scope.row=rowName,$scope.filteredData=$filter("orderBy")($scope.datas,rowName),$scope.onOrderChange())},$scope.search(),$scope.select($scope.currentPage)}])}();


!function(){"use strict";angular.module("app.todo",[]).factory("todoStorage",[function(){var STORAGE_ID="_todo-task";return{todos:[],get:function(){return JSON.parse(localStorage.getItem(STORAGE_ID))},put:function(todos){localStorage.setItem(STORAGE_ID,JSON.stringify(todos))}}}]).controller("TodoCtrl",["$scope","todoStorage","$filter",function($s,store,$filter){var demoTodos=[{title:"Eat healthy, Eat fresh",completed:!1},{title:"Donate some money",completed:!0},{title:"Wake up at 5:00 A.M",completed:!1},{title:"Hangout with friends at 12:00",completed:!1},{title:"Another todo on the list. Add as many you want.",completed:!1},{title:"The last but not the least.",completed:!0}],todos=$s.todos=store.get()||demoTodos;$s.newTodo="",$s.remainingCount=$filter("filter")(todos,{completed:!1}).length,$s.editedTodo=null,$s.edited=!1,$s.todoshow="all",$s.$watch("remainingCount == 0",function(newVal){$s.allChecked=newVal}),$s.filter=function(filter){switch(filter){case"all":$s.statusFilter="";break;case"active":$s.statusFilter={completed:!1}}},$s.addTodo=function(){var newTodo={title:$s.newTodo.trim(),completed:!1};0!==newTodo.length&&(todos.push(newTodo),store.put(todos),$s.newTodo="",$s.remainingCount++)},$s.editTodo=function(todo){$s.editedTodo=todo,$s.edited=!0,$s.originalTodo=angular.extend({},todo)},$s.removeTodo=function(todo){$s.remainingCount-=todo.completed?0:1,todos.splice(todos.indexOf(todo),1),store.put(todos)},$s.doneEditing=function(todo){$s.editedTodo=null,$s.edited=!1,todo.title=todo.title.trim(),todo.title||$s.removeTodo(todo),store.put(todos)},$s.revertEditing=function(todo){todos[todos.indexOf(todo)]=$scope.originalTodo,$s.doneEditing($s.originalTodo)},$s.toggleCompleted=function(todo){$s.remainingCount+=todo.completed?-1:1,store.put(todos)},$s.clearCompleted=function(){$s.todos=todos=todos.filter(function(val){return!val.completed}),store.put(todos)},$s.markAll=function(completed){todos.forEach(function(todo){todo.completed=!completed}),$s.remainingCount=completed?todos.length:0,store.put(todos)}}])}();


!function(){"use strict";angular.module("app.ui.ctrls",[]).controller("ToastDemoCtrl",["$scope","$interval",function($scope,$timeout){$scope.noti={selected:"Success"},$scope.notifications=["Warning","Success","Info","Danger"],$scope.positionModel="topRight",$scope.animModel="scale";var MSGS=["<strong>Error:</strong> Try submitting content again.","a toast message...","another toast message...","<strong>Title:</strong> Toast message with <a href='#na' class='alert-link'>link</a>","Hye, angry wars happening inside red doors."],cntr=0;$scope.toasts=[],$scope.closeAlert=function(index){$scope.toasts.splice(index,1)},$scope.createToast=function(){$scope.toasts.push({anim:$scope.animModel,type:angular.lowercase($scope.noti.selected),msg:MSGS[cntr]}),++cntr>4&&(cntr=0)}}]).controller("AlertDemoCtrl",["$scope",function($scope){$scope.alerts=[{type:"warning",msg:"<strong>Warning:</strong> Backup all your drive."},{type:"danger",msg:"Oh snap! Change a few things up and try submitting again."},{type:"success",msg:"Well done! You successfully read this important alert message."},{type:"info",msg:"<strong>Info:</strong> You have got mail."}],$scope.addAlert=function(){var randAlertMsg=Math.floor(4*Math.random()),randAlertType=Math.floor(4*Math.random());$scope.alerts.push({type:$scope.alerts[randAlertType].type,msg:$scope.alerts[randAlertMsg].msg})},$scope.closeAlert=function(index){$scope.alerts.splice(index,1)}}]).controller("IconDemoCtrl",["$scope","$filter",function($scope,$filter){$scope.icons=["ion-ionic","ion-arrow-up-a","ion-arrow-right-a","ion-arrow-down-a","ion-arrow-left-a","ion-arrow-up-b","ion-arrow-right-b","ion-arrow-down-b","ion-arrow-left-b","ion-arrow-up-c","ion-arrow-right-c","ion-arrow-down-c","ion-arrow-left-c","ion-arrow-return-right","ion-arrow-return-left","ion-arrow-swap","ion-arrow-shrink","ion-arrow-expand","ion-arrow-move","ion-arrow-resize","ion-chevron-up","ion-chevron-right","ion-chevron-down","ion-chevron-left","ion-navicon-round","ion-navicon","ion-drag","ion-log-in","ion-log-out","ion-checkmark-round","ion-checkmark","ion-checkmark-circled","ion-close-round","ion-close","ion-close-circled","ion-plus-round","ion-plus","ion-plus-circled","ion-minus-round","ion-minus","ion-minus-circled","ion-information","ion-information-circled","ion-help","ion-help-circled","ion-backspace-outline","ion-backspace","ion-help-buoy","ion-asterisk","ion-alert","ion-alert-circled","ion-refresh","ion-loop","ion-shuffle","ion-home","ion-search","ion-flag","ion-star","ion-heart","ion-heart-broken","ion-gear-a","ion-gear-b","ion-toggle-filled","ion-toggle","ion-settings","ion-wrench","ion-hammer","ion-edit","ion-trash-a","ion-trash-b","ion-document","ion-document-text","ion-clipboard","ion-scissors","ion-funnel","ion-bookmark","ion-email","ion-email-unread","ion-folder","ion-filing","ion-archive","ion-reply","ion-reply-all","ion-forward","ion-share","ion-paper-airplane","ion-link","ion-paperclip","ion-compose","ion-briefcase","ion-medkit","ion-at","ion-pound","ion-quote","ion-cloud","ion-upload","ion-more","ion-grid","ion-calendar","ion-clock","ion-compass","ion-pinpoint","ion-pin","ion-navigate","ion-location","ion-map","ion-lock-combination","ion-locked","ion-unlocked","ion-key","ion-arrow-graph-up-right","ion-arrow-graph-down-right","ion-arrow-graph-up-left","ion-arrow-graph-down-left","ion-stats-bars","ion-connection-bars","ion-pie-graph","ion-chatbubble","ion-chatbubble-working","ion-chatbubbles","ion-chatbox","ion-chatbox-working","ion-chatboxes","ion-person","ion-person-add","ion-person-stalker","ion-woman","ion-man","ion-female","ion-male","ion-transgender","ion-fork","ion-knife","ion-spoon","ion-soup-can-outline","ion-soup-can","ion-beer","ion-wineglass","ion-coffee","ion-icecream","ion-pizza","ion-power","ion-mouse","ion-battery-full","ion-battery-half","ion-battery-low","ion-battery-empty","ion-battery-charging","ion-wifi","ion-bluetooth","ion-calculator","ion-camera","ion-eye","ion-eye-disabled","ion-flash","ion-flash-off","ion-qr-scanner","ion-image","ion-images","ion-wand","ion-contrast","ion-aperture","ion-crop","ion-easel","ion-paintbrush","ion-paintbucket","ion-monitor","ion-laptop","ion-ipad","ion-iphone","ion-ipod","ion-printer","ion-usb","ion-outlet","ion-bug","ion-code","ion-code-working","ion-code-download","ion-fork-repo","ion-network","ion-pull-request","ion-merge","ion-xbox","ion-playstation","ion-steam","ion-closed-captioning","ion-videocamera","ion-film-marker","ion-disc","ion-headphone","ion-music-note","ion-radio-waves","ion-speakerphone","ion-mic-a","ion-mic-b","ion-mic-c","ion-volume-high","ion-volume-medium","ion-volume-low","ion-volume-mute","ion-levels","ion-play","ion-pause","ion-stop","ion-record","ion-skip-forward","ion-skip-backward","ion-eject","ion-bag","ion-card","ion-cash","ion-pricetag","ion-pricetags","ion-thumbsup","ion-thumbsdown","ion-happy-outline","ion-happy","ion-sad-outline","ion-sad","ion-bowtie","ion-tshirt-outline","ion-tshirt","ion-trophy","ion-podium","ion-ribbon-a","ion-ribbon-b","ion-university","ion-magnet","ion-beaker","ion-erlenmeyer-flask","ion-egg","ion-earth","ion-planet","ion-lightbulb","ion-cube","ion-leaf","ion-waterdrop","ion-flame","ion-fireball","ion-bonfire","ion-umbrella","ion-nuclear","ion-no-smoking","ion-thermometer","ion-speedometer","ion-model-s","ion-plane","ion-jet","ion-load-a","ion-load-b","ion-load-c","ion-load-d","ion-ios-ionic-outline","ion-ios-arrow-back","ion-ios-arrow-forward","ion-ios-arrow-up","ion-ios-arrow-right","ion-ios-arrow-down","ion-ios-arrow-left","ion-ios-arrow-thin-up","ion-ios-arrow-thin-right","ion-ios-arrow-thin-down","ion-ios-arrow-thin-left","ion-ios-circle-filled","ion-ios-circle-outline","ion-ios-checkmark-empty","ion-ios-checkmark-outline","ion-ios-checkmark","ion-ios-plus-empty","ion-ios-plus-outline","ion-ios-plus","ion-ios-close-empty","ion-ios-close-outline","ion-ios-close","ion-ios-minus-empty","ion-ios-minus-outline","ion-ios-minus","ion-ios-information-empty","ion-ios-information-outline","ion-ios-information","ion-ios-help-empty","ion-ios-help-outline","ion-ios-help","ion-ios-search","ion-ios-search-strong","ion-ios-star","ion-ios-star-half","ion-ios-star-outline","ion-ios-heart","ion-ios-heart-outline","ion-ios-more","ion-ios-more-outline","ion-ios-home","ion-ios-home-outline","ion-ios-cloud","ion-ios-cloud-outline","ion-ios-cloud-upload","ion-ios-cloud-upload-outline","ion-ios-cloud-download","ion-ios-cloud-download-outline","ion-ios-upload","ion-ios-upload-outline","ion-ios-download","ion-ios-download-outline","ion-ios-refresh","ion-ios-refresh-outline","ion-ios-refresh-empty","ion-ios-reload","ion-ios-loop-strong","ion-ios-loop","ion-ios-bookmarks","ion-ios-bookmarks-outline","ion-ios-book","ion-ios-book-outline","ion-ios-flag","ion-ios-flag-outline","ion-ios-glasses","ion-ios-glasses-outline","ion-ios-browsers","ion-ios-browsers-outline","ion-ios-at","ion-ios-at-outline","ion-ios-pricetag","ion-ios-pricetag-outline","ion-ios-pricetags","ion-ios-pricetags-outline","ion-ios-cart","ion-ios-cart-outline","ion-ios-chatboxes","ion-ios-chatboxes-outline","ion-ios-chatbubble","ion-ios-chatbubble-outline","ion-ios-cog","ion-ios-cog-outline","ion-ios-gear","ion-ios-gear-outline","ion-ios-settings","ion-ios-settings-strong","ion-ios-toggle","ion-ios-toggle-outline","ion-ios-analytics","ion-ios-analytics-outline","ion-ios-pie","ion-ios-pie-outline","ion-ios-pulse","ion-ios-pulse-strong","ion-ios-filing","ion-ios-filing-outline","ion-ios-box","ion-ios-box-outline","ion-ios-compose","ion-ios-compose-outline","ion-ios-trash","ion-ios-trash-outline","ion-ios-copy","ion-ios-copy-outline","ion-ios-email","ion-ios-email-outline","ion-ios-undo","ion-ios-undo-outline","ion-ios-redo","ion-ios-redo-outline","ion-ios-paperplane","ion-ios-paperplane-outline","ion-ios-folder","ion-ios-folder-outline","ion-ios-paper","ion-ios-paper-outline","ion-ios-list","ion-ios-list-outline","ion-ios-world","ion-ios-world-outline","ion-ios-alarm","ion-ios-alarm-outline","ion-ios-speedometer","ion-ios-speedometer-outline","ion-ios-stopwatch","ion-ios-stopwatch-outline","ion-ios-timer","ion-ios-timer-outline","ion-ios-clock","ion-ios-clock-outline","ion-ios-time","ion-ios-time-outline","ion-ios-calendar","ion-ios-calendar-outline","ion-ios-photos","ion-ios-photos-outline","ion-ios-albums","ion-ios-albums-outline","ion-ios-camera","ion-ios-camera-outline","ion-ios-reverse-camera","ion-ios-reverse-camera-outline","ion-ios-eye","ion-ios-eye-outline","ion-ios-bolt","ion-ios-bolt-outline","ion-ios-color-wand","ion-ios-color-wand-outline","ion-ios-color-filter","ion-ios-color-filter-outline","ion-ios-grid-view","ion-ios-grid-view-outline","ion-ios-crop-strong","ion-ios-crop","ion-ios-barcode","ion-ios-barcode-outline","ion-ios-briefcase","ion-ios-briefcase-outline","ion-ios-medkit","ion-ios-medkit-outline","ion-ios-medical","ion-ios-medical-outline","ion-ios-infinite","ion-ios-infinite-outline","ion-ios-calculator","ion-ios-calculator-outline","ion-ios-keypad","ion-ios-keypad-outline","ion-ios-telephone","ion-ios-telephone-outline","ion-ios-drag","ion-ios-location","ion-ios-location-outline","ion-ios-navigate","ion-ios-navigate-outline","ion-ios-locked","ion-ios-locked-outline","ion-ios-unlocked","ion-ios-unlocked-outline","ion-ios-monitor","ion-ios-monitor-outline","ion-ios-printer","ion-ios-printer-outline","ion-ios-game-controller-a","ion-ios-game-controller-a-outline","ion-ios-game-controller-b","ion-ios-game-controller-b-outline","ion-ios-americanfootball","ion-ios-americanfootball-outline","ion-ios-baseball","ion-ios-baseball-outline","ion-ios-basketball","ion-ios-basketball-outline","ion-ios-tennisball","ion-ios-tennisball-outline","ion-ios-football","ion-ios-football-outline","ion-ios-body","ion-ios-body-outline","ion-ios-person","ion-ios-person-outline","ion-ios-personadd","ion-ios-personadd-outline","ion-ios-people","ion-ios-people-outline","ion-ios-musical-notes","ion-ios-musical-note","ion-ios-bell","ion-ios-bell-outline","ion-ios-mic","ion-ios-mic-outline","ion-ios-mic-off","ion-ios-volume-high","ion-ios-volume-low","ion-ios-play","ion-ios-play-outline","ion-ios-pause","ion-ios-pause-outline","ion-ios-recording","ion-ios-recording-outline","ion-ios-fastforward","ion-ios-fastforward-outline","ion-ios-rewind","ion-ios-rewind-outline","ion-ios-skipbackward","ion-ios-skipbackward-outline","ion-ios-skipforward","ion-ios-skipforward-outline","ion-ios-shuffle-strong","ion-ios-shuffle","ion-ios-videocam","ion-ios-videocam-outline","ion-ios-film","ion-ios-film-outline","ion-ios-flask","ion-ios-flask-outline","ion-ios-lightbulb","ion-ios-lightbulb-outline","ion-ios-wineglass","ion-ios-wineglass-outline","ion-ios-pint","ion-ios-pint-outline","ion-ios-nutrition","ion-ios-nutrition-outline","ion-ios-flower","ion-ios-flower-outline","ion-ios-rose","ion-ios-rose-outline","ion-ios-paw","ion-ios-paw-outline","ion-ios-flame","ion-ios-flame-outline","ion-ios-sunny","ion-ios-sunny-outline","ion-ios-partlysunny","ion-ios-partlysunny-outline","ion-ios-cloudy","ion-ios-cloudy-outline","ion-ios-rainy","ion-ios-rainy-outline","ion-ios-thunderstorm","ion-ios-thunderstorm-outline","ion-ios-snowy","ion-ios-moon","ion-ios-moon-outline","ion-ios-cloudy-night","ion-ios-cloudy-night-outline","ion-android-arrow-up","ion-android-arrow-forward","ion-android-arrow-down","ion-android-arrow-back","ion-android-arrow-dropup","ion-android-arrow-dropup-circle","ion-android-arrow-dropright","ion-android-arrow-dropright-circle","ion-android-arrow-dropdown","ion-android-arrow-dropdown-circle","ion-android-arrow-dropleft","ion-android-arrow-dropleft-circle","ion-android-add","ion-android-add-circle","ion-android-remove","ion-android-remove-circle","ion-android-close","ion-android-cancel","ion-android-radio-button-off","ion-android-radio-button-on","ion-android-checkmark-circle","ion-android-checkbox-outline-blank","ion-android-checkbox-outline","ion-android-checkbox-blank","ion-android-checkbox","ion-android-done","ion-android-done-all","ion-android-menu","ion-android-more-horizontal","ion-android-more-vertical","ion-android-refresh","ion-android-sync","ion-android-wifi","ion-android-call","ion-android-apps","ion-android-settings","ion-android-options","ion-android-funnel","ion-android-search","ion-android-home","ion-android-cloud-outline","ion-android-cloud","ion-android-download","ion-android-upload","ion-android-cloud-done","ion-android-cloud-circle","ion-android-favorite-outline","ion-android-favorite","ion-android-star-outline","ion-android-star-half","ion-android-star","ion-android-calendar","ion-android-alarm-clock","ion-android-time","ion-android-stopwatch","ion-android-watch","ion-android-locate","ion-android-navigate","ion-android-pin","ion-android-compass","ion-android-map","ion-android-walk","ion-android-bicycle","ion-android-car","ion-android-bus","ion-android-subway","ion-android-train","ion-android-boat","ion-android-plane","ion-android-restaurant","ion-android-bar","ion-android-cart","ion-android-camera","ion-android-image","ion-android-film","ion-android-color-palette","ion-android-create","ion-android-mail","ion-android-drafts","ion-android-send","ion-android-archive","ion-android-delete","ion-android-attach","ion-android-share","ion-android-share-alt","ion-android-bookmark","ion-android-document","ion-android-clipboard","ion-android-list","ion-android-folder-open","ion-android-folder","ion-android-print","ion-android-open","ion-android-exit","ion-android-contract","ion-android-expand","ion-android-globe","ion-android-chat","ion-android-textsms","ion-android-hangout","ion-android-happy","ion-android-sad","ion-android-person","ion-android-people","ion-android-person-add","ion-android-contact","ion-android-contacts","ion-android-playstore","ion-android-lock","ion-android-unlock","ion-android-microphone","ion-android-microphone-off","ion-android-notifications-none","ion-android-notifications","ion-android-notifications-off","ion-android-volume-mute","ion-android-volume-down","ion-android-volume-up","ion-android-volume-off","ion-android-hand","ion-android-desktop","ion-android-laptop","ion-android-phone-portrait","ion-android-phone-landscape","ion-android-bulb","ion-android-sunny","ion-android-alert","ion-android-warning","ion-social-twitter","ion-social-twitter-outline","ion-social-facebook","ion-social-facebook-outline","ion-social-googleplus","ion-social-googleplus-outline","ion-social-google","ion-social-google-outline","ion-social-dribbble","ion-social-dribbble-outline","ion-social-octocat","ion-social-github","ion-social-github-outline","ion-social-instagram","ion-social-instagram-outline","ion-social-whatsapp","ion-social-whatsapp-outline","ion-social-snapchat","ion-social-snapchat-outline","ion-social-foursquare","ion-social-foursquare-outline","ion-social-pinterest","ion-social-pinterest-outline","ion-social-rss","ion-social-rss-outline","ion-social-tumblr","ion-social-tumblr-outline","ion-social-wordpress","ion-social-wordpress-outline","ion-social-reddit","ion-social-reddit-outline","ion-social-hackernews","ion-social-hackernews-outline","ion-social-designernews","ion-social-designernews-outline","ion-social-yahoo","ion-social-yahoo-outline","ion-social-buffer","ion-social-buffer-outline","ion-social-skype","ion-social-skype-outline","ion-social-linkedin","ion-social-linkedin-outline","ion-social-vimeo","ion-social-vimeo-outline","ion-social-twitch","ion-social-twitch-outline","ion-social-youtube","ion-social-youtube-outline","ion-social-dropbox","ion-social-dropbox-outline","ion-social-apple","ion-social-apple-outline","ion-social-android","ion-social-android-outline","ion-social-windows","ion-social-windows-outline","ion-social-html5","ion-social-html5-outline","ion-social-css3","ion-social-css3-outline","ion-social-javascript","ion-social-javascript-outline","ion-social-angular","ion-social-angular-outline","ion-social-nodejs","ion-social-sass","ion-social-python","ion-social-chrome","ion-social-chrome-outline","ion-social-codepen","ion-social-codepen-outline","ion-social-markdown","ion-social-tux","ion-social-freebsd-devil","ion-social-usd","ion-social-usd-outline","ion-social-bitcoin","ion-social-bitcoin-outline","ion-social-yen","ion-social-yen-outline","ion-social-euro","ion-social-euro-outline"],$scope.iconKeywords="",$scope.filteredIcons=[],$scope.iconSearch=function(){$scope.filteredIcons=$filter("filter")($scope.icons,$scope.iconKeywords)},$scope.iconSearch()}]).controller("ModalDemoCtrl",["$scope","$modal",function($scope,$modal){$scope.modalAnim="default",$scope.modalOpen=function(){$modal.open({templateUrl:"views/ui/modalContent.html",size:"md",controller:"ModalDemoCtrl",resolve:function(){},windowClass:$scope.modalAnim})},$scope.modalClose=function(){$scope.$close()}}]).controller("ProgressDemoCtrl",["$scope",function($scope){$scope.stacked=[{type:"primary",value:20},{type:"success",value:15},{type:"info",value:20},{type:"warning",value:30},{type:"danger",value:15}]}]).controller("TooltipDemoCtrl",["$scope",function($scope){$scope.dynamicTooltip="Hello, World!",$scope.tooltipHtml="Hey!, I am <b>bold</b>."}]).controller("PaginationDemoCtrl",["$scope",function($scope){$scope.totalItems=64,$scope.currentPage=4,$scope.setPage=function(pageNo){$scope.currentPage=pageNo},$scope.maxSize=5,$scope.bigTotalItems=175,$scope.bigCurrentPage=1}]).controller("RatingsDemoCtrl",["$scope",function($scope){$scope.rate=7,$scope.max=10,$scope.isReadonly=!1,$scope.hoveringOver=function(value){$scope.overStar=value,$scope.percent=value/$scope.max*100}}]).controller("TypeaheadDemoCtrl",["$scope",function($scope){$scope.selected=void 0,$scope.states=["Alabama","Alaska","Arizona","Arkansas","California","Colorado","Connecticut","Delaware","Florida","Georgia","Hawaii","Idaho","Illinois","Indiana","Iowa","Kansas","Kentucky","Louisiana","Maine","Maryland","Massachusetts","Michigan","Minnesota","Mississippi","Missouri","Montana","Nebraska","Nevada","New Hampshire","New Jersey","New Mexico","New York","North Dakota","North Carolina","Ohio","Oklahoma","Oregon","Pennsylvania","Rhode Island","South Carolina","South Dakota","Tennessee","Texas","Utah","Vermont","Virginia","Washington","West Virginia","Wisconsin","Wyoming"]}]).controller("DatepickerDemoCtrl",["$scope",function($scope){$scope.open=function($event){$event.preventDefault(),$event.stopPropagation(),$scope.opened=!0},$scope.dt=Date.now()}])}();


!function(){"use strict";angular.module("app.ui.directives",[])}();