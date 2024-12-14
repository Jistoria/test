<?php

namespace App\Http\Controllers\Property;

use App\Http\Controllers\Controller;
use App\Services\Property\PropertyTypeService;
use Illuminate\Http\Request;

class PropertyTypeController extends Controller
{
    public function __construct(
        protected PropertyTypeService $propertyTypeService
    )
    {
        //
    }

    public function pluckPropertyTypes()
    {
        return response()->json($this->propertyTypeService->getPluck(), 200);
    }
}
