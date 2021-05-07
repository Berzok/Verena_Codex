$(function($){

    var table_talent = null;

    clear_form();

    function toast(type, title, message){

        let header = '<div class="toast-header">';
        if(type === 'success'){
            header += '<strong class="me-auto text-success"><span class="fas fa-check-circle"></span> ' + title + '</strong>';
        } else{
            header += '<strong class="me-auto text-error"><span class="fas exclamation-triangle"></span> ' + title + '</strong>';
        }
        header += '<button type="button" class="btn-close align-self-end" data-bs-dismiss="toast" aria-label="Close"></button>';
        header += '</div>';

        let toast = '<div id="toast_message" class="toast border-dark position-fixed mt-5 start-50 translate-middle-x" role="alert" aria-live="polite" aria-atomic="true">';
        toast += header;
        toast += '<div class="toast-body bg-info">' + message + '</div>';
        toast += '</div>';

        $('#page_content').append(toast);

        $('#toast_message').on('hidden.bs.toast', '', this, (e) => {
            e.target.remove();
        })

        let le_toast = new bootstrap.Toast($('#toast_message')[0]);
        le_toast.show();
    }

    function getFormData(formulaire){
        let data = {};
        $.each($('#'+formulaire).serializeArray(), function() {
            if(this.value != '') {
                data[this.name] = this.value;
            }
        });
        return data;
    }

    function responseHandler(response){
        toast(response.type, response.title, response.message);
        if(response.status === 'ok'){
            clear_form();
            table_talent.ajax.reload();
        }
    }

    async function initDatatables(){
        $.extend(true, $.fn.dataTable.defaults, {
            "autoWidth": false,
            "lengthMenu": [
                [5, 10, -1],
                [5, 10, 'Tous']
            ],
            "pageLength": 5,
            "responsive": true,
            "createdRow": function(row, data, index, cells){
                $(row).addClass('bg-light');
            },
            "order": [
                [1, "asc"]
            ],
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
            "paging": true
        });
    }

    initDatatables().then(r => {

    });

    $('button[data-bs-toggle="tab"]').on('show.bs.tab', function (event) {
        localStorage.setItem('activeTab', $(event.target).attr('data-bs-target'));
    });

    var activeTab = localStorage.getItem('activeTab');
    if(activeTab){
        let selector = '.nav-tabs button[data-bs-target="' + activeTab + '"]';
        new bootstrap.Tab(selector).show();
        $(selector).tab('show');
    }

    table_talent = $('#table_talent').DataTable({
        "columnDefs": [
            {
                "render": function(data, type, row, meta){
                    if(type === 'display') {
                        return data.replace('\r\n', '<br />');
                    }
                    return data;
                },
                "targets": [2, 3]
            },
            {
                "width": "15%",
                "targets": 1
            },
            {
                "width": "60%",
                "targets": 2
            },
            {
                "width": "20%",
                "targets": 3
            }
        ],
        "ajax": {
            "url": '/action/loadTalents',
            "async": true,
            "type": 'POST',
            "dataSrc": ""
        },
        "processing": true,
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
                "className": "dt-center fw-bold"
            },
        ],
    }).on('click', 'tbody tr', function(){
        let row = table_talent.row(this);
        $.each(table_talent.rows().nodes(), function(k, v){
            $(v).removeClass('row-selected');
        });
        $(row.node()).addClass('row-selected');
        load_talent(row.data().id_talent);
    });

    function load_talent(id_talent){
        $.ajax({
            dataType: 'json',
            type: 'post',
            data: {'id_talent': id_talent},
            url: '/action/getTalent',
            success: function(data){
                clear_form();
                $('#id_talent').val(data.id_talent);
                $.each(data, function(k, v){
                    $('#talent_'+k).val(v);
                });
                $('#createTalent').prop('disabled', true);
                $('#updateTalent, #deleteTalent, #cancelTalent').prop('disabled', false);
            }
        });
    }

    $('#createTalent').on('click', function(){
        $.ajax({
            dataType: 'json',
            type: 'post',
            data: getFormData('form_talent'),
            url: '/action/createTalent',
            success: function(data){
                responseHandler(data);
            }
        })
    });

    $('#updateTalent').on('click', function(){
        $.ajax({
            dataType: 'json',
            type: 'post',
            data: getFormData('form_talent'),
            url: '/action/updateTalent',
            success: function(data){
                responseHandler(data);
            }
        })
    });

    $('#deleteTalent').on('click', function(){
        $.ajax({
            dataType: 'json',
            type: 'post',
            data: { id_talent: $('#id_talent').val() },
            url: '/action/deleteTalent',
            success: function(data){
                responseHandler(data);
            }
        })
    });

    $('#cancelTalent').on('click', function(){
        clear_form(undefined, true);
    })

    function clear_form(onglet = activeTab, clear_table = false){
        $('#form_talent').find('input[type=text], textarea').val('');
        $('#id_talent').val('');
        $('#createTalent').prop('disabled', false);
        $('#updateTalent, #deleteTalent, #cancelTalent').prop('disabled', true);
        if(clear_table) {
            $.each(table_talent.rows().nodes(), function (k, v) {
                $(v).removeClass('row-selected');
            });
        }
    }

});