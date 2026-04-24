<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\ContactMessageController;
use App\Http\Controllers\Api\BookingRequestController;

/*
|--------------------------------------------------------------------------
| Whales Visual API Routes
|--------------------------------------------------------------------------
| All routes are prefixed with /api automatically by Laravel.
| Contact form: POST /api/contact
| Booking form: POST /api/booking
*/

Route::post('/contact', [ContactMessageController::class, 'store'])
    ->name('contact.store');

Route::post('/booking', [BookingRequestController::class, 'store'])
    ->name('booking.store');
