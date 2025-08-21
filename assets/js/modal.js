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