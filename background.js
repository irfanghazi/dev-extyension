chrome.runtime.onInstalled.addListener((details) => {
    let count =0;
    for (i=0; i < 10; i++){
        count += count
    }
    console.log("Count", count)
    fetch("https://stage-api.medspellapp.com/getDictionaryItems")
        .then((res) => res.json())
        .then((data) => {          
            chrome.storage.local.set({data})
        })
})
console.log("Background runs")