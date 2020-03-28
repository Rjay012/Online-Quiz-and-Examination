$("[id*=btnGenerateReport]").click(function () {
    var dateFrom = $("[id*=txtDateFrom]").val();
    var dateTo = $("[id*=txtDateTo]").val();

    if (dateFrom != "", dateTo != "") {
        loadTabularReport(dateFrom, dateTo);
    }
});

$("#content").on("change", "[id*=ddlExam]", function () {
    loadPieChart(parseInt($(this).val()));
});

function loadTabularReport(dateFrom, dateTo) {
    $.ajax({
        type: "post",
        dataType: "json",
        url: "WebServices//ReportService.asmx/RenderTabularReport",
        data: {
            dateFrom: dateFrom,
            dateTo: dateTo
        },
        success: function (result) {
            var row = "";
            $.each(result, function (i, item) {
                row += "<tr>" +
                        "<td class='text-center'>" + parseInt(item.examID) + "</td>" +
                        "<td class='text-center'>" + item.title + "</td>" +
                        "<td class='text-center'>" + item.subj + "</td>" +
                        "<td class='text-center'>" + item.date + "</td>" +
                        "<td class='text-center'>" + item.noOfStudent + "</td>" +
                        "<td class='text-center'>" + item.passingMark + "</td>" +
                        "<td class='text-center'>" + item.passingScore + "</td>" +
                        "<td class='text-center'>" + item.totalPasser + "</td>" +
                        "<td class='text-center'>" + item.totalfailure + "</td>" +
                       "</tr>";
            });
            $("#tbody").html(row);
        }
    });
}

function loadPieChart(examID) {
    var chart = new CanvasJS.Chart("chartContainer", {
        animationEnabled: true,
        title: {
            text: renderTitle(examID)
        },
        data: [{
            type: "pie",
            startAngle: 240,
            radius: "90%",
            yValueFormatString: "##0.00\"%\"",
            indexLabel: "{label} {y}",
            dataPoints: renderData(examID)
        }]
    });
    chart.render();
}

function renderTitle(examID) {
    var title = "";
    $.ajax({
        type: "POST",
        data: {
            examID: examID
        },
        async: false,
        url: "WebServices//ReportService.asmx/RenderTitle",
        success: function (data) {
            title = data;
        }
    });
    
    return title;
}

function renderData(examID) {
    var a = "";
    $.ajax({
        type: "POST",
        dataType: "json",
        data: {
            examID: examID
        },
        async: false,
        url: "WebServices//ReportService.asmx/RenderChart",
        success: function (data) {
            a = data;
        }
    });
    return a;
}