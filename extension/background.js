function getClickHandler(info, tab) {
    chrome.tabs.sendMessage(tab.id, {text: "bar"});
};

chrome.contextMenus.create({
  "title" : "change to 'bar'",
  "type" : "normal",
  "contexts" : ["editable"],
  "onclick" : getClickHandler
});