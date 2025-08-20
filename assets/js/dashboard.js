function getQueryParam(param) {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get(param);
}

document.getElementById("url").value = getQueryParam("url")

let google_dorks = document.getElementsByClassName("google-dorks")[0].getElementsByClassName("dorks")
for(let i = 0; i < google_dorks.length; i++){
    let dork = google_dorks[i]
    let content = dork.innerText.replace(dork.innerText.match(/site:.*?\s/), `site:${document.getElementById("url").value} `)
    dork.innerText = content
    dork.setAttribute("target", "_blank")
    dork.setAttribute("href", `https://www.google.com/search?q=${encodeURIComponent(content)}`)
}

let bing_dorks = document.getElementsByClassName("bing-dorks")[0].getElementsByClassName("dorks")
for(let i = 0; i < bing_dorks.length; i++){
    let dork = bing_dorks[i]
    let content = dork.innerText.replace(dork.innerText.match(/site:.*?\s/), `site:${document.getElementById("url").value} `)
    dork.innerText = content
    dork.setAttribute("target", "_blank")
    dork.setAttribute("href", `https://www.bing.com/search?q=${encodeURIComponent(content)}`)
}

document.getElementById("url").addEventListener("keyup", (e) => {
    let url = e.target.value
    let google_dorks = document.getElementsByClassName("google-dorks")[0].getElementsByClassName("dorks")
    for(let i = 0; i < google_dorks.length; i++){
        let dork = google_dorks[i]
        let content = dork.innerText.replace(dork.innerText.match(/site:.*?\s/), `site:${url} `)
        dork.innerText = content
        dork.setAttribute("target", "_blank")
        dork.setAttribute("href", `https://www.google.com/search?q=${encodeURIComponent(content)}`)
    }
    
    let bing_dorks = document.getElementsByClassName("bing-dorks")[0].getElementsByClassName("dorks")
    for(let i = 0; i < bing_dorks.length; i++){
        let dork = bing_dorks[i]
        let content = dork.innerText.replace(dork.innerText.match(/site:.*?\s/), `site:${document.getElementById("url").value} `)
        dork.innerText = content
        dork.setAttribute("target", "_blank")
        dork.setAttribute("href", `https://www.bing.com/search?q=${encodeURIComponent(content)}`)
    }
})