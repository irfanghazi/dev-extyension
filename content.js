
let inputElement = document.activeElement;
console.log("DDDDDDDD", inputElement)

let str = ""
let lastWord;
let lastWordIndex

inputElement.addEventListener("input", async function (e) {
    // console.log(e.target.value)
    let searchString = e.target?.value?.trim()?.split(" ");
    if (!str?.length) {
        // running first time when the user start type to get the first letter
        lastWord = searchString?.[searchString?.length - 1];
        lastWordIndex = searchString?.length
        console.log("first", lastWord, lastWordIndex)
    } else {
        
        // running when the str get its first letter
        let strarray = str?.split(" ");
        
        // Here we are getting the typing word from the user
        let currentWord = ""
        for (let i = 0; i < strarray?.length; i++) {
            if (strarray[i] != searchString[i]) {
                currentWord = searchString[i]
                lastWordIndex = i + 1;
                break;
            }
        }
        if (currentWord?.length) {
            lastWord = currentWord
        } else {
            if (strarray?.filter(e => e.length != 0).length == searchString?.filter(e => e.length != 0).length) {
                lastWord = ""
                lastWordIndex = 0
            } else {
                lastWord = searchString[searchString?.length - 1]
                lastWordIndex = searchString?.length
            }

        }
    }

    str = e.target?.value

    // we have got the last typed word from user. Now we will match the word from the database.
    const { data } = await chrome.storage.local.get(['data'])
    const words = data?.data
    let matched = words?.filter(ele => {
        if (lastWord.length > 2) {

            return ele.toLowerCase().startsWith(lastWord?.trim()?.toLowerCase())
        } else {
            return false
        }
    })
   

  
    // if auto-suggest class already exist than remove
    document.querySelectorAll(".auto-suggest").forEach(ele => {
        ele.classList.remove("auto-suggest")
    })
    document.querySelectorAll(".list1").forEach(ele => {
        ele.remove("auto-suggest")
    })


    // we want to add a li under ul for appending the word in the respective input feild
    var  parentDiv = document.createElement("div")
    parentDiv.classList.add("parent-div")
   let ulList = document.createElement("ul")
    ulList.classList.add("list1")
    ulList.id = "suggestion"
    ulList.style.listStyle = "none"
    ulList.style.position='absolute'
    ulList.style.backgroundColor='#fff'
  
    e.target.classList.add("auto-suggest")
    var newEle = inputElement.getElementsByClassName("auto-suggest")
    newEle[0].style.position="relative"

    // newEle[0]?.parentNode?.appendChild(ulList)
    if(!(document.querySelector(".parent-div"))){
        newEle[0]?.insertAdjacentElement("afterend", parentDiv)
        parentDiv.appendChild(newEle[0])
    
    }
    


    removeElements()

    // creating li for each words to show suggesation
    for (const i of matched) {
        let listItem = document.createElement("li")
        listItem.classList.add("lists-uniqe")
        listItem.style.cursor = "pointer";
        // listItem.style.color = 'white'
        // listItem.style.position='absolute'
        listItem.innerHTML = i
        listItem.onclick = displaySuggesation
        document.querySelector(".list1")?.appendChild(listItem)
        // newEle[0]?.nextElementSibling?.appendChild(listItem)
        newEle[0]?.insertAdjacentHTML("beforeend", "&nbsp;")
    }
    if (lastWord === "") {
        removeElements()
    }
})

function displaySuggesation(value) {
    let data = value.target.textContent
    let ele2 = inputElement.getElementsByClassName("auto-suggest")
    let wordsarray = ele2[0].value.split(" ")
    wordsarray[lastWordIndex - 1] = data
    ele2[0].value = wordsarray.join(" ")
    ele2[0].textContent = wordsarray.join(" ")
    ele2[0].focus()
    removeElements()
}

function removeElements() {
    let items = inputElement.querySelectorAll(".lists-uniqe")
    items?.forEach(e => e.remove())
    // inputElement.querySelector(".lists-uniqe")?.parentElement?.remove()
}
