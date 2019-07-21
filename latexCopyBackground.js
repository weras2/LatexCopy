/*
Called when the item has been created, or when creation failed due to an error.
We'll just log success/failure here.
*/
function onCreated() {
  if (browser.runtime.lastError) {
    console.log(`Error: ${browser.runtime.lastError}`);
  } else {
    console.log("Item created successfully");
  }
}

/*
Called when the item has been removed.
We'll just log success here.
*/
function onRemoved() {
  console.log("Item removed successfully");
}

/*
Called when there was an error.
We'll just log the error here.
*/
function onError(error) {
  console.log(`Error: ${error}`);
}

/*
Create the context menu item.
*/
browser.menus.create({
  id: "copy-latex",
  title: "Copy Latex",
  contexts: ["all"]
}, onCreated); //Call function to check if the item was initialized succesfully

//When the user selects our option call extractLatex()
var url;
browser.menus.onClicked.addListener((info, tab) => {
 	if (info.menuItemId == "copy-latex"){
 		url = info.srcUrl;
 		init();
 	}
});

function handleResponse(message) {
  console.log(`Message from the background script:  ${message.response}`);
}

function handleError(error) {
  console.log(`Error: ${error}`);
}



function sendMessageToTabs(tabs) {
  for (let tab of tabs) {
    browser.tabs.sendMessage(
      tab.id,
      {url: url}
    ).then(response => {
      console.log("Message from the content script:");
      console.log(response.response);
    }).catch(onError);
  }
}

function init(){
  browser.tabs.query({
    currentWindow: true,
    active: true
  }).then(sendMessageToTabs).catch(onError);
}