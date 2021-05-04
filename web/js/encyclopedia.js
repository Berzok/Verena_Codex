$(function($){

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
        "lengthMenu": [
            [5, 10, -1],
            [5, 10, 'Tous']
        ],
        "autoWidth": false,
        "language": {
            "emptyTable":     "Aucune donnée disponible dans le tableau",
            "info":           "Affichage de l'élément _START_ à _END_ sur _TOTAL_",
            "infoEmpty":      "Affichage de l'élément 0 à 0 sur 0 élément",
            "infoFiltered":   "(filtré à partir de _MAX_ éléments au total)",
            "thousands":  ",",
            "lengthMenu":     "Afficher _MENU_ éléments",
            "loadingRecords": "Chargement...",
            "processing":     "Traitement...",
            "search":         "Rechercher :",
            "zeroRecords":    "Aucun élément correspondant trouvé",
            "paginate": {
                "first":    "Premier",
                "last":     "Dernier",
                "next":     "Suivant",
                "previous": "Précédent"
            },
            "aria": {
                "sortAscending":  ": activer pour trier la colonne par ordre croissant",
                "sortDescending": ": activer pour trier la colonne par ordre décroissant"
            },
            "select": {
                "rows": {
                    "_": "%d lignes sélectionnées",
                    "0": "Aucune ligne sélectionnée",
                    "1": "1 ligne sélectionnée"
                }
            }
        },
        "paging": true,
        "ajax": {
            "url": '/action/getTalents',
            "type": 'POST',
            "dataSrc": ""
        },
        "responsive": true,
        "createdRow": function(row, data, index, cells){
            $(row).addClass('bg-light');
        },
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
                    return '<b>' + data + '</b>';
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


    $('#createTalent').on('click', function(){
        $.ajax({
            dataType: 'json',
            type: 'post',
            data: {
                'nom': $('#talent_nom').val(),
                'description': $('#talent_description').text(),
                'effet': $('#talent_effet').text()
            },
            url: '/action/createTalent',
            success: function(data){
                bootbox.alert({
                    title: data.title,
                    message: 'Le talent - <em>' + data.nom + '</em> a été créé',
                    onEscape: true
                });
                table_talent.ajax.reload();
            }
        })
    })

});