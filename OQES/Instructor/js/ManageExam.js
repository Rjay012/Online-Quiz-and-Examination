$(document).ready(function () {
    loadExam();
});

function loadExam() {
    var columns = [{ 'data': 'examID', visible: false }, { 'data': 'title' }, { 'data': 'subj' }, { 'data': 'date'},
        {
            'data': 'status', render: function (data, type, row) {

                var bgColor = "#484747";
                switch (data) {
                    case "open":
                        bgColor = "#088326";
                        break;
                    case "closed":
                        bgColor = "#B83535";
                        break;
                    case "finished":
                        bgColor = "#334FFF";
                        break;
                }

                return "<div style='background-color: " + bgColor + "'><strong style='color: white'>" + data + "</strong></div>";
            }
        },
        { 'data': 'timeLimit' }, { 'data': 'passingScore' }, { 'data': 'qRange' },
        {
            'data': 'examID', render: function (data, type, row) {
                return "<button class='btn btn-info btn-sm' id='btnViewExaminee' type='button' data-toggle='modal' onclick='viewExaminee(" + parseInt(data) + ")' data-target='#myModalViewExaminee'>EXAMINEE</button>";
            }
        },
        {
            'data': 'examID', render: function (data, type, row) {
                return "<button class='btn btn-success btn-sm' id='btnViewFullDetails' type='button' data-toggle='modal' onclick='viewFullDetails(" + data + ")' data-target='#myModalViewSubject'>VIEW</button>";
            }
        },
        {
            'data': 'examID', render: function (data, type, row) {
                var link = "";
                var buttonController = "";

                //CONTROL EXAMINATION STATUS
                switch (row.status) {   
                    case "finished":
                        buttonController = "disabled";
                        break;
                    case "closed":
                        link = [
                            "<a class='dropdown-item' href='#' onclick='setStatus(" + parseInt(data) + ", \"ready\")'>Ready</a>" +
                            "<a class='dropdown-item' href='#' onclick='setStatus(" + parseInt(data) + ", \"open\")'>Open</a>"
                        ];
                        break;
                    case "open":
                        link = [
                            "<a class='dropdown-item' href='#' onclick='setStatus(" + parseInt(data) + ", \"closed\")'>Close</a>" +
                            "<a class='dropdown-item' href='#' onclick='setStatus(" + parseInt(data) + ", \"finished\")'>Finish</a>"
                        ];
                        break;
                    default:
                        link = [
                            "<a class='dropdown-item' href='#' onclick='setStatus(" + parseInt(data) + ", \"open\")'>Open</a>" +
                            "<a class='dropdown-item' href='#' onclick='setStatus(" + parseInt(data) + ", \"closed\")'>Close</a>" +
                            "<a class='dropdown-item' href='#' onclick='setStatus(" + parseInt(data) + ", \"finished\")'>Finish</a>"
                        ];
                }

                return "<div class='dropdown'>" +
                    "<button type='button' class='btn btn-primary btn-sm dropdown-toggle' data-toggle='dropdown' " + buttonController + ">Options <span class='caret'></span></button>" +
                    "<ul class='dropdown-menu'>" +
                    "<li>" +
                    link +
                    "</li>" +
                    "</ul>" +
                    "</div>";
            }
        },
        {
            'data': 'examID', render: function (data, type, row) {
                return "<button class='btn btn-danger btn-sm' type='button' onclick='deleteExam(" + parseInt(data) + ")'><i class='fas fa-trash-alt'></i></button>";
            }
        }
    ];
    LoadViaServerSideProcess("examTable", "WebServices//ManageExamService.asmx/LoadExam", null, columns);
}

function viewExaminee(examID) {
    var columns = [{ 'data': 'examineeID', 'width': '5%', visible: false }, { 'data': 'studID', 'width': '15%' }, { 'data': 'fullname' },
        {
            'data': 'status', render: function (stat, type, row) {
                var color = "orange";

                if (stat == "blocked") {
                    color = "#B83535";
                }
                else if (stat == "taking") {
                    color = "#334FFF";
                }
                else if (stat == "taken") {
                    color = "#088326";
                }

                return "<div style='background-color: " + color + "'><strong style='color: white'>" + stat + "</strong></div>";
            }, 'width': '10%'
        }, { 'data': 'score', 'width': '10%' }, { 'data': 'rating', 'width': '10%' },
        {
            'data': 'examineeID', render: function (data, type, row) {
                var btnControl = "";
                var btnName = "BLOCK";

                //disable the block button
                if (row.status == "taken" && (row.rating == "passed" || row.rating == "failed")) {
                    btnControl = "disabled";
                }
                else if (row.status == "blocked") {
                    btnName = "UNBlOCK";
                }

                return "<button class='btn btn-danger btn-sm' onclick='blockExaminee(" + examID + ", " + parseInt(data) + ", \"" + btnName + "\")' type='button' " + btnControl + ">" + btnName + "</button>";
            }, 'width': '10%'
        }
    ];
    LoadViaServerSideProcess("examineeTable", "WebServices//ManageExamService.asmx/ViewExaminee", { "name": "examID", "value": examID }, columns);
}

function blockExaminee(examID, examineeID, action) {
    if (confirm("Sure you want to " + action.toLowerCase() + " this examinee?") == true) {
        $.post(
            "WebServices//ManageExamService.asmx/Action",
            {
                examineeID: examineeID,
                action: action
            },
            function () {
                viewExaminee(examID);
                $("#examinee-alert").html(alertMessage("success", "Examinee has been " + action.toLowerCase() + "ed!"));
            }
        );
    }
}

function deleteExam(examID) {
    if (confirm("Sure you want to remove this exam?") == true) {
        $.post(
            "WebServices//ManageExamService.asmx/DeleteExam",
            {
                examID: examID
            },
            function () {
                loadExam();
                $("#alert-manageExam").html(alertMessage("success", "Exam removed"));
            }
        );
    }
}

function setStatus(id, status) {
    $.post(
        "WebServices//ManageExamService.asmx/SetStatus",
        {
            id: id,
            status: status
        },
        function () {
            loadExam();
            $("#alert-manageExam").html(alertMessage("success", "Exam status set to " + status));
        }
    );
}

function viewFullDetails(id) {
    window.open("ExamDetails.aspx?id=" + id);
}