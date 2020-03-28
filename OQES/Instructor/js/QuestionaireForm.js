function addMultipleChoiceForm() {
    return "<table class='table table-bordered'>" +
        "<thead>" +
        "<th class='text-center' width='8'>Choices</th>" +
        "<th class='text-center'>Answer</th>" +
        "<th class='text-center' width='10'>Anskey</th>" +
        "</thead>" +

        "<tbody>" +
        "<tr>" +
        "<td class='text-center'>A</td>" +
        "<td class='text-center'>" +
        "<input class='form-control' type='text' id='txtAddChoiceA' />" +
        "</td>" +
        "<td class='text-center'><input class='form-control' type='radio' id='rbAddAnsA' value='a' name='ansKey' /></td>" +
        "</tr>" +
        "<tr>" +
        "<td class='text-center'>B</td>" +
        "<td class='text-center'>" +
        "<input class='form-control' type='text' id='txtAddChoiceB' />" +
        "</td>" +
        "<td class='text-center'><input class='form-control' type='radio' id='rbAddAnsB' value='b' name='ansKey' /></td>" +
        "</tr>" +
        "<tr>" +
        "<td class='text-center'>C</td>" +
        "<td class='text-center'>" +
        "<input class='form-control updateControl' type='text' id='txtAddChoiceC' />" +
        "</td>" +
        "<td class='text-center'><input class='form-control' type='radio' id='rbAddAnsC' value='c' name='ansKey' /></td>" +
        "</tr>" +
        "<tr>" +
        "<td class='text-center'>D</td>" +
        "<td class='text-center'>" +
        "<input class='form-control' type='text' id='txtAddChoiceD' />" +
        "</td>" +
        "<td class='text-center'><input class='form-control' type='radio' id='rbAddAnsD' value='d' name='ansKey' /></td>" +
        "</tr>" +
        "</tbody>" +
        "</table>";
}

function addTrueOrFalseForm() {
    return "<table class='table table-bordered'>" +
        "<thead>" +
        "<th class='text-center' width='8'>Choices</th>" +
        "<th class='text-center'>Answer</th>" +
        "<th class='text-center' width='10'>Anskey</th>" +
        "</thead>" +

        "<tbody>" +
        "<tr>" +
        "<td class='text-center'>True</td>" +
        "<td class='text-center'>" +
        "<input class='form-control' type='text' id='txtAddChoiceT' />" +
        "</td>" +
        "<td class='text-center'><input class='form-control' type='radio' id='rbAddAnsT' value='t' name='ansKey' /></td>" +
        "</tr>" +
        "<tr>" +
        "<td class='text-center'>False</td>" +
        "<td class='text-center'>" +
        "<input class='form-control' type='text' id='txtAddChoiceF' />" +
        "</td>" +
        "<td class='text-center'><input class='form-control' type='radio' id='rbAddAnsF' value='f' name='ansKey' /></td>" +
        "</tr>" +
        "</tbody>" +
        "</table>";
}

function enumerationForm() {
    return "<table class='table table-bordered'>" +
        "<thead>" +
        "<th></th>" +
        "<th class='text-center'>Answers</th>" +
        "<th></th>" +
        "</thead>" +
        "<tbody id='enumTbody'>" +

        "</tbody>" +
           "</table>";
}

function addFillInTheBlankForm() {
    return "<table class='table table-bordered'>" +
        "<thead>" +
        "<th class='text-center'>Answer</th>" +
        "</thead>" +

        "<tbody>" +
        "<tr>" +
        "<td class='text-center'>" +
        "<input class='form-control' type='text' id='txtAddAns' />" +
        "</td>" +
        "</tr>" +
        "</tbody>" +
        "</table>";
}

/*** UPDATE FORM ***/
function multipleChoiceForm() {
    return "<input type='hidden' id='hidTxtAnsKeyID' />" +
        "<table class='table table-bordered'>" +
        "<thead>" +
        "<th class='text-center' width='8'>Choices</th>" +
        "<th class='text-center'>Answer</th>" +
        "<th class='text-center' width='10'>Anskey</th>" +
        "</thead>" +

        "<tbody>" +
        "<tr>" +
        "<td class='text-center'>A</td>" +
        "<td class='text-center'>" +
            "<input type='hidden' id='hidTXTChoiceA' />" +
            "<input class='form-control updateControl' type='text' id='txtChoiceA' disabled />" +
        "</td>" +
        "<td class='text-center'><input class='form-control updateControl' type='radio' id='rbAnsA' value='a' name='ansKey' disabled /></td>" +
        "</tr>" +
        "<tr>" +
        "<td class='text-center'>B</td>" +
        "<td class='text-center'>" +
            "<input type='hidden' id='hidTXTChoiceB' />" +
            "<input class='form-control updateControl' type='text' id='txtChoiceB' disabled />" +
        "</td>" +
        "<td class='text-center'><input class='form-control updateControl' type='radio' id='rbAnsB' value='b' name='ansKey' disabled /></td>" +
        "</tr>" +
        "<tr>" +
        "<td class='text-center'>C</td>" +
        "<td class='text-center'>" +
            "<input type='hidden' id='hidTXTChoiceC' />" +
            "<input class='form-control updateControl' type='text' id='txtChoiceC' disabled />" +
        "</td>" +
        "<td class='text-center'><input class='form-control updateControl' type='radio' id='rbAnsC' value='c' name='ansKey' disabled /></td>" +
        "</tr>" +
        "<tr>" +
        "<td class='text-center'>D</td>" +
        "<td class='text-center'>" +
            "<input type='hidden' id='hidTXTChoiceD' />" +
            "<input class='form-control updateControl' type='text' id='txtChoiceD' disabled />" +
        "</td>" +
        "<td class='text-center'><input class='form-control updateControl' type='radio' id='rbAnsD' value='d' name='ansKey' disabled /></td>" +
        "</tr>" +
        "</tbody>" +
        "</table>";
}

function trueFalseForm() {
    return "<input type='hidden' id='hidTxtAnsKeyID' />" +
        "<table class='table table-bordered'>" +
        "<thead>" +
        "<th class='text-center' width='8'>Choices</th>" +
        "<th class='text-center'>Answer</th>" +
        "<th class='text-center' width='10'>Anskey</th>" +
        "</thead>" +

        "<tbody>" +
        "<tr>" +
        "<td class='text-center'>True</td>" +
        "<td class='text-center'>" +
            "<input type='hidden' id='hidTXTChoiceT' />" +
            "<input class='form-control updateControl' type='text' id='txtChoiceT' disabled />" +
        "</td>" +
        "<td class='text-center'><input class='form-control updateControl' type='radio' id='rbAnsT' value='t' name='ansKey' disabled /></td>" +
        "</tr>" +
        "<tr>" +
        "<td class='text-center'>False</td>" +
        "<td class='text-center'>" +
            "<input type='hidden' id='hidTXTChoiceF' />" +
            "<input class='form-control updateControl' type='text' id='txtChoiceF' disabled />" +
        "</td>" +
        "<td class='text-center'><input class='form-control updateControl' type='radio' id='rbAnsF' value='f' name='ansKey' disabled /></td>" +
        "</tr>" +
        "</tbody>" +
        "</table>";
}

function fillInTheBlankForm() {
    return "<table class='table table-bordered'>" +
        "<thead>" +
        "<th class='text-center'>Answer</th>" +
        "</thead>" +

        "<tbody>" +
        "<tr>" +
            "<td class='text-center'>" +
                "<input type='hidden' id='hidTXTAns' />" +
                "<input class='form-control updateControl' type='text' id='txtAns' />" +
            "</td>" +
        "</tr>" +
        "</tbody>" +
        "</table>";
}

function enumerationForms(tbodyID) {
    return "<strong>Enter no. of Field: </strong><input class='form-control' type='text' oninput='createEnumField(this.value, \"" + tbodyID + "\")' placeholder='Enter minimum of 1 and maximum of 20' /><br />" +
        "<table class='table table-bordered'>" +
        "<thead>" +
        "<th></th>" +
        "<th class='text-center'>Answers</th>" +
        "</thead>" +

        "<tbody id='" + tbodyID + "'>" +

        "</tbody>" +
        "</table>";
}

function createEnumField(noOfField, tbodyID) {
    if (noOfField >= 1 && noOfField <= 20) {
        var field = "";
        for (var c = 1; c <= noOfField; c++) {
            field += "<tr>" +
                "<td class='text-center'>" + c + "</td>" +
                "<td class='text-center'><input class='form-control enumAnsField' type='text' id='txtAns" + c + "' /></td>" +
                "</tr>";
        }
        $("#" + tbodyID).html(field);
    }
    else {
        $("#" + tbodyID).html("");
    }
}