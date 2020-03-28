$(document).ready(function () {
    getUserID();
});

/*function getParam(param) {
    var results = new RegExp('[\?&]' + param + '=([^&#]*)').exec(window.location.href);
    return results[1] || 0;
}*/

function getUserID() {
    $.post(
        "..//UserService.asmx/SetSessionID",
        function (data) {
            $("#id").html(data);
        }
    );
}

function showBadge(url, id) {
    $.post(
        "WebServices" + url,
        function (result) {
            if (result == 0) result = "";
            $("#" + id + "-badge").html(result);
        }
    );
}