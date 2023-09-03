// If user adds a note, add it to the local storage
showNotes();

let addBtn = document.getElementById('addBtn');
addBtn.addEventListener('click', function (e) {
    let addTitle = document.getElementById('addTitle');
    let addTxt = document.getElementById('addTxt');
    let notes = localStorage.getItem('notes');
    if (notes == null) {
        notesObj = [];  // Array to store notes
    }
    else {
        notesObj = JSON.parse(notes);
    }
    let myObj={
        title:addTitle.value,
        text:addTxt.value
    }
    notesObj.push(myObj);
    localStorage.setItem('notes', JSON.stringify(notesObj));
    addTxt.value = "";
    addTitle.value = "";
    // console.log(notesObj);
    showNotes();
});

// function to show notes elements from local storage
function showNotes() {
    let notes = localStorage.getItem('notes');
    if (notes == null) {
        notesObj = [];  // Array to store notes
    }
    else {
        notesObj = JSON.parse(notes);
    }
    let html = "";
    notesObj.forEach(function (element, index) {
        html += `<div class="noteCard my-2 mx-2 card" style="width: 18rem;">
        <div class="card-body">
            <h5 class="card-title">${element.title}</h5>
            <p class="card-text">${element.text}</p>
            <button id= "${index}" onclick="deleteNote(this.id)" class="btn btn-primary">Delete Note</button>
        </div>
    </div>`


    });
    let notesElem=document.getElementById('notes');
    if(notesObj.length != 0 ){
        notesElem.innerHTML= html;
    }
    else{
        notesElem.innerHTML= `Nothing to show! First add a note.`;
    }
}

// function to delete a note
function deleteNote(index){
    // console.log('I am deleting', index);
    let notes = localStorage.getItem('notes');
    if (notes == null) {
        notesObj = [];  // Array to store notes
    }
    else {
        notesObj = JSON.parse(notes);
    }
    notesObj.splice(index, 1);
    localStorage.setItem('notes', JSON.stringify(notesObj));
    showNotes();
}

let search = document.getElementById('searchTxt');
search.addEventListener('input', function(){
    let inputval= search.value.toLowerCase();
    // console.log('input event fired', inputval);
    let noteCards= document.getElementsByClassName('noteCard');
    Array.from(noteCards).forEach(function (element) {
        let cardTitle=element.getElementsByTagName('h5')[0].innerText;
        let cardNotes=element.getElementsByTagName('p')[0].innerText;
        if(cardTitle.includes(inputval)){
            element.style.display = "block";
        }
        else if(cardNotes.includes(inputval)){
            element.style.display = "block";
        }
        else{
            element.style.display = "none";
        }
        // console.log(cardNotes);
    });

});