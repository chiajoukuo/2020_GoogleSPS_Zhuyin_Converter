function getClickHandler(info, tab) {
    chrome.tabs.sendMessage(tab.id, {text: "bar"});
};

chrome.contextMenus.create({
  "title" : "Convert from Zhuyin",
  "type" : "normal",
  "contexts" : ["editable"],
  "onclick" : getClickHandler
});