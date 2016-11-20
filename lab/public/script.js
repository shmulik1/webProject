// script.js



    // create the module and name it scotchApp
        // also include ngRoute for all our routing needs
    var scotchApp = angular.module('scotchApp', ['ngRoute']);
	var currentUser = {
		user:"",
		password:""
	};
	window.isManager = false;
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


//scotchApp.run(function ($rootScope) {
//    $rootScope.$on('scope.stored', function (event, data) {
//        console.log("scope.stored", data);
//        alert ("scope.stored : " + data);
//    });
//});
//
//scotchApp.factory('Scopes', function ($rootScope) {
//    var mem = {};
//
//    return {
//        store: function (key, value) {
//            $rootScope.$emit('scope.stored', key);
//            mem[key] = value;
//        },
//        get: function (key) {
//            return mem[key];
//        }
//    };
//});


scotchApp.controller('logIn_Controller', function ($scope){


    //alert('enter to logIn_Controller');

    $scope.logIn = function(){
        //alert('enter to logIn function');

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
            success: function(data ,$scope) {
                //alert("success + data: " + data);
                if ('user or password is incorrect' === data) {
                    alert('user or password is incorrect');
                    isManager = false;
                    isWorker  = false;
                    document.getElementById('user_management_li').style.display = "none";
                }
                else if(-1 !== data.indexOf("manager")){
                    window.isManager = true;
                    isWorker = false;
                    //alert("success + isManager: " + isManager);
                    document.getElementById('user_management_li').style.display = "block";
                }
                else if(-1 !== data.indexOf("employee")){
                    window.isWorker = true;
                    isManager = false;
                    //alert("success + isWorker: " + isWorker);
                    document.getElementById('user_management_li').style.display = "block";
                }
                //var type = data[0].accountType;
                //if (type === "manager") {
                //    isManager = true;
                //}
                //if (type === "employee") {
                //
                //    isWorker = true;
                //}
                Scopes.get('navBar_Controller').show_user_management_li();
            },
            error: function(e){
            }
        })
    }

    $scope.logOut = function(){
        $scope.user = "";
        $scope.password = "";
        isManager = false;
        isWorker = false;
        alert("נותקת בהצלחה");
        document.getElementById('user_management_li').style.display = "none";
    }



});
	
    // configure our routes
    scotchApp.config(function($routeProvider) {
        $routeProvider
            // route to home page
			//.when('/home', {
            //    templateUrl : 'pages/home.html',
            //    controller  : 'homeController'
            //})
			
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

    // create the controller and inject Angular's $scope
    scotchApp.controller('navBar_Controller', function ($scope) {
        //alert('enter to navBar_Controller');
        //$scope.user_management_li = false;
//
//
//
        //$scope.show_user_management_li = function () {
        //    alert('enter to show_user_management_li function');
        //    var show_management = (isWorker == true || isManager == true);
        //    if (show_management){
        //        $scope.user_management_li = true;
        //        alert('user_management_li ' +  $scope.user_management_li);
        //    }
        //    else{
        //        $scope.user_management_li = false;
        //        alert('user_management_li ' +  $scope.user_management_li);
        //   }
        //}
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
		if(isManager){
            alert("Hello Manager - Access Granted");
			$http.get("http://localhost:5557/userslist").success(function(data){
			$scope.userslist = data;
		});
		}
        else if(isWorker){
            alert("Hello Worker - Access Granted");
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

