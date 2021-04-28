$(function() {

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
        console.dir(e);
    }

    $('#info').text('oui bonjour');

    //$('#page_title').height($('#login_container').height());


})