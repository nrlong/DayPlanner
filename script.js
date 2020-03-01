$(document).ready(function(){
    
    const test = false;
    const now = moment().format("MMMM Do YYYY");


    let nowHour24 = moment().format("H");
    let nowHour12 = moment().format("h");

    if(test){
        nowHour24 = 12;
        nowHour12 = 1;
    }

    let dateHeading = $("#currentDay");
    dateHeading.text(now);

    let storedPlans = JSON.parse(localStorage.getItem("storedPlans"));


    if (storedPlans !== null){
        plansArr = storedPlans;
    }else{
        plansArr = new Array(9);
    }


    let plannerDiv = $("#plans");
    plannerDiv.empty();

    if (test){console.log("current time", nowHour12);}


//build daily schedule
    for (let hour = 9; hour <= 17; hour++){
        let index = hour - 9;

        let rowDiv = $("<div>");
        rowDiv.attr('class', 'row plannerRow');
        rowDiv.attr('hour-index', hour);

        let timeColDiv = $("<div>");
        timeColDiv.add("class", "col-md-2");

        const timeSpan = $("<span>");
        timeSpan.attr("class", "timeBox");

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

        rowDiv.append(timeColDiv);
        timeColDiv.append(timeSpan);

        let dailyInput = $("<input>");
        dailyInput.attr("id", "input-"+index);
        dailyInput.attr("hour-index", index)
        dailyInput.attr("type", "text");
        dailyInput.attr("class","dailyPlan");

        dailyInput.val(plansArr[index]);

        let balanceDiv = $("<div>");
        balanceDiv.attr("class", "col-md-9");

        rowDiv.append(balanceDiv);
        balanceDiv.append(dailyInput);

        let saveDiv = $("<div>");
        saveDiv.add("class", "col-md-1");

        let saveBtn = $("<i>");
        saveBtn.attr("id", "saveid"+index);
        saveBtn.attr("save-id", index);
        saveBtn.attr("class", "fa fa-save saveIcon");

        rowDiv.append(saveDiv);
        saveDiv.append(saveBtn);

        rowColorChange(rowDiv, hour);

        plannerDiv.append(rowDiv);
    };

    function rowColorChange(hourRow, hour){
        if (hour < nowHour24){
            hourRow.attr("class", "past");
        }else if(hour > nowHour24){
            hourRow.attr("class", "future");
        }else{
            hourRow.attr("class", "present");
        }
    }

    $(document).on("click", "i", function(event){
        event.preventDefault();

        let index = $(this).attr("save-id");

        let inputId = $("#input-"+index);
        let value = inputId.val();
        console.log(value);
        plansArr[index] = value;

        localStorage.setItem("storedPlans", JSON.stringify(plansArr));
    });
})