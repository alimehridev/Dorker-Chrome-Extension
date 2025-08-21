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


chrome.runtime.onInstalled.addListener(() => {
  let dorks = [
    'site:site.com', 
    'site:site.com inurl:q= | inurl:s= | inurl:search= | inurl:query= | inurl:keyword= | inurl:lang= inurl:&', 
    'site:site.com inurl:url= | inurl:return= | inurl:next= | inurl:redirect= | inurl:redir= | inurl:ret= | inurl:r2= | inurl:page= inurl:& inurl:http', 
    'site:site.com inurl:id= | inurl:pid= | inurl:category= | inurl:cat= | inurl:action= | inurl:sid= | inurl:dir= inurl:&', 
    'site:site.com inurl:http | inurl:url= | inurl:path= | inurl:dest= | inurl:html= | inurl:data= | inurl:domain= | inurl:page= inurl:&', 
    'site:site.com inurl:include | inurl:dir | inurl:detail= | inurl:file= | inurl:folder= | inurl:inc= | inurl:locate= | inurl:doc= | inurl:conf= inurl:&', 
    'site:site.com inurl:cmd | inurl:exec= | inurl:query= | inurl:code= | inurl:do= | inurl:run= | inurl:read= | inurl:ping= inurl:&', 
    'site:site.com ”choose file”', 
    'site:site.com inurl:apidocs | inurl:api-docs | inurl:swagger | inurl:api-explorer', 
    'site:site.com inurl:login | inurl:signin | intitle:login | intitle:signin | inurl:secure', 
    'site:site.com inurl:test | inurl:env | inurl:dev | inurl:staging | inurl:sandbox | inurl:debug | inurl:temp | inurl:internal | inurl:demo', 
    'site:site.com ext:txt | ext:pdf | ext:xml | ext:xls | ext:xlsx | ext:ppt | ext:pptx | ext:doc | ext:docx intext:“confidential” | intext:“Not for Public Release” | intext:”internal use only” | intext:“do not distribute”', 
    'site:site.com inurl:email= | inurl:phone= | inurl:password= | inurl:secret= inurl:&', 
    'site:site.com inurl:api | site:*/rest | site:*/v1 | site:*/v2 | site:*/v3', 
    'site:site.com ext:log | ext:txt | ext:conf | ext:cnf | ext:ini | ext:env | ext:sh | ext:bak | ext:backup | ext:swp | ext:old | ext:~ | ext:git | ext:svn | ext:htpasswd | ext:htaccess | ext:json', 
    'site:site.com ext:php | ext:aspx | ext:asp | ext:jsp | ext:html | ext:htm', 
    'site:site.com inurl:conf | inurl:env | inurl:cgi | inurl:bin | inurl:etc | inurl:root | inurl:sql | inurl:backup | inurl:admin | inurl:php', 
    'site:site.com inurl:"error" | intitle:"exception" | intitle:"failure" | intitle:"server at" | inurl:exception | "database error" | "SQL syntax" | "undefined index" | "unhandled exception" | "stack trace"', 
    'site:site.com ext:log | ext:txt | ext:conf | ext:cnf | ext:ini | ext:env | ext:sh | ext:bak | ext:backup | ext:swp | ext:old | ext:~ | ext:git | ext:svn | ext:htpasswd | ext:htaccess | ext:xml', 
    'site:site.com inurl:url= | inurl:return= | inurl:next= | inurl:redir= inurl:http', 
    'site:site.com inurl:http | inurl:url= | inurl:path= | inurl:dest= | inurl:html= | inurl:data= | inurl:domain= | inurl:page= inurl:&', 
    'site:site.com inurl:config | inurl:env | inurl:setting | inurl:backup | inurl:admin | inurl:php', 
    'site:site.com inurl:email= | inurl:phone= | inurl:password= | inurl:secret= inurl:&', 
    'site:site.com inurl:apidocs | inurl:api-docs | inurl:swagger | inurl:api-explorer', 
    'site:site.com inurl:cmd | inurl:exec= | inurl:query= | inurl:code= | inurl:do= | inurl:run= | inurl:read= | inurl:ping= inurl:&', 
    'site:site.com inurl:(unsubscribe|register|feedback|signup|join|contact|profile|user|comment|api|developer|affiliate|upload|mobile|upgrade|password)', 
    'site:site.com intitle:"Welcome to Nginx"'
  ]

  chrome.storage.local.set({"dorks": dorks}, () => {
  });
  let anchors = {
    "GOOGLE": "https://google.com/search?q={QUERY}",
    "BING": "https://bing.com/search?q={QUERY}",
    "YANDEX": "https://yandex.com/search/?text={QUERY}",
    "YAHOO": "https://search.yahoo.com/search?p={QUERY}",
  }
  chrome.storage.local.set({"anchors": anchors}, () => {
  });
});