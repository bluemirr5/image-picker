function ImageFinderCTRL($scope) {
	$(function(){
  	$('#container').masonry({
	    // options
	    itemSelector : '.item',
	  });
	});


	chrome.windows.getCurrent(function(w){ // Select Current Window
	    var selectTabParam = {};
	    selectTabParam.windowId = w.id;
	    selectTabParam.active = true;
	    var selectTabCallBack = function(tabs) {
	        if(tabs.length <= 0) {
	            return;
	        }

	        chrome.pageCapture.saveAsMHTML({tabId:tabs[0].id}, function(htmlData){
	            var reader = new FileReader();
	            reader.addEventListener("loadend", function() {
                    var boundary = getBoundaryFromBlobStr(reader.result);
                    var contents = reader.result.split(boundary);
                    for(var i = 0; contents != null && i < contents.length; i++) {
                        getImageFromContents(contents[i])
                    }
	            });
	            reader.readAsText(htmlData);
	        });
	    };
	    chrome.tabs.query(selectTabParam, selectTabCallBack);
	});

    function getImageFromContents(contentsString) {
        console.log(contentsString);
        if(isImageContentsType(contentsString)) {
            var contentsUrl = getContentsLocation(contentsString);
            console.log(contentsUrl);
        }
    }

    function isImageContentsType(contentsString) {
        var retValue = false;
        var contentsStringSplited = contentsString.split("Content-Type: ", 2)
        if(contentsStringSplited.length > 2) {
            var newLineSplited = contentsStringSplited[1].split("\n", 2);
            if(newLineSplited.length > 2) {
                var contentsType = newLineSplited[0]
                console.log(contentsType);
                retValue = contentsType.contains("image")
            }
        }
        return retValue;
    }

    function getContentsLocation(contentsString) {
        var contentsLocation = "";
        var contentsStringSplited = contentsString.split("Content-Location: ", 2)
        if(contentsStringSplited.length > 2) {
            var newLineSplited = contentsStringSplited[1].split("\n", 2);
            if(newLineSplited.length > 2) {
                contentsLocation = newLineSplited[0]
            }
        }
        return contentsLocation;
    }


//	var dup = {};
//	$scope.imageArray = [];
//	chrome.windows.getCurrent(function(w){ // Select Current Window
//		chrome.tabs.query({windowId:w.id, active:true}, function(tabs){ // Select Current Tab
//			var tab_Id = -1;
//			if(tabs.length > 0) {
//				tab_Id = tabs[0].id;
//				chrome.pageCapture.saveAsMHTML({tabId:tab_Id}, function(htmlData){
//					var reader = new FileReader();
//					reader.addEventListener("loadend", function() {
//					   // reader.result contains the contents of blob as a typed array
//						var boundary = getBoundaryFromBlobStr(reader.result);
//						var contents = reader.result.split(boundary);
//						for(var i = 0; contents != null && i < contents.length; i++) {
//							var content = contents[i];
//							var fixs = content.split("\n", 4);
//							if(fixs != null && fixs.length > 2) {
//								if(fixs[1].indexOf("Content-Type: image") != -1) { // Image Tag
//									var obj = {};
//									var contentsTypeArray = fixs[1].split("Content-Type: ");
//									var contentsLocationArray = fixs[3].split("Content-Location: ");
//									obj.contentType = contentsTypeArray[1];
//									obj.location = "";
//									obj.location = contentsLocationArray[1];
//									obj.location = obj.location.replace("=", "");
//									obj.location = obj.location.replace("\n", "");
//									obj.location = obj.location.replace(/[\n\r]/g, '');
//									obj.location = obj.location.replace('"', '')
//									obj.location = obj.location.replace(/"/g, '')
//									if(obj.location.indexOf("http") != -1 && dup[obj.location] == null) {
//										dup[""+obj.location] = "img";
//										var nameTemps = obj.location.split("/");
//										obj.fileName = nameTemps[nameTemps.length-1]
//										$scope.imageArray.push(obj);
//									}
//								} else if(fixs[1].indexOf("Content-Type: text/css") != -1) { // CSS Background
//									var temp = content.split("background-image")
//									var cssTempArray = temp.slice(1, temp.length);
//									for(var j = 0; j < cssTempArray.length; j++) {
//										var urlTempArray = cssTempArray[j].split(";");
//										if(urlTempArray != null && urlTempArray.length > 0) {
//											var urlRealTempArray = urlTempArray[0].split(")");
//											if(urlRealTempArray != null && urlRealTempArray.length > 0) {
//												var finala = urlRealTempArray[0].split("(");
//												if(finala != null && finala.length > 1) {
//													var obj = {};
//													obj.location = "";
//													obj.location = finala[1];
//													obj.location = obj.location.replace("=", "");
//													obj.location = obj.location.replace("\n", "");
//													obj.location = obj.location.replace(/[\n\r]/g, '');
//													obj.location = obj.location.replace('"', '')
//													obj.location = obj.location.replace(/"/g, '')
//													var nameTemps = obj.location.split("/");
//													obj.fileName = nameTemps[nameTemps.length-1]
//													if(obj.location.indexOf("http") != -1 && dup[obj.location] == null) {
//														dup[""+obj.location] = "css";
//														$scope.imageArray.push(obj);
//													}
//												}
//											}
//										}
//									}
//								}
//							}
//						}
//						$scope.$apply();
//					});
//					reader.readAsText(htmlData);
//				});
//			}
//		});
//	});

	function getBoundaryFromBlobStr(str) {
		var tempArray = str.split("\tboundary=\"");
		if(tempArray.length > 0) {
			var boundaryTempArray = tempArray[1].split("\n");
			if(boundaryTempArray.length > 0) {
				var boundary = boundaryTempArray[0];
				var temp = boundary.split("\"");
				boundary = temp[0];
				return boundary;
			} else {
				return null;
			}
		} else {
			return null;
		}
		
	};
}
