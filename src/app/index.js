'use strict';
angular.module('menu', [
  'ngRoute',
  'ui.router']);
angular.module('menu')
  .config(ConfigRoutes);
/* @ngInject */
function ConfigRoutes($stateProvider, $urlRouterProvider, $injector) {
  var pageURL = $injector.get('PAGE_URL');
  var templateURL = $injector.get('TEMPLATE_URL');
  $stateProvider.state('/', {
    url: pageURL.root,
    templateUrl: templateURL.root,
    controller: 'MenuController',
    controllerAs: 'MenuController'
  });
  $urlRouterProvider.otherwise(pageURL.root);
}
