<?php

namespace App\Http\Controllers\Reservation;

use Illuminate\Http\Request;

use App\Http\Controllers\Controller;
use App\Services\Property\PropertyService;
use App\Services\Reservation\ReservationService;

class ReservationController extends Controller
{
    public function __construct(
        protected ReservationService $reservationService
    )
    {

    }

    public function index(Request $request)
    {
        try {
            $data = $this->reservationService->fetchListByUser($request->user()->id);
            return response()->json($data, 200);
        } catch (\Exception $e) {
            return response()->json(['message' => $e->getMessage()], 401);
        }
    }

    public function store(Request $request, PropertyService $propertyService)
    {
        $request->validate([
            'start_date' => 'required|date',
            'end_date' => 'required|date',
            'property_id' => 'required|integer',
            'total_nights' => 'required|integer',
            'total_price' => 'required|numeric',
        ]);

        try {
            $data = $propertyService->checkAvailability($request->all(), $request->property_id);
            if (!$data) {
                return response()->json(['message' => 'Las fechas seleccionadas no están disponibles.'], 401);
            }
            $data = $this->reservationService->create($request->all(), $request->user()->id);
            return response()->json($data, 201);
        } catch (\Exception $e) {
            return response()->json(['message' => $e->getMessage()], 401);
        }
    }



}
