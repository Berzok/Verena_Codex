//import $ from 'jquery';
//const $ = jQuery;
//import { jQuery } from "jquery/dist/jquery";
//const $ = require('jquery')(window);

function toast(type, title, message) {

    let header = '<div class="toast-header">';
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

    let le_toast = new bootstrap.Toast($('#toast_message')[0]);
    le_toast.show();
}

