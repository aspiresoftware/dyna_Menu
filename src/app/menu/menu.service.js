(function() {
  angular.module('menu')
    .factory('MenuService', MenuService);

  /* @ngInject */
  function MenuService(
    $q,
    $http,
    $log) {

    $log.debug('Inside MenuService Service');

    var menuService = {
        getAllMenuItems:     getAllMenuItems
    };
    
    return menuService;

    function getAllMenuItems() {
      return $http.get('/app/menu.json');
    }
  }
})();
