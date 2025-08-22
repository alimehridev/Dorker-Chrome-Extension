document.getElementById("addDorksButton").addEventListener("click", () => {
    document.getElementById("addDorksModal").style.display = "block";
})
document.getElementById("closeAddDorksModal").addEventListener("click", () => {
    document.getElementById("addDorksModal").style.display = "none";
})
document.getElementById("dork_value").addEventListener("keyup", (e) => {
    let value = e.target.value
    if(!value.includes("site:site.com")){
        e.target.style.border = "1px solid red"
        document.getElementById("wrong_dork_warning").innerText = "Your dork should contain 'site:site.com' to work correctly"
        document.getElementById("wrong_dork_warning").style.display = "block"
    }else {
        e.target.style.border = "1px solid #ccc"
        document.getElementById("wrong_dork_warning").style.display = "none"
    }
})
document.getElementById("add_new_dork_button").addEventListener("click", () => {
    let value = document.getElementById("dork_value").value
    if(!value.includes("site:site.com")){
        document.getElementById("wrong_dork_warning").innerText = "Your dork should contain 'site:site.com' to work correctly"
        document.getElementById("dork_value").style.border = "1px solid red"
        document.getElementById("wrong_dork_warning").style.display = "block"
    }else {
        document.getElementById("dork_value").style.border = "1px solid #ccc"
        document.getElementById("wrong_dork_warning").style.display = "none"
        chrome.storage.local.get("dorks", (result) => {
            const dorks = result["dorks"] || [];
            if(dorks.includes(value)){
                document.getElementById("wrong_dork_warning").innerText = "Entered dork is duplicate"
                document.getElementById("dork_value").style.border = "1px solid red"
                document.getElementById("wrong_dork_warning").style.display = "block"
            }else{
                dorks.push(value)
                chrome.storage.local.set({"dorks": dorks}, () => {});
                location.reload()
            }
        })
    }
})



document.getElementById("closeEditDorksModal").addEventListener("click", () => {
    document.getElementById("editDorksModal").style.display = "none";
})


document.getElementById("dork_new_value").addEventListener("keyup", (e) => {
    let value = e.target.value
    if(!value.includes("site:site.com")){
        e.target.style.border = "1px solid red"
        document.getElementById("wrong_dork_warning_edit").innerText = "Your dork should contain 'site:site.com' to work correctly"
        document.getElementById("wrong_dork_warning_edit").style.display = "block"
    }else {
        e.target.style.border = "1px solid #ccc"
        document.getElementById("wrong_dork_warning_edit").style.display = "none"
    }
})

document.getElementById("edit_dork_button").addEventListener("click", () => {
    let value = document.getElementById("dork_new_value").value
    if(!value.includes("site:site.com")){
        document.getElementById("wrong_dork_warning_edit").innerText = "Your dork should contain 'site:site.com' to work correctly"
        document.getElementById("dork_value").style.border = "1px solid red"
        document.getElementById("wrong_dork_warning_edit").style.display = "block"
    }else {
        document.getElementById("dork_value").style.border = "1px solid #ccc"
        document.getElementById("wrong_dork_warning_edit").style.display = "none"
        if(last_value == value){
            location.reload()
        }else {
            let last_value = document.getElementById("last_value").value
            chrome.storage.local.get("dorks", (result) => {
                let dorks = result["dorks"] || [];
                dorks = dorks.filter(item => item !== last_value)
                dorks.push(value)
                chrome.storage.local.set({"dorks": dorks}, () => {
                    location.reload()
                });
            })

        }
    }
})
function disable_edit_mode(el){
    document.getElementById("old_se_label").value = ""
    document.getElementById("old_se_url").value = ""
    document.getElementById("add_se_label").value = ""
    document.getElementById("add_se_url").value = ""
    document.getElementById("header").innerText = "Add new search engine"
    document.getElementById("new_search_engine_button").innerText = "Add"
    el.target.remove()
}
function edit_search_engine(url, label){
    document.getElementById("header").innerText = "Edit search engine"
    let exit_edit_mode_button = document.createElement("span")
    exit_edit_mode_button.innerText = "x"
    exit_edit_mode_button.classList.add("disable_edit_model_btn")
    exit_edit_mode_button.setAttribute("title", "disable edit mode")
    exit_edit_mode_button.addEventListener("click", (el) => {
        disable_edit_mode(el)
    })
    document.getElementById("headofheader").appendChild(exit_edit_mode_button)
    document.getElementById("old_se_label").value = label
    document.getElementById("old_se_url").value = url    
    document.getElementById("add_se_label").value = label
    document.getElementById("add_se_url").value = url
    document.getElementById("new_search_engine_button").innerText = "Edit"
    document.getElementById("add_se_label").value.focus()
}
function remove_search_engine(url, label){
    let confirmation = confirm("Are you sure ?")
    if(confirmation){
        chrome.storage.local.get("anchors", (result) => {
            let anchors = result["anchors"] || {};
            delete anchors[label]
            chrome.storage.local.set({"anchors": anchors}, () => {
                location.reload()
            });
        })
    }
}

document.getElementById("searchEngineButton").addEventListener("click", () => {
    document.getElementById("add_se_label").value = ""
    document.getElementById("add_se_url").value = ""
    document.getElementById("header").innerText = "Add new search engine"
    document.getElementById("new_search_engine_button").innerText = "Add"
    document.getElementById("searchEngineModal").style.display = "block";
    if(document.getElementsByClassName("disable_edit_model_btn")[0]){
        document.getElementsByClassName("disable_edit_model_btn")[0].remove()
    }
    document.getElementById("add_se_label").focus()

    let search_engines = document.getElementById("search_engines")
    search_engines.innerHTML = ""
    let anchor_div = document.createElement("div")
    anchor_div.classList.add("se")
    anchor_div.innerHTML = `<span class="se_url"><b>URL</b></span>` +
        `<span class="se_label"><b>LABEL</b></span>` +
        '<span class="se_buttons">' + 
        '</span>'
    search_engines.appendChild(anchor_div)   
    chrome.storage.local.get("anchors", (result) => {
            let anchors = result["anchors"] || {};
            Object.keys(anchors).forEach(label => {
                url = anchors[label]
                let anchor_div = document.createElement("div")
                anchor_div.classList.add("se")
                let se_url = document.createElement("span")
                se_url.classList.add("se_url")
                se_url.innerText = url
                anchor_div.appendChild(se_url)
                let se_label = document.createElement("span")
                se_label.classList.add("se_label")
                se_label.innerText = label
                anchor_div.appendChild(se_label)
            
                let se_buttons = document.createElement("span")
                se_buttons.classList.add("se_buttons")
                let se_edit = document.createElement("span")
                se_edit.classList.add("se_edit")
                se_edit.innerText = "EDIT"
                let se_remove = document.createElement("span")
                se_remove.classList.add("se_remove")
                se_remove.innerText = "X"
                se_edit.addEventListener("click", (e) => {
                    edit_search_engine(e.target.parentElement.parentElement.getElementsByClassName("se_url")[0].innerText
, e.target.parentElement.parentElement.getElementsByClassName("se_label")[0].innerText
)
                })
                se_remove.addEventListener("click", (e) => {
                    remove_search_engine(e.target.parentElement.parentElement.getElementsByClassName("se_url")[0].innerText
, e.target.parentElement.parentElement.getElementsByClassName("se_label")[0].innerText
)
                })
                se_buttons.appendChild(se_edit)
                se_buttons.appendChild(se_remove)
                anchor_div.appendChild(se_buttons)
                search_engines.appendChild(anchor_div)
            })
    })
})
function is_se_url_valid(value){
    if(value.length == 0){
        return [false, "URL can not be empty"]
    }
    if(!value.startsWith("https://")){
        return [false, "URL should start with https://"]
    }
    if(!value.includes("{QUERY}")){
        return [false, "URL should contain '{QUERY}' to work correctly"]
    }
    return [true]
}
function is_se_label_valid(value){
    if(value.length == 0){
        return [false, "Label can not be empty"]
    }
    return [true]
}

function check_se_values(url, label){
    if(!is_se_label_valid(label)[0]){
        document.getElementById("wrong_search_engine_warning").style.display = "block"
        document.getElementById("wrong_search_engine_warning").innerText = is_se_label_valid(label)[1]
        document.getElementById("add_se_label").style.border = "1px solid red"
        return false
    }
    else if(!is_se_url_valid(url)[0]){
        document.getElementById("wrong_search_engine_warning").style.display = "block"
        document.getElementById("wrong_search_engine_warning").innerText = is_se_url_valid(url)[1]
        document.getElementById("add_se_url").style.border = "1px solid red"

        return false
    }else {
        document.getElementById("add_se_url").style.border = "1px solid #ccc"
        document.getElementById("add_se_label").style.border = "1px solid #ccc"
        document.getElementById("wrong_search_engine_warning").style.display = "none"
        return true
    }
}
document.getElementById("add_se_url").addEventListener("keyup", (e) => {
    let url = e.target.value
    let label = document.getElementById("add_se_label").value
    check_se_values(url, label)    
})
document.getElementById("add_se_label").addEventListener("keyup", (e) => {
    let label = e.target.value
    let url = document.getElementById("add_se_url").value
    check_se_values(url, label)    
})

document.getElementById("new_search_engine_button").addEventListener("click", (e) => {
    if(e.target.innerText === "Add"){
        let label = document.getElementById("add_se_label").value
        let url = document.getElementById("add_se_url").value
        if(check_se_values(url, label)){
            chrome.storage.local.get("anchors", (result) => {
                let anchors = result["anchors"] || {};
                anchors[label] = url
                chrome.storage.local.set({"anchors": anchors}, () => {
                    location.reload()
                });
            })
        }
    }else {
        let old_se_label = document.getElementById("old_se_label").value
        let new_se_label = document.getElementById("add_se_label").value
        let new_se_url = document.getElementById("add_se_url").value
        if(check_se_values(new_se_url, new_se_label)){
            chrome.storage.local.get("anchors", (result) => {
                let anchors = result["anchors"] || {};
                delete anchors[old_se_label]
                anchors[new_se_label] = new_se_url
                chrome.storage.local.set({"anchors": anchors}, () => {
                    location.reload()
                });
            })
        }
    }
})
document.getElementById("closeSearchEngineModal").addEventListener("click", () => {
    document.getElementById("searchEngineModal").style.display = "none";
})