
let inputElement = document.activeElement;

let str = ""
let lastWord;
let lastWordIndex

inputElement.addEventListener("input", async function (e) { 
    let string1 = e.target?.value?.trim()?.split(" ");
    let string2 = e.target?.innerHTML?.trim()?.split(" ");
    let searchString = string1
    console.log("searchString", searchString)
    if (!str?.length) {
        // running first time when the user start type to get the first letter
        lastWord = searchString?.[searchString?.length - 1];
        lastWordIndex = searchString?.length
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
        if (currentWord?.length>0) {
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
    const { data } = await chrome?.storage?.local?.get(['data'])
    const words = data?.data
    let matched = words?.filter(ele => {
        if (lastWord?.length > 2) {

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
    var newEle = inputElement.getElementsByClassName("auto-suggest") 
    console.log("newEle", newEle)
   let ulList = document.createElement("ul")
    ulList.classList.add("list1")
    ulList.id = "suggestion"
    ulList.style.listStyle = "none"
    ulList.style.position='absolute'
    ulList.style.backgroundColor='#fff'
    ulList.style.zIndex='999999'
    ulList.style.top=(e.target.offsetTop + e.target.offsetHeight)+"px"
    ulList.style.left=e.target.offsetLeft+"px"
    ulList.style.padding="0px 16px"
    ulList.style.boxShadow="2px 1px 10px #0000001a"
    // console.log(e.target.offsetTop , e.target.offsetHeight, e.target.offsetLeft , 'ddd')

  
    e.target.classList.add("auto-suggest")
    newEle[0]?.insertAdjacentElement("afterend", ulList)
    removeElements()

    // creating li for each words to show suggesation
    for (const i of matched) {
        let listItem = document.createElement("li")
        listItem.classList.add("lists-uniqe")
        listItem.style.cursor = "pointer";
        listItem.innerHTML = i
        listItem.onclick = displaySuggesation
        document.querySelector(".list1")?.appendChild(listItem)
    }

    if (lastWord == " " || lastWord == "")  {
        removeElements()
    }
})

function displaySuggesation(value) {  
    let data = value.target.textContent
    let ele2 = inputElement.getElementsByClassName("auto-suggest")
    let wordsarray = ele2[0].value.split(" ")
    if(!data) return
    wordsarray[lastWordIndex - 1] = data + " "
    ele2[0].value = wordsarray.join(" ") 
    ele2[0].textContent = wordsarray.join(" ") 
    ele2[0].focus()
    ele2[0].dispatchEvent(new window.Event('change', { bubbles: true }))
    str = wordsarray.join(" ")  
    removeElements()
}

function removeElements() {
    let items = inputElement.querySelectorAll(".lists-uniqe")
    items?.forEach(e => e.remove())
    let parentDiv = inputElement.querySelector(".parent-div");
    parentDiv?.insertAdjacentElement("afterend",parentDiv.firstChild);
    inputElement.querySelector(".parent-div")?.remove();
}
