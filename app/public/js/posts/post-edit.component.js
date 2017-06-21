(function() {
  'use strict'

  angular.module('app')
    .component('editPost', {
      controller: controller,
      templateUrl:  './js/posts/posts-edit.html'
    })

    controller.$inject = ['$http', '$state', '$stateParams']
    function controller ($http, $state, $stateParams) {
    const vm = this
    vm.findById = findById
    const postId = $stateParams.id;

    function findById(id) {
        $http.get('/api/posts/'+id).then(res => {
          vm.post=res.data
        })
      }

    vm.$onInit = function () {
      console.log(postId)
      findById(postId)
    }

    vm.editPost = function (e) {
      e.preventDefault()
      console.log(vm.post)
      $http
        .patch('/api/posts/' + postId, vm.post)
        .then(res => $state.go("home"))
        .catch(err => console.log(err))
    }
}

}());
