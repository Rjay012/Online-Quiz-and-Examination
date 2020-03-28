$("#btnPreviewQuestionaire").click(function () {
    loadQuestionaire();
});

function loadQuestionaire() {
    var questionaireWrap = fetchData(
        { examID: decodeURIComponent(getParam("id")) },
        "WebServices//ExamDetailsService.asmx/" + ((getExamType() === "all type") ? "PartitionedQuestionType" : "ViewQuestionaire")
    );
    questionaireWrap.done(function (result) {
        var type = [], content = "";
        if (getExamType() === "all type") {
            var c = 1, i = 0;
            $.each(result, function (key, value) {
                type[i++] = key;
                content += "<div class='myAccordion' id='accordion" + c + "'>" +
                    "<div class='panel panel-success'>" +
                    "<div class='panel-heading'>" +
                    "<h4 id='qRange" + c + "' class='panel-title' data-toggle='collapse' href='#collapse" + c + "'>" +
                    "<a data-toggle='collapse' href='#collapse" + c + "'>PART " + c + ": " + key.charAt(0).toUpperCase() + key.substring(1) + "(" + value + " item/s)</a>" +
                    "</h4>" +
                    "</div>" +

                    "<div id='collapse" + c + "' class='collapse' data-parent='#accordion" + c + "'>" +
                    "<div class='panel-body' id='body" + c + "'>" +

                    "</div>" +
                    "</div>" +
                    "</div>" +
                    "</div><br />";
                c++;
            });
            $("#questionaire-content").html(content);
        }
        else {
            var i = 1;
            var noOfPanel = parseInt(result);

            //control the following accordion to produce
            if ((noOfPanel % 10) != 0) {
                noOfPanel = (noOfPanel / 10) + 1;
            }
            else {
                noOfPanel /= 10;
            }

            //build the content
            do {
                content += "<div class='myAccordion' id='accordion" + i + "'>" +
                    "<div class='panel panel-success'>" +
                    "<div class='panel-heading'>" +
                    "<h4 id='qRange" + i + "' class='panel-title' data-toggle='collapse' href='#collapse" + i + "'>" +

                    "</h4>" +
                    "</div>" +

                    "<div id='collapse" + i + "' class='collapse' data-parent='#accordion" + i + "'>" +
                    "<div class='panel-body' id='body" + i + "'>" +

                    "</div>" +
                    "</div>" +
                    "</div>" +
                    "</div><br />";
                i++;
            } while (i <= noOfPanel);

            $("#questionaire-content").html(content);  //display questionaire content

            //label each accordion from question 1-10 and so on.
            if (parseInt(result) > 1 && parseInt(result) < 10) {
                $("#qRange1").html("<a data-toggle='collapse' href='#collapse1'>Question " + 1 + " - " + parseInt(result) + "</a>");
            }
            else {
                var r = 1;
                for (var x = 1; x <= parseInt(noOfPanel); x++) {
                    if (x == parseInt(noOfPanel)) {  //last questionaire panel
                        $("#qRange" + x).html("<a data-toggle='collapse' href='#collapse" + x + "'>Question " + r + " - " + result + "</a>");
                    }
                    else {
                        $("#qRange" + x).html("<a data-toggle='collapse' href='#collapse" + x + "'>Question " + r + " - " + (r + 9) + "</a>");
                    }
                    r += 10;
                }
            }

        }
        extractQuestionaire(parseInt($(".myAccordion").length), ...type);
    });
}

function appendChoicesOrAnskeys(key) {
    var ck = "";   //contains either choices or answer keys depends on question types
    var td = "";
    var qType = getQuestionType(key);
    if (qType === "multiple choice" || qType === "true or false") {  // ck variable here contained CHOICES
        var choice = getChoicesAndKeys(key, "GetChoice").split("~");
        var key = getChoicesAndKeys(key, "GetAnswerKey").split("~");  //used to mark answer keys
        key = key[1].slice(0, -1);
        td = choice[1].split("|");
        var l = (parseInt(td.length - 1) == 2) ? 84 : 65;   //define the type of letter that start for T/F: 84 and MULTIPLE CHOICE: 65
        for (var i = 0; i < (td.length - 1); i++) {
            var valChoice = String.fromCharCode((l == 85) ? 70 : l);
            ck += "<tr " + ((valChoice.toLowerCase() === key) ? "style='background-color: lightblue'" : "") + ">" +
                "<td>" + valChoice + "</td>" +
                "<td>" + td[i] + "</td>" +
                "</tr>";
            l++;
        }        
    }
    else { // ck variable here contained ANSWER KEYS
        var answerKey = getChoicesAndKeys(key, "GetAnswerKey").split("~");
        td = answerKey[1].split("|");
        for (var i = 0; i < (td.length - 1); i++) {
            ck += "<tr>" +
                "<td>" + (i + 1) + "</td>" +
                "<td>" + td[i] + "</td>" +
                "</tr>";
        }
    }
    return ck;
}

var fetchData = function (data, dataURL) {
    return $.ajax({
        url: dataURL,
        type: "post",
        dataType: "json",
        async: false,
        data: data
    });
}

function extractQuestionaire(i, ...type) {
    var questionaire = "", counter = 1;
    if (parseInt(type.length) > 0) {
        for (var i in type) {
            questionaire = fetchData(
                {
                    examID: decodeURIComponent(getParam("id")),
                    type: type[i]
                }, "WebServices//ExamDetailsService.asmx/GetPartitionedQuestionaire"
            );

            questionaire.done(function (result) {
                $.each(result, function (key, value) {
                    $("#body" + (parseInt(i) + 1)).append(buildTableForQuestionaire(key, value, counter++));
                });
            });
        }
    }
    else {
        questionaire = fetchData(
            { examID: decodeURIComponent(getParam("id")) }, 
            "WebServices//ExamDetailsService.asmx/GetQuestionaire"
        );

        questionaire.done(function (result) {
            var question = "";
            //display question(s) to each table
            $.each(result, function (key, value) {
                question += buildTableForQuestionaire(key, value, counter++);
            });

            //display each question to accordion(s) body
            for (var c = 0; c < i; c++) {
                $("#body" + (c + 1)).html(question);
            }
        });
    }
}

function buildTableForQuestionaire(key, value, c) {
    return "<strong>Question " + c + ":</strong>" +
        "<table class='table table-bordered'>" +
        "<thead><tr><th colspan='2'>" + value + "</th></tr></thead>" +
        "<tbody>" + appendChoicesOrAnskeys(key) + "</tbody>" +
        "</table>";
}