// Initialize app
var myApp = new Framework7({

    modalTitle: 'Scanner',
    onAjaxStart: function (xhr) {
        myApp.showIndicator();
    },
    onAjaxComplete: function (xhr) {
        myApp.hideIndicator();
    }
});

// If we need to use custom DOM library, let's save it to $$ variable:
var $$ = Dom7;

// Add view
var mainView = myApp.addView('.view-main', {
    // Because we want to use dynamic navbar, we need to enable it for this view:
    // dynamicNavbar: true,
    pushState:true
});

// Handle Cordova Device Ready Event
$$(document).on('deviceready', function() {

    console.log("Device is ready!");
    console.log("barcode "+cordova.plugins.barcodeScanner);
    console.log("inapppBrowser "+cordova.plugins.barcodeScanner);

    document.addEventListener("backbutton", function(e) {
        e.preventDefault();

        // console.log("back button clicked");
        // mainView.router.back();

        // console.log('data is '+mainView.activePage.name);
        // return false;

        myApp.hideIndicator();
        myApp.closePanel();

        if (mainView.activePage.name === "index") {
            myApp.confirm('would you like to exit app.', function() {
                navigator.app.clearHistory();
                navigator.app.exitApp();
            });
        } else {
            mainView.router.back();
        }

    }, false);
});


myApp.onPageInit('index', function (page) {

      console.log('index page called');
})

myApp.onPageInit('result', function (page) {

    // $('#format').html(page.query.resultFormat);
    // var html = "";
    // var countText = 0;
    // for (var i = 0; i < page.query.resultText.length; i++) {
    //     console.log("text is "+page.query.resultText[i]);
    //     html += page.query.resultText[i];
    //     countText++;
    //     if(countText==30){
    //         html +="<br>";
    //         countText = 0;
    //     }
    // }
    // $('#decoded').html(html);

    // $('.browser-btn').click(function(){
    //     cordova.InAppBrowser.open(page.query.resultText, '_system', 'location=yes');
    // })
})


