(function(){
	var app = angular.module("myApp", []);

	app.controller("myController", ["$scope", function($scope){
		$scope.user1 = {
			name : "John Galt",
			address : {
				street: "PO Box 123",
				city: "Bengaluru",
				planet: "Pandora"
			},
			friends: [
				'Gowda',
				'Sundar',
				'KP'
			]
		}
		$scope.user2 = {
			name : "Byre Gowda",
			address : {
				street: "PO Box 143",
				city: "Peenya",
				planet: "Alpha Centuri"
			},
			friends: [
				'Uma',
				'Krishna',
				'Arasu'
			]
		}		
		
	}]);

	app.directive("userInfoCard", function(){
		return {
			restrict: "E",
			templateUrl: "userInfoCard.html",
			scope: {
				user: "=",
				initialCollapsed: '@collapsed'
			},
			controller: function($scope){				
				$scope.collapsedState = ($scope.initialCollapsed === "true")
				$scope.knightMe = function(user){
					user.rank = "Knight"
				}
				$scope.collapse = function(){
					$scope.collapsed = !$scope.collapsed;
				}

				$scope.removeFriend = function(friend){
					var idx = $scope.user.friends.indexOf(friend)
					if(idx > -1){
						$scope.user.friends.splice(idx, 1)
					}
				}						
			}
		}
	});

	app.directive("userAddress", function(){
		return {
			restrict : "E",
			scope: true,
			templateUrl: "userAddress.html",
			controller: function($scope){
				$scope.collapsed = false;
				$scope.collapseAddress = function(){
					$scope.collapsed = true;
				}	
				$scope.expandAddress = function(){
					$scope.collapsed = false;
				}							
			}
		}
	});

	app.directive("removeFriend", function(){
		return {
			restrict: "E",
			templateUrl: "removeFriend.html",
			scope: {
				notifyParent : '&method'
			},
			controller: function($scope){
				$scope.removing =false;

				$scope.startRemove = function(){
					$scope.removing = true;
				}
				$scope.cancelRemove = function(){
					$scope.removing = false;
				}	

				$scope.confirmFriend = function(){
					$scope.notifyParent({friend : 'Krishna'});
				}
			}
		}
	});
})()