var dataTable;
var dataSet = {};





(function ($) {

    var generateCustoTable = $('#users').DataTable({
        "processing": true,
        "serverSide": true,
        "ajax": {
            "url": "/api/Users",
            "method": "GET"
        },
        "columns": [
            { data: EmailUser},
            { data: Password }
        ]
    });

})(jQuery);

