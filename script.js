let momentTime = $("#currentDay");

function update(){
momentTime.text(moment().format("dddd, MMMM Do YYYY, h:mm:ss a"));
}

setInterval(update, 1000);