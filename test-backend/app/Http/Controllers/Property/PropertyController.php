<?php

namespace App\Http\Controllers\Property;

use App\Http\Controllers\Controller;
use App\Services\Property\PropertyService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class PropertyController extends Controller
{
    public function __construct(
        protected PropertyService $propertyService
    )
    {

    }

    public function index(Request $request) : JsonResponse
    {
        try {
            $data = $this->propertyService->fetchList($request->all());
            return response()->json($data, 200);
        } catch (\Exception $e) {
            return response()->json(['message' => $e->getMessage()], 401);
        }
    }

    public function show($id) : JsonResponse
    {
        try {
            $data = $this->propertyService->fetchByIdWithRelations($id);
            return response()->json($data, 200);
        } catch (\Exception $e) {
            return response()->json(['message' => $e->getMessage()], 401);
        }
    }

    public function checkAvailability(Request $request, $property) : JsonResponse
    {
        $data = $request->validate([
            'start_date' => 'required|date',
            'end_date' => 'required|date'
        ]);

        try {

            $data = $this->propertyService->checkAvailability($data, $property);
            return $data ?
            response()->json([ 'available' => true,
            'message' => 'Las fechas seleccionadas están disponibles.',], 200) :

            response()->json(['available' => false,
            'message' => 'Las fechas seleccionadas no están disponibles.',], 200);
        } catch (\Exception $e) {
            return response()->json(['message' => $e->getMessage()], 401);
        }
    }
}
