// Initialize app
var myApp = new Framework7();

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

    // mainView.router.loadPage('result.html');
    // return false;

    console.log("Device is ready!");

    cordova.plugins.barcodeScanner.scan(
      function (result) {

        alert("result is "+result);
        // cordova.plugins.barcodeScanner.encode(cordova.plugins.barcodeScanner.Encode.TEXT_TYPE, result.text, function(success) {
        //      // mainView.router.load({
        //      //    url:"result.html",
        //      //    query:{
        //      //        resultText: success,
        //      //        resultFormat: result.format
        //      //    }
        //      //  })

        //   }, function(fail) {
        //     alert("encoding failed: " + fail);
        //   }
        // );
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



});

myApp.onPageInit('result', function (page) {

    alert("result text is"+page.query.resultText);
    alert("result format is"+page.query.resultFormat);


})
