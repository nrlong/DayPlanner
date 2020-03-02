$(document).ready(function(){
    
    //generate time for jumbotron
    let momentTime = $("#currentDay");


    let nowHour24 = moment().format("H");

    function update(){
        momentTime.text(moment().format("dddd, MMMM Do YYYY, h:mm:ss a"));
    }setInterval(update, 1000);

    // retrieve stored plans on load(if any)
    let storedPlans = JSON.parse(localStorage.getItem("storedPlans"));


    if (storedPlans !== null){
        plansArr = storedPlans;
    }else{
        plansArr = new Array(9);
    }


    let plannerDiv = $("#plans");
    plannerDiv.empty();



//build daily schedule
    for (let hour = 9; hour <= 17; hour++){
        let index = hour - 9;

        let rowDiv = $("<div>");
        rowDiv.attr('class', 'row plannerRow');
        rowDiv.attr('hour-index', hour);

        const timeSpan = $("<span>");
        timeSpan.attr("class", "hourDiv");

        let displayHour = 0;
        let ampm = "";
        if(hour > 12){
            displayHour = hour - 12;
            ampm = "pm";
        }else{
            displayHour = hour;
            ampm ="am"
        }

        timeSpan.text(displayHour + ampm);

        rowDiv.append(timeSpan);

        let dailyInput = $("<input>");
        dailyInput.attr("id", "input-"+index);
        dailyInput.attr("hour-index", index)
        dailyInput.attr("type", "text");

        dailyInput.val(plansArr[index]);

        rowDiv.append(dailyInput);

        let saveBtn = $("<i>");
        saveBtn.attr("id", "saveid"+index);
        saveBtn.attr("save-id", index);
        saveBtn.attr("class", "fas fa-save fa-lg");

        rowDiv.append(saveBtn);

        rowColorChange(rowDiv, hour);

        plannerDiv.append(rowDiv);
    };
//change color of rows based on time of day
    function rowColorChange(hourRow, hour){
        if (hour < nowHour24){
            hourRow.attr("class", "past");
        }else if(hour > nowHour24){
            hourRow.attr("class", "future");
        }else{
            hourRow.attr("class", "present");
        }
    }
// save function
    $(document).on("click", "i", function(event){
        event.preventDefault();

        let index = $(this).attr("save-id");

        let inputId = $("#input-"+index);
        let value = inputId.val();
        plansArr[index] = value;

        localStorage.setItem("storedPlans", JSON.stringify(plansArr));
    });
})