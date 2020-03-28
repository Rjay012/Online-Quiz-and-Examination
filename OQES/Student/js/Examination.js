$(document).ready(function () {
    showBadge("//SubjectService.asmx/ShowBadge", "subject"); // user.js
    examReady();
});

$("#btnShowPreviousExam").click(function () {
    showPrevExam();
});

function showPrevExam() {
    $("#previousExaminationTable").DataTable().clear().destroy();  //destroy table for initializing new data
    $.ajax({
        type: "POST",
        dataType: "json",
        url: "WebServices//ExaminationService.asmx/ShowPrevExam",
        success: function (data) {
            $('#previousExaminationTable').DataTable({
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
                        'data': 'instructor'
                    },
                    {
                        'data': 'passingScore'
                    },
                    {
                        'data': 'overScore'
                    },
                    {
                        'data': 'rating'
                    }
                ],
            });
        }
    });
}

function examReady() {
    $("#examinationTable").DataTable().clear().destroy();  //destroy table for initializing new data
    $.ajax({
        type: "POST",
        dataType: "json",
        url: "WebServices//ExaminationService.asmx/ReadyExam",
        success: function (data) {
            $('#examinationTable').DataTable({
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
                        'data': 'instructor'
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
                            return "<button class='btn btn-success btn-sm' type='button' onclick='prepareExamination(" + data + ", \"" + row.title + "\")'>TAKE EXAM</button>";
                        }
                    }
                ],
            });
        }
    });
}

function prepareExamination(examId, title) {
    if (confirm("Sure you want to take exam?") == true) {
        $.post(
            "WebServices//ExaminationService.asmx/PrepareExamination",
            {
                examId: examId
            },
            function () {
                window.location.assign("TakeExam.aspx?id=" + examId + "&title=" + title);
            }
        );
    } 
}