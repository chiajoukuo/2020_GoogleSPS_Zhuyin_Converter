function getClickHandler(info, tab) {
    chrome.tabs.sendMessage(tab.id, "");
};

chrome.contextMenus.create({
  "title" : "Convert from Zhuyin",
  "type" : "normal",
  "contexts" : ["editable"],
  "onclick" : getClickHandler
});


chrome.browserAction.onClicked.addListener(function(tab) {
  chrome.tabs.executeScript(null, {file: "content_script.js"});
});

chrome.commands.onCommand.addListener(function(command) {
    if(command == 'convert'){
        chrome.tabs.query({active: true, currentWindow: true}, function(tabs){
            chrome.tabs.sendMessage(tabs[0].id,"");
        });
    }
});