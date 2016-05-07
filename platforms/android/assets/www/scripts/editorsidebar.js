define(["datetime","jQuery"],function(e,t){function r(e,t,r){var n=i(e),o={id:e.Id,text:n,state:{opened:e.IsFolder&&"open"==t,selected:r},li_attr:{}};return e.IsFolder?(o.children=[{text:"Loading...",icon:!1}],o.icon=!1):o.icon=!1,o.state.opened&&(o.li_attr.loadedFromServer=!0),r&&(y=e.Id),o}function i(t){var r=t.Name;t.Number&&(r=t.Number+" - "+r),null!=t.IndexNumber&&"Season"!=t.Type&&(r=t.IndexNumber+" - "+r);var i="editorNode";"Offline"==t.LocationType&&(i+=" offlineEditorNode");var n="<div class='"+i+"'>";if(t.LockData&&(n+='<iron-icon icon="lock" style="height:18px"></iron-icon>'),n+=r,t.ImageTags&&t.ImageTags.Primary||(n+='<img src="css/images/editor/missingprimaryimage.png" title="'+Globalize.translate("MissingPrimaryImage")+'" />'),t.BackdropImageTags&&t.BackdropImageTags.length||"Episode"!==t.Type&&"Season"!==t.Type&&"Audio"!==t.MediaType&&"TvChannel"!==t.Type&&"MusicAlbum"!==t.Type&&(n+='<img src="css/images/editor/missingbackdrop.png" title="'+Globalize.translate("MissingBackdropImage")+'" />'),t.ImageTags&&t.ImageTags.Logo||("Movie"==t.Type||"Trailer"==t.Type||"Series"==t.Type||"MusicArtist"==t.Type||"BoxSet"==t.Type)&&(n+='<img src="css/images/editor/missinglogo.png" title="'+Globalize.translate("MissingLogoImage")+'" />'),"Episode"==t.Type&&"Virtual"==t.LocationType)try{t.PremiereDate&&(new Date).getTime()>=e.parseISO8601Date(t.PremiereDate,!0).getTime()&&(n+='<img src="css/images/editor/missing.png" title="'+Globalize.translate("MissingEpisode")+'" />')}catch(o){}return n+="</div>"}function n(e,t,r){ApiClient.getLiveTvChannels({limit:0}).then(function(e){var i=[];i.push({id:"MediaFolders",text:Globalize.translate("HeaderMediaFolders"),state:{opened:!0},li_attr:{itemtype:"mediafolders",loadedFromServer:!0},icon:!1}),e.TotalRecordCount&&i.push({id:"livetv",text:Globalize.translate("HeaderLiveTV"),state:{opened:!1},li_attr:{itemtype:"livetv"},children:[{text:"Loading...",icon:!1}],icon:!1}),r.call(t,i),T.push("MediaFolders")})}function o(e,t,i){ApiClient.getLiveTvChannels({ServiceName:e,AddCurrentProgram:!1}).then(function(e){var n=e.Items.map(function(e){var i=-1==t.indexOf(e.Id)?"closed":"open";return r(e,i,!1)});i(n)})}function a(e,t,i,n){ApiClient.getJSON(ApiClient.getUrl("Library/MediaFolders")).then(function(e){var o=e.Items.map(function(e){var t=-1==i.indexOf(e.Id)?"closed":"open";return r(e,t,!1)});n.call(t,o);for(var a=0,d=o.length;d>a;a++)o[a].state.opened&&T.push(o[a].id)})}function d(e,t,i,d,s,l,c){var m=i.id;if("#"==m)return void n(e,t,c);if("livetv"==m)return void o(m,d,c);if("MediaFolders"==m)return void a(e,t,d,c);var u={ParentId:m,Fields:"Settings"},f=i.li_attr.itemtype;"Season"!=f&&"Series"!=f&&(u.SortBy="SortName"),ApiClient.getItems(Dashboard.getCurrentUserId(),u).then(function(e){var i=e.Items.map(function(e){var t=-1==d.indexOf(e.Id)?"closed":"open";return r(e,t,e.Id==s)});c.call(t,i);for(var n=0,o=i.length;o>n;n++)i[n].state.opened&&T.push(i[n].id)})}function s(e,r){var i=t("#"+r,e)[0];i&&i.scrollIntoView()}function l(e,t,r,i){require(["jstree"],function(){f(e,t,r,i)})}function c(e,r){var i=r.node,n={id:i.id,itemType:i.li_attr.itemtype};"livetv"!=n.itemType&&"mediafolders"!=n.itemType&&t(this).trigger("itemclicked",[n])}function m(e,r){var i=t(this).parents(".page")[0],n=r.node;n.children&&n.children&&g(i,n),n.li_attr&&"#"!=n.id&&!n.li_attr.loadedFromServer&&(n.li_attr.loadedFromServer=!0,t.jstree.reference(".libraryTree",i).load_node(n.id,p))}function u(e,r){var i=t(this).parents(".page")[0],n=r.node;n.children&&n.children&&g(i,n),n.li_attr&&"#"!=n.id&&!n.li_attr.loadedFromServer&&(n.li_attr.loadedFromServer=!0,t.jstree.reference(".libraryTree",i).load_node(n.id,p))}function f(e,r,i,n){T=[],y=null,t.jstree.destroy(),t(".libraryTree",e).jstree({plugins:["wholerow"],core:{check_callback:!0,data:function(t,o){d(e,this,t,i,n,r,o)},themes:{variant:"large"}}}).off("select_node.jstree",c).on("select_node.jstree",c).off("open_node.jstree",m).on("open_node.jstree",m).off("load_node.jstree",u).on("load_node.jstree",u)}function g(e,r){for(var i=r.children,n=0,o=i.length;o>n;n++){var a=i[n];-1!=T.indexOf(a)&&(T=T.filter(function(e){return e!=a}),t.jstree.reference(".libraryTree",e).load_node(a,p))}}function p(e){y&&e.children&&-1!=e.children.indexOf(y)&&setTimeout(function(){s(t.mobile.activePage,y)},500)}function v(e,r){var n=t("#"+r.Id+">a",e)[0];if(null!=n&&(t(".editorNode",n).remove(),t(n).append(i(r)),r.IsFolder)){var o=jQuery.jstree._reference(".libraryTree"),a=o._get_node(null,!1);o.refresh(a)}}function h(e){b=e}function I(){if(b)return b;var e=window.location.hash||window.location.href;return getParameterByName("id",e)}var y,T=[];t(document).on("itemsaved",".metadataEditorPage",function(e,t){v(this,t)}).on("pagebeforeshow",".metadataEditorPage",function(){require(["css!css/metadataeditor.css"])}).on("pagebeforeshow",".metadataEditorPage",function(){var e=this;Dashboard.getCurrentUser().then(function(t){var r=I();r?ApiClient.getAncestorItems(r,t.Id).then(function(i){var n=i.map(function(e){return e.Id});l(e,t,n,r)}):l(e,t,[])})}).on("pagebeforehide",".metadataEditorPage",function(){var e=this;t(".libraryTree",e).off("select_node.jstree",c).off("open_node.jstree",m).off("load_node.jstree",u)});var b;window.MetadataEditor={getItemPromise:function(){var e=I();return e?ApiClient.getItem(Dashboard.getCurrentUserId(),e):ApiClient.getRootFolder(Dashboard.getCurrentUserId())},getCurrentItemId:I,setCurrentItemId:h}});