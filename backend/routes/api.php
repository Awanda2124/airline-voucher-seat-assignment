<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\VoucherController;

Route::post('/check', [VoucherController::class, 'check']);
Route::post('/generate', [VoucherController::class, 'generate']);

Route::get('/vouchers', [VoucherController::class, 'index']);
Route::get('/vouchers/{voucher}', [VoucherController::class, 'show']);
