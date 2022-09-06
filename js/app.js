console.log('Welcome To My Notes. This are my Notes.');
showNotes();

// If user adds a Note, add it to the localStorage;
let addBtn = document.getElementById('addBtn');
addBtn.addEventListener("click", function(e)
{
    let addTxt = document.getElementById("addTxt");
    let Notes = localStorage.getItem("Notes");

    if(Notes == null)
    {
        NotesObj = [];
    }
    else
    {
        NotesObj = JSON.parse(Notes);
    }
    NotesObj.push(addTxt.value);
    localStorage.setItem("Notes", JSON.stringify(NotesObj));
    addTxt.value = "";
    // console.log(Notes);
    showNotes();
})

// Function to show elements from localStorage.
function showNotes()
{
    let Notes = localStorage.getItem("Notes");
    if(Notes == null)
    {
        NotesObj = [];
    }
    else
    {
        NotesObj = JSON.parse(Notes);
    }

    let html = "";
    NotesObj.forEach(function(element, index)
    {
        html += `
            <div class="NoteCard my-2 mx-3 row container-fluid card" style="width: 35rem;">
            <div class="card-body">
            <h5 class="card-title">Note ${index + 1}</h5>
            <p class="card-text">${element}</p>
            <button id="${index}" onclick="deleteNote(this.id)" class="btn btn-primary">Delete Note</button>
            </div>
            </div> `;
    });

    let NoteElm = document.getElementById("Notes");
    if(NotesObj.length != 0)
    {
        NoteElm.innerHTML = html;
    }
    else
    {
        NoteElm.innerHTML = `You have not added any Note yet so make sure to "Add a Note" from the above section.`
    }
}

// Function to delete a Note.
function deleteNote(index)
{
    // console.log('Deleting this Note.', index);

    let Notes = localStorage.getItem("Notes");
    if(Notes == null)
    {
        NotesObj = [];
    }
    else
    {
        NotesObj = JSON.parse(Notes);
    }

    NotesObj.splice(index, 1);
    localStorage.setItem("Notes", JSON.stringify(NotesObj));
    showNotes();
}

let search = document.getElementById('searchTxt');
search.addEventListener("input", function()
{
    let inputValue = search.value.toLowerCase();
    // console.log('Input Event Fired!', inputValue);

    let NoteCards = document.getElementsByClassName('NoteCard');
    Array.from(NoteCards).forEach(function(element)
    {
        let cardTxt = element.getElementsByTagName("p")[0].innerText;
        // console.log(cardTxt);
        if(cardTxt.includes(inputValue))
        {
            element.style.display = "block";
        }
        else
        {
            element.style.display = "none";
        }
    })
})