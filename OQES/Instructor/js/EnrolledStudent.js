$(document).ready(function () {
    showBadge("//StudentService.asmx/ShowBadge", "request");
    let loadStud = new Plugins();
    loadStud.loadStudentTableList();
});

$("#btnViewRequest").click(function () {
    $(".display").DataTable();

    let viewReq = new Request();
    viewReq.showReq(0, null);
    viewReq.subjectToFilter();
});

function setToViewSubject(id) {
    let viewSub = new Plugins();
    viewSub.viewSubject(id);
}

function setToUpdateStudent(id) {
    let updateStud = new AjaxRequest();
    updateStud.toUpdateStudentInfo(id);
}

function setToRemoveStudent(id) {
    let removeStud = new AjaxRequest();
    removeStud.removeStudent(id);
}

$(".modal-content").on("click", "[id*=btnSaveNewStud]", function () {
    if (confirm("Sure you want to add this student?") == true) {
        var studID = $("[id*=txtNewStudID]").val();
        var studFname = $("[id*=txtNewStudFname]").val();
        var studMname = $("[id*=txtNewStudMname]").val();
        var studLname = $("[id*=txtNewStudLname]").val();
        var newPass = $("[id*=txtNewStudPassword]").val();
        var retypedPass = $("[id*=txtNewStudRetypePassword]").val();

        //simple validation for new student info.
        if (studID != "" && studFname != "" && studMname != "" && studLname != "") {
            if (newPass === retypedPass) {
                checkSubjectCapacity();  //check subject capacity and save...
            }
            else {
                $("#newStud-alert").html(alertMessage("danger", "Password didn't matched!"));
            }
        }
        else {
            $("#newStud-alert").html(alertMessage("warning", "Please fill all required field!"));
        }
    }
});

function checkSubjectCapacity() {
    $.post(
        "WebServices/SubjectService.asmx/CheckSubjectCapacity",
        {
            subjID: parseInt($("[id*=ddlSubject]").val())
        },
        function (result) {
            result = result.split("|");
            if (result == 0) {
                $("#newStud-alert").html(alertMessage("warning", "Subject capacity has been occupied, contact your system administrator for more info!"));
            }
            else {
                let req = new AjaxRequest();
                req.addNewStudent();
            }
        }
    );
}

$(".modal-content").on("click", "[id*=btnSaveUpdate]", function () {
    if (confirm("Sure you want to update student info?") == true) {
        let update = new AjaxRequest();
        update.updateStudentInfo()
    }
});

$("#btnDisposeRejectedRequest").click(function () {
    if (confirm("Sure you want to dispose all request(s)?") == true) {
        $.post(
            "WebServices//StudentService.asmx/DeleteRejectedRequest",
            function () {
                let viewReq = new Request();
                viewReq.showReq(0, null);
                $("#alert-request").html(alertMessage("success", "Request(s) disposed!"));
                showBadge("//StudentService.asmx/ShowBadge", "request");
            }
        );
    }
});

function filter(id) {
    let filterReq = new Request();
    filterReq.showReq(id, null);
}

function filterByStatus(status) {
    let filterStatus = new Request();
    filterStatus.showReq(0, status);
}

function requestAction(action, studId, subjId) {  // action param argument 1 means to accept otherwise reject
    if (confirm("Sure you want to continue?") == true) {
        $.post(
            "WebServices//StudentService.asmx/RequestAction",
            {
                status: action,
                studId: studId,
                subjId: subjId
            },
            function () {
                let req = new Request();
                req.showReq(0, null);

                $("#alert-request").html(alertMessage("success", "Student request has been " + action));
                showBadge("//StudentService.asmx/ShowBadge", "request");
            }
        );
    }
}

class Request {
    subjectToFilter() {
        $("#toFilterSubject").html("");
        $.post(
            "WebServices//StudentService.asmx/FillSubjectRequestFilter",
            function (data) {
                var arrSubj = data.split("|");
                var subjId = arrSubj[0].split("-");   ///array to hold subject id's
                var subj = arrSubj[1].split("-");  //array to hold subject title's

                //fill dropdownlist
                for (var i = 0; i <= subj.length - 1; i++) {
                    $("#toFilterSubject").append("<a class='dropdown-item' onclick='filter(\"" + subjId[i] + "\")' href='#'>" + subj[i] + "</a>");
                }
            }
        );
    }

    showReq(filterSubjId, filterStatus) {
        $("#studentRequestTable").DataTable().clear().destroy();
        $.ajax({
            type: "POST",
            dataType: "json",
            data: {
                subjId: filterSubjId,
                status: filterStatus
            },
            url: "WebServices//StudentService.asmx/Request",
            success: function (data) {
                $('#studentRequestTable').DataTable({
                    data: data,
                    columns: [
                        {
                            'data': 'studID'
                        },
                        {
                            'data': 'fullname'
                        },
                        {
                            'data': 'subj'
                        },
                        {
                            'data': 'reqDate'
                        },
                        {
                            'data': 'status', render: function (data, type, row) {
                                var color = "orange"; //default color for pending status
                                if (data == "accepted") {
                                    color = "green";

                                }
                                else if (data == "rejected") {
                                    color = "red";
                                }

                                return "<div style='background-color: " + color + "'><strong style='color: white'>" + data + "</strong></div>";
                            },
                            'width': '10%'
                        },
                        {
                            'data': ('subjID'), render: function (data, type, row) {
                                $(".rejected").attr("disabled", true);
                                return "<div class='dropdown'>" +
                                            "<button type='button' class='btn btn-primary btn-sm dropdown-toggle " + row.status + "' data-toggle='dropdown'>Action<span class='caret'></span> </button>" +
                                            "<div class='dropdown-menu'>" +
                                                "<li>" +
                                                    "<a class='dropdown-item' onclick='requestAction(\"approved\", \"" + row.studID + "\", " + parseInt(data) + ")' href='#'>Accept</a>" +
                                                    "<a class='dropdown-item' onclick='requestAction(\"rejected\", \"" + row.studID + "\", " + parseInt(data) + ")' href='#'>Reject</a>" +
                                                "</li>" +
                                            "</div>" +
                                       "</div>";
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
}

class AjaxRequest {

    addNewStudent() {
        $.post(
            "WebServices//StudentService.asmx/NewStudentInfo",
            {
                stud_id: $("[id*=txtNewStudID]").val(),
                fname: $("[id*=txtNewStudFname]").val(),
                mname: $("[id*=txtNewStudMname]").val(),
                lname: $("[id*=txtNewStudLname]").val(),
                subj_id: parseInt($("[id*=ddlSubject]").val()),
                pass: $("[id*=txtNewStudPassword]").val()
            },
            function (mssg) {
                var param = mssg.split("|");
                $("#newStud-alert").html(alertMessage(param[0], param[1]));

                let load = new Plugins();
                load.loadStudentTableList();
            }
        );
    }

    toUpdateStudentInfo(id) {
        $.ajax({
            url: "WebServices//StudentService.asmx/GetInfo",
            type: "post",
            dataType: "json",
            data: {
                stud_id: id,
            },
            success: function (result) {
                $.each(result, function (i, item) {
                    $("[id*=txtUpdateID]").val(item.studID);
                    $("[id*=txtUpdateFirstname]").val(item.firstName);
                    $("[id*=txtUpdateMiddlename]").val(item.middleName);
                    $("[id*=txtUpdateLastname]").val(item.lastName);
                });
            }
        })
    }

    updateStudentInfo(id) {
        $.post(
            "WebServices//StudentService.asmx/UpdateStudentInfo",
            {
                stud_id: $("[id*=txtUpdateID]").val(),
                fname: $("[id*=txtUpdateFirstname]").val(),
                lname: $("[id*=txtUpdateLastname]").val()
            },
            function (mssg) {
                var param = mssg.split("|");
                $("#updateStud-alert").html(alertMessage(param[0], param[1]));

                let load = new Plugins();
                load.loadStudentTableList();
            }
        );
    }

    removeStudent(id) {
        if (confirm("Sure you want to drop this student?") == true) {
            $.post(
                "WebServices//StudentService.asmx/RemoveStudent",
                {
                    stud_id: id
                },
                function () {
                    let load = new Plugins();
                    load.loadStudentTableList();
                }
            )
        }
        
    }
}

class Plugins extends AjaxRequest {

    loadStudentTableList() {
        $("#studentTable").DataTable().clear().destroy();  //destroy table for initializing new data
        $.ajax({
            type: "POST",
            dataType: "json",
            url: "WebServices//StudentService.asmx/GetStudent",
            success: function (data) {
                $('#studentTable').DataTable({
                    data: data,
                    columns: [
                        {
                            'data': 'studID',
                            'width': '10%'
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
                                return "<button class='btn btn-warning btn-sm' id='btnViewSubject' type='button' data-toggle='modal' onclick='setToViewSubject(\"" + data + "\")' data-target='#myModalViewSubject'>VIEW</button>";
                            },
                            'width': '10%'
                        },
                        {
                            'data': 'studID', render: function (data, type, row) {
                                return "<button class='btn btn-primary btn-sm' type='button' onclick='setToUpdateStudent(\"" + data + "\")' data-toggle='modal' data-target='#myModalUpdateStudent'>EDIT</button>";
                            }
                        },
                        {
                            'data': 'studID', render: function (data, type, row) {
                                return "<button class='btn btn-danger btn-sm' type='button' onclick='setToRemoveStudent(\"" + data + "\")'>DROP</button>";
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

    viewSubject(id) {
        $("#studentSubjectTable").DataTable().clear().destroy();
        $.ajax({
            type: "POST",
            dataType: "json",
            url: "WebServices//StudentService.asmx/GetSubject",
            data: { stud_id: id },
            success: function (data) {
                $('#studentSubjectTable').DataTable({
                    data: data,
                    columns: [
                        {
                            'data': 'subjID',
                            'width': '17%'
                        },
                        {
                            'data': 'subj'
                        },
                        {
                            'data': 'enrolledDate',
                            'width': '20%'
                        },
                        {
                            'data': 'subjID', render: function (data, type, row) {
                                return "<button class='btn btn-danger btn-sm' type='button'>DROP</button>";
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
}