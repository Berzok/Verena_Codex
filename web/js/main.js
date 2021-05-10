$(function() {

    console.dir(session);


    const user_container = '<img class="img-fluid img-thumbnail" src="' + session.picture + '" alt="profile picture"/>' +
        '<p class="text-white fw-bolder text-decoration-underline">' + session.nom + '</p>';


    const loginForm = '<form id="login_form" class="form-horizontal">\n' +
        '                <label for="user_login" class="form-label">Identifiant: </label>\n' +
        '                <input id="user_login" class="form-control" type="text" >\n' +
        '                <label for="user_password" class="form-label">Mot de passe: </label>\n' +
        '                <input id="user_password" class="form-control" type="password">\n' +
        '            </form>';


    if(!session || session.id_utilisateur == null) {

        $('#login_container').on('click', (e) => {
            bootbox.dialog({
                title: "Connexion",
                message: loginForm,
                closeButton: false,
                buttons: {
                    confirm: {
                        label: "<span class='fas fa-sign-in-alt'></span> Connexion",
                        className: "btn-primary",
                        callback: () => {
                            $.ajax({
                                dataType: 'json',
                                type: 'post',
                                data: {
                                    'login': $('#user_login').val(),
                                    'password': $('#user_password').val()
                                },
                                url: '/action/login',
                                success: function (data) {
                                    if(data.status === 'ok'){
                                        location.reload();
                                    }
                                }
                            });
                            $('#login_container').off('click');
                        }
                    },
                    cancel: {
                        label: '<span class="fas fa-times"></span> Annuler',
                        className: 'btn-warning',
                        callback: function () {
                        }
                    }
                }
            });
        })

    } else{
        $('#login_container').html(user_container);
    }

    //Neutralino side
    window.myApp = {
        showInfo: () => {
            document.getElementById('info').innerHTML = NL_APPID + " is running on port " +
                NL_PORT + " inside " + NL_OS + ".<br/><br/>" + "<span>v" + NL_VERSION + "</span>";
        },
        openDocs: () => {
            Neutralino.app.open({
                url: "https://neutralino.js.org/docs"
            });
        }
    };

    Neutralino.init();
    $('#bouton').on('click', function () {
        window.myApp.openDocs();
    });

    try{
        window.myApp.showInfo();
    } catch(e){
        //console.dir(e);
    }

    $('#info').text('oui bonjour');

    //$('#page_title').height($('#login_container').height());


})