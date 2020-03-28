$(document).ready(function () {
    loadSubject(0);
});

function loadSubject(categoryID) {
    $("#subjectTable").DataTable().clear().destroy();
    $.ajax({
        type: "POST",
        data: {
            categoryID: categoryID
        }, 
        dataType: "json",
        url: "WebServices//SubjectService.asmx/LoadSubject",
        success: function (data) {
            $('#subjectTable').DataTable({
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
                        'data': 'category',
                        'width': '27%'
                    },
                    {
                        'data': 'capacity'
                    },
                    {
                        'data': 'subjID', render: function (data, type, row) {
                            return "<button class='btn btn-success btn-sm' type='button' onclick='showInstructor(" + parseInt(data) + ")' data-toggle='modal' data-target='#myModalViewInstructor'>VIEW</button>";
                        }
                    },
                    {
                        'data': 'subjID', render: function (data, type, row) {
                            return "<button class='btn btn-primary btn-sm' type='button' onclick='showToEditSubject(" + parseInt(data) + ")' data-toggle='modal' data-target='#myModalViewEditSubject'>EDIT</button>";
                        }
                    },
                    {
                        'data': 'subjID', render: function (data, type, row) {
                            return "<button class='btn btn-danger btn-sm' type='button' onclick='dropSubject(" + parseInt(data) + ")'>DROP</button>";
                        }
                    }
                ],
            });
        }
    });
}

function dropSubject(subjID) {
    if (confirm("Sure you want to drop this subject?") == true) {
        $.post(
            "WebServices//SubjectService.asmx/DropSubject",
            {
                subjID: subjID
            },
            function () {
                loadSubject(0);
            }
        );
    }
}

function showToEditSubject(subjID) {
    $.ajax({
        url: "WebServices//SubjectService.asmx/ShowToEditSubject",
        data: {
            subjID: subjID
        },
        type: "post",
        dataType: "json",
        success: function (result) {
            $.each(result, function (i, item) {
                $("[id*=txtEditSubjID]").val(item.subjID);
                $("[id*=txtEditSubject]").val(item.subj);
                fillDropDownList(item.categoryID);  //marked subject category
            });
        }
    });
}

function fillDropDownList(categoryID) {
    $("[id*=ddlEditCategory] option").each(function () {
        if ($(this).val() == categoryID) {
            $(this).prop("selected", true);
        }
    });
}

function showInstructor(subjID) {
    $("#instructorTable").DataTable().clear().destroy();
    $.ajax({
        type: "POST",
        dataType: "json",
        data: {
            subjID: subjID
        }, 
        url: "WebServices//InstructorService.asmx/LoadInstructor",
        success: function (data) {
            $('#instructorTable').DataTable({
                data: data,
                columns: [
                    {
                        'data': 'instrID'
                    },
                    {
                        'data': 'fname'
                    },
                    {
                        'data': 'mname'
                    },
                    {
                        'data': 'lname'
                    },
                    {
                        'data': 'instrID', render: function (data, type, row) {
                            return "<button class='btn btn-danger btn-sm' type='button' onclick='dropInstructor(" + parseInt(data) + ")'>DROP</button>";
                        }
                    }
                ],
            });
        }
    });
}

$("[id*=btnEditSubject]").click(function () {
    if (confirm("Sure you want to update this subject?") == true) {
        if ($("[id*=txtEditSubject]").val() != "") {
            $.post(
                "WebServices//SubjectService.asmx/EditSubject",
                {
                    subjID: parseInt($("[id*=txtEditSubjID]").val()),
                    subj: $("[id*=txtEditSubject]").val(),
                    categoryID: parseInt($("[id*=ddlEditCategory]").val())
                },
                function () {
                    loadSubject(0);
                }
            );
            $("#alert-subj-edit").html(alertMessage("success", "Subject Updated!"));
        }
        else {
            $("#alert-subj-edit").html(alertMessage("warning", "Please fill the subject you want to update!"));
        }
    }
});

$("[id*=btnSaveSubject]").click(function () {
    if (confirm("Sure you want to add this subject?") == true) {
        if ($("[id*=txtAddSubject]").val() != "") {
            $.post(
                "WebServices//SubjectService.asmx/AddSubject",
                {
                    subject: $("[id*=txtAddSubject]").val(),
                    categoryID: parseInt($("[id*=ddlAddCategory]").val())
                },
                function () {
                    loadSubject();
                }
            );
            $("#alert-subj").html(alertMessage("success", "Subject Added!"));
        }
        else {
            $("#alert-subj").html(alertMessage("warning", "Please enter subject title to add subject!"));
        }
    }
});

$("#btnViewSubjCategory").click(function () {
    $.post(
        "WebServices//SubjectService.asmx/Categories",
        {
            functionName: "loadSubject"
        },
        function (result) {
            $("#subjCategory").html(result);
        }
    );
});