<!DOCTYPE html>
<html lang="en" ng-app="JWTApp">
    <head>
        <meta charset="utf-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
    	<meta name="viewport" content="width=device-width, initial-scale=1">
    	<link rel="icon" href="img/favicon.ico">

        <title>Laravel Login - Register JWT</title>

        <!-- Fonts -->
		<link href='https://fonts.googleapis.com/css?family=Titillium+Web:400,200,200italic,300,300italic,400italic,600,700,600italic,700italic,900' rel='stylesheet' type='text/css'>
        
        <!-- Styles -->
        <link href="{{ asset('css/bootstrap.min.css') }}" rel="stylesheet" type="text/css">
        <link href="{{ asset('css/bootstrap-theme.min.css') }}" rel="stylesheet" type="text/css">
        <link href="{{ asset('css/style.css') }}" rel="stylesheet" type="text/css">
        
		<!--[if lt IE 9]>
	    	<script src="https://oss.maxcdn.com/html5shiv/3.7.3/html5shiv.min.js"></script>
	    	<script src="https://oss.maxcdn.com/respond/1.4.2/respond.min.js"></script>
	    <![endif]-->

    </head>
    <body>
    	<header ng-controller="UserController" id="navbar" ng-include="getTemplate('partials/menu_user.html')">

		</header>

        <div class="container" ng-view></div>
        <div class="brand">
            <a href="http://www.botezatu-catalin.ro" target="_blank">
                <img class="img-responsive" src="img/logo.png">
            </a>
         </div>
        <script type="text/javascript" src="{{ asset('js/jquery.min.js') }}"></script>
        <script type="text/javascript" src="{{ asset('js/bootstrap.min.js') }}"></script>
        <script type="text/javascript" src="{{ asset('js/angular.min.js') }}"></script>
        <script type="text/javascript" src="{{ asset('js/angular-route.min.js') }}"></script>
        <script type="text/javascript" src="{{ asset('js/jwtapp.js') }}"></script>
    </body>
</html>
