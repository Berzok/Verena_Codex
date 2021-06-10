//import $ from 'jquery';
//const $ = jQuery;
//import { jQuery } from "jquery/dist/jquery";
//const $ = require('jquery')(window);

/**
 * Créé et affiche une modal bootboxConfirm pré-configurée
 * @param {string} type
 * @param {string} title
 * @param {string} message
 * @param {function} [callback_positive] - Que faire si l'action est validée
 * @param {function} [callback_negative] - Que faire si l'action est annulée
 * @param {string} [label_confirm=Oui] - Texte à afficher sur le bouton de confirmation
 * @param {string} [label_cancel=Non] - Texte du bouton d'annulation
 */
function bootboxConfirm(type, title, message, callback_positive, callback_negative, label_confirm, label_cancel) {

    switch (type) {

        case 'success':
            title = '<span class="text-green"><i class="fas fa-check-circle"></i> ' + title + '</span>';
            break;

        case 'warning':
            title = '<span class="text-yellow"><i class="fas fa-exclamation-circle"></i> ' + title + '</span>';
            break;

        case 'help':
            title = '<span class="text-yellow"><i class="fas fa-question-circle"></i> ' + title + '</span>';
            break;

        case 'delete':
            title = '<span class="text-yellow"><i class="fas fa-trash"></i> ' + title + '</span>';
            break;

        case 'danger':
            title = '<span class="text-red"><i class="fas fa-exclamation-triangle"></i> ' + title + '</span>';
            break;

        case 'denied':
            title = '<span class="text-red"><i class="fas fa-minus-circle"></i> ' + title + '</span>';
            break;

        default:
            break;
    }

    bootbox.confirm({
        animate: true,
        backdrop: true,
        onEscape: true,
        closeButton: true,
        swapButtonOrder: true,
        title: title,
        buttons: {
            'confirm': {
                label: (label_confirm) ? label_confirm : 'Oui',
                className: 'btn-success pull-left',
            },
            'cancel': {
                label: (label_cancel) ? label_cancel : 'Non',
                className: 'btn-danger pull-right'
            }
        },
        message: message,
        callback: function (answer) {
            if (answer) {
                if (callback_positive) {
                    callback_positive();
                }
            } else {
                if (callback_negative) {
                    callback_negative();
                }
            }
        },
        onShow: function(event){
            //On remplace les classes de bootbox du close button, et on applique les classes BS à la place
            $(this)
                .addClass('pt-5')
                .find('.bootbox-close-button').removeClass('bootbox-close-button close')
                .addClass('btn btn-close')
                .html('');
        }
    });
}


/**
 * Permet la création d'une bootboxDialog pré-configuré
 * @param {string} type - Type de la bootbox
 * @param {string} title - Titre de la bootbox
 * @param {string} message - Message de la bootbox
 * @param {boolean} [backdrop] - Ajout d'un backdrop //TODO C'est quoi ça ?
 */
function bootboxDialog(type, title, message, backdrop) {

    let bootboxParams = {
        message: message,
        animate: true
    };

    switch (type) {

        case 'success':
            bootboxParams.title = "<span class='text-green'><i class='fas fa-check-circle'></i> " + title + "</span>";
            break;

        case 'alert':
            bootboxParams.title = "<span class='text-yellow'><i class='fas fa-exclamation-circle'></i> " + title + "</span>";
            break;

        case 'error':
            bootboxParams.title = "<span class='text-red'><i class='fas fa-exclamation-triangle'></i> " + title + "</span>";
            break;

        case 'redAlert':
            bootboxParams.title = "<span class='text-red'><i class='fas ion-alert-circled'></i> " + title + "</span>";
            break;

        case 'info':
            bootboxParams.title = "<span class='text-blue'><i class='fas fa-dot-circle'></i> " + title + "</span>";
            break;

        case 'info-red':
            bootboxParams.title = "<span class='text-red'><i class='fas ion-information-circled'></i> " + title + "</span>";
            break;

        default:
            break;
    }

    if (backdrop === true) {
        bootboxParams.onEscape = true;
        bootboxParams.backdrop = true;
    }

    bootbox.dialog(bootboxParams);
}


/**
 * Permet d'afficher un Toast bootstrap pré-configuré
 * @param {string} type - Spécifie le type de Toast (erreur, réussite, etc...)
 * @param {string} title - Le titre du Toast
 * @param {string} message - Message à afficher, c'est-à-dire le contenu textuel
 */
function toast(type, title, message) {

    let header = '<div class="toast-header position-static">';
    if (type === 'success') {
        header += '<strong class="me-auto text-success"><span class="fas fa-check-circle"></span> ' + title + '</strong>';
    } else {
        header += '<strong class="me-auto text-danger"><span class="fas fa-exclamation-triangle"></span> ' + title + '</strong>';
    }
    header += '<button type="button" class="btn-close align-self-end" data-bs-dismiss="toast" aria-label="Close"></button>';
    header += '</div>';

    let toast = '<div id="toast_message" class="toast border-dark position-fixed mt-5 start-50 translate-middle-x" role="alert" aria-live="polite" aria-atomic="true">';
    toast += header;
    if (type === 'success') {
        toast += '<div class="toast-body bg-info">' + message + '</div>';
    } else {
        toast += '<div class="toast-body bg-warning">' + message + '</div>';
    }
    toast += '</div>';

    $('#page_content').append(toast);

    $('#toast_message').on('hidden.bs.toast', '', this, (e) => {
        e.target.remove();
    })

    let le_toast = new bootstrap.Toast($('#toast_message').get(0), {});
    le_toast.show();
}

