<?php

use App\Http\Controllers\Auth\AuthController;
use App\Http\Controllers\Property\PropertyController;
use App\Http\Controllers\Property\PropertyTypeController;
use App\Http\Controllers\Reservation\ReservationController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;


Route::get('user', function (Request $request) {
    return $request->user();
})->middleware('auth:api');

Route::post('login', [AuthController::class, 'authLogin'])->middleware('guest:api');
Route::post('register', [AuthController::class, 'authRegister'])->middleware('guest:api');
Route::post('logout', [AuthController::class, 'authLogout'])->middleware('auth:api');


Route::apiResource('properties', PropertyController::class);


Route::post('cancel-reservation/{property}', [PropertyController::class, 'cancelReservation'])->middleware('auth:api');
Route::post('check-availability/{property}', [PropertyController::class, 'checkAvailability'])->middleware('auth:api');

Route::apiResource('reservations', ReservationController::class)->middleware('auth:api');


Route::get('pluck-property-types', [PropertyTypeController::class, 'pluckPropertyTypes']);
