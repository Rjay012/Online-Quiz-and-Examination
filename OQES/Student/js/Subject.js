$(document).ready(function () {
    showBadge("//ExaminationService.asmx/ShowBadge", "examination"); // user.js
    loadSubject();
});

function loadSubject() {
    $("#subjTable").DataTable().clear().destroy();
    $.ajax({
        type: "POST",
        dataType: "json",
        url: "WebServices//SubjectService.asmx/LoadSubject",
        success: function (data) {
            $('#subjTable').DataTable({
                data: data,
                columns: [
                    {
                        'data': 'subjID'
                    },
                    {
                        'data': 'subj',
                        'width': '30%'
                    },
                    {
                        'data': 'instructor',
                        'width': '27%'
                    },
                    {
                        'data': 'enrolledDate'
                    },
                    {
                        'data': 'status'
                    },
                    {
                        'data': 'subjID', render: function (data, type, row) {
                            var btn = "<button class='btn btn-danger btn-sm' type='button'>DROP</button>";

                            return btn;
                        }
                    }
                ],
            });
        }
    });
}

$("#btnSearch").on("click", function () {
    var toSearch = $("#txtFilter").val();
    $("#searchResult").html(createTableForResult(toSearch));
    result(toSearch);
});

function result(toFilter) {
    $("#resultTable").DataTable().clear().destroy();   
    $.ajax({
        type: "POST",
        dataType: "json",
        data: {
            filter: toFilter
        },
        url: "WebServices//SubjectService.asmx/LoadFilteredSubject",
        success: function (data) {
            var counter = 0;
            $('#resultTable').DataTable({
                data: data,
                columns: [
                    {
                        'data': 'subjID',
                        'width': '16%'
                    },
                    {
                        'data': 'subj',
                        'width': '35%'
                    },
                    {
                        'data': 'instructor'
                    },
                    {
                        'data': 'overCapacity',
                        'width': '15%'
                    },
                    {
                        'data': 'subjID', render: function (data, type, row) {
                            var btn = "<button class='btn btn-success btn-sm' type='button' onclick='checkSubjectCapacity(" + parseInt(data) + ", \"" + row.instrID + "\", \"" + row.capacity + "\")'>ADD</button>";

                            return btn;
                        }
                    }
                ],
            });
        }
    });
}

function checkSubjectCapacity(courseId, instrId, capacity) {
    var arrCapacity = capacity.split("/");

    if (arrCapacity[0] != arrCapacity[1]) {  //check subject capacity
        $.post(
            "WebServices//SubjectService.asmx/AddSubject",
            {
                cId: courseId,
                iId: instrId
            },
            function () {
                result($("#txtFilter").val());
                loadSubject();
                alert("Your subject request has been sent!");
            }
        );
    }
    else {
        alert("Subject capacity occupied!");
    }
}

function createTableForResult(toFilter) {

    if (toFilter == "") {
        return "";
    }

    return [
        "<div class='card border-primary'>" +
            "<div class='card-header'>Result(s)</div>" +
            "<div class='card-body'>" +
                "<table id='resultTable' class='table table-bordered display'>" +
                    "<thead>" +
                        "<tr>" +
                            "<th>Course ID</th>" +
                            "<th>Subject</th>" +
                            "<th>Instructor</th>" +
                            "<th>Capacity</th>" +
                            "<th></th>" +
                        "</tr>" +
                    "</thead>" +
                "</table>" +
            "</div > " +
        "</div>"
    ];
}