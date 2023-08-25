<?php

use App\Http\Controllers\Dashboard\ClientController;
use App\Http\Controllers\Dashboard\CommandController;
use App\Http\Controllers\Dashboard\DashboardController;
use App\Http\Controllers\Dashboard\SectionController;
use App\Http\Controllers\Dashboard\DoctorController;
use Illuminate\Support\Facades\Route;
use Mcamara\LaravelLocalization\Facades\LaravelLocalization;

/*
|--------------------------------------------------------------------------
| Backend Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/



Route::get('/Dashboard_Admin', [DashboardController::class, 'index']);


Route::group(
    [
        'prefix' => LaravelLocalization::setLocale(),
        'middleware' => [ 'localeSessionRedirect', 'localizationRedirect', 'localeViewPath' ]
    ], function(){


   //################################ dashboard user ##########################################
    Route::get('/dashboard/user', function () {
        return view('Dashboard.users.dashboard');
    })->middleware(['auth'])->name('dashboard.user');
    //################################ end dashboard user #####################################



    //################################ dashboard admin ########################################
    Route::get('/dashboard/admin', function () {
        return view('Dashboard.admins.dashboard');
    })->middleware(['auth:admin'])->name('dashboard.admin');

    //################################ end dashboard admin #####################################

    Route::middleware(['auth:admin'])->prefix('admin')->group(function () {
        //############################# clients route ##########################################
        Route::resource('clients', ClientController::class);
        //############################# end clients route ######################################
        //############################# commands route ##########################################
        Route::resource('commands', CommandController::class);
        Route::get('/Cars/{id}', [CommandController::class, 'show']);
        //############################# end commands route ######################################
    });

    require __DIR__.'/auth.php';

});
