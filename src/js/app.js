const app = angular.module('myApp', []);

app.controller('MainController', ['$scope', ($scope) => {
    $scope.message = 'Welcome : We are set to build and inverted index project';
}]);
