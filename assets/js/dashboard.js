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

function edit_dork(dork){
    document.getElementById("editDorksModal").style.display = "block";
    document.getElementById("dork_new_value").value = dork
    document.getElementById("dork_new_value").style.border = "1px solid #ccc"
    document.getElementById("wrong_dork_warning_edit").style.display = "none"
    document.getElementById("last_value").value = dork
}


if(getQueryParam("url")){
    document.getElementById("url").value = getQueryParam("url")
    let resultBox = document.getElementById("resultBox")
    resultBox.innerHTML = ""
    chrome.storage.local.get("dorks", (result) => {
      let dorks = result["dorks"] || [];
      dorks.reverse()
      dorks.forEach(dork => {
        let value = dork.replace("site:site.com", `site:${getQueryParam("url")}`)
        let span = document.createElement("span")
        span.classList.add("dorks")
        span.innerText = value
        let encodedValue = encodeURIComponent(value)
        resultBox.append(span)
        chrome.storage.local.get("anchors", (result) => {
            const anchors = result["anchors"] || {};
            Object.keys(anchors).forEach(key => {
                span.appendChild(anchor_maker(key, anchors[key].replace("{QUERY}", encodedValue)))
            })
            let edit_span = document.createElement("span")
            edit_span.classList.add("edit_dork_button")
            edit_span.innerText = "EDIT"
            span.appendChild(edit_span)
            edit_span.addEventListener("click", () => {
                edit_dork(dork)
            })
            let remove_span = document.createElement("span")
            remove_span.classList.add("remove_dork_button")
            remove_span.innerText = "X"
            span.appendChild(remove_span)
            remove_span.addEventListener("click", () => {
                remove_dork(dork)
            })
        })
      })
    })
}
function remove_dork(value){
    let confirmation = confirm("Do you want to remove this dork ?")
    if(confirmation){
        chrome.storage.local.get("dorks", (result) => {
            let dorks = result["dorks"] || [];
            chrome.storage.local.set({"dorks": dorks.filter(item => item !== value)}, () => {});

            location.reload()
        })
    }
}
document.getElementById("url").addEventListener("keyup", (e) => {
    let resultBox = document.getElementById("resultBox")
    resultBox.innerHTML = ""
    chrome.storage.local.get("dorks", (result) => {
      let dorks = result["dorks"] || [];
      dorks.reverse()
      dorks.forEach(dork => {
        let value = dork.replace("site:site.com", `site:${e.target.value}`)
        let span = document.createElement("span")
        span.classList.add("dorks")
        span.innerText = value
        let encodedValue = encodeURIComponent(value)
        resultBox.append(span)
        chrome.storage.local.get("anchors", (result) => {
            const anchors = result["anchors"] || {};
            Object.keys(anchors).forEach(key => {
                span.appendChild(anchor_maker(key, anchors[key].replace("{QUERY}", encodedValue)))
            })
            let edit_span = document.createElement("span")
            edit_span.classList.add("edit_dork_button")
            edit_span.innerText = "EDIT"
            span.appendChild(edit_span)
            edit_span.addEventListener("click", () => {
                edit_dork(dork)
            })
            let remove_span = document.createElement("span")
            remove_span.classList.add("remove_dork_button")
            remove_span.innerText = "X"
            span.appendChild(remove_span)
            remove_span.addEventListener("click", () => {
                remove_dork(dork)
            })
        })
      })
    })
})