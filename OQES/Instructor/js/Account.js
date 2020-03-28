$("[id*=btnEdit]").click(function () {
    if ($(this).val() == "EDIT") {
        textboxControl(false);
        checkOldPassword();
        $(this).val("SAVE");
    }
    else {
        textboxControl(true);
        $(this).val("EDIT");
        
        if (checkOldPasswordIfCorrect($("[id*=txtOldPassword]").val()) == "true") {
            if ($("[id*=txtRetypePassword]").val() === $("[id*=txtNewPassword]").val()) {
                if (confirm("Sure you want to change account setting?") == true) {
                    var instructor = {
                        instrID: $("[id*=txtFacID]").val(),
                        fname: $("[id*=txtFacFname]").val(),
                        mname: $("[id*=txtFacMname]").val(),
                        lname: $("[id*=txtFacLname]").val(),
                        MyPassword: $("[id*=txtRetypePassword]").val()
                    };

                    saveAccountSetting(instructor);
                    $("#alert-account").html(alertMessage("success", "Old Password changed!"));
                }
            }
            else {
                $("#alert-account").html(alertMessage("warning", "Make sure password correctly retyped!"));
            }
        }
        else {
            $("#alert-account").html(alertMessage("danger", "Old Password incorrect!"));
        }
    }
});

function checkOldPasswordIfCorrect(oldPassword) {
    var myResult = false;
    $.ajax({
        url: "WebServices//AccountService.asmx/CheckOldPasswordIfCorrect",
        data: {
            password: oldPassword
        },
        async: false,
        type: "post",
        success: function (result) {
            myResult = result.charAt(0).toLowerCase() + result.substring(1);
        }
    });

    return myResult;
}

function checkOldPassword() {
    $.ajax({
        url: "WebServices//AccountService.asmx/CheckOldPassword",
        type: "post",
        contentType: "application/json; charset=utf-8",
        success: function (result) {
            $("[id*=txtOldPassword]").prop("readonly", result.d);
        }
    });
}

function saveAccountSetting(instructor) {
    $.post(
        "WebServices//AccountService.asmx/ChangeAccountSetting",
        {
            instructor: JSON.stringify(instructor)
        },
        function () {
            location.reload();
        }
    );
}

function textboxControl(control) {
    $("[class*=textbox-control]").prop("readonly", control);
}