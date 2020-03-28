$("[id*=txtlogid]").keyup(function () {
    matchIdPattern($(this).val());
});

$(".card-body").on("click", "[id*=btnLogin]", function () {
    var id = $("[id*=txtlogid]").val();
    var pass = $("[id*=txtlogpassword]").val();

    if (id.match(/^\d{2}-\U{1}\R{1}-\d{4}$/g) || id.match(/^[A-Z]{3}-\d{4}$/g)) {     //pattern 00-XX-0000 as student, and pattern XXX-0000 as administrator and faculty
        $.post(
            "IndexService.asmx/Login",
            {
                id: id,
                pass: pass
            },
            function (data) {
                if (data == "admin") {
                    window.location.assign("Admin/Dashboard.aspx");
                }
                else if (data == "instructor") {
                    window.location.assign("Instructor/Home.aspx");
                }
                else if (data == "student") {
                    window.location.assign("Student/Examination.aspx");
                }
                else {
                    $("#reg-alert").html("");
                    $("#reg-alert").append(popUpAlert("warning", "Account information entered is invalid!"));
                }
            }
        );
    }
    else {
        $("#reg-alert").html("");
        $("#reg-alert").append(popUpAlert("warning", "Please enter a valid student id number"));
    }
});

function matchIdPattern(id) {
    if (id.match(/^\d{2}-\U{1}\R{1}-\d{4}$/g) || id.match(/^[A-Z]{3}-\d{4}$/g)) {
        $("[id*=btnLogin]").prop("disabled", false);
    }
    else {
        $("[id*=btnLogin]").prop("disabled", true);
    }
}

function remakeName(name) {
    return name.substr(0, 1).toUpperCase() + name.substr(1);  //setting first letter to uppercase
}

function popUpAlert(alertType, mssg) {
    return "<div class='alert alert-" + alertType + " alert-dismissible fade show' role='alert'>" +
                "<strong>" + alertType.substr(0, 1).toUpperCase() + alertType.substr(1) + "! </strong>" + mssg +
                "<button type='button' class='close' data-dismiss='alert' aria-label='close'>" +
                    "<span aria-hidden='true'>&times;</span>" +
                "</button>" +
          "</div>";
}
