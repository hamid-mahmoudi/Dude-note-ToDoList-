let textInput = document.getElementById("textInput");
let titleInput = document.getElementById("titleInput");
let addNote = document.getElementById("addNote");
let notesList = document.getElementById("notesList");
let shapeMenu = document.querySelector(".shapeMenu");
let darkLightMode = document.querySelector(".darkLightMode");
let iTag = document.createElement("i");
let iTagMode = document.createElement("i");
let container = document.querySelector(".container");
let colorsDot = document.getElementById("colors");
let headText = document.querySelector(".headText");
let bottomP = document.querySelector(".bottomP");

/////////////////////////////////////////event 
iTag.classList.add("bx", "bxs-grid");
iTag.addEventListener("click", () => {
  iTag.classList.toggle("bxs-grid");
  iTag.classList.toggle("bx-menu");
});
shapeMenu.append(iTag);
addNote.addEventListener("click", newNote);
document.addEventListener("DOMContentLoaded", showFromLS);
notesList.addEventListener("click", removeNote);
textInput.addEventListener("keypress", function (e) {
  if (e.keyCode === 13) {
    e.preventDefault();
    addNote.click();
  }
});
////////////////////////////////////////function
function newNote(e) {
  e.preventDefault();
  let note = document.getElementById("textInput").value;
  let manageBtn = document.createElement("div");
  let delBtn = document.createElement("span");
  delBtn.classList.add("bx", "bx-message-square-x");
  let editBtn = document.createElement("span");
  editBtn.classList.add("bx", "bx-message-square-edit");
  manageBtn.append(editBtn);
  manageBtn.append(delBtn);
  manageBtn.classList.add("manageBtn");
  let noteTitle = document.getElementById("titleInput").value;
  let h3 = document.createElement("h3");
  let li = document.createElement("li");
  let p = document.createElement("p");
  li.classList.add("squareLi");
  iTag.addEventListener("click", () => {
    li.classList.toggle("squareLi");
    li.classList.toggle("rowLi");
  });
  if (textInput.value !== "" && titleInput.value !== "") {
    h3.append(noteTitle);
    li.append(h3);
    li.append(p);
    p.append(note);
    p.append(manageBtn);
    notesList.append(li);
    addToLS(titleInput, textInput);
  } else {
    alert("Hey Dude!! Come on, do something ... ☕︎");
  }
  document.getElementById("titleInput").value = "";
  document.getElementById("textInput").value = "";
}
function addToLS(titleInput, textInput) {
  let notes = getFromLS();
  notes.titleInputs.push(titleInput.value);
  notes.textInputs.push(textInput.value);
  localStorage.setItem("titleInputs", JSON.stringify(notes.titleInputs));
  localStorage.setItem("textInputs", JSON.stringify(notes.textInputs));
}
function getFromLS() {
  let titleInputs = [];
  let textInputs = [];
  let getTitleFromLS = localStorage.getItem("titleInputs");
  let getTextFromLS = localStorage.getItem("textInputs");
  if (getTextFromLS == null) {
    getTextFromLS = [];
  } else {
    textInputs = JSON.parse(getTextFromLS);
  }
  if (getTitleFromLS == null) {
    getTitleFromLS = [];
  } else {
    titleInputs = JSON.parse(getTitleFromLS);
  }
  return { textInputs, titleInputs };
}
let notes = getFromLS();
function showFromLS() {
  notes.titleInputs.forEach((titleInput, index) => {
    let textInput = notes.textInputs[index];
    let li = document.createElement("li");
    let h3 = document.createElement("h3");
    let p = document.createElement("p");
    li.classList.add("squareLi");
    li.classList.add("allLi");
    iTag.addEventListener("click", () => {
      li.classList.toggle("squareLi");
      li.classList.toggle("rowLi");
    });
    h3.textContent = titleInput;
    p.textContent = textInput;
    let manageBtn = document.createElement("div");
    let delBtn = document.createElement("span");
    let editBtn = document.createElement("span");
    delBtn.classList.add("bx", "bx-message-square-x");
    editBtn.classList.add("bx", "bx-message-square-edit");
    manageBtn.append(editBtn);
    manageBtn.append(delBtn);
    manageBtn.classList.add("manageBtn");
    p.append(manageBtn);
    li.append(h3);
    li.append(p);
    notesList.append(li);
    let listItems = document.querySelectorAll("#notesList li");
    listItems.forEach((item) => {
      item.addEventListener("mouseover", () => {
        listItems.forEach((otherItem) => {
          if (otherItem !== item) {
            otherItem.style.filter = "blur(1px)";
          }
        });
      });

      item.addEventListener("mouseout", () => {
        listItems.forEach((otherItem) => {
          otherItem.style.filter = "blur(0)";
        });
      });
    });
  });

  let listItems = document.querySelectorAll(".squareLi");
  darkLightMode.append(iTagMode);
  iTagMode.classList.add("bx", "bx-sun");
  iTagMode.addEventListener("click", () => {
    iTagMode.classList.toggle("bx-sun");
    iTagMode.classList.toggle("bxs-moon");
    iTagMode.classList.toggle("darkBlue");
    document.body.classList.toggle("blackBody");
    container.classList.toggle("darkContainer");
    addNote.classList.toggle("darkBlue");
    colorsDot.classList.toggle("darkBlue");
    iTag.classList.toggle("darkBlue");
    textInput.classList.toggle("darkInput");
    titleInput.classList.toggle("darkInput");
    headText.classList.toggle("grayDark");
    bottomP.classList.toggle("grayDark");
    h3.classList.toggle("darkHead");
    let count = 0;
    while (count <= 100) {
      listItems[count].classList.toggle("darkBlue");
      count++;
    }
  });
}
function removeNote(e) {
  if (e.target.classList.contains("bx-message-square-x")) {
    let note_div =
      e.target.parentElement.parentElement.parentElement.parentElement;
    let note_content = e.target.parentElement.parentElement.textContent;
    let note_title =
      e.target.parentElement.parentElement.parentElement.childNodes[0]
        .textContent;

    note_div.remove();

    removeFromLS(note_content, note_title);
  }
}

function removeFromLS(note_content, note_title) {
  let all_notes = getFromLS();
  console.log(all_notes.textInputs, note_title);
  for (key in all_notes.textInputs) {
    if (
      all_notes.textInputs[key] == note_content &&
      all_notes.titleInputs[key] == note_title
    ) {
      all_notes.textInputs.splice(key, 1);
      all_notes.titleInputs.splice(key, 1);
    }
  }
  localStorage.setItem("titleInputs", JSON.stringify(all_notes.titleInputs));
  localStorage.setItem("textInputs", JSON.stringify(all_notes.textInputs));
  location.reload(true);
}
