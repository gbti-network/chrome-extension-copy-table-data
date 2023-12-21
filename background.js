chrome.runtime.onInstalled.addListener(() => {
    chrome.contextMenus.create({
        id: "selectTableData",
        title: "Select Table Data",
        contexts: ["all"] // Adjust to ["page", "frame", "selection", etc.] as needed
    });
});

chrome.contextMenus.onClicked.addListener((info, tab) => {
    //console.log('Context Menu Item Clicked')
    if (info.menuItemId === "selectTableData") {
        chrome.tabs.sendMessage(tab.id, {
            action: "selectTable",
            frameId: info.frameId
        });
    }
});
