$(function(){

    $('button[data-bs-toggle="tab"]').on('show.bs.tab', function (event) {
        localStorage.setItem('activeTab', $(event.target).attr('data-bs-target'));
    });

    var activeTab = localStorage.getItem('activeTab');
    if(activeTab){
        let selector = '.nav-tabs button[data-bs-target="' + activeTab + '"]';
        new bootstrap.Tab(selector).show();
        $(selector).tab('show');
    }

    var table_talent = $('#table_talent').DataTable({
        "iDisplayLength": -1,
        "buttons": [{
            text: "+ Créer une ligne",
            name: "add_ligne_evrp",
            action: function() {

                $('#modal_add_ligne_evrp').modal('show');
            }
        }],
        "paging": false,
        "ajax": {
            "url": '/action/getTalents',
            "type": 'POST',
            "data": function(d) {
            }
        },
        "sAjaxDataProp": "",
        "order": [
            [0, "asc"]
        ],
        "columns": [
            {
                "data": "id_talent",
                "name": "id_talent",
                "visible": false,
                "searchable": false
            },
            {
                "data": "nom",
                "name": "nom",
                "render": function(data, type, row) {
                    return data;
                }
            },
            {
                "data": "description",
                "name": "description"
            },
            {
                "data": "effet",
                "name": "effet",
                "className": "dt-center",
                "render": function(data, type, row, meta) {
                    return '<b>' + data + '</b>';
                }
            },
        ],
    });

});