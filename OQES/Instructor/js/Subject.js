var toFilter = "";
$(document).ready(function () {
    //set default zero when filtering is not in used
    loadHandledSubject(0);
    loadSubject(0);   //load subject lists
});

$("#btnViewCategorySubj").click(function () {
    toFilter = "loadSubject";
    categories("category");
});

$("#btnViewCategorySubjHandle").click(function () {
    toFilter = "loadHandledSubject";
    categories("category2");
});

function categories(wrapperID) {
    $.post(
        "WebServices//SubjectService.asmx/Categories",
        {
            functionName: toFilter
        },  
        function (data) {
            $("#" + wrapperID).html(data);
        }
    );
}

$(".modal-content").on("click", "[id*=btnSaveSubj]", function () {
    if (confirm("Sure you want to add this subject?") == true) {
        var capacity = $("[id*=txtCapacity]").val();

        if (capacity.match(/[0-9]/g)) {
            if (capacity >= 1 && capacity <= 100) {
                $.post(
                    "WebServices//SubjectService.asmx/AddSubject",
                    {
                        subj_id: parseInt($("#txtHidVal").val()),
                        capacity: parseInt($("[id*=txtCapacity]").val())
                    },
                    function () {
                        loadSubject(0);

                        $("#myModalEnterCapacity .close").click();
                        $("#alert-container").html(alertMessage("success", "Subject has been added!"));
                    }
                );
            }
            else {
                $("#alert-capacity").html(alertMessage("warning", "Number exceeds from (1-100)"));
            }
        }
        else {
            $("#alert-capacity").html(alertMessage("danger", "Invalid capacity entered"));
        }
        
    }
});

$("[id*=btnAddStudent]").click(function () {
    if ($(this).val() === "ADD STUDENT") {
        $("h4.viewStudent").html("Add New Student");
        $("#viewStudentModalContent").html(readyNewStudentForm());
        $("[id*=btnAddStudent]").prop("class", "btn btn-primary");
        $("[id*=btnAddStudent]").val("SAVE");
    }
    else {
        if ($("#txtNewStudID").val() != "" && $("#txtNewStudFname").val() != "" && $("#txtNewStudMname").val() != "" && $("#txtNewStudLname").val() != "") {
            if ($("#txtNewStudNePass").val() === $("#txtNewStudRetypePass").val()) {
                if (confirm("Sure you want to add this new student?") == true) {
                    viewStudent(parseInt($("#hidSubjID").val()));
                    $("[id*=btnAddStudent]").prop("class", "btn btn-success");
                    $("[id*=btnAddStudent]").val("ADD STUDENT");
                    checkSubjectCapacity();  //check the subject capacity before adding/enrolling the student
                }
            }
            else {
                $("#alert-subject-student").html(alertMessage("warning", "Password didn't matched"));
            }
        }
        else {
            $("#alert-subject-student").html(alertMessage("warning", "Required field must be filled"));
        }
    }
});

function checkSubjectCapacity() {
    $.post(
        "WebServices//SubjectService.asmx/CheckSubjectCapacity",
        {
            subjID: parseInt($("#hidSubjID").val())
        },
        function (result) {
            if (result == 0) {
                $("#alert-subject-student").html(alertMessage("warning", "Subject capacity has been occupied, contact your system administrator for more info!"));
            }
            else {
                addNewStudent(parseInt($("#txtNewStudID").val()), $("#txtNewStudFname").val(), $("#txtNewStudMname").val(), $("#txtNewStudLname").val(), parseInt($("#hidSubjID").val()), $("#txtNewStudNePass").val());
            }
        }
    );
}

function addNewStudent(studID, fname, mname, lname, subjID, pass) {
    $.post(
        "WebServices//StudentService.asmx/NewStudentInfo",
        {
            stud_id: studID,
            fname: fname,
            mname: mname,
            lname: lname,
            subj_id: subjID,
            pass: pass
        },
        function (result) {
            result = result.split("|");
            $("#alert-subject-student").html(alertMessage(result[0], result[1]));
        }
    );
}

function readyNewStudentForm() {
    return "<strong>ID No.</strong>" +
        "<input class='form-control' type='text' id='txtNewStudID' />" +
        "<strong>Firstname:</strong>" +
        "<input class='form-control' type='text' id='txtNewStudFname' />" +
        "<strong>Middlename:</strong>" +
        "<input class='form-control' type='text' id='txtNewStudMname' />" +
        "<strong>Lastname:</strong>" +
        "<input class='form-control' type='text' id='txtNewStudLname' />" +
        "<strong>New Password:</strong>" +
        "<input class='form-control' type='text' id='txtNewStudNePass' />" +
        "<strong>Retype New Password:</strong>" +
        "<input class='form-control' type='text' id='txtNewStudRetypePass' />";
}
 
function add(subjID) {
    $("#txtHidVal").val(subjID);  //prepare the subject ID
}

//drop instructor subject
function dropSubjectHandle(subjHandleID) {
    if (confirm("Sure you want to drop your subject?") == true) {
        $.post(
            "WebServices//SubjectService.asmx/DropSubject",
            {
                subjHandleID: subjHandleID
            },
            function () {
                loadHandledSubject(0);
                $("#alert-container").html(alertMessage("danger", "Subject handled has been dropped!"));
            }
        );
    }
}

function loadSubject(categoryID) {
    $("#subjectTable").DataTable().clear().destroy();  //destroy table for initializing new data
    $.ajax({
        type: "POST",
        dataType: "json",
        data: {
            categoryID: categoryID
        }, 
        url: "WebServices//SubjectService.asmx/LoadSubjects",
        success: function (data) {
            $('#subjectTable').DataTable({
                "lengthMenu": [[5, 10, 15, -1], [5, 10, 15, "All"]],
                data: data,
                columns: [
                    {
                        'data': 'subjID',
                        'width': '15%'
                    },
                    {
                        'data': 'subj'
                    },
                    {
                        'data': 'category',
                        'width': '25%'
                    },
                    {
                        'data': 'subjID', render: function (data, type, row) {
                            return "<button class='btn btn-success btn-sm' type='button' data-toggle='modal' data-target='#myModalEnterCapacity' onclick='add(" + data + ")'><i class='fas fa-plus'></i></button>";
                        },
                        'width': '10%'
                    }
                ],
                rowReorder: {
                    selector: 'td:nth-child(2)'
                },
                responsive: true
            });
        }
    });
}

function loadHandledSubject(categoryID) {
    $("#handledSubjectTable").DataTable().clear().destroy();  //destroy table for initializing new data
    $.ajax({
        type: "POST",
        dataType: "json",
        data: {
            categoryID: categoryID
        }, 
        url: "WebServices//SubjectService.asmx/LoadHandledSubjects",
        success: function (data) {
            $('#handledSubjectTable').DataTable({
                "lengthMenu": [[5, 10, 15, -1], [5, 10, 15, "All"]],
                data: data,
                columns: [
                    {
                        'data': 'subjID',
                        'width': '15%'
                    },
                    {
                        'data': 'subj'
                    },
                    {
                        'data': 'category',
                        'width': '25%'
                    },
                    {
                        'data': 'capacity',
                        'width': '15%'
                    },
                    {
                        'data': 'subjID', render: function (data, type, row) {
                            return "<button class='btn btn-success btn-sm' type='button' data-toggle='modal' onclick='viewStudent(" + parseInt(data) + ")' data-target='#myModalViewStudent'>STUDENT</button>";
                        },
                        'width': '15%'
                    },
                    {
                        'data': 'subjID', render: function (data, type, row) {
                            return "<button class='btn btn-danger btn-sm' type='button' data-toggle='modal' onclick='dropSubjectHandle(" + row.subjHandleID + ")' data-target='#myModalViewSubject'><i class='fas fa-trash-alt'></i></button>";
                        },
                        'width': '15%'
                    }
                ],
                rowReorder: {
                    selector: 'td:nth-child(2)'
                },
                responsive: true
            });
        }
    });
}

function readyViewStudentTable() {
    return "<table id='handledStudentTable' class='table table-bordered display'>" +
            "<thead>" +
                "<tr>" +
                    "<th>ID No.</th>" +
                    "<th>Firstname</th>" +
                    "<th>Middlename</th>" +
                    "<th>Lastname</th>" +
                    "<th></th>" +
               "</tr>" +
            "</thead>" +
        "</table>";
}

function viewStudent(subjID) {
    $("#hidSubjID").val(subjID);
    $("h4.viewStudent").html("List(s) of Student(s) who enrolled this subject...");
    $("#viewStudentModalContent").html(readyViewStudentTable());
    $("[id*=btnAddStudent]").prop("class", "btn btn-success");
    $("[id*=btnAddStudent]").val("ADD STUDENT");

    $("#handledStudentTable").DataTable().clear().destroy();  //destroy table for initializing new data
    $.ajax({
        type: "POST",
        dataType: "json",
        data: {
            subjID: subjID
        },
        url: "WebServices//SubjectService.asmx/GetStudent",
        success: function (data) {
            $('#handledStudentTable').DataTable({
                "lengthMenu": [[5, 10, 15, -1], [5, 10, 15, "All"]],
                data: data,
                columns: [
                    {
                        'data': 'studID',
                        'width': '15%'
                    },
                    {
                        'data': 'firstName'
                    },
                    {
                        'data': 'middleName'
                    },
                    {
                        'data': 'lastName'
                    },
                    {
                        'data': 'studID', render: function (data, type, row) {
                            return "<button class='btn btn-danger btn-sm' type='button' onclick='dropStudent(" + parseInt(data) + ")'>DROP</button>";
                        }
                    }
                ],
                rowReorder: {
                    selector: 'td:nth-child(2)'
                },
                responsive: true
            });
        }
    });
}