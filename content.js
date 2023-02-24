document.addEventListener("keydown", function (event) {
    // console.log("******", event)
    // const bio = document.getElementById("bio")
    // console.log("Biooo", bio)

    // Get the current text input element
    let inputElement = document.activeElement;
    console.log("inputElement", inputElement)

    // Get the current value of the input element
    let inputValue = inputElement.value;
    // console.log("inputValue", inputValue)

    // Split the input value into an array of words
    let words = inputValue.split(" ");
    // console.log("words", words)

    // Get the last word typed by the user
    let lastWord = words[words.length - 1];
    console.log("lastWord", lastWord)


    // Do a lookup to get a list of suggestions for the last word
    const suggestions = getSuggestions(lastWord);
    // If we have suggestions, display them in a popup
    if (suggestions.length > 0) {
        displaySuggestions(suggestions);
    }


})


const getSuggestions = (word) => {
    // Use an API to get a list of suggestions for the given word
   
    // Return an array of strings representing the suggestions
    return ["suggestion 1", "suggestion 2", "suggestion 3"];
}

function displaySuggestions(suggestions) {
    // Create a popup element to display the suggestions
    let popup = document.createElement("div");
    popup.id = "auto-suggest-popup";
    // Add each suggestion to the popup
    for (let i = 0; i < suggestions.length; i++) {
        let suggestion = suggestions[i];
        let suggestionElement = document.createElement("div");
        suggestionElement.className = "suggestion";
        suggestionElement.textContent = suggestion;
        popup.appendChild(suggestionElement);
    }
    //Position the popup next to the current input element
    let inputElement = document.activeElement;
    let inputRect = inputElement.getBoundingClientRect();


    // Calculate the desired position of the popup element
    const popupLeft = inputRect.right+100;
    const popupTop = inputRect.top+200;

    // Set the position of the popup element
    popup.style.left = `${popupLeft}px`;
    popup.style.top = `${popupTop}px`;
    popup.style.zIndex = "9999999";

    //Add the popup to the document
    console.log("ppoppp", popup)
    popup.style.display = 'block';
    document.body.appendChild(popup);
}