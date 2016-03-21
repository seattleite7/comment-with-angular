angular.module('comment', [])
.controller("MainCtrl", [
   '$scope', '$http',
   function($scope, $http) {
      $scope.test = 'Hello';
      console.log("hi!");
       $scope.create = function(comment) { 
             return $http.post('/comments', comment).success(function(data){
                $scope.comments.push(data); 
             }); 
       };
      
      console.log("current comments: ");
      console.log($scope.comments);
      $scope.addComment = function() {
       if ($scope.formContent === '') {return;}

       console.log("adding comment:");
       console.log($scope.formContent);
       $scope.create({
         title: $scope.formContent,
         upvotes: 0,
       }); 
      // $scope.comments.push({title:$scope.formContent, upvotes:0});
       $scope.formContent='';
     };
      $scope.upvote = function(comment) {
        return $http.put('/comments/' + comment._id + "/upvote")
               .success(function(data){
                  console.log('upvote worked');
                  comment.upvotes += 1;
               });
      }; 
      $scope.downvote = function(comment) {
        return $http.put('/comments/' + comment._id + "/downvote")
               .success(function(data){
                  console.log('downvote worked');
                  comment.upvotes -= 1;
               });
      };
      $scope.getAll = function() {
        return $http.get('/comments').success(function(data){
          console.log("getall success");
          console.log(data);
          $scope.comments = [];
          angular.copy(data, $scope.comments);
          console.log($scope.comments);
        });
      };
      $scope.getAll();

   }  


   

]).controller("RevCtrl", [ '$scope',  function($scope) {
              
       console.log("in reverser");
       $scope.tt = "";
       $scope.rev = "";
       $scope.doReverse = function() {
         console.log("in doreverse");
         $scope.rev = "";
         for (var i = 0; i < $scope.tt.length; i++) {
           $scope.rev = $scope.tt.charAt(i) + $scope.rev;

          }
        //  return $scope.rev;

      };
}]);
