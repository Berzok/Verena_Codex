Dropzone.autoDiscover = false;

$(function($){

    var table_carriere = null;
    var table_carriere_talents = null;
    var table_don_du_sang = null;
    var table_talent = null;
    var currentForm = null;
    var dropzoneForm = null;

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
     ************************** ONGLET CARRIÈRES ******************************
     **************************************************************************/

    table_carriere = $('#table_carriere').DataTable({
        "columnDefs": [
            {
                "targets": 1,
                "width": "15%"
            },
            {
                "targets": 2,
                "width": "55%",
            }
        ],
        "ajax": {
            "url": '/action/carriere/loadAll',
            "async": true,
            "type": 'POST',
            "dataSrc": ""
        },
        "processing": true,
        "columns": [
            {
                "data": "id_carriere",
                "name": "id_carriere",
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
            }
        ],
    }).on('click', 'tbody tr', function(){
        let row = table_carriere.row(this);
        $.each(table_carriere.rows().nodes(), function(k, v){
            $(v).removeClass('row-selected');
        });
        $(row.node()).addClass('row-selected');
        load_carriere(row.data().id_carriere);
    });

    dropzoneForm = $('#dropzone_div').dropzone({
        url: '/action/carriere/upload_image',
        method: 'post',
        maxFiles: 1,
        maxThumbnailFilesize: 15,
        thumbnailHeight: null,
        thumbnailWidth: null,
        autoProcessQueue: false,
        init: function() {
            var submitButton = $('#updateCarriere');
            var wrapperThis = this;

            this.on('sending', function(file, xhr, formData){
                console.dir(wrapperThis);
                formData.append('id_carriere', $('#id_carriere').val());
                for(let pair of formData.entries()) {
                    console.log(pair[0]+ ', ' + pair[1]);
                }
            });

            submitButton.on('click', function () {
                wrapperThis.processQueue();
            });


            this.on("thumbnail", function(file, dataUrl) {
                $('.dz-image').last().find('img').attr('id', 'dropzone_image')
                    .addClass('img-fluid w-100 h-auto');
                $('.dz-image').addClass('w-100 h-auto');
                $('.dz-image').on('hover', function(event){
                    this.height *= 1.1;
                });
                $('.dz-preview').addClass('m-1 bg-transparent')
                    .on('click', function(event){
                        $('#dropzone_div').trigger('click');
                    });
            });
            this.on('addedfile', function(file){
                if(this.files.length > 1){
                    this.removeFile(this.files[0]);
                }
                $('.dz-progress').hide();
                $('.dz-details').hide();
            })
        }
    });

    function load_carriere(id_carriere){
        $.ajax({
            dataType: 'json',
            type: 'post',
            data: {'id_carriere': id_carriere},
            url: '/action/carriere/get',
            success: function(data){
                clear_form();

                $('#id_carriere').val(data.id_carriere);
                $.each(data, function(k, v){
                    $('#carriere_'+k).val(v);
                });

                table_carriere_talents.ajax.reload(null, false);

                $('#createCarriere').prop('disabled', true);
                $('#updateCarriere, #deleteCarriere, #cancelCarriere').prop('disabled', false);
                $('#carriere_details').prop('hidden', false);
            }
        });
    }

    $('#createCarriere').on('click', function(){
        $.ajax({
            dataType: 'json',
            type: 'post',
            data: getFormData('form_carriere'),
            url: '/action/carriere/create',
            success: function(data){
                responseHandler(data);
                table_carriere.ajax.reload(null, false);
            }
        })
    });

    $('#updateCarriere').on('click', function(){
        $.ajax({
            contentType: 'application/json',
            dataType: 'json',
            type: 'post',
            beforeSend(jqXHR, settings) {
                let form_data = getFormData('form_carriere');
                form_data.talents = table_carriere_talents.rows().data().toArray();
                this.data = JSON.stringify(form_data);
            },
            url: '/action/carriere/update',
            success: function(data){
                responseHandler(data);
                table_carriere.ajax.reload(null, false);
            }
        })
    });

    $('#deleteCarriere').on('click', function(){
        $.ajax({
            dataType: 'json',
            type: 'post',
            data: { id_carriere: $('#id_carriere').val() },
            url: '/action/carriere/delete',
            success: function(data){
                responseHandler(data);
            }
        })
    });

    $('#cancelCarriere').on('click', function(){
        clear_form();
    });


    table_carriere_talents = $('#table_carriere_talents').DataTable({
        "paging": false,
        "info": false,
        "columnDefs": [
            {
                "targets": 5,
                "width": "30%"
            },
            {
                "targets": 6,
                "width": "30%",
            },
            {
                "targets": 7,
                "width": "30%"
            }
        ],
        "ajax": {
            "url": '/action/carriere/getTalents',
            "async": true,
            "type": 'POST',
            "data": function(d){
                d.id_carriere = $('#id_carriere').val();
            },
            "dataSrc": ""
        },
        "serverSide": true,
        "deferLoading": 0,
        "processing": true,
        "order": [
            [5, "asc"]
        ],
        "columns": [
            {
                "data": "id_carriere_talent",
                "name": "id_carriere_talent",
                "visible": false,
                "searchable": false
            },
            {
                "data": "id_carriere",
                "name": "id_carriere",
                "visible": false,
                "searchable": false
            },
            {
                "data": "id_talent",
                "name": "id_talent",
                "visible": false,
                "searchable": false
            },
            {
                "data": "id_talent_specialisation",
                "name": "id_talent_specialisation",
                "visible": false,
                "searchable": false
            },
            {
                "data": "id_talent_exclu",
                "name": "id_talent_exclu",
                "visible": false,
                "searchable": false
            },
            {
                "data": "nom_talent",
                "name": "nom_talent",
                "className": 'fw-bold'
            },
            {
                "data": "nom_specialisation",
                "name": "nom_specialisation"
            },
            {
                "data": "nom_talent_exclu",
                "name": "nom_talent_exclu",
                "render": function(data, type, row, meta){
                    if(type === 'display' && data) {
                        data = '<span class="text-danger">' + data + '</span>';
                    }
                    return data;
                }
            },
            {
                "data": null,
                "name": "delete",
                "className": 'text-center',
                "searchable": false,
                "orderable": false,
                "defaultContent": '<button class="btn btn-outline-danger"><i class="fas fa-trash-alt"></i></button>'
            }
        ],
    }).on('click', 'tbody tr', function(){
        let row = table_carriere_talents.row(this);
        $.each(table_carriere_talents.rows().nodes(), function(k, v){
            $(v).removeClass('row-selected');
        });
        $(row.node()).addClass('row-selected');
        //load_carriere(row.data().id_carriere);
    });


    /**************************************************************************
     ************************** ONGLET GRAPHE *********************************
     **************************************************************************/

    window.onload = function() {
        $.getScript("https://cdnjs.cloudflare.com/ajax/libs/cytoscape/3.18.2/cytoscape.umd.js", () => {
            var cy = cytoscape({
                container: $('#cy_network'),
                elements: {
                    nodes: [
                        {
                            data: {
                                id: 'a'
                            }
                        },
                        {
                            data: {
                                id: 'b'
                            }
                        }
                    ],
                    edges: [
                        {
                            data: {
                                id: 'ab',
                                source: 'a',
                                target: 'b'
                            }
                        }
                    ]
                },
                layout: {
                    name: 'grid',
                    rows: 1
                },
                style: [ // the stylesheet for the graph
                    {
                        selector: 'node',
                        style: {
                            'background-color': '#666',
                            'label': 'data(id)'
                        }
                    },
                    {
                        selector: 'edge',
                        style: {
                            'width': 3,
                            'line-color': '#ccc',
                            'target-arrow-color': '#ccc',
                            'target-arrow-shape': 'triangle',
                            'curve-style': 'bezier'
                        }
                    }
                ],
            });

            cy.ready(() => {
                cy.center();
                //cy.fit();
                cy.resize();
            });
        });
    };



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
            url: '/action/talent/get',
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
            url: '/action/talent/create',
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
            url: '/action/talent/update',
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
            url: '/action/talent/delete',
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