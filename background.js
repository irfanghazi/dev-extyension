chrome.runtime.onInstalled.addListener((details) => {
    console.log("details", details)
    fetch("https://jsonplaceholder.typicode.com/users")
        .then((res) => res.json())
        .then((data) => { 
            console.log("Data", data)
            const name = data.map((ele) => ele.name)
            console.log("Name", name) 
            chrome.storage.local.set({words:name})
        })
})
console.log("Background runs")