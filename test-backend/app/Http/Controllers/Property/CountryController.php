<?php

namespace App\Http\Controllers\Property;

use App\Http\Controllers\Controller;
use App\Services\Property\CountryService;
use Illuminate\Http\Request;

class CountryController extends Controller
{
    public function __construct(
        protected CountryService $countryService
    )
    {
        //
    }

    public function index()
    {
        //
    }

    public function store(Request $request)
    {
        //
    }

    public function show($id)
    {
        //
    }

    public function update(Request $request, $id)
    {
        //
    }

    public function destroy($id)
    {
        //
    }
}
