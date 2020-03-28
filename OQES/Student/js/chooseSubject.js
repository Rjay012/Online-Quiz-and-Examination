$(document).ready(function () {
    $("#stud-id").html(getParam("studId"));
    $("#stud-name").html(decodeURIComponent(getParam("studName")));
    loadSubject(null);
});

function getParam(param) {
    var results = new RegExp('[\?&]' + param + '=([^&#]*)').exec(window.location.href);
    return results[1] || 0;
}

function loadSubject(sort) {
    $("#subjTable").DataTable().clear().destroy();
    $.ajax({
        type: "POST",
        data: {
            sort: sort
        },
        url: "WebServices//ChooseSubjectService.asmx/LoadSubject",
        success: function (data) {
            alert(data);
            var counter = 0;
            $('#subjTable').DataTable({
                data: data,
                columns: [
                    {
                        'data': 'courseId'
                    },
                    {
                        'data': 'subject'
                    },
                    {
                        'data': 'instructor'
                    },
                    {
                        'data': 'capacity'
                    },
                    {
                        'data': 'ids', render: function (data, type, row) {
                            var arrId = data.split("~");

                            var btn = "<button class='btn btn-success btn-sm' type='button' onclick='check(\"" + arrId[0] + "\", \"" + arrId[1] + "\", \"" + arrId[2] + "\")'>ADD</button>";

                            return btn;
                        }
                    }
                ],
            });
        }
    });
}

function check(courseId, instrId, capacity) {
    var arrCapacity = capacity.split("/");

    if (arrCapacity[0] != arrCapacity[1]) {  //check subject capacity
        $.post(
            "WebServices//ChooseSubjectService.asmx/CheckCourse",
            {
                sId: $("#stud-id").html(),
                cId: courseId,
                iId: instrId
            },
            function (data) {
                if (data == "") {
                    alert("You've already taken this subject!");
                }
                else {
                    if (confirm("Sure you want to add this subject?") == true) {
                        addSubject(courseId, instrId);
                    }
                }
            }
        );
    }
    else {
        alert("Subject capacity occupied!");
    }
}

function addSubject(courseId, instrId) {
    $.post(
        "WebServices//ChooseSubjectService.asmx/AddSubject",
        {
            sId: $("#stud-id").html(),
            cId: courseId,
            iId: instrId
        },
        function (data) {
            alert("Your subject request has been sent!");
        }
    );
}

function sortSubj(sort) {
    loadSubject(sort);
}