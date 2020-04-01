$(document).ready(function () {
    checkExaminee();
});

function reloadQuestionaire() {
    checkExaminee();
}

function checkExaminee() {
    $.post(
        "WebServices//TakeExamService.asmx/CheckExaminee",
        {
            examID: parseInt(decodeURIComponent(getParam("id")))
        },
        function (result) {
            if (result > 0) {
                var examType = getExamType();
                $(".content").html(
                    "<div class='col-lg-3'>" +

                    "</div>" +
                    "<div class='col-lg-6'>" +
                    "<div class='panel panel-primary'>" +
                    "<div class='panel-heading'>" +
                    "<h4 class='text-center'>RESULT: (" + decodeURIComponent(getParam("title")) + ")</h4>" +
                    "</div>" +
                    "<div class='panel-body'>" +

                    "</div>" +
                    "</div>" +
                    "</div>" +
                    "<div class='col-lg-3'>" +

                    "</div>"
                );

                if (examType === "all type") {
                    $(".panel-body").html(
                        "<table class='table table-bordered'>" +
                        "<thead><tr>" +
                        "<th class='text-center'>PART</th>" +
                        "<th class='text-center'>TYPE</th>" +
                        "<th class='text-center'>SCORE</th>" +
                        "</tr></thead>" +
                        "<tbody id='score-board'></tbody>" +
                        "</table>"
                    );
                }
                else {
                    $(".panel-body").html(
                        "<h4 class='text-center'>TOTAL SCORE:</h4>" +
                        "<h3 class='text-center' id='total-score'></h3>" +
                        "<h1 class='text-center' id='remarks'></h1>"
                    );
                }
                $(".panel-body").append("<button class='btn btn-success btn-block' type='button' data-toggle='modal' data-target='#myModalPreviewExamResult' onclick='previewExamResult()'>REVIEW EXAMINATION RESULT</button>");
                getResult(parseInt(decodeURIComponent(getParam("id"))), examType);
            }
            else {
                $(".content").html(
                    "<div class='col-md-10'>" +
                    "<div class='well'>" +
                    "<div class='text-center'>" +
                    "<h3 id='exam-title'></h3>" +
                    "</div>" +
                    "<div class='exam-details'>" +
                    "<p style='word-wrap: break-word' id='instruction'></p>" +
                    "<p style='word-wrap: break-word' id='note'></p>" +
                    "</div>" +
                    "<div id='exam'>" +

                    "</div>" +
                    "</div>" +
                    "</div>" +

                    "<div class='col-md-2'>" +
                    "<div class='sidebar-nav-fixed pull-right affix'>" +
                    "<div class='well'>" +
                    "<div class='timer timer1 alert alert-danger btn-block'></div>" +
                    "</div>" +

                    "<div class='well'>" +
                    "<button class='timerstart btn btn-success btn-block' type='button' onclick='start()'>Start Exam</button>" +
                    "<button class='btn btn-info btn-block' id='btnFinishExam' onclick='finish()' disabled>Finished Exam</button>" +
                    "</div>" +
                    "</div>" +
                    "</div>"
                );
                readyDetails();

                $(".timer1").attr("data-minutes-left", timeLimit(parseInt(decodeURIComponent(getParam("id")))));

                //ready timer
                $('.timer1').startTimer({
                    onComplete: function () {
                        finishExam();
                    },
                    onStart: $('.timerstart'),
                    loop: false
                });
            }
        }
    );
}

function previewExamResult() {
    readyQuestion("preview-examresult-wrapper");
    $(".modal-title").html(decodeURIComponent(getParam("title")));
    $(".lightgreen").css("background-color", "lightgreen");
    $(".lightblue").css("background-color", "lightblue");
    $(".salmon").css("background-color", "salmon");
    $(".has-error, .lightblue, .salmon").parent().addClass("wrong-ans");
    $(".has-error").parent().addClass("with-checkbox");  //add another class to hold checkboxes
    $(".lightgreen, .salmon").children().prop("checked", true);  //mark student selected answer (radio button)

    createCheckboxToShowAnswer();
    assignValueToCheckbox();

    $(".examineeAnsController").prop("disabled", true);
}

function createCheckboxToShowAnswer() {
    var c = 1;
    $(".wrong-ans").parent().parent().removeClass(".panel panel-success").addClass(".panel panel-danger");  //parent of "panel-body", main panel
    $(".with-checkbox").parent().each(function () {  //create checkboxes for each wrong answer in enumeration and fill in the blank types
        $(this).append(
            "<div class='col-md-12'>" +
            "Correct Answer <input id='ch-wrong-ans" + c + "' type='checkbox' onchange='triggerCheckbox(" + c + ", this.value)' />" +
            "</div>"
        );
        c++;
    });
}

function assignValueToCheckbox() {  //assign the questionID to checkboxes
    var c = 1;
    $(".wrong-ans").children("input:hidden").each(function () {
        $("#ch-wrong-ans" + c++).val(parseInt($(this).val()));  //fill value of checkboxes with question ID(qID)
    });
}

function triggerCheckbox(autoNo, qID) {   //show correct answer when checkbox triggered
    var checkBox = $("#ch-wrong-ans" + autoNo);
    var arrAns = [];
    var indx = 0;

    arrAns = (checkBox.prop("checked")) ? showAnswer(qID, "GetKey") : showAnswer(qID, "GetAnswer");
    $(".has-error").children("." + qID).each(function () {
        $(this).val(arrAns[indx]);
        indx++;
    });
}

function showAnswer(qID, methodName) {
    var arrAnsKey = [];
    fetchData("WebServices//TakeExamService.asmx/" + methodName, { qID: qID, examID: parseInt(decodeURIComponent(getParam("id"))), hasAdditionalQuery: "yes" }
    ).done(function (result) {
        $.each(result, function (keyID, key) {
            arrAnsKey.push(key);
        });
    });
    return arrAnsKey;
}

function timeLimit(examID) {
    var timeLimit = 0;
    $.ajax({
        url: "WebServices//TakeExamService.asmx/TimeLimit",
        type: "POST",
        async: false,
        data: {
            examID: examID
        },
        success: function (result) {
            timeLimit = result;
        }
    });

    return timeLimit;
}

function getResult(examID, examType) {
    $.ajax({
        url: "WebServices//TakeExamService.asmx/Result",
        type: "post",
        dataType: "json",
        data: {
            examID: examID, examType: examType
        },
        success: function (result) {
            if (examType === "all type") {
                var scoreBoard = "", c = 1;
                $.each(result, function (type, score) {
                    scoreBoard += "<tr>" +
                        "<td class='text-center'>" + (c++) + "</td>" +
                        "<td class='text-center'>" + type + "</td>" +
                        "<td class='text-center'>" + score + "</td>" +
                        "</tr>";
                });
                $("#score-board").html(scoreBoard + "<tr>" +
                    "<td class='text-center' colspan='2'><strong>TOTAL SCORE:</strong></td>" +
                    "<td class='text-center'><strong>" + getTotal(examID) + "</strong></td>" +
                    "</tr>");
            }
            else {
                $.each(result, function (i, item) {
                    $("#total-score").html(item.overScore);
                    $("#remarks").html(item.rating);
                });
            }
        }
    });
}

function getTotal(examID) {
    var totalScore = "";
    fetchData("WebServices//TakeExamService.asmx/Result", { examID: examID, examType: "undefined" })
        .done(function (result) {
            $.each(result, function (i, item) {
                totalScore = item.overScore + "<br />" + item.rating;
            });
        });
    return totalScore
}

function readyDetails() {
    $("#exam-title").html(decodeURIComponent(getParam("title")));

    $.post(
        "WebServices//TakeExamService.asmx/GetDetail",
        {
            examID: parseInt(decodeURIComponent(getParam("id")))
        },
        function (details) {
            $("#instruction").html("<strong><i>INSTRUCTION: </i></strong>" + details + ".");
            $("#note").html("<strong><i>NOTE: </i>Please avoid from refreshing the page or else your answers will be cleared!</strong>");
        }
    );
}

function getParam(param) {
    var results = new RegExp('[\?&]' + param + '=([^&#]*)').exec(window.location.href);
    return results[1] || 0;
}

var fetchData = function (dataURL, data) {
    return $.ajax({
        url: dataURL,
        type: "post",
        dataType: "json",
        async: false,
        data: data
    });
}

function getExamType() {
    var examType = "";
    fetchData("WebServices//TakeExamService.asmx/GetExamType", { examID: decodeURIComponent(getParam("id")) })
        .done(function (result) {
            examType = result;
        });
    return examType;
}

function displayResultGuide() {
    return [
        "<div id='guide-wrapper'>" +
        "<table class='table table-bordered'>" +
        "<thead>" +
        "<tr><th class='text-center' colspan='3'>TEST SUMMARY</th></tr>" +
        "<tr>" +
        "<th class='text-center'>Correct Answer(s)</th>" +
        "<th class='text-center'>Unanswered</th>" +
        "<th class='text-center'>Wrong Answer(s)</th>" +
        "</tr>" +
        "</thead>" +
        "<tbody></tbody>" +
        "</table>" +
        "<strong>Result Guide:</strong><br />" +
        "<span class='label label-success'><i class='fas fa-check-square' aria-hidden='true'></i> Answer is Correct</span> - " +
        "<span class='label label-info'><i class='fas fa-check-square' aria-hidden='true'></i> Correct Answer</span> - " +
        "<span class='label label-danger'>Wrong Answer</span>" +
        "</div><br />"
    ];
}

function readyQuestion(examWrapper) {
    var type = [];

    if (getExamType() === "all type") {
        var questionaire = fetchData(
            "WebServices//TakeExamService.asmx/ReadyQuestion",
            { examID: decodeURIComponent(getParam("id")) }
        );

        questionaire.done(function (result) {
            var headerType = "";
            var i = 1, indx = 0;
            $.each(result, function (key, value) {
                type[indx++] = key;
                headerType += "<h4>PART " + i + ": " + (key.charAt(0).toUpperCase() + key.substring(1)) + " - (" + value + " item/s)</h4><div id='questionaire-wrapper" + i + "'></div>";
                i++;
            });

            $("#" + examWrapper).html(displayResultGuide() + headerType);
            getQuestion(examWrapper, ...type);
            $(".timerstart").prop("disabled", false);
        });
    }
    else {   //pure typed exam
        getQuestion(examWrapper, ...type);
    }
}

var z = 1;
function getQuestion(examWrapper, ...type) {
    if (type.length > 0) {  //if array has value
        for (var x in type) {
            fetchData(
                "WebServices//TakeExamService.asmx/GetPartitionedQuestionaire",
                {
                    examID: decodeURIComponent(getParam("id")), type: type[x]
                }
            ).done(function (result) {
                $("#questionaire-wrapper" + (parseInt(x) + 1)).html(buildChoicesAndFields(result));
            });
        }
    }
    else {
        fetchData(
            "WebServices//TakeExamService.asmx/ReadyQuestion", { examID: decodeURIComponent(getParam("id")) }
        ).done(function (result) {
            $("#" + examWrapper).html(displayResultGuide() + buildChoicesAndFields(result));
        });
    }
}

function buildChoicesAndFields(result) {
    var qProperty = "", i = 1;
    $.each(result, function (key, value) {
        qProperty += "<div class='panel panel-success'>" +
            "<div class='panel-body'>" +
            "<p style='word-wrap: break-word'>" +
            "<strong>" + (i++) + ". " + value + "</strong>" +
            "</p><br />" +
            "<div>" +  //has dynamic class
            "<input type='hidden' value='" + key + "' />" +
            getChoicesAndKeys(key, getQuestionType(key)) +
            "</div>" +
            "</div>" +
            "</div>";
    });
    return qProperty;
}

function getChoicesAndKeys(qID, qType) {
    var ck = "", color = "";
    fetchData(
        "WebServices//TakeExamService.asmx/" + ((qType === "multiple choice" || qType === "true or false") ? "GetChoice" : "GetAnswer"),
        { qID: qID, examID: parseInt(decodeURIComponent(getParam("id"))), hasAdditionalQuery: "" }  //added examID
    ).done(function (result) {
        var l = (qType == "true or false") ? 84 : 65;   //define the type of letter that start for T/F: 84 and MULTIPLE CHOICE: 65

        $.each(result, function (key, value) {
            if (qType === "multiple choice" || qType === "true or false") {
                var valL = String.fromCharCode((l == 85) ? 70 : l);
                var studAns = studentAns(qID, valL.toLowerCase());  //returns color
                var keyAns = markAnsKey(qID, valL.toLowerCase());  //returns color

                color = ((studAns !== "" && keyAns !== "") ? "lightgreen" : (studAns + keyAns));
                ck += "<p class='" + color + "' style='word-wrap: break-word'>" +
                    "<input class='examineeAnsController' type='radio' name='choice" + z + "' value='" + valL.toLowerCase() + "' onchange='saveAnswer(" + qID + ", this.value, \"" + qType + "\")' /> " + valL + ". " + value +
                    "</p><br />";
                l++;
            }
            else {
                color = markAnsKey(qID, value);
                ck += "<div class='form-group has-" + ((color === "lightblue") ? "success" : "error") + " has-feedback col-sm-6'>" +
                    "<input class='form-control input-sm examineeAnsController " + qID + "' value='" + value + "' type='text' onkeyup='saveAnswer(" + key + ", this.value, \"" + qType + "\")' />" +
                    "</div>";
            }
        });
        z++;
    });
    return ck;
}

function markAnsKey(qID, choice) {
    var a = "";
    fetchData("WebServices//TakeExamService.asmx/GetKey", { qID: qID })
        .done(function (result) {
            $.each(result, function (keyID, key) {
                if (choice === key) a = "lightblue";
            });
        });
    return a;
}

function studentAns(qID, choice) {
    var a = "";
    fetchData("WebServices//TakeExamService.asmx/GetAnswer", { qID: qID, examID: decodeURIComponent(getParam("id")), hasAdditionalQuery: "" })
        .done(function (result) {
            $.each(result, function (ansID, ans) {
                if (choice === ans) a = "salmon";
            });
        });
    return a;
}

function getQuestionType(qID) {
    var type = "";
    fetchData("WebServices//TakeExamService.asmx/QuestionType", { qID: qID })
        .done(function (result) {
            type = result;
        });
    return type;
}

function saveAnswer(qID, ans, qType) {
    fetchData("WebServices//TakeExamService.asmx/SaveAnswer", {
        qId: qID,
        examID: decodeURIComponent(getParam("id")),
        ans: ans.toLowerCase(),
        qType: qType
    });
}

function finishExam() {
    fetchData("WebServices//TakeExamService.asmx/FinishExam", { examID: decodeURIComponent(getParam("id")) });
    checkExaminee();
}

function start() {
    readyQuestion("exam");
    $("#btnFinishExam").prop("disabled", false);
    $(".has-feedback :input").val("");
    $(".has-feedback").prop("class", "form-group");
    $(".panel panel-success").prop("class", "panel panel-default");
    $("#guide-wrapper").html("");  //guide will only show when exam finished
}

function finish() {
    if (confirm("Sure you want to finish your exam?") == true) {
        finishExam();
    }
}