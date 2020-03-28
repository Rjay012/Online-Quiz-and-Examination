var title = "All";
var subjectID = 0;
var status = "All";

$(document).ready(function () {
    loadExam(title, subjectID, status);  //default
});

$(".form-inline").on("change", "[id*=ddlFilterTitle]", function () {
    title = $(this).val();
    subjectID = parseInt($("[id*=ddlFilterSubject]").val());
    status = $("[id*=ddlFilterStatus]").val();

    loadExam(title, subjectID, status);
});

$(".form-inline").on("change", "[id*=ddlFilterSubject]", function () {
    title = $("[id*=ddlFilterTitle]").val();
    subjectID = parseInt($(this).val());
    status = $("[id*=ddlFilterStatus]").val();

    loadExam(title, subjectID, status);
});

$(".form-inline").on("change", "[id*=ddlFilterStatus]", function () {
    title = $("[id*=ddlFilterTitle]").val();
    subjectID = parseInt($("[id*=ddlFilterSubject]").val());
    status = $(this).val();

    loadExam(title, subjectID, status);
});

function loadExam(title, subjectID, status) {
    $("#examTable").DataTable().clear().destroy();  //destroy table for initializing new data
    $.ajax({
        type: "POST",
        dataType: "json",
        url: "WebServices//ManageExamService.asmx/LoadExam",
        data: {
            title: title,
            subjID: subjectID,
            status: status
        }, 
        success: function (data) {
            $('#examTable').DataTable({
                data: data,
                columns: [
                    {
                        'data': 'examID'
                    },
                    {
                        'data': 'title'
                    },
                    {
                        'data': 'subj'
                    },
                    {
                        'data': 'date'
                    },
                    {
                        'data': 'status', render: function (data, type, row) {

                            var bgColor = "#484747";
                            if (data == "open") {
                                bgColor = "#088326";
                            }
                            else if (data == "closed") {
                                bgColor = "#B83535";
                            }
                            else if (data == "finished") {
                                bgColor = "#334FFF";
                            }

                            return "<div style='background-color: " + bgColor + "'><strong style='color: white'>" + data + "</strong></div>";
                        }
                    },
                    {
                        'data': 'timeLimit'
                    },
                    {
                        'data': 'passingScore'
                    },
                    {
                        'data': 'qRange'
                    },
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
                            if (row.status == "finished") {
                                buttonController = "disabled";
                            }
                            else if (row.status == "closed") {
                                link = [
                                    "<a class='dropdown-item' href='#' onclick='setStatus(" + parseInt(data) + ", \"ready\")'>Ready</a>" +
                                    "<a class='dropdown-item' href='#' onclick='setStatus(" + parseInt(data) + ", \"open\")'>Open</a>"
                                ];
                            }
                            else if (row.status == "open") {
                                link = [
                                    "<a class='dropdown-item' href='#' onclick='setStatus(" + parseInt(data) + ", \"closed\")'>Close</a>" +
                                    "<a class='dropdown-item' href='#' onclick='setStatus(" + parseInt(data) + ", \"finished\")'>Finish</a>"
                                ];
                            }
                            else {
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
                ],
                "order": [3, "desc"],
                rowReorder: {
                    selector: 'td:nth-child(2)'
                },
                responsive: true
            });
        }
    });
}

function viewExaminee(examID) {
    $("#examineeTable").DataTable().clear().destroy();  //destroy table for initializing new data
    $.ajax({
        type: "POST",
        dataType: "json",
        url: "WebServices//ManageExamService.asmx/ViewExaminee",
        data: {
            examID: examID
        },
        success: function (data) {
            $('#examineeTable').DataTable({
                data: data,
                columns: [
                    {
                        'data': 'examineeID',
                        'width': '5%'
                    },
                    {
                        'data': 'studID',
                        'width': '15%'
                    },
                    {
                        'data': 'fullname'
                    },
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
                        },
                        'width': '10%'
                    },
                    {
                        'data': 'score',
                        'width': '10%'
                    },
                    {
                        'data': 'rating',
                        'width': '10%'
                    },
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
                        },
                        'width': '10%'
                    }
                ],
                "order": [1, "asc"],
                rowReorder: {
                    selector: 'td:nth-child(2)'
                },
                responsive: true
            });
        }
    });
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
                loadExam(title, subjectID, status);
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
            loadExam(title, subjectID, status);
            $("#alert-manageExam").html(alertMessage("success", "Exam status set to " + status));
        }
    );
}

function viewFullDetails(id) {
    window.open("ExamDetails.aspx?id=" + id);
}