let inputElement = document.activeElement;

let str = ""
let lastWord;
let lastWordIndex
var x
var y
var caretIndex
inputElement.addEventListener("click", () => {
    removeElements()
})
function doGetCaretPosition (oField) {

    // Initialize
    var iCaretPos = 0;
  
    // IE Support
    if (document.selection) {
  
      // Set focus on the element
      oField.focus();
  
      // To get cursor position, get empty selection range
      var oSel = document.selection.createRange();
  
      // Move selection start to 0 position
      oSel.moveStart('character', -oField.value.length);
  
      // The caret position is selection length
      iCaretPos = oSel.text.length;
    }
  
    // Firefox support
    else if (oField.selectionStart || oField.selectionStart == '0')
      iCaretPos = oField.selectionDirection=='backward' ? oField.selectionStart : oField.selectionEnd;
  
    // Return results
    return iCaretPos;
  }
  function getCaretIndex(element) {
    let position = 0;
    const isSupported = typeof window.getSelection !== "undefined";
    if (isSupported) {
      const selection = window.getSelection();
      // Check if there is a selection (i.e. cursor in place)
      if (selection.rangeCount !== 0) {
        // Store the original range
        const range = window.getSelection().getRangeAt(0);
        // Clone the range
        const preCaretRange = range.cloneRange();
        // Select all textual contents from the contenteditable element
        preCaretRange.selectNodeContents(element);
        // And set the range end to the original clicked position
        preCaretRange.setEnd(range.endContainer, range.endOffset);
        // Return the text length from contenteditable start to the range end
        position = preCaretRange.toString().length;
      }
    }
    return position;
  }
  


inputElement.addEventListener("input", async function (e) {
    if (e.target.type != 'email' && e.target.type != "password") {
        let searchString
        let editableFeild = (e.target.nodeName == 'TEXTAREA' || e.target.nodeName == 'INPUT') ? true : false
        if (editableFeild) {
            let position = getCaretPosition(e.target);
            x = position.x
            y = position.y
            searchString = e.target?.value?.split(" ");
            caretIndex = doGetCaretPosition(e.target)
        } else {
            let position = getCaretCoordinates()
            x = position.x
            y = position.y
            searchString = e.target?.innerText?.split(" ");
            caretIndex = getCaretIndex(e.target)
        }

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
                if (strarray[i]?.trim() != searchString[i]?.trim()) {
                    currentWord = searchString[i]
                    lastWordIndex = i + 1;
                    break;
                }
            }
            if (currentWord?.length > 0) {
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

        if (editableFeild) {
            str = e.target?.value
        } else {
            str = e.target?.innerText
        }

        // we have got the last typed word from user. Now we will match the word from the database.
        const { data } = await chrome?.storage?.local?.get(['data'])
        const words = data?.data
        let matched = words?.filter(ele => {
            if (lastWord?.length > 2) {
                return ele.toLowerCase().startsWith(lastWord?.trim()?.toLowerCase())
            } else {
                lastWord = ""
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
        let ulList = document.createElement("ul")
        ulList.classList.add("list1")
        ulList.id = "suggestion"
        ulList.style.listStyle = "none"
        ulList.style.position = `${editableFeild ? 'absolute' : 'fixed'}`
        ulList.style.backgroundColor = '#fff'
        ulList.style.zIndex = '999999'
        ulList.style.top = editableFeild ? (y + 30) + "px" : (y) + "px" 
        ulList.style.left = x + "px"
        ulList.style.padding = "0px 16px"
        ulList.style.boxShadow = "rgba(0, 0, 0, 0.07) 0px 1px 2px, rgba(0, 0, 0, 0.07) 0px 2px 4px, rgba(0, 0, 0, 0.07) 0px 4px 8px, rgba(0, 0, 0, 0.07) 0px 8px 16px, rgba(0, 0, 0, 0.07) 0px 16px 32px, rgba(0, 0, 0, 0.07) 0px 32px 64px"
        ulList.style.maxHeight = "15vmax"
        ulList.style.overflowY = "scroll"
        ulList.style.borderRadius = "12px"

        e.target.classList.add("auto-suggest")
        newEle[0]?.insertAdjacentElement("afterend", ulList)
        removeElements()

        // creating li for each words to show suggesation
        for (const i of matched) {
            let listItem = document.createElement("li")
            listItem.classList.add("lists-uniqe")
            listItem.style.cursor = "pointer";
            listItem.innerHTML = i;
            listItem.onclick = displaySuggesation
            document.querySelector(".list1")?.appendChild(listItem)
        }

        if (lastWord == " " || lastWord == "") {
            removeElements()
        }
    }
})

function displaySuggesation(value) {
    let data = value.target.textContent
    let element = inputElement.getElementsByClassName("auto-suggest")
    let wordsarray = element[0]?.value != undefined ? element[0]?.value?.split(" ") : element[0]?.innerHTML?.split(" ");
    var lastwordlength = wordsarray[lastWordIndex -1].length
    
    if (!data) return
    var displayCaret
    if (element[0]?.value == undefined) {
        if(wordsarray?.length == lastWordIndex) {
            wordsarray[lastWordIndex - 1] = data + "&nbsp" ;
            displayCaret = caretIndex - lastwordlength + data.length + 1
        } else {
            wordsarray[lastWordIndex - 1] = data;
            displayCaret = caretIndex - lastwordlength + data.length
        }
        element[0].innerHTML = wordsarray?.join(" ")
        caretPositionContentEditable(element[0],displayCaret)
        element[0].dispatchEvent(new window.Event('input', { bubbles: true }))
    } else {

        if(wordsarray?.length == lastWordIndex) {
            wordsarray[lastWordIndex - 1] = data + " " ;
            displayCaret = caretIndex - lastwordlength + data.length + 1
            // displayCaret = caretIndex - wordsarray[lastWordIndex - 1].length + data.length + 1
        } else {
            wordsarray[lastWordIndex - 1] = data;
            displayCaret = caretIndex - lastwordlength + data.length
        }
        element[0].value = wordsarray?.join(" ")
        element[0].textContent = wordsarray?.join(" ")
        // element[0].focus()
        console.log(displayCaret)
        setCaretPosition(element[0],displayCaret)
        element[0].dispatchEvent(new window.Event('change', { bubbles: true }))
    }
    str = wordsarray?.join(" ")
    removeElements()
}

function setCaretPosition(elem, caretPos) {
    // var elem = document.getElementById(elemId);

    if(elem != null) {
        if(elem.createTextRange) {
            var range = elem.createTextRange();
            range.move('character', caretPos);
            range.select();
        }
        else {
            if(elem.selectionStart) {
                elem.focus();
                elem.setSelectionRange(caretPos, caretPos);
            }
            else
                elem.focus();
        }
    }
}

function caretPositionContentEditable(element,position) {
element.focus();
var textNode = element.firstChild;
var caret = position; // insert caret after the 10th character say
var range = document.createRange();
range.setStart(textNode, caret);
range.setEnd(textNode, caret);
var sel = window.getSelection();
sel.removeAllRanges();
sel.addRange(range);

}

function removeElements() {
    let items = inputElement.querySelectorAll(".lists-uniqe")
    items?.forEach(e => e.remove())
    let parentDiv = inputElement.querySelector(".parent-div");
    parentDiv?.insertAdjacentElement("afterend", parentDiv.firstChild);
    inputElement.querySelector(".parent-div")?.remove();
}

// Getting caret position for TextArea and Input Feild
// ----------------------Start----------------------------
function createCopy(textArea) {
    var copy = document.createElement('div');
    copy.textContent = textArea.value;
    var style = getComputedStyle(textArea);
    [
        'fontFamily',
        'fontSize',
        'fontWeight',
        'wordWrap',
        'whiteSpace',
        'borderLeftWidth',
        'borderTopWidth',
        'borderRightWidth',
        'borderBottomWidth',
    ].forEach(function (key) {
        copy.style[key] = style[key];
    });
    copy.style.overflow = 'auto';
    copy.style.width = textArea.offsetWidth + 'px';
    copy.style.height = textArea.offsetHeight + 'px';
    copy.style.position = 'absolute';
    copy.style.left = textArea.offsetLeft + 'px';
    copy.style.top = textArea.offsetTop + 'px';
    document.body.appendChild(copy);
    return copy;
}

function getCaretPosition(textArea) {
    var start = textArea.selectionStart;
    var end = textArea.selectionEnd;
    var copy = createCopy(textArea);
    var range = document.createRange();
    range.setStart(copy.firstChild, start);
    range.setEnd(copy.firstChild, end);
    var selection = document.getSelection();
    selection.removeAllRanges();
    selection.addRange(range);
    var rect = range.getBoundingClientRect();
    document.body.removeChild(copy);
    textArea.selectionStart = start;
    textArea.selectionEnd = end;
    textArea.focus();
    return {
        x: rect.left - textArea.scrollLeft,
        y: rect.top - textArea.scrollTop
    };
}
// ----------------------end----------------------------


// getting caret position for div
// ----------------------Start----------------------------
function getCaretCoordinates() {
    let x = 0,
        y = 0;
    const isSupported = typeof window.getSelection !== "undefined";
    if (isSupported) {
        const selection = window.getSelection();
        if (selection.rangeCount !== 0) {
            const range = selection.getRangeAt(0).cloneRange();
            range.collapse(true);
            const rect = range.getClientRects()[0];
            if (rect) {
                x = rect.left;
                y = rect.top;
            }
        }
    }
    return { x, y };
}
  // ---------------------- end ---------------------------
