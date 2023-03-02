// document.addEventListener("keyup", function (event) {
//     // console.log("******", event)
//     // const bio = document.getElementById("bio")
//     // console.log("Biooo", bio)

//     // Get the current text input element
//     let inputElement = document.activeElement;
//     // console.log("inputElement", inputElement)

//     // Get the current value of the input element
//     let inputValue = inputElement.value;
//     // console.log("inputValue", inputValue)

//     // Split the input value into an array of words
//     let words = inputValue.split(" ");
//     // console.log("words", words)

//     // Get the last word typed by the user
//     let lastWord = words[words.length - 1];
//     // console.log("lastWord", lastWord)


//     // Do a lookup to get a list of suggestions for the last word
//     getSuggestions(lastWord,event);
//     // If we have suggestions, display them in a popup
//     // displaySuggestions(suggestions);
//     // if (suggestions.length > 0) {
//     // }


// })


// const getSuggestions = (word,event) => {
//     // Use an API to get a list of suggestions for the given word
//     let data = []
//     chrome.storage.local.get(['words'], (res) => {
//         let {words} = res
//         const data = words.filter((ele) => {
//             // console.log("eleeeeee", ele)
//            return ele.includes(word)
        
//         })
//         // data.push(res)
//         displaySuggestions(data,event);

//     })
// }

// function displaySuggestions(suggestions,event) {
//     console.log("suggestions", suggestions)
//     // Create a popup element to display the suggestions
//     let popup = document.createElement("ul");
//     popup.id = "auto-suggest-popup";
//     // Add each suggestion to the popup
//     for (let i = 0; i < suggestions.length; i++) {
//         let suggestion = suggestions[i];
//         let suggestionElement = document.createElement("li");
//         suggestionElement.className = "suggestion";
//         suggestionElement.textContent = suggestion;
//         popup.appendChild(suggestionElement);
//         // popup.innerText = suggestionElement
//     }
//     //Position the popup next to the current input element
//     let inputElement = document.activeElement;
//     let inputRect = inputElement.getBoundingClientRect();


//     // Calculate the desired position of the popup element
//     const popupLeft = inputRect.right+100;
//     const popupTop = inputRect.top+200;

//     // Set the position of the popup element
//     popup.style.left = `${popupLeft}px`;
//     popup.style.top = `${popupTop}px`;
//     popup.style.zIndex = "9999999";

//     //Add the popup to the document
//     // console.log("ppoppp", popup)
//     popup.style.display = 'block';
//     const ele1 = document.getElementById("segest");


//     event.target.classList.add("rajeev")
//     console.log(event.target.classList)
//     var newEle = document.getElementsByClassName("rajeev")

//     console.log(newEle)

//         let suggest = document.createElement("div");
//         suggest.setAttribute('id',"segest")
//         suggest.className = "displayclass";
//         newEle?.appendChild(suggest)
        
//         console.dir(suggest,popup)
//         suggest.innerHTML = popup.innerHTML 

        // suggest.style.backgroundColor = "red"
        
    // document.body.appendChild(popup);
    // if(!document.getElementsByClassName("suggest")){
    //     let suggestionElements = document.createElement("div");
    //     suggestionElements.className = "suggestion";

    // } else {
    //     ele1.className = "displayclass";
    //     ele1.innerHTML = popup.innerHTML
    //     // ele1.style.backgroundColor = "red"

    // }
// }
// inputTag.addEventListener("input", () => {
//     const inputText = inputTag.value;
//     const cursorPosition = inputTag.selectionStart;
//     const lastSpaceIndex = inputText.lastIndexOf(" ", cursorPosition - 1);
//     const start = lastSpaceIndex === -1 ? 0 : lastSpaceIndex + 1;
//     const nextSpaceIndex = inputText.indexOf(" ", cursorPosition);
//     const end = nextSpaceIndex === -1 ? inputText.length : nextSpaceIndex;
//     const currentWord = inputText.substring(start, end);
//     console.log(currentWord);
//   });


let inputElement = document.activeElement;

let str = ""
let lastWord;
let lastWordIndex 

inputElement.addEventListener("input",async function (e) {
    console.log(e.target.value)
    // let searchString = e.target?.value?.split(" ");
    // let lastWord = searchString?.[searchString?.length - 1];
    // let lastWord;
    let searchString = e.target?.value?.split(" ");
    if(!str?.length){
        lastWord = searchString?.[searchString?.length - 1];
        lastWordIndex = searchString?.length
    } else {
        let strarray = str?.split(" ");
        let currentWord = "" 
        
        for(let i = 0; i < strarray?.length; i++) {
            if (strarray[i] != searchString[i]){
                currentWord = searchString[i]
                lastWordIndex = i + 1;
                break;
            }
        }
        if(currentWord?.length){
            lastWord = currentWord
        } else {

            if(strarray?.filter(e=>e.length != 0).length == searchString?.filter(e=>e.length != 0).length){
                lastWord =  ""
                lastWordIndex = 0
            } else {
                lastWord =  searchString[searchString?.length - 1]
                lastWordIndex = searchString?.length
            }
            
        }
    }

    str = e.target?.value 
    console.log(lastWord)
    document.querySelectorAll(".rajeev").forEach(ele=>{
        ele.classList.remove("rajeev")
    })
    document.querySelectorAll(".list1").forEach(ele=>{
        ele.remove("rajeev")
    })
    // const {words} =  await chrome.storage.local.get(['words'])

    let ulList = document.createElement("ul")
    ulList.classList.add("list1")
    ulList.id = "suggestion"
    const words = ["fever","cold","sick","tharmometer","blood","cancer","paracetamol",'doctor','nurse',"hospital","medicine"]
    e.target.classList.add("rajeev")
    var newEle = inputElement.getElementsByClassName("rajeev")
    
    
    newEle[0]?.parentNode?.appendChild(ulList)
    let matched = words?.filter(ele=>{
        return ele.toLowerCase().includes(lastWord?.trim()?.toLowerCase())
    })
    // console.log(matched,"matchedwords")
    removeElements()
    for (const i of matched) {
            let listItem = document.createElement("li")
            listItem.classList.add("lists-uniqe")
            listItem.style.cursor = "pointer";
            // let word = "<b>" + i.substr(0,e.target.value?.length) + "</b>";
            // let word = 
            // word += i.substr(e.target.value?.length)
            // console.log(word)
            listItem.innerHTML = i
            listItem.onclick = fun1
            document.querySelector(".list1")?.appendChild(listItem)
            newEle[0]?.nextElementSibling?.appendChild(listItem)
    }
    if(lastWord === ""){
            removeElements()
    }
})

function fun1 (value) {

    console.log(lastWord,lastWordIndex)
    let data = value.target.textContent
    let ele2 = inputElement.getElementsByClassName("rajeev")
    let wordsarray = ele2[0].value.split(" ")
    wordsarray[lastWordIndex-1] = data
    ele2[0].value = wordsarray.join(" ")
    ele2[0].textContent = wordsarray.join(" ")
    removeElements()
}

function removeElements() {
    let items = inputElement.querySelectorAll(".lists-uniqe")
    items?.forEach(e=>e.remove())
    // console.log(items,"itemsllllllll")
    // items?.parentElement?.remove()
    inputElement.querySelector(".lists-uniqe")?.parentElement?.remove()
}