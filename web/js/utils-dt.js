//import $ from 'jquery';
//const $ = jQuery;
//import { jQuery } from "jquery/dist/jquery";
//const $ = require('jquery')(window);

$.fn.dataTable.render.ellipsis = function (cutoff, wordbreak, escapeHtml) {
    var esc = function (t) {
        return t
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;');
    };

    return function (d, type, row) {
        // Order, search and type get the original data
        if (type !== 'display') {
            return d;
        }

        if (typeof d !== 'number' && typeof d !== 'string') {
            return d;
        }

        d = d.toString(); // cast numbers

        if (d.length < cutoff) {
            return d;
        }

        var shortened = d.substr(0, cutoff - 1);
        //shortened = shortened.replace(/<.*?>/g, '');


        // Find the last white space character in the string
        if (wordbreak) {
            shortened = shortened.replace(/\s([^\s]*)$/, '');
        }

        // Protect against uncontrolled HTML input
        if (escapeHtml) {
            shortened = esc(shortened);
        }

        //return '<span class="ellipsis" title="' + esc(d) + '">' + shortened + '&#8230;</span>';
        return shortened + '&#8230';
    };
};

/*
$.extend(true, $.fn.dataTable.defaults, {
    "language": {
        "emptyTable":     "Aucune donnée disponible dans le tableau",
        "info":           "Affichage de l'élément _START_ à _END_ sur _TOTAL_ éléments",
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
    }
});
*/