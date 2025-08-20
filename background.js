chrome.action.onClicked.addListener((tab) => {
  let origin = new URL(tab.url).origin;
  origin = origin.replace("https://", "")
  chrome.tabs.query({}, (tabs) => {
    const existingTab = tabs.find(tab => tab.url && (tab.url.includes(chrome.runtime.id + `/dashboard.html?url=${encodeURIComponent(origin)}`) || tab.url.includes(chrome.runtime.id + `/dashboard.html?origin_add=${encodeURIComponent(origin)}`) ));
    if(existingTab){
      chrome.tabs.update(existingTab.id, { active: true });
      chrome.windows.update(existingTab.windowId, { focused: true });
    }else{
      const url = chrome.runtime.getURL("dashboard.html") + `?url=${encodeURIComponent(origin)}`;
      chrome.tabs.create({ url });
    }
  })
});

