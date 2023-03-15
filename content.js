
let inputElement = document.activeElement;

let str = ""
let lastWord;
let lastWordIndex

inputElement.addEventListener("input", async function (e) {
    console.log(e.target.value)
    let searchString = e.target?.value?.trim()?.split(" ");
    if (!str?.length) {
        lastWord = searchString?.[searchString?.length - 1];
        lastWordIndex = searchString?.length
    } else {
        let strarray = str?.split(" ");
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
    console.log(lastWord)
    document.querySelectorAll(".auto-suggest").forEach(ele => {
        ele.classList.remove("auto-suggest")
    })
    document.querySelectorAll(".list1").forEach(ele => {
        ele.remove("auto-suggest")
    })


    let ulList = document.createElement("ul")
    ulList.classList.add("list1")
    ulList.id = "suggestion"
    ulList.style.listStyle = "none"
    ulList.style.position='absolute'
    ulList.style.backgroundColor='#fff'
    const { data } = await chrome.storage.local.get(['data'])
    const words = data?.data
    console.log("words", words)
    // const words = ["fever","cold","sick","tharmometer","blood","cancer","paracetamol",'doctor','nurse',"hospital","medicine"]
    e.target.classList.add("auto-suggest")
    var newEle = inputElement.getElementsByClassName("auto-suggest")
    newEle[0].style.position="relative"

    newEle[0]?.parentNode?.appendChild(ulList)
    let matched = words?.filter(ele => {
        if (lastWord.length > 2) {

            return ele.toLowerCase().startsWith(lastWord?.trim()?.toLowerCase())
        } else {
            return false
        }
    })
    removeElements()
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

    console.log(lastWord, lastWordIndex)
    let data = value.target.textContent
    let ele2 = inputElement.getElementsByClassName("auto-suggest")
    let wordsarray = ele2[0].value.split(" ")
    wordsarray[lastWordIndex - 1] = data
    ele2[0].value = wordsarray.join(" ")
    // ele2[0]?.insertAdjacentHTML("beforeend", "&nbsp;")
    ele2[0].textContent = wordsarray.join(" ")
    ele2[0].focus()
    removeElements()
}

function removeElements() {
    let items = inputElement.querySelectorAll(".lists-uniqe")
    items?.forEach(e => e.remove())
    inputElement.querySelector(".lists-uniqe")?.parentElement?.remove()
}







    // position: absolute;
    // z-index: 9999;
    // top: 32px;
    // background: #fff;
    // padding: 13px;
    // box-shadow: 1px 1px 18px #ccc;
    // border-radius: 7px;
    // left: 35px;