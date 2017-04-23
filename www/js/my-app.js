// Initialize app
var myApp = new Framework7({
    modalTitle: 'Scanner',
    onAjaxStart: function (xhr) {
        myApp.showIndicator();
    },
    onAjaxComplete: function (xhr) {
        myApp.hideIndicator();
    },
    preloadPreviousPage:true,
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

    $('.btn-scan').click(function(){
        cordova.plugins.barcodeScanner.scan(
          function (result) {

            if(!result.cancelled){
                mainView.router.load({
                    url:"result.html",
                    query:{
                        resultText: result.text,
                        resultFormat: result.format
                    }
                })
                
            }else{

                mainView.router.load({
                    url:"index.html"
                })
            }
          },
          function (error) {
              alert("Scanning failed: " + error);
          },
          {
              preferFrontCamera : false, // iOS and Android
              showFlipCameraButton : true, // iOS and Android
              showTorchButton : true, // iOS and Android
              torchOn: false, // Android, launch with the torch switched on (if available)
              prompt : "Place a barcode inside the scan area", // Android
              resultDisplayDuration: 500, // Android, display scanned text for X ms. 0 suppresses it entirely, default 1500
              formats : "QR_CODE,PDF_417", // default: all but PDF_417 and RSS_EXPANDED
              orientation : "portrait", // Android only (portrait|landscape), default unset so it rotates with the device
              disableAnimations : true, // iOS
              disableSuccessBeep: false // iOS
          }
        );
    })
})


myApp.onPageInit('result', function (page) {

    $('#format').html(page.query.resultFormat);
    var html = "";
    var countText = 0;
    for (var i = 0; i < page.query.resultText.length; i++) {
        console.log("text is "+page.query.resultText[i]);
        html += page.query.resultText[i];
        countText++;
        if(countText==30){
            html +="<br>";
            countText = 0;
        }
    }
    $('#decoded').html(html);

    $('.browser-btn').click(function(){
        cordova.InAppBrowser.open(page.query.resultText, '_system', 'location=yes');
    })
})


