// script.js

    // create the module and name it scotchApp
        // also include ngRoute for all our routing needs
    var scotchApp = angular.module('scotchApp', ['ngRoute']);
	var currentUser = {
		userName:"",
		password:""
	};
	window.isManeger = false;

	var addUser = function(){
		var newUser = {
			fullName: document.getElementById("fullN").value,
			userName: document.getElementById("userN").value,
			password: document.getElementById("passW").value,
			numBranch: document.getElementById("bNum").value,
			userType: document.getElementById("uType").value
		}  
	}
	
	var logIn = function(){
		currentUser.userName = document.getElementById("uname").value;
		currentUser.password = document.getElementById("pwd").value; 
		$.ajax({ url:"http://localhost:5557/Login",
                type: "POST",     
                data:{
                userName: currentUser.userName,
                password: currentUser.password
            },
            success: function(data){
            if(-1 !== data.indexOf("מנהל")){
                isManeger = true;
                }
            },
            error: function(e){
                
            }
        })               
    }
	
	
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
            $routeProvider.when('/user_Management', {
                templateUrl : 'pages/user_Management.html',
                controller  : 'user_ManagementController'
            })
			// route to login page
			// .when('/login', {
            //    templateUrl : 'pages/login.html',
            //   controller  : 'loginController'
            //})
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
    scotchApp.controller('user_ManagementController',function($scope,$http) {
		if(isManeger){
			$http.get("http://localhost:5557/userslist").success(function(data){
			$scope.userslist = data;
		});
		}
        else{
            alert("לא חמוד");
        }
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