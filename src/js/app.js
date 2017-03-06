const app = angular.module('myApp', []);

app.controller('MainController', ['$scope', ($scope) => {
  const invertedIndex = new InvertedIndex();

  $scope.filesArray = [];
  $scope.fileNamesArray = [];
  $scope.file = [];
  $scope.filesIndexCreated = [];
  $scope.showIndexTable = false;
  $scope.showSearchTable = false;
  $scope.tableName = '';

  /**
   * upload single or multiple files
   * @returns {String} success or failure message
   */
  $scope.uploadFile = () => {
    const books = Array.from(document.getElementById('json-files').files);
    // const readFile = new FileReader();
    const booksCount = books.length;
    if (booksCount > 0) {
      const promise = Promise.resolve();
      books.map(book => promise.then(() => $scope.bookReader(book)));
      document.getElementById('json-files').value = null;
    } else {
      toastr.warning('No file selected', 'Warning');
    }
  };

  /**
   * read a book and store
   * @param {object} book
   * @returns {Promise} returns promise containing file(s) uploaded
   */
  $scope.bookReader = (book) => {
    if (book.name.toLowerCase().match(/\.json$/)) {
      const readFile = new FileReader();
      readFile.onload = (e) => {
        const text = e.target.result;
        const fileContent = JSON.parse(text);
        const validityMessage = invertedIndex.validateFile(fileContent);
        if (validityMessage !== 'Valid file') {
          toastr.error(`${book.name} does not match the specified format',
                            'Error`);
          return;
        }
        const fileDetail = {};
        fileDetail.name = book.name;
        fileDetail.content = fileContent;
        $scope.$apply(() => {
          $scope.filesArray.push(fileDetail);
          $scope.fileNamesArray.push(book.name);
        });
        toastr.success(`${book.name} has been uploaded`);

        return Promise.resolve();
      };
      if ($scope.fileNamesArray.includes(book.name)) {
        toastr.error(`You have uploaded the ${book.name} before`, 'Error');
        return;
      }
      readFile.readAsText(book);
    } else {
      toastr.error('Only JSON file are allowed', 'Error');
    }
  };

  /**
   * create index for a file
   * @returns {Object} Object containing file indices
   */
  $scope.createIndex = () => {
    const value = $scope.selectedFile;
    if (value) {
      $scope.showIndexTable = true;
      $scope.showSearchTable = false;
      $scope.content = $scope.filesArray[value].content;
      const filename = $scope.filesArray[value].name;
      $scope.fileIndex = invertedIndex.getIndex(filename);
      $scope.tableName = `${filename} Indexed`;
      if (!$scope.fileIndex) {
        invertedIndex.createIndex($scope.content, filename);
        $scope.fileIndex = invertedIndex.getIndex(filename);
        $scope.filesIndexCreated.push($scope.filesArray[value].name);
      }
    } else {
      toastr.warning('No file selected to index', 'Warning');
    }
  };

  /**
   * search for words in file(s)
   * @param {string} fileName
   * @returns {Object} Object containing search file indices
   */
  $scope.searchIndex = (fileName = 'all') => {
    const query = $scope.searchQuery;
    if ($scope.filesIndexCreated.length === 0) {
      toastr.error('No file indexed', 'Error');
      return;
    }
    if (query) {
      $scope.searchedIndexedFiles = invertedIndex.searchIndex(query, fileName);
      $scope.tableName = `"${query}" search result`;
      $scope.showIndexTable = false;
      $scope.showSearchTable = true;
    } else {
      toastr.error('Please enter a search word', 'Error');
    }
  };
}]);

