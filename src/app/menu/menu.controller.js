(function() {
  'use strict';
  angular.module('menu')
    .controller('MenuController', MenuController);

  /* @ngInject */
  function MenuController(
    $scope,
    $log,
    $q,
    MenuService) {

    $log.debug('Inside Product Controller');

    var category,loadPromise,MenuPromise;
    MenuPromise = MenuService.getAllMenuItems(),
    loadPromise       = $q.all({ category: MenuPromise});
    loadPromise.then(getMenuDataSuccess, failure);
  
    
    /**
     * Add depth parameter for each object in json of category
     * @param  {object} result categories
     * @return {void}
     */
    function getMenuDataSuccess(result) {
      //Set Category
      $log.debug(result);
      var category = result.category.data || {};
      $scope.categories = category.category || category;
      // Set depth for category
      for (var i=0; i < $scope.categories.length; i=i + 1) {
        setDepth($scope.categories[i]);
      }
    }
    
    /**
     * recursivly set depth for each object of json of category
     * @param {object} category category
     */
    function setDepth(category) {
      var depth = 0;
      var insertDepth = function(category, depth) {
        category.depth = depth;
        if (category.subcategories) {
          insertDepth(category.subcategories, depth + 1);
          for (var i=0; i < category.subcategories.length; i=i + 1) {
            insertDepth(category.subcategories[i], depth + 1);
          }
        }
      };
      insertDepth(category, depth + 1);
    }
    
    function failure(err) {
      debugger;
      $log.debug('Failure'+ err);
    }
  }
}) ();
