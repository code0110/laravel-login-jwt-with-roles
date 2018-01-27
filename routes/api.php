<?php

use Illuminate\Http\Request;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/
Route::post('/user/login', [
    'uses' => 'JwtController@index',
    'as' => 'signin'
]);

Route::post('/user/logout', [
    'uses' => 'JwtController@logout',
    'as' => 'logout'
]);

Route::post('/user/token', [
    'uses' => 'JwtController@createtoken',
    'as' => 'token',
    'middleware' => 'jwt.refresh'
]);

Route::post('/user/register', [
    'uses' => 'JwtController@register',
    'as' => 'register'
]);

Route::post('/dashboard', [
    'uses' => 'DashboardController@index',
    'as' => 'dashboard',
    'middleware' => 'jwt.auth'
]);

Route::get('/user', [
    'uses' => 'JwtController@user',
    'as' => 'user',
    'middleware' =>'auth:api'
]);
