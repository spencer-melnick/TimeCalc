var app = angular.module('timeCalc', []);

app.service('calcService', function() {
  this.times = [];

  this.calcResult = function() {
    var result = {minutes: 0, seconds: 0};

    for (i in this.times) {
      result.minutes += this.times[i].minutes;
      result.seconds += this.times[i].seconds;
    }

    var remainderSeconds = result.seconds % 60;
    var carriedMinutes = (result.seconds - remainderSeconds) / 60;

    result.seconds = remainderSeconds;
    result.minutes += carriedMinutes;

    return result;
  }

  this.addTime = function(min, sec) {
    var remainderSeconds = sec % 60;
    var carriedMinutes = (sec - remainderSeconds) / 60;

    min += carriedMinutes;

    this.times.push({minutes: min, seconds: remainderSeconds});
  }

  this.removeTime = function(time) {
    var found = false;
    for (i in this.times) {
      if (this.times[i] === time) {
        found = true;
        break;
      }
    }

    if (found) {
      this.times.splice(i, 1);
    }
  }
})

app.controller('MainCtrl', function($scope, calcService){
  $scope.times = calcService.times;
  $scope.result = calcService.calcResult();

  $scope.minutesIn = 0;
  $scope.secondsIn = 0;

  $scope.rate = 0.30;

  $scope.addTime = function() {
    calcService.addTime($scope.minutesIn, $scope.secondsIn);

    $scope.result = calcService.calcResult();
    $scope.minutesIn = 0;
    $scope.secondsIn = 00;
  };

  $scope.removeTime = function(time) {
    calcService.removeTime(time);
    $scope.result = calcService.calcResult();
  };
});

app.filter('numberFixedLen', function(){
    return function(a,b){
        return(1e2+""+a).slice(-b);
    };
});
