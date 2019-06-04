'use strict';

describe('Controller: InstructionsCtrl', function () {

  // load the controller's module
  beforeEach(module('bitcoinprimeApp'));

  var InstructionsCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    InstructionsCtrl = $controller('InstructionsCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(InstructionsCtrl.awesomeThings.length).toBe(3);
  });
});
