//selecting all required elements
const dropArea = document.querySelector(".drag-area"),
    beforeImg = dropArea.querySelector(".before-img"),
dragText = beforeImg.querySelector("header"),
button = beforeImg.querySelector("button"),
input = beforeImg.querySelector("input");
let file; //this is a global variable and we'll use it inside multiple functions
button.onclick = ()=>{
  input.click(); //if user click on the button then the input also clicked
}
input.addEventListener("change", function(){
  //getting user select file and [0] this means if user select multiple files then we'll select only the first one
  file = this.files[0];
  dropArea.classList.add("active");
  showFile(dropArea, file); //calling function
});
//If user Drag File Over DropArea
dropArea.addEventListener("dragover", (event)=>{
  event.preventDefault(); //preventing from default behaviour
  dropArea.classList.add("active");
  dragText.textContent = "Release to Upload File";
});
//If user leave dragged File from DropArea
dropArea.addEventListener("dragleave", ()=>{
  dropArea.classList.remove("active");
  dragText.textContent = "Drag & Drop to Upload File";
});
//If user drop File on DropArea
dropArea.addEventListener("drop", (event)=>{
  event.preventDefault(); //preventing from default behaviour
  //getting user select file and [0] this means if user select multiple files then we'll select only the first one
  file = event.dataTransfer.files[0];
  showFile(dropArea, file); 
 
});
function showFile(dropArea, file){
    let imgDiv = dropArea.querySelector(".img");

    if(!imgDiv){
        imgDiv = document.createElement("div");
        imgDiv.classList.add("img");
        dropArea.appendChild(imgDiv);
       
    }
   

    if(file.type.startsWith("image/")){
       
        let fileReader = new FileReader();

        fileReader.readAsDataURL(file);
        fileReader.onload = () =>{
            imgDiv.style.backgroundImage = `url('${fileReader.result}')`
        }
        dropArea.querySelector(".before-img").remove();
    }else{
        alert("This is not an image file!");
        dropArea.querySelector(".before-img");
        dragText.textContent = "Drag & Drop to Upload File";
        dropArea.querySelector(".img").remove();
        dropArea.classList.remove("active");
    }

   
}
