


//Gets latex an stores it in clipboard
function extractLatex(request){
	var url = request.url;
	console.log(url);
	findImagesByRegexp(url);
	return Promise.resolve({response: "Latex recieved!"});

}

function findImagesByRegexp(url) {

	console.log("Function Started!");
	var images = document.getElementsByTagName('img');
	console.log(images.length);
	for (var i = 0; i < images.length; ++i) {
	    if (images[i].src == url){
	        console.log("Image found!");
	        console.log(images[i].alt);

	        navigator.clipboard.writeText(images[i].alt).then(function() {
			  /* clipboard successfully set */
			  console.log("Succesfully copied the Latex");
			}, function() {
			  /* clipboard write failed */
			  console.log("Could not copy the Latex");
			});
	    }
	}


}

browser.runtime.onMessage.addListener(extractLatex);