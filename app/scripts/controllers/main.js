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
    $scope.model.maxDate = new Date();
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
        withCredentials: false
      }).then(function successCallback(response) {
        console.log("response: " + response.data.length);
        //  console.log(response.data[0][1]);
        var bitArr = response.data;
        var bitData = [];

        for (var i = 0; i < bitArr.length; i++) {
          //console.log(i);
          var primeArr = [];
          var totalPrime = 0;
          var priceVal = bitArr[i][1] | 0;
          var isTotalPrime = "";
          var rowColor = "";

          var priceString = priceVal + "";
          var priceNumberArr = priceString.split("");

          console.log(priceString+ " " +priceNumberArr);
          for(var j = 0;j < priceNumberArr.length; j++)
          {
            console.log(priceNumberArr[j]);
            if(isPrime(priceNumberArr[j]))
            {
              primeArr.push(Number(priceNumberArr[j]));
                totalPrime += Number(priceNumberArr[j]);
            }
            else if(priceNumberArr[j] == 1)
            {
                primeArr.push(Number(priceNumberArr[j]));
                totalPrime += Number(priceNumberArr[j]);
            }
          }
          if(isPrime(totalPrime))
          {
            isTotalPrime = "Prime";
            rowColor = "primeBackground";
          }
          else {
            isTotalPrime = "";
          }

          var object = {
            timestamp: bitArr[i][0],
            date: moment(bitArr[i][0]).format("DD MMMM YYYY"),
            price: priceVal,
            primenumber : primeArr,
            totalprime : totalPrime,
            istotalprime : isTotalPrime,
            rowColor: rowColor
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

    //return true if prime
    function isPrime(input) {
      let prime = true;
      for (let i = 2; i <= Math.sqrt(input); i++) {
        if (input % i == 0) {
          prime = false;
          break;
        }
      }
      return prime && (input > 1);
    }



    $scope.validateDate = function() {

      var startDate = $scope.model.startDate;
      if (startDate) {
        //$scope.model.minEndDate = moment($scope.model.startDate).add(1, 'days');
      }

      var endDate = $scope.model.endDate; {

      }

      if (moment(startDate).isAfter(moment(), 'day') || moment(endDate).isAfter(moment(), 'day')) {
        showDateValidateMsg("You cannot choose a date thats later than today.");
      }
      if ((startDate && endDate) && moment(startDate).isSame(moment(endDate), 'day')) {

        showDateValidateMsg("Start and end date cannot be on the same day.");
        $scope.model.endDate = null;

      }
      if (moment(startDate).isAfter(moment(endDate), 'day') || moment(endDate).isBefore(moment(startDate), 'day')) {

        showDateValidateMsg("End date must be later than start date");
        $scope.model.endDate = null;

      }
      if ((startDate && endDate)) {
        var diffValue = moment(endDate).diff(moment(startDate), 'months');
        if (diffValue > 6) {
          showDateValidateMsg("Date range cannot be more than 6 months");
          $scope.model.startDate = null;
          $scope.model.endDate = null;
        }
        //console.log(moment(endDate).diff(moment(startDate),'months'));
      }



      /*** Test for:
          Is date newer than today.
          Is start date later than end Date
          Is end date earlier than start date
          Is the difference more than 6 months
      ***/

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
