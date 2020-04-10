$(document).ready(function () {
    loadCategory();
});

function loadCategory() {
    var columns = [{ 'data': 'categoryID', 'width': '8%' }, { 'data': 'category' },
    {
        'data': 'categoryID', render: function (data, type, row) {
            return "<button class='btn btn-primary btn-sm' type='button' data-toggle='modal' data-target='#myModalEditCategory' onclick='editCategory(" + parseInt(data) + ")'>EDIT</button>";
        }, 'width': '10%'
    },
    {
        'data': 'categoryID', render: function (data, type, row) {
            return "<button class='btn btn-danger btn-sm' type='button' onclick='dropCategory(" + parseInt(data) + ")'>DROP</button>";
        }, 'width': '10%'
    }];
    NormalLoadingProcess("categoryTable", "WebServices//CategoryService.asmx/LoadCategory", null, columns);
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