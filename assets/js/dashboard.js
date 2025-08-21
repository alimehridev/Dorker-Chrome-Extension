function getQueryParam(param) {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get(param);
}

function anchor_maker(text, url){
    let anchor = document.createElement("a")
    anchor.classList.add("anchor")
    anchor.href = url
    anchor.innerText = text
    anchor.setAttribute("target", "_blank")
    return anchor
}


if(getQueryParam("url")){
    document.getElementById("url").value = getQueryParam("url")
    let resultBox = document.getElementById("resultBox")
    resultBox.innerHTML = ""
    chrome.storage.local.get("dorks", (result) => {
      const dorks = result["dorks"] || [];
      dorks.forEach(dork => {
          let value = dork.replace("site:site.com", `site:${getQueryParam("url")}`)
          let span = document.createElement("span")
          span.classList.add("dorks")
          span.innerText = value
          let encodedValue = encodeURIComponent(value)
          resultBox.append(span)
          span.appendChild(anchor_maker("GOOGLE", `https://google.com/search?q=${encodedValue}`))
          span.appendChild(anchor_maker("BING", `https://bing.com/search?q=${encodedValue}`))
          span.appendChild(anchor_maker("YANDEX", `https://yandex.com/search/?text=${encodedValue}`))
          span.appendChild(anchor_maker("YAHOO", `https://search.yahoo.com/search?p=${encodedValue}`))
      })
    })
}
document.getElementById("url").addEventListener("keyup", (e) => {
    let resultBox = document.getElementById("resultBox")
    resultBox.innerHTML = ""
    chrome.storage.local.get("dorks", (result) => {
      const dorks = result["dorks"] || [];
      dorks.forEach(dork => {
          let value = dork.replace("site:site.com", `site:${e.target.value}`)
          let span = document.createElement("span")
          span.classList.add("dorks")
          span.innerText = value
          let encodedValue = encodeURIComponent(value)
          resultBox.append(span)
          span.appendChild(anchor_maker("GOOGLE", `https://google.com/search?q=${encodedValue}`))
          span.appendChild(anchor_maker("BING", `https://bing.com/search?q=${encodedValue}`))
          span.appendChild(anchor_maker("YANDEX", `https://yandex.com/search/?text=${encodedValue}`))
          span.appendChild(anchor_maker("YAHOO", `https://search.yahoo.com/search?p=${encodedValue}`))
      })
    })
})