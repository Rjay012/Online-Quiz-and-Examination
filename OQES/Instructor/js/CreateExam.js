$(document).ready(function () {
    $("[id*=txtStartTime], [id*=txtEndTime]").timepicker({
            timeFormat: "h:mm p",
            interval: 5,
            minTime: "7:00am",
            maxTime: "5:00pm"
        });

    $(".datepicker").datepicker();
});

/*$("#ancEmbedQuestion").click(function () {
    var examType = $("[id*=ddlExamType]").val();

    var questionaire = "<strong>Question 1:</strong>" +
                       "<textarea class='form-control' id='txtEmbedQuestion'></textarea>";

    if (examType == "multiple choice") {
        $("#questionaire-form").html(questionaire + addMultipleChoiceForm());
    }
    else if (examType == "true or false") {
        $("#questionaire-form").html(questionaire + addTrueOrFalseForm());
    }
    else {
        $("#questionaire-form").html(questionaire + addFillInTheBlankForm());
    }
});

$("[id*=btnSelectPreviousExam]").click(function () {
    loadPreviousExam();
});

function loadPreviousExam() {
    var subjID = 1014;   //hardcoded, change it!
    var examType = "multiple choice";

    $("#previousExamTable").DataTable().clear().destroy();  //destroy table for initializing new data
    $.ajax({
        type: "POST",
        dataType: "json",
        data: {
            subjID: subjID,
            examType: examType
        },
        url: "WebServices//CreateExamService.asmx/PreviousExamination",
        success: function (data) {
            $('#previousExamTable').DataTable({
                "lengthMenu": [[5, 10, 15, -1], [5, 10, 15, "All"]],
                data: data,
                columns: [
                    {
                        'data': 'examID',
                        'width': '10%'
                    },
                    {
                        'data': 'title'
                    },
                    {
                        'data': 'subj',
                        'width': '25%'
                    },
                    {
                        'data': 'date',
                        'width': '15%'
                    },
                    {
                        'data': 'qRange',
                        'width': '8%'
                    },
                    {
                        'data': 'examID', render: function (data, type, row) {
                            return "<button class='btn btn-info btn-sm' type='button' onclick=''>SELECT</i></button>";
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
}*/

//CREATE QUESTIONAIRE AND CHOICES WITH ANSWER KEYS
$("#content").on("click", "[id*=btnSubmitQuestion]", function () {
    if (confirm("Sure you wan to add this exam question?") == true) {
        var questionaire = {};
        questionaire["question"] = $("[id*=txtQuestion]").val();
        questionaire["type"] = sessionStorage.qType;

        switch (sessionStorage.qType) {
            case "multiple choice":
                questionaire["choiceA"] = $("[id*=txtChoiceA]").val();
                questionaire["choiceB"] = $("[id*=txtChoiceB]").val();
                questionaire["choiceC"] = $("[id*=txtChoiceC]").val();
                questionaire["choiceD"] = $("[id*=txtChoiceD]").val();
                questionaire["ansKey"] = $("[name*=ansKey]:checked").val();
                break;
            case "true or false":
                questionaire["choiceA"] = $("[id*=txtChoiceT]").val();
                questionaire["choiceB"] = $("[id*=txtChoiceF]").val();
                questionaire["ansKey"] = $("[name*=ansKey]:checked").val();
                break;
            case "enumeration":
                var ans = "";
                $(".enumAnsField").each(function () {  //get each value of textboxes contained answer keys
                    ans += $(this).val() + "|";
                });
                questionaire["ansKey"] = ans;
                break;
            case "fill in the blank":
                questionaire["ansKey"] = $("#txtAns").val();
        }

        $.post(
            "WebServices//CreateExamService.asmx/AddQuestion",
            {
                questionaire: JSON.stringify(questionaire)
            },
            function () {
                clearQuestionaireForm();
                $(".alert-container").html(alertMessage("success", "Exam question created"));
            }
        );
    }
});

function extractRightPortionOfTime(right) {
    return right.match(/\d+/g).join([]);
}

$("#content").on("click", "[id*=btnSaveExam]", function () {
    sessionStorage.examType = $("[id*=ddlExamType]").val();

    var start = moment($("[id*=txtStartTime]").val(), "hh:mm a");
    var end = moment($("[id*=txtEndTime]").val(), "hh:mm a");

    var min = end.diff(start, 'minutes');

    var title = $("[id*=txtTitle]").val();
    var subjId = parseInt($("[id*=ddlSubject]").val());
    var instruction = $("[id*=txtInstruction]").val();
    var description = $("[id*=txtDescription]").val();
    var examDate = $("[id*=txtDatePicker]").val();
    var examType = sessionStorage.examType;
    var passingMark = $("[id*=ddlPassingMark]").val();

    if (title != "" && examDate != "" && instruction != "" && description != "" && start != "" && end != "" && examType != "--- Choose Exam Type ---" && passingMark != "--- Choose Passing Mark ---") {
        if (passingMark.match(/[0-9]/g)) {
            if (confirm("Sure you want to create exam?") == true) {
                $.post(
                    "WebServices//CreateExamService.asmx/CreateExam",
                    {
                        title: title,
                        subjId: subjId,
                        instruction: instruction,
                        descr: description,
                        examDate: examDate,
                        examType: examType,
                        pMark: passingMark,
                        timeLimit: min
                    },
                    function () {
                        disableControl();
                        alertMessage("success", "Exam created");
                    }
                );
                disableControl();
                $("[id*=btnSubmitQuestion]").prop("disabled", false);

                $(".alert-container").html(alertMessage("success", "Exam created"));
                renderQuestionTypeForm(examType);
            }
        }
        else {
            $(".alert-container").html(alertMessage("success", "Invalid input"));
        }
    }
    else {
        $(".alert-container").html(alertMessage("success", "Please fill all fields or Enter a valid range and passing score!"));
    }
});

function renderQuestionTypeForm(type) {
    sessionStorage.qType = type;
    switch (type) {
        case "multiple choice":
            $("#questionForm").html(multipleChoiceForms());
            break;
        case "true or false":
            $("#questionForm").html(trueFalseForms());
            break;
        case "enumeration":
            $("#questionForm").html(enumerationForms("viewEnumTbody"));
            break;
        case "fill in the blank":
            $("#questionForm").html(fillInTheBlankForms());
            break;
        default:
            $("#btnQtype").prop("disabled", false);
    }
}

function multipleChoiceForms() {
    return "<table class='table table-bordered'>" +
                "<thead>" +
                    "<th class='text-center' width='8'>Choices</th>" +
                    "<th class='text-center'>Answer</th>" +
                    "<th class='text-center' width='10'>Anskey</th>" +
                "</thead>" +

                "<tbody>" +
                    "<tr>" +
                        "<td class='text-center'>A</td>" +
                        "<td class='text-center'><input class='form-control' type='text' id='txtChoiceA' /></td>" +
                        "<td class='text-center'><input class='form-control' type='radio' id='rbAnsA' value='a' name='ansKey' /></td>" +
                    "</tr>" +
                    "<tr>" +
                        "<td class='text-center'>B</td>" +
                        "<td class='text-center'><input class='form-control' type='text' id='txtChoiceB' /></td>" +
                        "<td class='text-center'><input class='form-control' type='radio' id='rbAnsB' value='b' name='ansKey' /></td>" +
                    "</tr>" +
                    "<tr>" +
                        "<td class='text-center'>C</td>" +
                        "<td class='text-center'><input class='form-control' type='text' id='txtChoiceC' /></td>" +
                        "<td class='text-center'><input class='form-control' type='radio' id='rbAnsC' value='c' name='ansKey' /></td>" +
                    "</tr>" +
                    "<tr>" +
                        "<td class='text-center'>D</td>" +
                        "<td class='text-center'><input class='form-control' type='text' id='txtChoiceD' /></td>" +
                        "<td class='text-center'><input class='form-control' type='radio' id='rbAnsD' value='d' name='ansKey' /></td>" +
                    "</tr>" +
                "</tbody>" +
           "</table>";
}

function trueFalseForms() {
    return "<table class='table table-bordered'>" +
                "<thead>" +
                    "<th class='text-center' width='8'>Choices</th>" +
                    "<th class='text-center'>Answer</th>" +
                    "<th class='text-center' width='10'>Anskey</th>" +
                "</thead>" +

                "<tbody>" +
                    "<tr>" +
                        "<td class='text-center'>True</td>" +
                        "<td class='text-center'><input class='form-control' type='text' id='txtChoiceT' /></td>" +
                        "<td class='text-center'><input class='form-control' type='radio' id='rbAnsT' value='t' name='ansKey' /></td>" +
                    "</tr>" +
                    "<tr>" +
                        "<td class='text-center'>False</td>" +
                        "<td class='text-center'><input class='form-control' type='text' id='txtChoiceF' /></td>" +
                        "<td class='text-center'><input class='form-control' type='radio' id='rbAnsF' value='f' name='ansKey' /></td>" +
                    "</tr>" +
                "</tbody>" +
           "</table>";
}

function fillInTheBlankForms() {
    return "<table class='table table-bordered'>" +
                "<thead>" +
                    "<th class='text-center'>Answer</th>" +
                "</thead>" +

                "<tbody>" +
                    "<tr><td class='text-center'><input class='form-control' type='text' id='txtAns' /></td></tr>" +
                "</tbody>" +
           "</table>";
}

function addField() {
    $("#otherField").html()
}

function clearQuestionaireForm() {
    $("[id*=txtQuestion]").val("");
    $("[id*=txtChoiceA]").val("");
    $("[id*=txtChoiceB]").val("");
    $("[id*=txtChoiceC]").val("");
    $("[id*=txtChoiceD]").val("");
    $("#txtAns").val("");
}

function disableControl() {
    $("[id*=btnSaveExam]").attr("disabled", true);
    $("[id*=btnCancel]").attr("disabled", true);
    $("[id*=ddlExamType]").attr("disabled", true);
    $("[id*=ddlPassingMark]").attr("disabled", true);
    $("[id*=ddlSubject]").attr("disabled", true);
    $("[id*=txtTitle]").attr("disabled", true);
    $("[id*=txtInstruction]").attr("disabled", true);
    $("[id*=txtDescription]").attr("disabled", true);
    $("[id*=txtDatePicker]").attr("disabled", true);
    $("[id*=txtPassingMark]").attr("disabled", true);
    $("[id*=txtTimeLimit]").attr("disabled", true);
}