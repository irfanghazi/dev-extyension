document.addEventListener("keydown", function(event) {
  console.log("first time loading", event)
  if (event.key === " ") {
    console.log("XXXXXXXXXX")
    // Get the current text input element
    var inputElement = document.activeElement;
    // Get the current value of the input element
    var inputValue = inputElement.value;
    // Split the input value into an array of words
    var words = inputValue.split(" ");
    // Get the last word typed by the user
    var lastWord = words[words.length - 1];
    // Do a lookup to get a list of suggestions for the last word
    var suggestions = getSuggestions(lastWord);
    // If we have suggestions, display them in a popup
    if (suggestions.length > 0) {
      displaySuggestions(suggestions);
    }
  }
});

function getSuggestions(word) {
  // Use an API or other data source to get a list of suggestions for the given word
  // Return an array of strings representing the suggestions
  // For example, you might use the Google Search API to get related search terms
  return ["suggestion 1", "suggestion 2", "suggestion 3"];
}

function displaySuggestions(suggestions) {
  // Create a popup element to display the suggestions
  var popup = document.createElement("div");
  popup.id = "auto-suggest-popup";
  // Add each suggestion to the popup
  for (var i = 0; i < suggestions.length; i++) {
    var suggestion = suggestions[i];
    var suggestionElement = document.createElement("div");
    suggestionElement.className = "suggestion";
    suggestionElement.textContent = suggestion;
    popup.appendChild(suggestionElement);
  }
  // Position the popup next to the current input element
  var inputElement = document.activeElement;
  var inputRect = inputElement.getBoundingClientRect();
  popup.style.top = (inputRect.bottom + window.pageYOffset) + "px";
  popup.style.left = inputRect.left + "px";
  // Add the popup to the document
  document.body.appendChild(popup);
}

  