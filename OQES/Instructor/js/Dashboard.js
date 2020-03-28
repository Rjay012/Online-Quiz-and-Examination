$(document).ready(function () {
    dasboardInfoNo();
    loadCalendarChart();
    loadBarChart();
});

$("#ancViewFinishedExam").click(function () {
    $("#finishedExamTable").DataTable().clear().destroy();  //destroy table for initializing new data
    $.ajax({
        type: "POST",
        dataType: "json",
        url: "WebServices//DashboardService.asmx/LoadFinishedExam",
        success: function (data) {
            $('#finishedExamTable').DataTable({
                "lengthMenu": [[5, 10, 15, -1], [5, 10, 15, "All"]],
                data: data,
                columns: [
                    {
                        'data': 'examID',
                        'width': '13%'
                    },
                    {
                        'data': 'title'
                    },
                    {
                        'data': 'subj'
                    },
                    {
                        'data': 'percentage',
                        'width': '23%'
                    }
                ],
                rowReorder: {
                    selector: 'td:nth-child(2)'
                },
                responsive: true
            });
        }
    });
});

$("#ancViewBannedExaminee").click(function () {
    $("#bannedExamineeTable").DataTable().clear().destroy();  //destroy table for initializing new data
    $.ajax({
        type: "POST",
        dataType: "json",
        url: "WebServices//DashboardService.asmx/ViewBannedExaminee",
        success: function (data) {
            $('#bannedExamineeTable').DataTable({
                "lengthMenu": [[5, 10, 15, -1], [5, 10, 15, "All"]],
                data: data,
                columns: [
                    {
                        'data': 'examineeID'
                    },
                    {
                        'data': 'studID'
                    },
                    {
                        'data': 'fullname'
                    },
                    {
                        'data': 'studID', render: function (data) {
                            return "<button class='btn btn-danger btn-sm' type='button' onclick='onclick='unbannedExaminee(" + parseInt(data) + ")'>UNBLOCK</button>";
                        }
                    }
                ],
                rowReorder: {
                    selector: 'td:nth-child(2)'
                },
                responsive: true
            });
        }
    });
});

function unbannedExaminee() {

}

function dasboardInfoNo() {
    $.post(
        "WebServices//DashboardService.asmx/LoadDashboardInfoNo",
        function (data) {
            var count = data.split("|");

            $("#card-subject").html(count[0]);
            $("#card-student").html(count[1]);
            $("#card-examination").html(count[2]);
            $("#card-finished").html(count[3]);
            $("#card-banned").html(count[4]);
            $("#card-upcoming-exam").html(count[5]);
        }
    );
}

function loadCalendarChart() {
    var calendarEl = document.getElementById('calendar');

    var calendar = new FullCalendar.Calendar(calendarEl, {
        plugins: ['interaction', 'dayGrid', 'timeGrid', 'list'],
        header: {
            left: 'prev,next today',
            center: 'title',
            right: 'dayGridMonth'
        },
        defaultDate: getCurrentDate(),
        navLinks: true, // can click day/week names to navigate views

        weekNumbers: true,
        weekNumbersWithinDays: true,
        weekNumberCalculation: 'ISO',

        editable: false,
        height: 400,
        eventLimit: true, // allow "more" link when too many events
        events: renderDate()
    });
    calendar.render();
}

function loadBarChart() {
    var chart = new CanvasJS.Chart("chartContainer", {
        animationEnabled: true,
        theme: "light2", // "light1", "light2", "dark1", "dark2"
        title: {
            text: "GDP Growth Rate - 2016"
        },
        axisY: {
            title: "Growth Rate (in %)",
            suffix: "%",
            includeZero: false
        },
        axisX: {
            title: "Countries"
        },
        data: [{
            type: "column",
            yValueFormatString: "#,##0.0#\"%\"",
            dataPoints: [
                { label: "India", y: 7.1 },
                { label: "China", y: 6.70 },
                { label: "Indonesia", y: 5.00 },
                { label: "Australia", y: 2.50 },
                { label: "Mexico", y: 2.30 },
                { label: "UK", y: 1.80 },
                { label: "United States", y: 1.60 },
                { label: "Japan", y: 1.60 }

            ]
        }]
    });
    chart.render();
}

function getCurrentDate() {
    var fullDate = new Date();
    var month = (fullDate.getMonth() + 1);
    var day = fullDate.getDate();

    if ((fullDate.getMonth() + 1) > 0 && (fullDate.getMonth() + 1) < 10) {
        // w/ zeros at the beginning
        month = "0" + (fullDate.getMonth() + 1);
    } if (fullDate.getDate() > 0 && fullDate.getDate() < 10) {
        day = "0" + fullDate.getDate();
    }

    return fullDate.getFullYear() + "-" + month + "-" + day;
}

function renderDate() {
    var a = "";
    $.ajax({
        type: "POST",
        dataType: "json",
        async: false,
        url: "WebServices//DashboardService.asmx/LoadCalendar",
        success: function (data) {
            a = data;
        }
    });
    return a;
}