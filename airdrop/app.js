angular.module('myapp', [])
.component('main', {
  controller: function($http) {
    var ctrl = this;
    ctrl.view = '';
    
    this.$onInit = () => {
      console.log('main controller', ctrl);
    }
  },

  template: 
  `<div>
    Angular component working
  </div>`
})