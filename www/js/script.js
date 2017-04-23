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