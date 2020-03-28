$(document).ready(function () {
    dashboardCard();    
    barChartCategory();
});

function barChartCategory() {
    var chart = new CanvasJS.Chart("chartContainer", {
        animationEnabled: true,
        title: {
            text: "Subject on each Categories"
        },
        axisY: {
            title: "Number of Subjects",
            gridThickness: 0
        },
        data: [{
            type: "bar",
            indexLabel: "{y}",
            dataPoints: renderBarChartData()
        }]
    });
    chart.render();
}

function renderBarChartData() {
    var a = "";
    $.ajax({
        type: "POST",
        dataType: "json",
        async: false,
        url: "WebServices//DashboardService.asmx/RenderChart",
        success: function (data) {
            a = data;
        }
    });
    return a;
}

function dashboardCard() {
    $.post(
        "WebServices//DashboardService.asmx/DashboardCount",
        function (data) {
            data = data.split("|");
            $("#card-subject").html(data[0]);
            $("#card-student").html(data[1]);
            $("#card-instructor").html(data[2]);
            $("#card-category").html(data[3]);
        }
    );
}

$(".modal-footer").on("click", "[id*=btnRegister]", function () {
    var id = $("[id*=txtid]").val();
    var privId = $("[id*=ddlPrivilege]").val();
    var fname = $("[id*=txtfname]").val();
    var mname = $("[id*=txtmname").val();
    var lname = $("[id*=txtlname]").val();

    if (id != "" && fname != "" && mname != "" && lname != "") {
        /** DO SOME REGEXP HERE FOR ID VALIDATION **/
        if (confirm("Sure you want to register this account?") == true) {
            $.post(
                "WebServices//DashboardService.asmx/Reg",
                {
                    id: id,
                    privId: privId,
                    fname: fname,
                    mname: mname,
                    lname: lname
                },
                function () {
                    $("[id*=txtid]").val("");
                    $("[id*=txtfname]").val("");
                    $("[id*=txtmname]").val("");
                    $("[id*=txtlname]").val("");

                    $("#reg-alert").html("");
                    $("#reg-alert").append(popUpAlert("success", "Registration Added!"));

                    dashboardCard();
                }
            );
        }
    }
    else {
        $("#reg-alert").html(popUpAlert("warning", "Please fill the input boxes above to register"));
    }
    
});

function popUpAlert(type, message) {
    return '<div class="alert alert-' + type + ' alert-dismissible">' +
        '<button type="button" class="close" data-dismiss="alert">&times;</button>' +
        '<strong class="text-center">' + message + '</strong>' +
        '</div>';
}