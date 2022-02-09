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
            1: "",
            2: "",
            3: "",
            4: "",
            5: ""
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
    $(parentRow + " .saveBtn").click(function() {
        // get textarea values
        task = $(parentRow + " textarea").val();
        timeBlocks[time] = task;
        saveTasks();
    });
});