<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\CheckVoucherRequest;
use App\Http\Requests\GenerateVoucherRequest;
use App\Http\Resources\VoucherResource;
use App\Models\Voucher;
use App\Services\SeatGeneratorService;
use Illuminate\Database\QueryException;

class VoucherController extends Controller
{
    public function index()
    {
        $vouchers = Voucher::latest()->get();

        return response()->json([
            'success' => true,
            'data' => VoucherResource::collection($vouchers),
        ]);
    }

    public function show(Voucher $voucher)
    {
        return response()->json([
            'success' => true,
            'data' => new VoucherResource($voucher),
        ]);
    }

    public function check(CheckVoucherRequest $request)
    {
        $exists = Voucher::where('flight_number', $request->flightNumber)
            ->where('flight_date', $request->date)
            ->exists();

        return response()->json([
            'exists' => $exists,
        ]);
    }

    public function generate(
        GenerateVoucherRequest $request,
        SeatGeneratorService $seatGenerator
    ) {
        $exists = Voucher::where('flight_number', $request->flightNumber)
            ->where('flight_date', $request->date)
            ->exists();

        if ($exists) {
            return response()->json([
                'success' => false,
                'message' => 'Voucher pernah dibuat untuk flight dan tanggal tersebut.',
            ], 409);
        }


        $seats = $seatGenerator->generate($request->aircraft);


        try {

            Voucher::create([
                'crew_name' => $request->name,
                'crew_id' => $request->id,
                'flight_number' => $request->flightNumber,
                'flight_date' => $request->date,
                'aircraft_type' => $request->aircraft,
                'seat1' => $seats[0],
                'seat2' => $seats[1],
                'seat3' => $seats[2],
            ]);


            return response()->json([
                'success' => true,
                'seats' => $seats,
            ], 201);


        } catch (QueryException $e) {

            return response()->json([
                'success' => false,
                'message' => 'Voucher pernah dibuat untuk flight dan tanggal tersebut.',
            ], 409);
        }
    }
}
