const app = angular.module('myApp', []);

app.controller('MainController', ['$scope', ($scope) => {
    $scope.message = 'Welcome : We going to build and inverted index project';
}]);
