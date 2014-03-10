// chrome.tabs.onActivated.addListener(function(activeInfo){
// 	console.log("change focus");
// 	var tabId = activeInfo.tabId;
// 	chrome.tabs.update(tabId, {url:"javascript:function naver(q){void(z=q.body.appendChild(q.createElement('script'))); void(z.language='javascript');void(z.type='text/javascript');void(z.src='http://userscripts.org/scripts/source/61326.user.js');}function selfw(w){try{naver(w.document);}catch(e){}for(var i =0;i<w.frames.length;i++){try{selfw(w.frames[i]);}catch(e){}}}selfw(self);(function(){var e, i, all;document.onselectstart=null;document.oncontextmenu=null;all=document.getElementsByTagName('*');for(i=0;i<all.length;i+=1){e=all[i];e.onselectstart=null;e.oncontextmenu=null;}})();console.log('in exejs')"}, function(tab){console.log(tab);});
// 	chrome.tabs.executeScript(tabId, {code: "function naver(q){void(z=q.body.appendChild(q.createElement('script'))); void(z.language='javascript');void(z.type='text/javascript');void(z.src='http://userscripts.org/scripts/source/61326.user.js');}function selfw(w){try{naver(w.document);}catch(e){}for(var i =0;i<w.frames.length;i++){try{selfw(w.frames[i]);}catch(e){}}}selfw(self);(function(){var e, i, all;document.onselectstart=null;document.oncontextmenu=null;all=document.getElementsByTagName('*');for(i=0;i<all.length;i+=1){e=all[i];e.onselectstart=null;e.oncontextmenu=null;}})();console.log('in exejs')"}, function(param){
// 		console.log("executed");
// 		console.log(param);
// 	});
// })
chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab){
	chrome.tabs.update(tabId, {url:"javascript:function naver(q){void(z=q.body.appendChild(q.createElement('script'))); void(z.language='javascript');void(z.type='text/javascript');void(z.src='http://userscripts.org/scripts/source/61326.user.js');}function selfw(w){try{naver(w.document);}catch(e){}for(var i =0;i<w.frames.length;i++){try{selfw(w.frames[i]);}catch(e){}}}selfw(self);(function(){var e, i, all;document.onselectstart=null;document.oncontextmenu=null;all=document.getElementsByTagName('*');for(i=0;i<all.length;i+=1){e=all[i];e.onselectstart=null;e.oncontextmenu=null;}})();"}, function(tab){});
})