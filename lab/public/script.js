// script.js



    // create the module and name it scotchApp
        // also include ngRoute for all our routing needs
    var scotchApp = angular.module('scotchApp', ['ngRoute']);
	var currentUser = {
		user:"",
		password:""
	};
	window.isManeger = false;
    window.isWorker  = false;

	var addUser = function(){
		var newUser = {
			fullName: document.getElementById("fullN").value,
			userName: document.getElementById("userN").value,
			password: document.getElementById("passW").value,
			numBranch: document.getElementById("bNum").value,
			userType: document.getElementById("uType").value
		}  
	}


scotchApp.controller('logIn_Controller', function($scope){
    $scope.logOut = function(){
        $scope.user = "";
        $scope.password = "";
        isManeger = false;
        isWorker = false;
        alert("נותקת בהצלחה");
    }
    $scope.logIn = function(){
            currentUser.user = document.getElementById("login_username").value;
            currentUser.password = document.getElementById("login_password").value;
            //alert("this is document.getElementById('login_username'): " + document.getElementById("login_username"));
            //alert("this is document.getElementById('login_password'): " + document.getElementById("login_password"));
            //alert("this is currentUser.user: " + currentUser.user);
            //alert("this is currentUser.password: " + currentUser.password);
            //console.log("currentUser.user" + currentUser.user);
            //console.log("currentUser.password" + currentUser.password);
            $.ajax({ url:"http://localhost:5557/Login",
                type: "POST",
                data:{
                    user: currentUser.user,
                    password: currentUser.password
                },
                success: function(data) {
                    //alert("success + data: " + data);
                    if(-1 !== data.indexOf("manager")){
                        isManeger = true;
                        //alert("success + isManeger: " + isManeger);
                    }
                    //var type = data[0].accountType;
                    //if (type === "manager") {
                    //    isManeger = true;
                    //}
                    //if (type === "employee") {
//
                    //    isWorker = true;
                    //}
                },
                error: function(e){

                }
            })
        }
    });
	
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
            alert("Hello - Access Granted");
			$http.get("http://localhost:5557/userslist").success(function(data){
			$scope.userslist = data;
		});
		}
        else{
            alert("Hello - Access Denied");
        }
    });

	
	//**************************************************************************
	/*

	scotchApp.controller('loginController', function($scope, $http) {
	 *//*
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


			*/