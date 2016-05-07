define(["dialogHelper","appStorage","jQuery","paper-fab","paper-item-body","paper-icon-item","paper-icon-button-light"],function(e,t,i){function n(e,t){Dashboard.showLoadingMsg();var n=i(".popupSubtitleViewer",e).popup("open");i(".subtitleContent",e).html("");var a="Videos/"+h.Id+"/Subtitles/"+t;ApiClient.ajax({type:"GET",url:a}).then(function(t){i(".subtitleContent",e).html(t),Dashboard.hideLoadingMsg(),n.popup("reposition",{})})}function a(e,t){Dashboard.showLoadingMsg();var n=i(".popupSubtitleViewer",e).popup("open");i(".subtitleContent",e).html("");var a="Providers/Subtitles/Subtitles/"+t;ApiClient.get(ApiClient.getUrl(a)).then(function(t){i(".subtitleContent",e).html(t),Dashboard.hideLoadingMsg(),n.popup("reposition",{})})}function o(e,t){var i="Items/"+h.Id+"/RemoteSearch/Subtitles/"+t;ApiClient.ajax({type:"POST",url:ApiClient.getUrl(i)}).then(function(){require(["toast"],function(e){e(Globalize.translate("MessageDownloadQueued"))})})}function r(e,t){var i=Globalize.translate("MessageAreYouSureDeleteSubtitles");require(["confirm"],function(n){n(i,Globalize.translate("HeaderConfirmDeletion")).then(function(){Dashboard.showLoadingMsg();var i=h.Id,n="Videos/"+i+"/Subtitles/"+t;ApiClient.ajax({type:"DELETE",url:ApiClient.getUrl(n)}).then(function(){c(e,i)})})})}function l(e,t){var a=t.MediaStreams||[],o=a.filter(function(e){return"Subtitle"==e.Type}),l="";o.length&&(l+='<h1 style="margin-top:1.5em;">'+Globalize.translate("HeaderCurrentSubtitles")+"</h1>",l+='<div class="paperList">',l+=o.map(function(e){var t="";t+="<paper-icon-item>",t+='<paper-fab mini class="blue" icon="closed-caption" item-icon></paper-fab>';var i=[];return i.push(e.Codec),e.IsDefault&&i.push("Default"),e.IsForced&&i.push("Forced"),t+=3==i.length?"<paper-item-body three-line>":"<paper-item-body two-line>",t+="<div>",t+=e.Language||Globalize.translate("LabelUnknownLanaguage"),t+="</div>",t+="<div secondary>"+i.join(" - ")+"</div>",e.Path&&(t+="<div secondary>"+e.Path+"</div>"),l+="</a>",t+="</paper-item-body>",e.Path&&(t+='<button is="paper-icon-button-light" data-index="'+e.Index+'" title="'+Globalize.translate("Delete")+'" class="btnDelete"><iron-icon icon="delete"></iron-icon></button>'),t+="</paper-icon-item>"}).join(""),l+="</div>");var s=i(".subtitleList",e).html(l);i(".btnViewSubtitles",s).on("click",function(){var t=this.getAttribute("data-index");n(e,t)}),i(".btnDelete",s).on("click",function(){var t=this.getAttribute("data-index");r(e,t)})}function s(e,n){i("#selectLanguage",e).html(n.map(function(e){return'<option value="'+e.ThreeLetterISOLanguageName+'">'+e.DisplayName+"</option>"}));var a=t.getItem("subtitleeditor-language");a?i("#selectLanguage",e).val(a):Dashboard.getCurrentUser().then(function(t){var n=t.Configuration.SubtitleLanguagePreference;n&&i("#selectLanguage",e).val(n)})}function u(e,t){var n="",r="";if(!t.length)return i(".noSearchResults",e).show(),i(".subtitleResults",e).html(""),void Dashboard.hideLoadingMsg();i(".noSearchResults",e).hide();for(var l=0,s=t.length;s>l;l++){var u=t[l],d=u.ProviderName;d!=n&&(l>0&&(r+="</div>"),r+="<h1>"+d+"</h1>",r+='<div class="paperList">',n=d),r+="<paper-icon-item>",r+='<paper-fab mini class="blue" icon="closed-caption" item-icon></paper-fab>',r+=u.Comment?"<paper-item-body three-line>":"<paper-item-body two-line>",r+="<div>"+u.Name+"</div>",r+="<div secondary>"+u.Format+"</div>",u.Comment&&(r+="<div secondary>"+u.Comment+"</div>"),r+="</paper-item-body>",r+='<div style="font-size:86%;opacity:.7;">'+(u.DownloadCount||0)+"</div>",r+='<paper-icon-button icon="cloud-download" data-subid="'+u.Id+'" title="'+Globalize.translate("ButtonDownload")+'" class="btnDownload"></paper-icon-button>',r+="</paper-icon-item>"}t.length&&(r+="</div>");var c=i(".subtitleResults",e).html(r);i(".btnViewSubtitle",c).on("click",function(){var t=this.getAttribute("data-subid");a(e,t)}),i(".btnDownload",c).on("click",function(){var t=this.getAttribute("data-subid");o(e,t)}),Dashboard.hideLoadingMsg()}function d(e,i){t.setItem("subtitleeditor-language",i),Dashboard.showLoadingMsg();var n=ApiClient.getUrl("Items/"+h.Id+"/RemoteSearch/Subtitles/"+i);ApiClient.getJSON(n).then(function(t){u(e,t)})}function c(e,t){function n(t){h=t,l(e,t);var i=t.Path||"",n=Math.max(i.lastIndexOf("/"),i.lastIndexOf("\\"));n>-1&&(i=i.substring(n+1)),i?(e.querySelector(".pathValue").innerHTML=i,e.querySelector(".originalFile").classList.remove("hide")):(e.querySelector(".pathValue").innerHTML="",e.querySelector(".originalFile").classList.add("hide")),Dashboard.hideLoadingMsg()}i(".noSearchResults",e).hide(),"string"==typeof t?ApiClient.getItem(Dashboard.getCurrentUserId(),t).then(n):n(t)}function p(){var e=this,t=i("#selectLanguage",e).val();return d(i(e).parents(".editorContent"),t),!1}function b(t){Dashboard.showLoadingMsg();var n=new XMLHttpRequest;n.open("GET","components/subtitleeditor/subtitleeditor.template.html",!0),n.onload=function(){var n=this.response;ApiClient.getItem(Dashboard.getCurrentUserId(),t).then(function(t){var a=e.createDialog({size:"small",removeOnClose:!0});a.classList.add("ui-body-b"),a.classList.add("background-theme-b");var o="";o+='<div class="dialogHeader">',o+='<button is="paper-icon-button-light" class="btnCancel" tabindex="-1"><iron-icon icon="arrow-back"></iron-icon></button>',o+='<div class="dialogHeaderTitle">',o+=t.Name,o+="</div>",o+="</div>",o+='<div class="editorContent">',o+=Globalize.translateDocument(n),o+="</div>",a.innerHTML=o,document.body.appendChild(a),a.querySelector(".pathLabel").innerHTML=Globalize.translate("MediaInfoFile"),i(".subtitleSearchForm",a).off("submit",p).on("submit",p),e.open(a);var r=a.querySelector(".editorContent");c(r,t),ApiClient.getCultures().then(function(e){s(r,e)}),i(".btnCancel",a).on("click",function(){e.close(a)})})},n.send()}var h;return{show:b}});