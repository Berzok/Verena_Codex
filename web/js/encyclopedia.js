$(function($){

    var formulaire_talent = null;
    var formulaire_carriere = null;

    class Formulaire {

        constructor(type) {
            this.type = type;
        }

        fields(fields){
            $.each(fields, function(k, v){

            });
        }

        addField(field_id, field_name){
            this[field_name] = field_id;
        }
    }

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
            "url": '/action/loadTalents',
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
                    return '<strong>' + data + '</strong>';
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
                    return '<strong>' + data + '</strong>';
                }
            },
        ],
    }).on('click', 'tbody tr', function(){
        let row = table_talent.row(this);
        $.each(table_talent.rows().nodes(), function(k, v){
            $(v).removeClass('row-selected');
        })
        $(row.node()).addClass('row-selected');
        let data = row.data();
        load_talent(data.id_talent);
    });

    function load_talent(id_talent){
        $.ajax({
            dataType: 'json',
            type: 'post',
            data: {'id_talent': id_talent},
            url: '/action/getTalent',
            success: function(data){
                clear_form();
                $.each(data, function(k, v){
                    $('#talent_'+k).val(v);
                })
            }
        })
    }

    $('#createTalent').on('click', function(){
        $.ajax({
            dataType: 'json',
            type: 'post',
            data: $('#form_talent').serialize(),
            url: '/action/createTalent',
            success: function(data){
                if(data.status === 'ok') {
                    table_talent.ajax.reload();
                }
            }
        })
    });

    $('#cancelTalent').on('click', function(){
        clear_form(undefined, true);
    })

    function clear_form(onglet = activeTab, clear_table = false){
        $('#form_talent').find('input[type=text], textarea').val('');
        if(clear_table) {
            $.each(table_talent.rows().nodes(), function (k, v) {
                $(v).removeClass('row-selected');
            });
        }
    }

});