$(document).ready(function () {
    $.post(
        "WebServices//StudentService.asmx/GetIdentity",
        function (identity) {
            $("#studentIdentity").html(identity);
        }
    );
});