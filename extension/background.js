function getClickHandler(info, tab) {
    chrome.tabs.sendMessage(tab.id, "");
};

chrome.contextMenus.create({
  "title" : "Convert from Zhuyin",
  "type" : "normal",
  "contexts" : ["editable"],
  "onclick" : getClickHandler
});