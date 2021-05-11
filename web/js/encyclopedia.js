$(function($){

    var table_talent = null;

    clear_form();

    $('button[aria-label="create"]').each((k, v) => {
        $(v).prop('disabled', session.can_create === null);
    });
    $('button[aria-label="update"]').each((k, v) => {
        $(v).prop('disabled', session.can_update === null);
    });
    $('button[aria-label="delete"]').each((k, v) => {
        $(v).prop('disabled', session.can_delete === null);
    });


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
            table_talent.ajax.reload(null, false);
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

    table_talent = $('#table_talent').DataTable({
        "columnDefs": [
            {
                "targets": 1,
                "width": "15%"
            },
            {
                "targets": 2,
                "width": "55%",
                "render": function(data, type, row, meta){
                    if(type === 'display') {
                        let expandButton = '';
                        //expandButton = '<button class="btn btn-info" type="button"><span class="fas fa-plus"></span></button>';
                        let formattedData = data.replaceAll('\r\n', '<br />');
                        return $.fn.dataTable.render.ellipsis(450, true, false)(expandButton + formattedData, type, row);
                    }
                    return data;
                }
            },
            {
                "targets": 3,
                "width": "25%",
                "render": function(data, type, row, meta){
                    if(type === 'display') {
                        return data.replaceAll('\r\n', '<br />');
                    }
                    return data;
                },
            },
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
                "className": 'fw-bold'
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
                load_specialisations(data.talent_specialisations);
                $('#createTalent').prop('disabled', true);
                $('#updateTalent, #deleteTalent, #cancelTalent').prop('disabled', false);
                $('#talent_details').prop('hidden', false);
            }
        });
    }

    function load_specialisations(talent_specs){
        $('#talent_specialisations').html('');
        let textToPrepend = '<label><span class="fas fa-exclamation-circle"></span> Aucune spécialisation disponible</label>'
        if(talent_specs.length){
            $.each(talent_specs, (k, v) => {
                $('#talent_specialisations').append('<li class="list-group-item">' + v.nom + '</li>')
            });
            textToPrepend = '<label>Spécialisations disponibles:</label>';
        }
        $('#talent_specialisations').prepend(textToPrepend);
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
            $('#talent_details').prop('hidden', true);
        }
    }

});