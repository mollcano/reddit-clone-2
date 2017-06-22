(function() {
  'use strict'

  angular.module('app')
    .component('postList', {
      controller: controller,
      templateUrl:  './js/posts/posts.html'
    })

    controller.$inject = ['$http']
    function controller ($http) {
    const vm = this

    vm.$onInit = function () {
      $http.get('/api/posts/').then((res) => {
        vm.posts = res.data
        return res.data
      })
    }
    vm.addPost = function () {
      console.log(vm.post)
      $http.post('/api/posts/', vm.post).then((res) => {
      vm.posts.push(res.data)
      })
      delete vm.post
    }
      vm.deletePost = function (e, data) {
        console.log(data)
        e.preventDefault()
        $http.delete('/api/posts/' + data['id']).then((res) => {
          vm.posts.splice(vm.posts.indexOf(data), 1)
        })
      }

      vm.showAddPost = function () {
        if (!vm.postForm){
          vm.postForm = true
        } else {
          vm.postForm = false
        }
      }
      vm.upvote = function(post){
        $http.post('/api/posts/'+post.id+'/votes', post).then((res) => {
          post.vote_count ++
        })
      }
      vm.downvote = function(post) {
          if(post.vote_count >= 1){
            $http.delete('/api/posts/'+post.id+'/votes', post).then((res) => {
            post.vote_count--
            })
          }
          else{
            post.vote_count = post.vote_count
          }
      }
      vm.addComment = function (post) {
        console.log(vm.comment)
        $http.post('/api/posts/'+post.id+'/comments', vm.comment).then((res)=> {
          post.comments.push(res.data)
        })
        delete vm.comment
      }

  }


}());
