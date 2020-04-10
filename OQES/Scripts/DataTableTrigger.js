function LoadViaServerSideProcess(id, ajaxSourceString, data, projectColumn) {  //GOOD FOR LARGE AMOUNT OF DATA
    $("#" + id).DataTable().clear().destroy();
    $('#' + id).DataTable({
        lengthMenu: [[5, 10, 15], [5, 10, 15]],
        processing: true,
        bPaginate: true,
        bServerSide: true,
        sAjaxSource: ajaxSourceString,
        fnServerParams: function (aoData) {
            if (data != null) {
                aoData.push(data);  //manual adding of parameter/s to datatables to be sent to server
            }
        },
        fnServerData: function (sSource, aoData, fnCallBack) {
            $.ajax({
                type: "post",
                dataType: "json",
                data: aoData,
                url: sSource,
                success: fnCallBack
            });
        },
        columns: projectColumn,
        responsive: true
    });
}

function NormalLoadingProcess(id, ajaxSourceString, data, projectColumn) {
    $("#" + id).DataTable().clear().destroy();
    $.ajax({
        type: "POST",
        dataType: "json",
        data: data,
        url: ajaxSourceString,
        success: function (data) {
            $('#' + id).DataTable({
                lengthMenu: [[5, 10, 15], [5, 10, 15]],
                processing: true,
                data: data,
                columns: projectColumn,
                responsive: true
            });
        }
    });
}