const addButton=document.querySelector("#add");
// to store data in the local storage 
const updateLSData =()=>{
    const textAreaData=document.querySelectorAll("textarea");
    const notes=[];
    console.log(textAreaData);
    textAreaData.forEach((note)=>{
        notes.push(note.value);
    })
    console.log(notes);
    localStorage.setItem("notes",JSON.stringify(notes));
}
const addNewNote =(text='')=>{
const note=document.createElement("div");
note.classList.add("note"); 

const htmlData=`<div class="operation">
<button class="edit btn btn-success"><i class="fas fa-edit"></i> Save and Edit</button>
<button  class="delete btn btn-danger"><i class="fas fa-trash-alt"></i> Delete</button>
</div>
<div class="main ${text ? "":"hidden"}"></div>
<textarea class="${text ? "hidden":""}" ></textarea>`;
note.insertAdjacentHTML("afterbegin",htmlData);
// console.log(note);



// getting the references
const editButton=note.querySelector(".edit");
const delButton=note.querySelector(".delete");
const mainDiv=note.querySelector(".main");
const textArea=note.querySelector("textarea");


//deleting the node
delButton.addEventListener("click",()=>{
note.remove();
updateLSData();
});

//toggle using edit button
textArea.value=text;    
mainDiv.innerHTML=text;  
editButton.addEventListener("click",()=>{
    mainDiv.classList.toggle("hidden");
    textArea.classList.toggle("hidden");
})
textArea.addEventListener("change",(event)=>{
    const value=event.target.value;
    mainDiv.innerHTML=value;
    updateLSData();
})


document.body.appendChild(note); //it's appends a node  as the last child of a node.
}

//getting data back form localStorage
const notes =JSON.parse(localStorage.getItem("notes"));
if(notes){
    notes.forEach((note)=>addNewNote(note));
}
addButton.addEventListener("click",()=>addNewNote());
