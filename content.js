
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


let inputElement = document.activeElement;
let ulList = document.createElement("ul")
ulList.classList.add("list1")
ulList.id = "suggestion"
console.log(ulList)
inputElement.addEventListener("keyup",async function (e) {
    
    console.log(inputElement);
    const {words} =  await chrome.storage.local.get(['words'])
    e.target.classList.add("rajeev")
    var newEle = inputElement.getElementsByClassName("rajeev")
    
   newEle[0].parentNode.appendChild(ulList)
   
    for (const i of words) {
        if(i.toLowerCase().startsWith(e.target.value.toLowerCase())&&e.target.value != ""){
            let listItem = document.createElement("li")
            listItem.classList.add("list-items")
            listItem.style.cursor = "pointer";
            let word = "<b>" + i.substr(0,e.target.value?.length) + "</b>";
            word += i.substr(e.target.value?.length)
            console.log(word)
            listItem.innerHTML = word
            listItem.onclick = fun1
            document.querySelector(".list1").appendChild(listItem)
            newEle[0].nextElementSibling.appendChild(listItem)
        }
    }
    console.log(newEle[0].parentNode)
})

function fun1 (value) {
    let data = value.target.textContent
    console.log(data)
    let ele2 = inputElement.getElementsByClassName("rajeev")
    let wordsarray = ele2[0].value.split(" ")
    wordsarray[wordsarray.length-1] = data
    console.log(wordsarray,ele2[0].value)
    ele2[0].value = wordsarray.join(" ")
}

function removeElements() {
    let items = document.querySelector(".list-items")
    console.log(items,"itemsllllllll")
    items?.forEach((item)=>{
        item?.remove();
    })
}