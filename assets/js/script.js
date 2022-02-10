var timeBlocks = {};

var loadTasks = function() {
    //parse local storage data with json
    timeBlocks = JSON.parse(localStorage.getItem("time-blocks"));

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

    $.each(timeBlocks, function(time, task) {
        var parentRow = "."+ time;
        var textAreaEl = parentRow + " textarea";
        $(textAreaEl).append(task);
    });
};


loadTasks();


var saveTasks = function() {
    localStorage.setItem("time-blocks", JSON.stringify(timeBlocks));
};

$.each(timeBlocks, function(time, task) {
    var parentRow = "."+ time;
    var textEl = $(parentRow + " textarea")
    $(parentRow + " .saveBtn").click(function() {
        // get textarea values
        task = textEl.val();
        timeBlocks[time] = task;
        saveTasks();
    });
    var now = moment();
    var taskTime = moment(now);
    taskTime.set({h:time, m:0, s:0, ms:0});
    if (now.hour() === taskTime.hour()) {
        textEl.addClass("present");
    } else if (now.isAfter(taskTime)) {
        textEl.addClass("past");
    } else {
        textEl.addClass("future");
    }
});

