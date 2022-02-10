//empty object to hold timeblocks
var timeBlocks = {};

var loadTasks = function() {
    //parse local storage data with json
    timeBlocks = JSON.parse(localStorage.getItem("time-blocks"));

    //if timeblocks is empty, set up keys for each hour
    if (!timeBlocks) {
        timeBlocks = {
            9: "",
            10: "",
            11: "",
            12: "",
            13: "",
            14: "",
            15: "",
            16: "",
            17: ""
        };
    }

    //for each item in timeBlocks, add the tasks from local storage to the textarea
    $.each(timeBlocks, function(time, task) {
        //access the row element for the respective hour
        var parentRow = "."+ time;
        //access the textarea element for that hour
        var textAreaEl = parentRow + " textarea";
        //add the loaded task text to the text area
        $(textAreaEl).append(task);
    });
};

//load tasks before attempting to work with timeBlocks data
loadTasks();

var saveTasks = function() {
    //save the data in the timeBlocks object to local storage
    localStorage.setItem("time-blocks", JSON.stringify(timeBlocks));
};

$.each(timeBlocks, function(time, task) {
    //access the row element for the respective hour
    var parentRow = "."+ time;
    //select the textarea element
    var textEl = $(parentRow + " textarea")
    //when this hour's save button is clicked, perform a function
    $(parentRow + " .saveBtn").click(function() {
        // get textarea value
        task = textEl.val();
        //set the textarea input as a value in timeBlocks associate with the appropriate hour
        timeBlocks[time] = task;
        //save timeBlocks to local storage
        saveTasks();
    });

    var updateTime = function() {
        //create a moment object of the current time
        var now = moment();
        //clone the current time to work with
        var taskTime = moment(now);

        //set the task time to match whatever hour we are currently working with
        taskTime.set({h:time, m:0, s:0, ms:0});
        //if our current hour matches this block on the schedule
        if (now.hour() === taskTime.hour()) {
            //add the red present class
            textEl.removeClass("past");
            textEl.addClass("present");
        }
        //if our current hour is after this block on the schedule
        else if (now.isAfter(taskTime)) {
            //add the grey past class
            textEl.addClass("past");
        } 
        //if our current hour is before this block on the schedule
        else {
            //add the green future class
            textEl.removeClass("present");
            textEl.addClass("future");
        }
        //set the currentDay <p> element text to the current date
        $("#currentDay").text(now.format("LL"));
    };
    //update the time every second
    setInterval(updateTime, 1000);
});