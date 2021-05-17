$(function($){

    var table_talent = null;
    var table_don_du_sang = null;
    var currentForm = null;

    //clear_form();

    $('button[aria-label="create"]').each((k, v) => {
        $(v).prop('disabled', session.can_create === null);
    });
    $('button[aria-label="update"]').each((k, v) => {
        $(v).prop('disabled', session.can_update === null);
    });
    $('button[aria-label="delete"]').each((k, v) => {
        $(v).prop('disabled', session.can_delete === null);
    });


    function clear_selected_row(table){
        $.each(table.rows().nodes(), function (k, v) {
            $(v).removeClass('row-selected');
        });
    }

    function clear_form(form_id = currentForm){
        console.dir(form_id);
        let leFormulaire = document.getElementById(form_id);
        leFormulaire.reset();
        $('#' + form_id.replace('form_', '')).val('');
        $(leFormulaire).parent().next().find('button').each(function(k, v){
            switch($(v).attr('aria-label')){
                case 'create':
                    $(v).prop('disabled', session.can_create === null);
                    break;

                case 'update':
                    $(v).prop('disabled', session.can_update === null);
                    break;

                case 'delete':
                    $(v).prop('disabled', session.can_delete === null);
                    break;

                default:
                    $(v).prop('disabled', true);
                    break;
            }
        })
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
        }
    }

    $('button[data-bs-toggle="tab"]').on('show.bs.tab', function (event) {
        let targetNav = $(event.target).attr('data-bs-target');
        currentForm = $(targetNav).find('form').attr('id');
        localStorage.setItem('activeTab', targetNav);
    });

    var activeTab = localStorage.getItem('activeTab');
    if(activeTab){
        currentForm = $(activeTab).find('form').attr('id');
        let selector = '.nav-tabs button[data-bs-target="' + activeTab + '"]';
        new bootstrap.Tab(selector).show();
        $(selector).tab('show');
    }



    /**************************************************************************
    ************************** ONGLET TALENTS *********************************
    **************************************************************************/

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
            "url": '/action/talent/loadAll',
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
            url: '/action/talent/getTalent',
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
            url: '/action/talent/createTalent',
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
            url: '/action/talent/updateTalent',
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
            url: '/action/talent/deleteTalent',
            success: function(data){
                responseHandler(data);
            }
        })
    });



    $('button[aria-label="cancel"]').on('click', function(){
        clear_form(undefined, clear_selected_row);
    });

    /**************************************************************************
    ************************ ONGLET DONS DU SANG ******************************
    **************************************************************************/

    table_don_du_sang = $('#table_dons_du_sang').DataTable({
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
            "url": '/action/don_du_sang/loadAll',
            "async": true,
            "type": 'POST',
            "dataSrc": ""
        },
        "processing": true,
        "columns": [
            {
                "data": "id_don_du_sang",
                "name": "id_don_du_sang",
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
        let row = table_don_du_sang.row(this);
        $.each(table_don_du_sang.rows().nodes(), function(k, v){
            $(v).removeClass('row-selected');
        });
        $(row.node()).addClass('row-selected');
        load_don_du_sang(row.data().id_don_du_sang);
    });

    function load_don_du_sang(id_don_du_sang){
        $.ajax({
            dataType: 'json',
            type: 'post',
            data: {'id_don_du_sang': id_don_du_sang},
            url: '/action/don_du_sang/get',
            success: function(data){
                clear_form();
                $('#id_don_du_sang').val(data.id_don_du_sang);
                $.each(data, function(k, v){
                    $('#don_du_sang_'+k).val(v);
                });
                $('#createDonDuSang').prop('disabled', true);
                $('#updateDonDuSang, #deleteDonDuSang, #cancelDonDuSang').prop('disabled', false);
                $('#donDuSang_details').prop('hidden', false);
            }
        });
    }

    $('#createDonDuSang').on('click', function(){
        $.ajax({
            dataType: 'json',
            type: 'post',
            data: getFormData('form_don_du_sang'),
            url: '/action/don_du_sang/create',
            success: function(data){
                responseHandler(data);
                table_don_du_sang.ajax.reload(null, false);
            }
        })
    });

    $('#updateDonDuSang').on('click', function(){
        $.ajax({
            dataType: 'json',
            type: 'post',
            data: getFormData('form_don_du_sang'),
            url: '/action/don_du_sang/update',
            success: function(data){
                responseHandler(data);
                table_don_du_sang.ajax.reload(null, false);
            }
        })
    });

    $('#deleteDonDuSang').on('click', function(){
        $.ajax({
            dataType: 'json',
            type: 'post',
            data: { id_don_du_sang: $('#id_don_du_sang').val() },
            url: '/action/don_du_sang/delete',
            success: function(data){
                responseHandler(data);
            }
        })
    });

    $('#cancelDonDuSang').on('click', function(){
        clear_form();
    });

});