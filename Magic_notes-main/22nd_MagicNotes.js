//navbar search icon
let search = document.getElementById("sea");
document.getElementById('sericon').addEventListener('click', function () {
    let sericon = document.getElementById('sericon');
    sericon.style.display = "none";
    search.style.display = "block";
});

let notes = localStorage.getItem("note");
if(notes!=null){
    showNote();
}

// adding notes
document.getElementById('addbtn').addEventListener("click", function () {
    let addtext = document.getElementById('addtext');
    let title=document.getElementById('headnote');
    if(title.value==""){
        title.value="Note";
    }
    let note = localStorage.getItem("note");
    let titlem=localStorage.getItem("title");
    let date=localStorage.getItem("date");

    if (note == null) {
        note = "[]";
    }
    if (titlem == null) {
        titlem = "[]";
    }
    if (date == null) {
        date = "[]";
    }

    //adding new

    note = JSON.parse(note);
    note.push(addtext.value);

    titlem = JSON.parse(titlem);
    titlem.push(title.value);

    note = JSON.stringify(note);
    localStorage.setItem("note", note);
    addtext.value="";
    
    titlem = JSON.stringify(titlem);
    localStorage.setItem("title", titlem);
    title.value="";
    
    let dates=new Date();
    dates=`${dates.getDate()}-${dates.getDate()}-${dates.getFullYear()} ${dates.getHours()}:${dates.getMinutes()}:${dates.getSeconds()}`;
    date=JSON.parse(date);
    date.push(dates);
    date=JSON.stringify(date);
    localStorage.setItem("date",date);

    //showing notes
    showNote();
    
    
});

//function to show notes
function showNote(){
    let notearea=document.getElementById("notearea");
    let note = localStorage.getItem("note");
    let titlem = localStorage.getItem("title");
    let date = localStorage.getItem("date");
    if(note=="[]"){
        notearea.innerHTML="<p>Your Notes are shown here.</p>";
    }
    else{
        note = JSON.parse(note);
        titlem=JSON.parse(titlem);
        date=JSON.parse(date);
        let html=``;
    
        note.forEach(function(e,i){
            let delid=`${i+1}`;
            html +=`
            <div class="note" id="note">
                <div>
                <span>
                <h3>${titlem[i]}</h3>
                <hr class="hrhr" noshade/>
                </span>
                <p>${e}</p>
                <button id="${delid}" onclick="deletenote(this.id)" class="btn repbtn">Delete Note</button>
                </div>
                <span class="date">${date[i]}</span>
            </div>
            `;
        });
        notearea.innerHTML=html;
    }
}

//function to delete notes
function deletenote(e){
    let note=localStorage.getItem("note");
    note=JSON.parse(note);
    note.splice(e-1,1);
    note=JSON.stringify(note);
    localStorage.setItem("note",note);

    let title=localStorage.getItem("title");
    title=JSON.parse(title);
    title.splice(e-1,1);
    title=JSON.stringify(title);
    localStorage.setItem("title",title);
    showNote();
};


document.getElementById("out").addEventListener("click",function(){
    let off=document.getElementById("off");
    let on=document.getElementById('on');
    let ins=document.getElementById('off');
    let nav=document.getElementById('navbar');
    let notebox=document.getElementById('notebox');
    console.log(note);
    if(off.className=="in off"){
        let note=document.getElementsByClassName('note');
        off.style.transform='translateX(23.5px)';
        out.style.backgroundColor="white";
        ins.style.backgroundColor="black";
        off.className="in on";
        let bodys=document.getElementsByTagName('body');
        bodys[0].className="dark";
        let btn=document.getElementsByClassName('btn');
        btn[0].className="btn darkbtn";
        for(i=1;i<btn.length;i++){
            btn[i].className="btn repbtn darkbtn";
        }
        let heading=document.getElementById("heading");
        heading.style.fontWeight="lighter";

        nav.className="navbar dark_nav";

        notebox.className="notebox dark_notebox";
        if(note!=null){
            for(i=0;i<note.length;i++){
                note[i].className="note dark_notebox";
            }
        }
    }
    else{
        off.style.transform='translateX(0px)';
        out.style.backgroundColor="rgb(0, 0, 0)";
        ins.style.backgroundColor="rgb(256, 256, 256)";
        off.className="in off";
        let bodys=document.getElementsByTagName('body');
        bodys[0].className="";
        let btn=document.getElementsByClassName('btn');
        btn[0].className="btn";
        for(i=1;i<btn.length;i++){
            btn[i].className="btn repbtn";
        }
        let heading=document.getElementById("heading");
        heading.style.fontWeight="bolder";
        
        nav.className="navbar"
        
        notebox.className="notebox";
        
        if(note!=null){
            for(i=0;i<note.length;i++){
                note[i].className="note";
            }
        }
    }
});