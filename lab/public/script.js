// script.js

    // create the module and name it scotchApp
        // also include ngRoute for all our routing needs
    var scotchApp = angular.module('scotchApp', ['ngRoute']);

    // configure our routes
    scotchApp.config(function($routeProvider) {
        $routeProvider
            // route to home page
			.when('/home', {
                templateUrl : 'pages/home.html',
                controller  : 'homeController'
            })
			
			// route to catalog page
            .when('/catalog', {
                templateUrl : 'pages/catalog.html',
                controller  : 'catalogController'
            })

            // route to user_Management page
            .when('/user_Management', {
                templateUrl : 'pages/user_Management.html',
                controller  : 'accountController'
            })
			// route to login page
			 .when('/login', {
                templateUrl : 'pages/login.html',
                controller  : 'loginController'
            })
			// route to about page
			.when('/about', {
                templateUrl : 'pages/about.html',
                controller  : 'aboutController'
            })
            // route to contact page
			.when('/contact', {
                templateUrl : 'pages/contact.html',
                controller  : 'contactController'
            })
            // route to branches page
            .when('/branches', {
                templateUrl : 'pages/branches.html',
                controller  : 'branchesController'
            });
			
			
    });

    // create the controller and inject Angular's $scope
    scotchApp.controller('main_Controller', function($scope) {
    });

    scotchApp.controller('aboutController', function($scope) {
     
    });
	
	var brancheslist = [];
	scotchApp.controller('branchesController', function($scope,$http) {
		$http.get("http://localhost:5557/branches").success(function(data){
			$scope.brancheslist = data;
		});
		
    });
	var flowerslist = [];
    scotchApp.controller('catalogController', function($scope,$http) {
		$http.get("http://localhost:5557/flowerslist").success(function(data){
			$scope.flowerslist = data;
		});
	
    });
	var userslist = [];
    scotchApp.controller('accountController',function($scope,$http) {
		$http.get("http://localhost:5557/userslist").success(function(data){
			$scope.userslist = data;
		});
		
    });

	
	//**************************************************************************
	scotchApp.controller('loginController', function($scope, $http) {
      // create a blank object to handle form data.
        $scope.user = {};
		var formData = new FormData();
      // calling our submit function.
       $scope.submitForm = function() {
	//var uname = $scope.user_name;
	//var pwd = $scope.pass;
	$.ajax({
	 url : "/login2",
    type: "POST",
	data : formData,
    success: function(data, textStatus, jqXHR)
    {
        //data - response from server
    },
    error: function (jqXHR, textStatus, errorThrown)
    {
 
    }
})		
	
	
	}
});	
    
$scope.myFilter = function (item) { 
			return item === color; 
			};