var counter = 1;
$("#btnPreviewQuestionaire").click(function () {
    loadQuestionaire();
});

function loadQuestionaire() {
    fetchData(
        { examID: decodeURIComponent(getParam("id")) },
        "WebServices//ExamDetailsService.asmx/" + ((getExamType() === "all type") ? "PartitionedQuestionType" : "ViewQuestionaire")
    ).done(function (result) {
        var content = "";
        if (getExamType() === "all type") {
            var c = 1, anchorTag = "", offset = 1;
            $.each(result, function (key, value) {
                anchorTag = "<a class='showQuestion' data-toggle='collapse' href='#collapse" + c + "' type='" + key + "' offset='" + offset + "'>PART " + c + ": " + key.charAt(0).toUpperCase() + key.substring(1) + "(" + value + " item/s)</a>";
                content += buildQuestionaireAccordionWrapper(c, anchorTag);
                offset += value;
                c++;
            });
            $("#questionaire-content").html(content);
        }
        else {
            var noOfPanel = parseInt(result), i = 1;

            //control the following accordion to produce
            noOfPanel = ((noOfPanel % 10) != 0) ? (noOfPanel / 10) + 1 : noOfPanel /= 10;

            //build the content
            do {
                content += buildQuestionaireAccordionWrapper(i, "");
                i++;
            } while (i <= noOfPanel);

            $("#questionaire-content").html(content);  //display questionaire content

            //label each accordion from question 1-10 and so on.
            if (parseInt(result) > 1 && parseInt(result) < 10) {
                $("#qRange1").html("<a class='showQuestion' data-toggle='collapse' rowOffset='1' href='#collapse1'>Question " + 1 + " - " + parseInt(result) + "</a>");
            }
            else {
                var r = 1;
                for (var x = 1; x <= parseInt(noOfPanel); x++) {
                    if (x == parseInt(noOfPanel)) {  //last questionaire panel
                        $("#qRange" + x).html("<a class='showQuestion' data-toggle='collapse' rowOffset='" + r + "' href='#collapse" + x + "'>Question " + r + " - " + result + "</a>");
                    }
                    else {
                        $("#qRange" + x).html("<a class='showQuestion' data-toggle='collapse' rowOffset='" + r + "' href='#collapse" + x + "'>Question " + r + " - " + (r + 9) + "</a>");
                    }
                    r += 10;
                }
            }
        }
    });
}

function buildQuestionaireAccordionWrapper(i, aTag) {
    return [
        "<div class='myAccordion' id='accordion" + i + "'>" +
        "<div class='panel panel-success'>" +
        "<div class='panel-heading'>" +
        "<h4 id='qRange" + i + "' class='panel-title' data-toggle='collapse' href='#collapse" + i + "'>" +
        aTag +
        "</h4>" +
        "</div>" +

        "<div id='collapse" + i + "' class='collapse myCollapse' data-parent='#accordion" + i + "'>" +
        "<div class='panel-body' id='body" + i + "'>" +

        "</div>" +
        "</div>" +
        "</div>" +
        "</div><br />"
    ];
}

$(document).on("click", ".showQuestion", function () {
    var panelBody = $(this).closest(".panel-success").children(".myCollapse").children().html();
    if (panelBody == "") {  //for easy loading (on second attempt), don't reload the panels content if they already have
        extractQuestionaire($(this));
    }
});

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

function extractQuestionaire(anchorElem) {
    var userDefinedAttr = anchorElem.attr("type");

    if (userDefinedAttr != undefined) {  //mixed type exam
        counter = parseInt(anchorElem.attr("offset"));
        beginExtractQuestionaire({ examID: decodeURIComponent(getParam("id")), type: userDefinedAttr }, "GetPartitionedQuestionaire", anchorElem);
    }
    else { //raw type exam
        userDefinedAttr = parseInt(anchorElem.attr("rowOffset"));
        counter = userDefinedAttr;
        beginExtractQuestionaire({ examID: decodeURIComponent(getParam("id")), row: (userDefinedAttr - 1) }, "GetQuestionaire", anchorElem);
    }
}

function beginExtractQuestionaire(data, methodName, anchorElem) {
    fetchData(data, "WebServices//ExamDetailsService.asmx/" + methodName).done(function (result) {
        var question = "";
        //display question(s) to each table
        $.each(result, function (key, value) {
            question += buildTableForQuestionaire(key, value, counter++);
        });
        anchorElem.closest(".panel-success").children(".myCollapse").children().html(question);
    });
}

function buildTableForQuestionaire(key, value, c) {
    return "<strong>Question " + c + ":</strong>" +
        "<table class='table table-bordered'>" +
        "<thead><tr><th colspan='2'>" + value + "</th></tr></thead>" +
        "<tbody>" + appendChoicesOrAnskeys(key) + "</tbody>" +
        "</table>";
}