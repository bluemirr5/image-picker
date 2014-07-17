function ImageFinderCTRL($scope) {
	$(function(){
  	$('#container').masonry({
	    // options
	    itemSelector : '.item',
	  });
	});

	$scope.imageArray = [];

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
                        var imgUrl = getImageUrlFromContents(contents[i]);
						if(imgUrl) {
							var viewObject = makeViewObjectFromURL(imgUrl);
							$scope.imageArray.push(viewObject);
						}
                    }
					$scope.$apply();
	            });
	            reader.readAsText(htmlData);
	        });
	    };
	    chrome.tabs.query(selectTabParam, selectTabCallBack);
	});

    function getImageUrlFromContents(contentsString) {
		var retUrl;
        if(isImageContentsType(contentsString)) {
            retUrl = getContentsLocation(contentsString);
        }
		return retUrl;
    }

    function isImageContentsType(contentsString) {
        var retValue = false;
        var contentsStringSplited = contentsString.split("Content-Type: ", 2)
        if(contentsStringSplited.length > 1) {
            var newLineSplited = contentsStringSplited[1].split("\n", 2);
            if(newLineSplited.length > 1) {
                var contentsType = newLineSplited[0];
                retValue = (contentsType.indexOf("image/") !== -1);
            }
        }
        return retValue;
    }
	
	function makeViewObjectFromURL(url) {
		var obj = {};
		obj.location = url;
		var nameTemps = obj.location.split("/");
		obj.fileName = nameTemps[nameTemps.length-1]
		obj.fileName = obj.fileName.replace("=", "");
		obj.fileName = obj.fileName.replace("\n", "");
		obj.fileName = obj.fileName.replace(/[\n\r]/g, '');
		obj.fileName = obj.fileName.replace('"', '')
		obj.fileName = obj.fileName.replace(/"/g, '')
		return obj;
	}

    function getContentsLocation(contentsString) {
        var contentsLocation = "";
        var contentsStringSplited = contentsString.split("Content-Location: ", 2)
        if(contentsStringSplited.length > 1) {
            var newLineSplited = contentsStringSplited[1].split("\n", 2);
            if(newLineSplited.length > 1) {
                contentsLocation = newLineSplited[0]
            }
        }
        return contentsLocation;
    }

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
	}
}
