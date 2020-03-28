$(document).ready(function () {
    load();
});

function load() {
    $("#instructorTable").DataTable().clear().destroy();  //destroy table for initializing new data
    $.ajax({
        type: "POST",
        dataType: "json",
        url: "WebServices//InstructorService.asmx/Load",
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
                            return "<button class='btn btn-success btn-sm' id='btnViewStudent' type='button' data-toggle='modal' onclick='viewStudentHandle(\"" + data + "\")' data-target='#myModalViewStudent'>STUDENT</button>";
                        }
                    },
                    {
                        'data': 'instrID', render: function (data, type, row) {
                            return "<button class='btn btn-warning btn-sm' id='btnViewSubject' type='button' data-toggle='modal' onclick='viewSubjectHandle(\"" + data + "\")' data-target='#myModalViewSubject'>SUBJECT</button>";
                        }
                    },
                    {
                        'data': 'instrID', render: function (data, type, row) {
                            return "<button class='btn btn-primary btn-sm' type='button' onclick='' data-toggle='modal' data-target='#myModalUpdateStudent'>EDIT</button>";
                        }
                    },
                    {
                        'data': 'instrID', render: function (data, type, row) {
                            return "<button class='btn btn-danger btn-sm' type='button' onclick=''>DROP</button>";
                        }
                    }
                ],
            });
        }
    });
}

function viewStudentHandle(instrID) {
    $("#studentTable").DataTable().clear().destroy();  //destroy table for initializing new data
    $.ajax({
        type: "POST",
        dataType: "json",
        data: {
            instrID: instrID
        },
        url: "WebServices//InstructorService.asmx/LoadStudent",
        success: function (data) {
            $('#studentTable').DataTable({
                data: data,
                columns: [
                    {
                        'data': 'studID'
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
                ],

            });
        }
    });
}

function viewSubjectHandle(instrId) {
    $("#instructorSubjectTable").DataTable().clear().destroy();  //destroy table for initializing new data
    $.ajax({
        type: "POST",
        dataType: "json",
        data: {
            instrID: instrId
        }, 
        url: "WebServices//InstructorService.asmx/LoadSubject",
        success: function (data) {
            $('#instructorSubjectTable').DataTable({
                data: data,
                columns: [
                    {
                        'data': 'subjID'
                    },
                    {
                        'data': 'subj'
                    },
                    {
                        'data': 'subjID', render: function (data, type, row) {
                            return "<button class='btn btn-primary btn-sm' type='button' onclick='updateInfo(\"" + data + "\")' data-toggle='modal' data-target='#myModalUpdateInstructor'>EDIT</button>";
                        }
                    },
                    {
                        'data': 'subjID', render: function (data, type, row) {
                            return "<button class='btn btn-danger btn-sm' type='button' onclick='deleteInfo(\"" + data + "\")'>DROP</button>";
                        }
                    }
                ],

            });
        }
    });
}

function updateInfo(instrId) {
    alert("Update Me!")
}

function deleteInfo(instrId) {
    alert("Delete Me!");
}