<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\FavoriteController;
use App\Http\Controllers\ListController;
use App\Http\Controllers\ListsController;

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
    
Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});

Route::group([
    'middleware' => 'api',
    'prefix' => 'auth'

], function ($router) {
    Route::post('login', 'AuthController@login');
    Route::post('register', 'AuthController@register');
    Route::post('logout', 'AuthController@logout');
    Route::post('refresh', 'AuthController@refresh');
    Route::get('user-profile', 'AuthController@userProfile');
    Route::get('logout', 'AuthController@logout');
    Route::post('newFavorites', 'FavoriteController@store');
    Route::post('delFav', 'FavoriteController@destroy');
    Route::post('newList', 'ListController@newlist' );
    Route::get('list/{id}', 'ListController@getList');
    Route::get('userLists', 'ListController@userLists');
    Route::post('delList', 'ListController@destroy');

});


