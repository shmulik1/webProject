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
    window.isLogedIn  = false;

	var addUser = function(){
		var newUser = {
			fullName: document.getElementById("fullN").value,
			userName: document.getElementById("userN").value,
			password: document.getElementById("passW").value,
			numBranch: document.getElementById("bNum").value,
			userType: document.getElementById("uType").value
		}  
	}


scotchApp.controller('logIn_Controller', function ($scope){


    //alert('enter to logIn_Controller');

////////    $scope.logIn = function(){
////////        //alert('enter to logIn function');
////////
////////        currentUser.user = document.getElementById("login_username").value;
////////        currentUser.password = document.getElementById("login_password").value;
////////        //alert("this is document.getElementById('login_username'): " + document.getElementById("login_username"));
////////        //alert("this is document.getElementById('login_password'): " + document.getElementById("login_password"));
////////        //alert("this is currentUser.user: " + currentUser.user);
////////        //alert("this is currentUser.password: " + currentUser.password);
////////        //console.log("currentUser.user" + currentUser.user);
////////        //console.log("currentUser.password" + currentUser.password);
////////        $.ajax({ url:"http://localhost:5557/Login",
////////            type: "POST",
////////            data:{
////////                user: currentUser.user,
////////                password: currentUser.password
////////            },
////////            success: function(data ,$scope) {
////////                //alert("success + data: " + data);
////////                isLogedIn  = true;
////////                if ('user or password is incorrect' === data) {
////////                    alert('user or password is incorrect');
////////                    isManager = false;
////////                    isWorker  = false;
////////                    isLogedIn  = false;
////////                    document.getElementById('user_management_li').style.display = "none";
////////                }
////////                else if(-1 !== data.indexOf("manager")){
////////                    window.isManager = true;
////////                    isWorker = false;
////////                    //alert("success + isManager: " + isManager);
////////                    document.getElementById('user_management_li').style.display = "block";
////////                    user = data.indexOf('user');
////////                }
////////                else if(-1 !== data.indexOf("employee")){
////////                    window.isWorker = true;
////////                    isManager = false;
////////                    user = data.indexOf('user');
////////                    //alert("success + isWorker: " + isWorker);
////////                    document.getElementById('user_management_li').style.display = "block";
////////                }
////////                //var type = data[0].accountType;
////////                //if (type === "manager") {
////////                //    isManager = true;
////////                //}
////////                //if (type === "employee") {
////////                //
////////                //    isWorker = true;
////////                //}
////////                //Scopes.get('navBar_Controller').show_user_management_li();
////////            },
////////            error: function(e){
////////            }
////////        })
////////    }
////////
////////    $scope.logOut = function(){
////////        $scope.user = "";
////////        $scope.password = "";
////////        isManager = false;
////////        isWorker = false;
////////        alert("נותקת בהצלחה");
////////        document.getElementById('user_management_li').style.display = "none";
////////    }



});
	
    // configure our routes
    scotchApp.config(function($routeProvider) {
        $routeProvider
            // route to home page
			.when('/', {
                templateUrl : 'pages/about.html',
                controller  : 'aboutController'
            })
			
			// route to catalog page
            .when('/catalog', {
                templateUrl : 'pages/catalog.html',
                controller  : 'catalogController',
                controllerAs : 'catalog'
            })

            // route to user_Management page
            $routeProvider.when('/user_Management', {
                templateUrl : 'pages/user_Management.html',
                controller  : 'user_ManagementController'
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
                controller  : 'branchesController',
                controllerAs : 'branches'
            });
			
			
    });

    // create the controller and inject Angular's $scope
    scotchApp.controller('main_Controller', function($scope) {

    });

    // create the controller and inject Angular's $scope
    scotchApp.controller('navBar_Controller', function ($scope) {

    });


    scotchApp.controller('aboutController', function($scope) {

    });


    scotchApp.controller('contactController', function($scope) {

    });



	scotchApp.controller('branchesController', ['$http',
        function branchesController($http) {
            var scope = this;
            $http.get("http://localhost:5557/branches").then(function (response) {
                scope.brancheslist = response.data;
            }, function (response) {
                alert(response.statusText + " - " + response.data);
            });
    }]);



    scotchApp.controller('catalogController', ['$http', function flowersController($http) {
        var scope = this;
		$http.get("http://localhost:5557/flowerslist").then(function(response){
			scope.flowerslist = response.data;
		}, function (response) {
            alert(response.statusText + " - " + response.data);
        });
    }]);


	var userslist = [];
    scotchApp.controller('user_ManagementController',function($scope,$http) {
        $http.get("http://localhost:5557/userslist").success(function(data){
                    $scope.userslist = data;
                });

		//if(isManager){
        //    alert("Hello Manager - Access Granted");
		//	$http.get("http://localhost:5557/userslist").success(function(data){
		//	$scope.userslist = data;
		//});
		//}
        //else if(isWorker){
        //    alert("Hello Worker - Access Granted");
        //    $http.get("http://localhost:5557/userslist").success(function(data){
        //        $scope.userslist = data;
        //    });
        //}
        //else{
        //    alert("Hello - Access Denied");
        //}
    });//