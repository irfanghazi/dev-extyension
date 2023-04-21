chrome.runtime.onInstalled.addListener((details) => {
    fetch("https://stage-api.medspellapp.com/getDictionaryItems")
        .then((res) => res.json())
        .then((data) => {          
            chrome.storage.local.set({data})
        })
})
console.log("Background runs")