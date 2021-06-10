$(function($){

    var table_add_carriere_talent = null;

    table_add_carriere_talent = $('#table_add_carriere_talent').DataTable({
        "ajax": {
            "url": '/action/talent/loadAll',
            "type": 'POST',
            data: {specialisation: true},
            dataSrc: ''
        },
        info: false,
        lengthChange: false,
        pageLength: 10,
        order: [
            [2, 'asc']
        ],
        select: {
            className: 'selected row-selected',
            selector: 'td:first-child',
            style:    'multi+shift'
        },
        "columns": [
            {
                data: null,
                defaultContent: '',
                orderable: false,
                searchable: false,
                className: 'select-checkbox'
            },
            {
                "data": "id_talent",
                "name": "id_talent",
                orderable: false,
                searchable: false,
                visible: false
            },
            {
                "data": "nom",
                "name": "nom",
                className: 'fw-bold'
            },
            {
                "data": "talent_specialisations",
                "name": "talent_specialisations",
                defaultContent: '',
                render: function(data, type, row, meta){
                    if(data.length === 0){
                        return '';
                    }
                    let options = [];

                    $.each(data, (k, v) => {
                        options.push({
                            value: v.id_talent_specialisation,
                            text: v.nom
                        });
                    });

                    let select = document.createElement('select');
                    $(options).each(function(){
                        let optionTag = document.createElement('option');
                        optionTag.value = this.value;
                        optionTag.textContent = this.text;
                        select.append(optionTag);
                    });

                    return select.outerHTML;
                }
            },
        ]
    });

})