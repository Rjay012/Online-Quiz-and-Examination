window.onload = function () {
    loadDetails();
};

function loadDetails() {
    $.ajax({
        type: "post",
        dataType: "json",
        url: "WebServices//ExamDetailsService.asmx/LoadDetail",
        data: {
            examId: decodeURIComponent(getParam("id"))
        },
        success: function (result) {
            $("#exam-content").html(displayContent(result));
        }
    });
}

function displayContent(result) {
    var htmlStrContent = "";

    $.each(result, function (i, item) {
        $("#title").html(item.title);
        htmlStrContent = "<div class='col-lg-6' style='display: inline-block'>" +
            "<div class='panel panel-default'>" +
            "<div class='panel-body'>" +
            "<input type='hidden' id='hidSubjID' value='" + parseInt(item.subjID) + "' />" +
            "<p style='display: inline-block'><strong>Subject: </strong><div id='subj'>" + item.subj + "</div></p>" +
            "<p><strong>Date: </strong><div id='date'>" + formatDate(new Date(item.date)) + "</div></p>" +
            "<p><strong>Passing Mark: </strong><div id='pMark'>" + parseInt(item.passingMark) + "</div></p>" +
            "<p><strong>Time Limit: </strong><div id='tLimit'>" + parseInt(item.timeLimit) + "</div></p>" +
            "<p><strong>Status: </strong><div id='status'>" + item.status + "</div></p>" +
            "</div>" +
            "</div>" +
            "</div>" +

            "<div class='col-lg-6' style='display: inline-block'>" +
            "<div class='panel panel-default'>" +
            "<div class='panel-body'>" +
            "<strong>Instruction: </strong><p style='word-wrap: break-word' id='instruction'>" + item.instruction + "</p>" +
            "<p><strong>Type: </strong><div id='type'>" + item.examType + "</div></p>" +
            "<strong>Description: </strong><p style='word-wrap: break-word' id='description'>" + item.description + "</p>" +
            "</div>" +
            "</div>" +
            "</div>";
        
    });
    
    return htmlStrContent;
}

$("#ancLoadDetail").click(function () {
    loadDetails();
});

$("#ancLoadQuestionaire, #ancLoadSingleViewQuestionaire").click(function () {
    loadSingleViewQuestionaire();
});

$("#btnPrintExam").click(function () {
    $.post(
        "WebServices//ExamDetailsService.asmx/PrintExam",
        function () {

        }
    );
});

$("#btnSingleViewRemove").click(function () {
    if (confirm("Sure you want to remove this/those question(s)?") == true) {
        $.post(
            "WebServices//ExamDetailsService.asmx/RemoveQuestion",
            {
                qID: parseInt($("#hidTXTQuestion").val())
            },
            function () {
                loadSingleViewQuestionaire();
            }
        );
    }
});

$(".btnAddQuestion").click(function () {
    $("#addQuestionForm").html("");
    renderQuestionaireForm(getExamType());
});

function renderQuestionaireForm(type) {
    sessionStorage.qType = type;
    switch (type) {
        case "multiple choice":
            $("[id*=btnSaveNewQuestion]").prop("disabled", false);
            $("#addQuestionForm").html(addMultipleChoiceForm());
            break;
        case "true or false":
            $("[id*=btnSaveNewQuestion]").prop("disabled", false);
            $("#addQuestionForm").html(addTrueOrFalseForm());
            break;
        case "enumeration":
            $("[id*=btnSaveNewQuestion]").prop("disabled", false);
            $("#addQuestionForm").html(enumerationForms("addEnumTbody"));
            break;
        case "fill in the blank":
            $("[id*=btnSaveNewQuestion]").prop("disabled", false);
            $("#addQuestionForm").html(addFillInTheBlankForm());
            break;
        default:
            $("[id*=btnSaveNewQuestion]").prop("disabled", true);
            $("#qTypeWrapper").html(
                '<div class="dropdown">' +
                '<button class="btn btn-success btn-sm dropdown-toggle" id="btnQtype" type="button" data-toggle="dropdown">' +
                'SELECT QUESTION TYPE <span class="caret"></span>' +
                '</button>' +
                '<ul class="dropdown-menu">' +
                '<li><a href="#" onclick="renderQuestionaireForm(\'multiple choice\')">Multiple Choice</a></li>' +
                '<li><a href="#" onclick="renderQuestionaireForm(\'true or false\')">True or False</a></li>' +
                '<li><a href="#" onclick="renderQuestionaireForm(\'enumeration\')">Enumeration</a></li>' +
                '<li><a href="#" onclick="renderQuestionaireForm(\'fill in the blank\')">Fill in the blank</a></li>' +
                '</ul>' +
                '</div><br />');
    }
}

$("[id*=btnSaveNewQuestion]").click(function () {
    if (confirm("Sure you want to add this question?") == true) {
        var questionaire = {};
        questionaire["question"] = $("[id*=txtAddQuestion]").val();
        questionaire["type"] = sessionStorage.qType;

        switch (sessionStorage.qType) {
            case "multiple choice":
                questionaire["choiceA"] = $("#txtAddChoiceA").val();
                questionaire["choiceB"] = $("#txtAddChoiceB").val();
                questionaire["choiceC"] = $("#txtAddChoiceC").val();
                questionaire["choiceD"] = $("#txtAddChoiceD").val();
                questionaire["ansKey"] = $("[name*=ansKey]:checked").val();
                break;
            case "true or false":
                questionaire["choiceA"] = $("#txtAddChoiceT").val();
                questionaire["choiceB"] = $("#txtAddChoiceF").val();
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
                questionaire["ansKey"] = $("#txtAddAns").val();
                break;
        }
        addNewQuestion(JSON.stringify(questionaire));
    }
});

function addNewQuestion(questionaire) {
    $.post(
        "WebServices//ExamDetailsService.asmx/AddQuestion",
        {
            examID: decodeURIComponent(getParam("id")),
            questionaire: questionaire
        },
        function () {
            loadSingleViewQuestionaire();
            $("#newQuestion-alert").html(alertMessage("success", "New Question has been added"));
        }
    );
}

$("[id*=btnLock]").click(function () {
    if (confirm("Sure you want to lock this questionaire?") == true) {
        var data = {}; var dataPKey = {};
        data["question"] = $("#txtQuestion").val(); dataPKey["qID"] = parseInt($("#hidTXTQuestion").val());
        var qType = getQuestionType(dataPKey["qID"]);
        if (qType == "multiple choice") {
            data["choiceA"] = $("#txtChoiceA").val(); dataPKey["cID1"] = parseInt($("#hidTXTChoiceA").val());
            data["choiceB"] = $("#txtChoiceB").val(); dataPKey["cID2"] = parseInt($("#hidTXTChoiceB").val());
            data["choiceC"] = $("#txtChoiceC").val(); dataPKey["cID3"] = parseInt($("#hidTXTChoiceC").val());
            data["choiceD"] = $("#txtChoiceD").val(); dataPKey["cID4"] = parseInt($("#hidTXTChoiceD").val());
            data["ansKey"] = $("[name*=ansKey]:checked").val(); dataPKey["ansKeyID"] = parseInt($("#hidTxtAnsKeyID").val());
            $("#btnRandomizer").prop("disabled", true);
        }
        else if (qType == "true or false") {
            data["choiceA"] = $("#txtChoiceT").val(); dataPKey["cID1"] = parseInt($("#hidTXTChoiceT").val());
            data["choiceB"] = $("#txtChoiceF").val(); dataPKey["cID2"] = parseInt($("#hidTXTChoiceF").val());
            data["ansKey"] = $("[name*=ansKey]:checked").val(); dataPKey["ansKeyID"] = parseInt($("#hidTxtAnsKeyID").val());
            $("#btnRandomizer").prop("disabled", true);
        }
        else if (qType == "enumeration")
        {
            var keyID = "";
            var key = "";
            $(".enumAddAnsFieldID").each(function () {
                keyID += parseInt($(this).val()) + "|";
            });
            $(".enumAddAnsField").each(function () {
                key += $(this).val() + "|";
            });
            dataPKey["ansKeyID"] = keyID;
            data["ansKey"] = key;
        }
        else {
            data["ansKey"] = $("#txtAns").val(); dataPKey["ansKeyID"] = parseInt($("#hidTXTAns").val());
        }
        $("#btnSingleViewRemove").prop("disabled", true);
        saveUpdatedQuestionaire(qType, JSON.stringify(data), JSON.stringify(dataPKey));
    }
});

function saveUpdatedQuestionaire(qType, myData, myDataKey) {
    $.post(
        "WebServices//ExamDetailsService.asmx/SaveUpdatedQuestionaire",
        {
            qType: qType,
            myData: myData,
            myDataKey: myDataKey
        },
        function () {
            loadSingleViewQuestionaire();
            $("#questionaire-alert").html(alertMessage("success", "Questionaire has been updated and locked"));
        }
    );
}

function getParam(param) {
    var results = new RegExp('[\?&]' + param + '=([^&#]*)').exec(window.location.href);
    return results[1] || 0;
}

function formatDate(formattedDate) {
    var month = formattedDate.getMonth() + 1;
    var day = formattedDate.getDate();
    var year = formattedDate.getFullYear();

    return month + "/" + day + "/" + year;
}

$("#btnEdit").click(function () {
    if ($(this).html() == "EDIT") {
        var subj = parseInt($("#hidSubjID").val());
        var date = $("#date").html();
        var passingMark = parseInt($("#pMark").html());
        var status = $("#status").html();
        var instruction = $("#instruction").html();
        var type = $("#type").html();
        var description = $("#description").html();

        $("#subj").html("<select class='form-control' id='ddlEditSubj'>" +
                            "<option disabled>--- Choose Subject ---</option>" +
                            fillSubject() +
                        "</select>");
        $("#date").html("<input class='form-control' id='txtEditDate' type='text' value='" + formatDate(new Date(date)) + "' />");
        $("#pMark").html("<select class='form-control' id='ddlPMark'>" +
                            "<option disabled>--- Choose Passing Mark ---</option>" +
                            "<option value='40'>40%</option>" +
                            "<option value='50'>50%</option>" +
                            "<option value='60'>60%</option>" +
                         "</select>");
        $("#tLimit").html("<div class='col-sm-6'>" +
                                "<input class='form-control' id='txtEditStartTime' type='text' readonly />" +
                          "</div>" +
                          "<div class='col-sm-6'>" +
                                "<input class='form-control' id='txtEditEndTime' type='text' readonly />" +
                          "</div>");
        $("#status").html("<select class='form-control' id='ddlEditStatus'>" + 
                            "<option disabled>--- Choose Status ---</option>" +
                            "<option value='ready'>Ready</option>" +
                            "<option value='open'>Open</option>" +
                            "<option value='close'>Close</option>" +
                            "<option value='finalize'>Finalize</option>" +
                          "</select>");
        $("#instruction").html("<textarea class='form-control' id='txtEditInstruction'>" + instruction + "</textarea>");
        $("#type").html("<select class='form-control' id='ddlEditType'>" +
                            "<option disabled>--- Choose Type ---</option>" +
                            "<option value='multiple choice'>Multiple Choice</option>" +
                            "<option value='true or false'>True or False</option>" +
                            "<option value='Fill in the Blank'>Fill in the Blank</option>" +
                        "</select>");
        $("#description").html("<textarea class='form-control' id='txtEditDescription'>" + description + "</textarea>");

        markSelected("ddlEditSubj", subj);
        markSelected("ddlPMark", passingMark);
        markSelected("ddlEditStatus", status);
        markSelected("ddlEditType", type);

        $(this).html("SAVE");
        $("#txtEditDate").datepicker();

        $("#txtEditStartTime, #txtEditEndTime").timepicker({
            timeFormat: "h:mm p",
            interval: 5,
            minTime: "7:00am",
            maxTime: "5:00pm"
        });
    }
    else {
        if (confirm("Sure you want to accept those changes?") == true) {
            $(this).html("EDIT");
            saveExamChanges();
        }
        else {
            loadDetails();
        }
    }
});

//mark selected options on each HTML Select Control
function markSelected(controlID, type) {
    $("#" + controlID + " option").each(function () {
        if ($(this).val() == type) {
            $(this).prop("selected", true);
        }
    });
}

function saveExamChanges() {
    var subjId = $("#ddlEditSubj").val();
    var date = $("#txtEditDate").val();
    var pMark = $("#ddlPMark").val();
    var status = $("#ddlEditStatus").val();
    var instruction = $("#txtEditInstruction").val();
    var type = $("#ddlEditType").val();
    var description = $("#txtEditDescription").val();

    //calculate minutes
    var start = moment($("[id*=txtEditStartTime]").val(), "hh:mm a");
    var end = moment($("[id*=txtEditEndTime]").val(), "hh:mm a");

    var min = end.diff(start, 'minutes');

    $.post(
        "WebServices//ExamDetailsService.asmx/editExamDetails",
        {
            eId: decodeURIComponent(getParam("id")),
            sId: subjId,
            date: date,
            pMark: pMark,
            tLimit: min,
            status: status,
            instruction: instruction,
            type: type,
            description: description
        },
        function () {
            loadDetails();
        }
    );
}

function loadSingleViewQuestionaire() {
    $("[id*=btnLock]").prop("disabled", true);
    $("#btnSingleViewRemove, #btnRandomizer").prop("disabled", true);
    $("#singleViewQuestionaires").html("<strong id='lblQuestion'>Question: </strong>" +
                                       "<input type='hidden' id='hidTXTQuestion' />" +
                                       "<textarea class='form-control updateControl' id='txtQuestion' disabled></textarea><br /><div id='qForm'></div>");
    loadQuestionaireBadge();
}

var ansKeyFromDB = function ans() {
    return $("[name*=ansKey]:checked").val().toUpperCase().charCodeAt(0);
};
var base = 65;

$("#btnRandomizer").click(function () {
    var ansKey = ansKeyFromDB();
    var qType = getQuestionType(parseInt($("#hidTXTQuestion").val()));
    if (qType == "multiple choice") {
        var arr = [$("#txtChoiceA").val(), $("#txtChoiceB").val(), $("#txtChoiceC").val(), $("#txtChoiceD").val()];

        //randomize choices
        for (var i = 0; i < (arr.length) - 1; i++) {
            var temp = arr[i + 1];
            arr[i + 1] = arr[i];
            arr[i] = temp;
        }

        var letter = 65;
        for (var c = 0; c < (arr.length); c++) {  //display randomized choices
            $("#txtChoice" + String.fromCharCode(letter)).val(arr[c]);
            letter++;
        }

        ansKey = (ansKey > base) ? (ansKey - 1) : 68;   //mark answer based on selected choice position

        $("#rbAns" + String.fromCharCode(ansKey)).prop("checked", true);  //mark new answer key to radio button control
    }
    else if (qType == "true or false") {
        var ansT = $("#txtChoiceT").val();
        var ansF = $("#txtChoiceF").val();

        var temp = ansT;
        ansT = ansF;
        ansF = temp;

        $("#txtChoiceT").val(ansT);
        $("#txtChoiceF").val(ansF);

        if ($("#rbAnsT").prop("checked")) {
            $("#rbAnsF").prop("checked", true);
        }
        else{
            $("#rbAnsT").prop("checked", true);
        }
    }    
});

function readyQuestionaireForm(qType) {
    if (qType == "multiple choice") {
        $("#qForm").html(multipleChoiceForm());
    }
    else if (qType == "true or false") {
        $("#qForm").html(trueFalseForm());
    }
    else if (qType == "enumeration")
    {
        $("#qForm").html(enumerationForm());
    }
    else {
        $("#qForm").html(fillInTheBlankForm());
    }
}

function getExamType() {
    var formType = "";
    $.ajax({
        type: "post",
        url: "WebServices//ExamDetailsService.asmx/ExamType",
        data: {
            examID: decodeURIComponent(getParam("id"))
        },
        async: false,
        success: function (data) {
            formType = data;
        }
    });

    return formType;
}

function loadQuestionaireBadge() {
    $.ajax({
        url: "WebServices//ExamDetailsService.asmx/GetQuestionaire",
        type: "post",
        dataType: "json",
        data: {
            examID: decodeURIComponent(getParam("id"))
        },
        success: function (result) {
            var n = 1;
            var badge = [];
            $.each(result, function (key, value) {
                n = (n >= 1 && n <= 9) ? ("0" + n) : n;
                badge.push("<span class='label label-success' id='q-badge-" + n + "' onclick='showQuestion(" + parseInt(key) + ", \"" + value + "\", \"" + getChoicesAndKeys(parseInt(key), "GetChoice") + "\", \"" + getChoicesAndKeys(parseInt(key), "GetAnswerKey") + "\", " + n + ")' style='cursor: pointer'>" + n + "</span>&nbsp;");
                n++;
            });
            $("#questionBadges").html(badge);
        }
    });
}

function getChoicesAndKeys(qID, methodName) {
    var arrKey = "";
    var arrVal = "";
    $.ajax({
        url: "WebServices//ExamDetailsService.asmx/" + methodName,
        type: "post",
        dataType: "json",
        data: {
            qID: qID
        },
        async: false,
        success: function (result) {
            $.each(result, function (key, value) {
                arrKey += key + "|";
                arrVal += value + "|";
            });
        }
    });
    return arrKey + "~" + arrVal;
}

function enableControls() {
    $(".updateControl").prop("disabled", false);
}

function showQuestion(qID, question, choice, ansKey, autoNo) {
    $("#txtQuestion").val(question); $("#hidTXTQuestion").val(qID);
    
    var arrC = choice.split("~");
    var cID = arrC[0].split("|");  //extract choices ID
    var choices = arrC[1].split("|"); //extract choices
    var qType = getQuestionType(qID);
    readyQuestionaireForm(qType);
    enableControls();
    if (qType == "multiple choice") {  //multiple choice
        $("#btnRandomizer").prop("disabled", false);
        $("#txtChoiceA").val(choices[0]); $("#hidTXTChoiceA").val(cID[0]);
        $("#txtChoiceB").val(choices[1]); $("#hidTXTChoiceB").val(cID[1]);
        $("#txtChoiceC").val(choices[2]); $("#hidTXTChoiceC").val(cID[2]);
        $("#txtChoiceD").val(choices[3]); $("#hidTXTChoiceD").val(cID[3]);
    }
    else if (qType == "true or false") { //true or false
        $("#btnRandomizer").prop("disabled", false);
        $("#txtChoiceT").val(choices[0]); $("#hidTXTChoiceT").val(cID[0]);
        $("#txtChoiceF").val(choices[1]); $("#hidTXTChoiceF").val(cID[1]);
    }
    else {  //fill in blank and enumeration
        $("#btnRandomizer").prop("disabled", true);
        showEnumAndFillInBlankAnsKey(qType, ansKey);
    }

    if (qType == "multiple choice" || qType == "true or false") {  //mark and store answer and ID for multiple choice and true or false
        ansKey = ansKey.split("~");   //split the answer key ID and the key itself
        $("#hidTxtAnsKeyID").val(ansKey[0].slice(0, -1));  //store answer key ID to be used for updating the data
        $("#rbAns" + ansKey[1].slice(0, -1).toUpperCase()).prop("checked", true);  //mark answer key
    }
    
    $("#btnSingleViewRemove").prop("disabled", false);
    $("#lblQuestion").html("Question " + autoNo + ":");
}

function getQuestionType(qID) {
    var type = "";
    $.ajax({
        url: "WebServices//ExamDetailsService.asmx/QuestionType",
        type: "post",
        data: {
            qID: qID
        },
        async: false,
        success: function (result) {
            type = result;
        }
    });

    return type;
}

function showEnumAndFillInBlankAnsKey(qType, ansKey) {
    var keyID = "";
    var key = "";
    ansKey = ansKey.split("~");
    keyID = ansKey[0].split("|").slice(0, -1);
    key = ansKey[1].split("|").slice(0, -1);

    if (qType === "enumeration") {
        var enumTbody = "";
        for (var i = 0; i < key.length; i++) {
            enumTbody += "<tr id='tRow" + (i + 1) + "'>" +
                "<td class='text-center'>" + (i + 1) + "</td>" +
                "<td class='text-center'>" +
                "<input class='enumAddAnsFieldID' type='hidden' id='hidTXTEnumAns" + (i + 1) + "' value='" + parseInt(keyID[i]) + "' />" +
                "<input class='form-control enumAddAnsField' type='text' id='txtViewAns" + (i + 1) + "' value='" + key[i] + "' />" +
                "</td>" +
                "<td class='text-center'><button class='btn btn-danger btn-sm' type='button' onclick='removeEnumAns(" + parseInt(keyID[i]) + ")'>REMOVE</button></td>" +
                "</tr>";
        }
        $("#enumTbody").html(
            enumTbody +
            "<tr>" +
            "<td class='text-center'>New</td>" +
            "<td class='text-center'>" +
            "<input class='form-control' type='text' id='txtAddEnumAns' onkeyup='enableAddEnumBtn(this.value)' />" +
            "</td>" +
            "<td class='text-center'>" +
            "<button class='btn btn-success btn-sm' type='button' id='btnAddEnumAns' onclick='addNewEnumAns()' disabled>ADD</button>" +
            "</td>" +
            "</tr>"
        );
    }
    else {
        $("#txtAns").val(key); $("#hidTXTAns").val(keyID);
    }
}

function enableAddEnumBtn(newAns) {
    (newAns !== "") ? $("#btnAddEnumAns").prop("disabled", false) : $("#btnAddEnumAns").prop("disabled", true);
}

function addNewEnumAns() {
    $.post(
        "WebServices//ExamDetailsService.asmx/AddNewEnumAns",
        {
            qID: parseInt($("#hidTXTQuestion").val()),
            ans: $("#txtAddEnumAns").val()
        },
        function () {
            showEnumAndFillInBlankAnsKey(getQuestionType(parseInt($("#hidTXTQuestion").val())), getChoicesAndKeys(parseInt($("#hidTXTQuestion").val()), "GetAnswerKey"));
            loadQuestionaireBadge();
        }
    );
}

function removeEnumAns(keyID) {
    $.post(
        "WebServices//ExamDetailsService.asmx/RemoveEnumAns",
        {
            keyID: keyID
        },
        function () {
            showEnumAndFillInBlankAnsKey(getQuestionType(parseInt($("#hidTXTQuestion").val())), getChoicesAndKeys(parseInt($("#hidTXTQuestion").val()), "GetAnswerKey"));
            loadQuestionaireBadge();
        }
    );
}

function editQuestionaire(qId, autoNo) {
    var question = $("#q" + autoNo).val();
    var ansKey = $("#ansKey" + autoNo).val();
    
    $.post(
        "WebServices//ExamDetailsService.asmx/EditQuestionaire",
        {
            qId: qId,
            question: question,
            ansKey: ansKey
        },
        function () {
            loadSingleViewQuestionaire();
        }
    );
}

function editChoices(cId, choice) {
    $.post(
        "WebServices//ExamDetailsService.asmx/EditChoice",
        {
            cId: cId,
            choice: choice
        },
        function () {
            loadSingleViewQuestionaire();
        }
    );
}

function fillSubject() {
    var option = "";
    $.ajax({
        url: "WebServices//ExamDetailsService.asmx/subj",
        type: "POST",
        async: false,
        success: function (data) {
            option = data;
        }
    }); 
    return option;
}

//converts unicode character to string
function unicodeToChar(text) {
    return text.replace(/\\u[\dA-F]{4}/gi,
        function (match) {
            return String.fromCharCode(parseInt(match.replace(/\\u/g, ''), 16));
        });
}

$("#btnCancel").click(function () {
    location.reload();
});