'use strict';

/**
 * @ngdoc service
 * @name stockerApp.CompanyService
 * @description
 * # CompanyService
 * serive to load all companies in db
 */
angular.module('stockerApp')
  .service('CompanyService', function ($resource) {
    return $resource('companies.json');
  });
