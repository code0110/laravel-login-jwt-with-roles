var app = angular.module('JWTApp', [
  'ngRoute'
])
.factory('AuthService', function ($http, $window) {
    var user = {};

    return {
        setUser: function(details) {
            user = details;
            $window.localStorage['token'] = details.token;
            return this;
        },
        getUser: function() {
            return user.data;
        },
        getToken: function() {
            return user.token ? user.token : $window.localStorage['token'];
        },
        isLoggedIn: function() {
            return user.success ? true : false;
        },
        loginAttempt: function(username, password) {
            return $http({
                method: 'POST', 
                data: {'email': username, 'password':password},
                url: '/api/user/login'
            });
        },
        checkToken: function(token) {
            return $http({
                method: 'POST',
                url: '/api/user/token?token='+ token
            });
        },
        logout: function() {
            user = {};
            $window.localStorage.removeItem('token');
            console.log($window.localStorage['token']);
            return $http({
                method: 'POST', 
                url: '/api/user/logout'
            });
        },
        register: function(details) {
            return $http({
                method: 'POST',
                data: details,
                url: '/api/user/register'
            });
        }
    }
})
.factory('Dashboard', function ($http) {
    var token;

    return {
        setToken: function(val) {
            token = val;
            return this;
        },
        getDashboard: function() {
            return $http({
                method: 'POST', 
                url: '/api/dashboard?token='+ token
            });
        }
    }
})
.controller('MainController', ['$scope', '$location', '$window', '$route', 'AuthService', 'Dashboard', function($scope, $location, $window, $route, $auth, $dashboard) {
    
    $scope.visible = false;

    if (!$auth.isLoggedIn() && typeof $auth.getToken() !== 'undefined') {
        $auth.checkToken($auth.getToken()).success(function(response) {
            
            if(response.success) {
                $scope.visible = true;
                $auth.setUser(response);
                $scope.$root.user = $auth.getUser();
                $route.reload();

                return;
            }

            $auth.logout();
            $location.path('/login');
        }).error(function(){
            $auth.logout();
            $location.path('/login');
        });

        return;
    }

    if( !$auth.isLoggedIn() ) {
        $location.path('/login');
        return;
    }

    $dashboard.setToken($auth.getToken());

    $dashboard.getDashboard().success(function(response){
        $scope.visible = true;
    });

}])
.controller('UserController', ['$scope', '$location', '$window', 'AuthService', function($scope, $location, $window, $auth) {

    $scope.getTemplate = function(success, fail) {
        return $auth.isLoggedIn() ? success : fail;
    }

    if($location.path() == '/logout') {
        $auth.logout();
        $location.path('/login');
        return;
    }

    if( $auth.isLoggedIn() ) {
        $location.path('/');
        return;
    }

    $scope.loginForm = function() {
        $auth.loginAttempt(this.email, this.password).success(function(response) {

            if (response.success) {
                $auth.setUser(response);
                $scope.$root.user = $auth.getUser();

                $location.path('/');
                return;
            }

            alert('Wrong Details!');
        });
    }

    $scope.registerForm = function() {
        $auth.register({'name':this.name, 'email':this.email, 'password':this.password}).success(function(response) {
            
            if (response.success) {
                $window.localStorage['token'] = response.token;

                $location.path('/');
                return;
            }

            alert('Error!');
        });
    }

}])
.config(['$routeProvider', function($routeProvider) {
    
    $routeProvider
	.when("/", {templateUrl: "partials/main.html", controller: "MainController"})
    .when("/register", {templateUrl: "partials/signup.html", controller: "UserController"})
	.when("/login", {templateUrl: "partials/login.html", controller: "UserController"})
    .when("/logout", {templateUrl: "partials/login.html", controller: "UserController"})
	.otherwise({redirectTo: '/'});
}]);