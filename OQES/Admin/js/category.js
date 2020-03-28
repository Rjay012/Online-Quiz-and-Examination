$(document).ready(function () {
    loadCategory();
});

function loadCategory() {
    $("#categoryTable").DataTable().clear().destroy();  //destroy table for initializing new data
    $.ajax({
        type: "POST",
        dataType: "json",
        url: "WebServices//CategoryService.asmx/LoadCategory",
        success: function (data) {
            $('#categoryTable').DataTable({
                "lengthMenu": [[5, 10, 15, -1], [5, 10, 15, "All"]],
                data: data,
                columns: [
                    {
                        'data': 'categoryID'
                    },
                    {
                        'data': 'category'
                    },
                    {
                        'data': 'categoryID', render: function (data, type, row) {
                            return "<button class='btn btn-primary btn-sm' type='button' data-toggle='modal' data-target='#myModalEditCategory' onclick='editCategory(" + parseInt(data) + ")'>EDIT</button>";
                        }
                    },
                    {
                        'data': 'categoryID', render: function (data, type, row) {
                            return "<button class='btn btn-danger btn-sm' type='button' onclick='dropCategory(" + parseInt(data) + ")'>DROP</button>";
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
}

function editCategory(categoryID) {
    $.ajax({
        url: "WebServices//CategoryService.asmx/ShowToEditCategory",
        type: "post",
        dataType: "json",
        data: {
            categoryID: categoryID
        },
        success: function (result) {
            $.each(result, function (i, item) {
                $("[id*=txtEditCategoryID]").val(parseInt(item.categoryID));
                $("[id*=txtEditCategorys]").val(item.category);
            });
        }
    });
}

$("[id*=btnSaveCategory]").click(function () {
    if (confirm("Sure you want to add this category?") == true) {
        $.post(
            "WebServices//CategoryService.asmx/AddCategory",
            {
                category: $("[id*=txtAddCategory]").val()
            },
            function () {
                loadCategory();
            }
        );
    }
});