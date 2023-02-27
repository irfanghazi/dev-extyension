function getCursorPosition(el) {
  var start = 0,
    end = 0,
    normalizedValue, range, textInputRange, len, endRange;
  if (typeof el.selectionStart == "number" && typeof el.selectionEnd == "number") {
    start = el.selectionStart;
    end = el.selectionEnd;
  } else {
    range = document.selection.createRange();

    if (range && range.parentElement() == el) {
      len = el.value.length;
      normalizedValue = el.value.replace(/\r\n/g, "\n");

      // Create a working TextRange that lives only in the input
      textInputRange = el.createTextRange();
      textInputRange.moveToBookmark(range.getBookmark());

      // Check if the start and end of the selection are at the very end
      // of the input, since moveStart/moveEnd doesn't return what we want
      // in those cases
      endRange = el.createTextRange();
      endRange.collapse(false);

      if (textInputRange.compareEndPoints("StartToEnd", endRange) > -1) {
        start = end = len;
      } else {
        start = -textInputRange.moveStart("character", -len);
        start += normalizedValue.slice(0, start).split("\n").length - 1;

        if (textInputRange.compareEndPoints("EndToEnd", endRange) > -1) {
          end = len;
        } else {
          end = -textInputRange.moveEnd("character", -len);
          end += normalizedValue.slice(0, end).split("\n").length - 1;
        }
      }
    }
  }
  return {
    start: start,
    end: end
  };
}

function setCursorPosition(input, start, end) {
  if (arguments.length < 3) end = start;
  if ("selectionStart" in input) {
    setTimeout(function() {
      input.selectionStart = start;
      input.selectionEnd = end;
    }, 1);
  } else if (input.createTextRange) {
    var rng = input.createTextRange();
    rng.moveStart("character", start);
    rng.collapse();
    rng.moveEnd("character", end - start);
    rng.select();
  }
}

var txt = document.getElementById("txt"),
  suggestions = document.getElementById("suggestions");
// listen for @...
txt.addEventListener('keyup', handleKeyUp);

var regex = /@([a-zA-Z0-9]*)$/;

function handleKeyUp(e) {
  closeSuggestions();
  var cursor = getCursorPosition(txt),
    val = txt.value,
    strLeft = val.substring(0, cursor.start);

  var match = val.match(regex);

  if (match) {
    // fetch suggestions
    var username = match[1];
    findSuggestions(username);
  }
}

var userData = [{
    name: "Supun Kavinda",
    username: "SupunKavinda"
  },
  {
    name: "John Doe",
    username: "JohnDoe"
  },
  {
    name: "Anonymous",
    username: "Anonymous"
  }
];

function findSuggestions(username) {

  var matched = [];

  userData.forEach(function(data) {
    var dataUsername = data.username,
      pos = dataUsername.indexOf(username);

    if (pos !== -1) {
      matched.push(data);
    }
  });

  // you can also sort the matches from the index (Best Match)

  if (matched.length > 0) {
    showSuggestions(matched);
  }

}

function showSuggestions(matched) {
  // DOM creation is not that hard if you use a library ;
  suggestions.style.display = "block";
  suggestions.innerHTML = "";

  matched.forEach(function(data) {
    var wrap = document.createElement("div");
    suggestions.appendChild(wrap);

    var nameView = document.createElement("span");
    nameView.innerHTML = data.name;
    nameView.className = "name-view";

    var usernameView = document.createElement("span");
    usernameView.innerHTML = "@" + data.username;
    usernameView.className = "username-view";

    wrap.appendChild(nameView);
    wrap.appendChild(usernameView);

    // add the suggested username to the textarea
    wrap.onclick = function() {
      addToTextarea("@" + data.username + " ");
    }
  });
}

function closeSuggestions() {
  suggestions.style.display = "none";
}

function addToTextarea(valueToAdd) {

  var cursor = getCursorPosition(txt),
    val = txt.value,
    strLeft = val.substring(0, cursor.start),
    strRight = val.substring(cursor.start);

  // remove the matched part
  strLeft = strLeft.replace(regex, "");

  txt.value = strLeft + valueToAdd + strRight;

  // (textarea, positionToAdd)
  setCursorPosition(txt, strLeft.length + valueToAdd.length);

  txt.focus();

  closeSuggestions();

}

  