const app = angular.module('myApp', []);

app.controller('MainController', ['$scope', ($scope) => {
    $scope.message = 'We are set to build our inverted index project';
    $scope.fileList = ['File 1', 'File2'];
    $scope.table1IsVisible = false;
    $scope.table2IsVisible = false;
    $scope.setActiveFile = (file) => {
        $scope.activeFile = file;
        $scope.table1IsVisible = true;
        $scope.table2IsVisible = false;
    };
    $scope.showSearchTable = () => {
        $scope.activeFile = false;
        $scope.table1IsVisible = false;
        $scope.table2IsVisible = true;
    };
}]);
