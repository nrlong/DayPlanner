let momentTime = $("#currentDay");
let container = $(".container");


// function to keep time updated actively
function update(){
momentTime.text(moment().format("dddd, MMMM Do YYYY, h:mm:ss a"));
}

setInterval(update, 1000);

// Generate hours of the day text fields and buttons

for (let i=1; i < 25; i++){
    let newDiv = document.createElement("div");
    let newButton = document.createElement("button");
    newDiv.setAttribute("id",  i);
    newDiv.setAttribute("class", "dataEnter");
    newDiv.textContent = "test" + i;
    newButton.setAttribute("class", "btn saveBtn " + i);
    newButton.innerHTML ='<i class="far fa-save fa-3x"></i>';
    // newButton.textContent = "Save";
    container.append(newDiv);
    newDiv.append(newButton);
}
