'use strict';

/**
 * @ngdoc function
 * @name bitcoinprimeApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the bitcoinprimeApp
 */
angular.module('bitcoinprimeApp')
  .controller('MainCtrl', function($scope, $mdToast, $mdDialog, $http) {

    $scope.model = {};
    $scope.model.testField = "TEST VALUE";
    //code here


    $scope.searchBitcoin = function() {
      //console.log("button press");
      console.log("start date: " + $scope.model.startDate);
      console.log("end date: " + $scope.model.endDate);
      console.log(moment(1318874398806).valueOf());

      var startUnix = moment($scope.model.startDate).valueOf();
      var endUnix = moment($scope.model.endDate).valueOf();

      console.log(startUnix + " - " + endUnix);
      var urlCall = 'https://cors-anywhere.herokuapp.com/https://api-pub.bitfinex.com/v2/candles/trade:1D:tBTCUSD/hist?start=' + startUnix + '&end=' + endUnix + '&sort=1';
      console.log(urlCall);
      $scope.model.displayedColumns = ['timestamp', 'price'];
      $http({
        method: 'GET',
        url: urlCall,
        withCredentials: false //'https://api.bitfinex.com/v2/candles/trade:1h:tBTCUSD/hist?start=1514764800000&sort=1',
        /*header : {'Access-Control-Allow-Origin' : '*',
				'Access-Control-Allow-Methods' : 'POST, GET, OPTIONS, PUT',
				'Content-Type': 'application/json',
				'Access-Control-Allow-Headers': "*"
  }*/
      }).then(function successCallback(response) {
        console.log("response: " + response.data.length);
        //  console.log(response.data[0][1]);
        var bitArr = response.data;
        var bitData = [];
        for (var i = 0; i < bitArr.length; i++) {
          //console.log(i);
          var object = {
            timestamp: bitArr[i][0],
            date: moment(bitArr[i][0]).format("DD MMMM YYYY"),
            price: bitArr[i][1]
          }
          bitData.push(object);
        }
        $scope.model.bitValues = bitData;
        console.log(JSON.stringify(bitData));
        // this callback will be called asynchronously
        // when the response is available

        /*returns the response as an object of arrays:
        [
        MTS	int	millisecond time stamp
        OPEN	float	First execution during the time frame - WILL BE USING THIS AS THE PRICE FOR THE DAY
        CLOSE	float	Last execution during the time frame
        HIGH	float	Highest execution during the time frame
        LOW	float	Lowest execution during the timeframe
        VOLUME	float	Quantity of symbol traded within the timeframe
        ]
        */





      }, function errorCallback(response) {
        console.log("Error: " + JSON.stringify(response));
        // called asynchronously if an error occurs
        // or server returns response with an error status.
      });


    }

    $scope.validateDate = function() {
      showDateValidateMsg("test message!");
    }

    function showDateValidateMsg(msg) {

      // Appending dialog to document.body to cover sidenav in docs app
      // Modal dialogs should fully cover application
      // to prevent interaction outside of dialog
      $mdDialog.show(
        $mdDialog.alert()
        .parent(angular.element(document.querySelector('#popupContainer')))
        .clickOutsideToClose(true)
        .title('Date Validation Error')
        .textContent(msg)
        .ariaLabel('Validation Error')
        .ok('Ok')
        .targetEvent(angular.element(document.querySelector('#tabParent')))

      );
    };

  }).config(function($mdDateLocaleProvider, $httpProvider) {
    $mdDateLocaleProvider.formatDate = function(date) {
      return date ? moment(date).format('DD/MM/YYYY') : ''
    };
    $httpProvider.defaults.withCredentials = true;
    delete $httpProvider.defaults.headers.common["X-Requested-With"];
  });


angular.module('bitcoinprimeApp')
