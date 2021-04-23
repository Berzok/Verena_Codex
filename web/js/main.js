$(function() {

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
    })
    $('#info').text('oui bonjour');

    window.myApp.showInfo();

})