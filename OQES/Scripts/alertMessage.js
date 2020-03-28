//alert
function alertMessage(type, message) {
    return '<div class="alert alert-' + type + ' alert-dismissible">' +
        '<button type="button" class="close" data-dismiss="alert">&times;</button>' +
        '<strong class="text-center">' + message + '</strong>' +
        '</div>';
}