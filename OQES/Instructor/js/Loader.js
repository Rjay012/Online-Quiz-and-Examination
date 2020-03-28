$("#onLoadHome").click(function () {
    dasboardInfoNo();
    loadCalendarChart();
    loadBarChart();
});

$("#onLoadManageExam").click(function () {
    loadExam("All", 0, "All");
});

$("#onLoadStudent").click(function () {
    let loadStud = new Plugins();
    loadStud.loadStudentTableList();
});

$("#onLoadSubject").click(function () {
    loadHandledSubject(0);
    loadSubject(0);
});

$("#onLoadPieChart").click(function () {
    $(".datepicker").datepicker();
    loadPieChart(parseInt($("[id*=ddlExam]").val()));
});