//variables for creating calendar text areas and buttons

let momentTime = $("#currentDay");
let container = $(".container");



// function to keep time updated actively
function update(){
momentTime.text(moment().format("dddd, MMMM Do YYYY, h:mm:ss a"));
}

setInterval(update, 1000);

// Generate hours of the day text fields and buttons

for (let i=9; i < 19; i++){
    let newDivWrapper = document.createElement("div")
    let newInput = document.createElement("input");
    let hourDiv = document.createElement("div");
    let newButton = document.createElement("button");

    newDivWrapper.setAttribute("id", "container-fluid")
    newDivWrapper.setAttribute("class", "dataEnter");
    newInput.setAttribute("id",  "inputText");
    hourDiv.setAttribute("class", "hourDiv");
    newButton.setAttribute("class", "btn saveBtn " + i);
    newButton.innerHTML ='<i class="far fa-save fa-2x"></i>';
    container.append(newDivWrapper);
    newDivWrapper.append(hourDiv, newInput, newButton);

    let timeSpan = $("<span>");
    $(".hourDiv").append(timeSpan);

    if (i > 12){
        timeSpan.text(i - 12 + ":00");
         } else { 
             timeSpan.text(i + ":00");
     }
    
}
