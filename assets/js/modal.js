function openAddDorksModal() {
  document.getElementById("addDorksModal").style.display = "block";
}
function closeAddDorksModal() {
  document.getElementById("addDorksModal").style.display = "none";
}
document.getElementById("addDorksButton").addEventListener("click", () => {
    openAddDorksModal()
})
document.getElementById("closeAddDorksModal").addEventListener("click", () => {
    closeAddDorksModal()
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