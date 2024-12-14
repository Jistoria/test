<?php

namespace App\Services\Property;

use App\Models\Property\Property;
use Illuminate\Database\Eloquent\Collection;

class PropertyService
{
    public function __construct(
        protected Property $property
    )
    {

    }


    public function fetchList() : Collection
    {
        return $this->property->limit(10)->get();
    }

    public function fetchById(int $id) : Property
    {
        return $this->property->findOrFail($id);
    }

    public function fetchByIdWithRelations(int $id) : Property
    {
        return $this->property->with(['location.state', 'location.country','availability'])->findOrFail($id);
    }

    public function checkAvailability(array $data, int $id) : bool
    {
        $property = $this->property->findOrFail($id);
        $availability = $property->availability()->where('start_date', '<=', $data['start_date'])
            ->where('end_date', '>=', $data['end_date'])
            ->first();

        $occupancy = $property->reservations()->where('start_date', '<=', $data['start_date'])
            ->where('end_date', '>=', $data['end_date'])
            ->first();

        return $availability && !$occupancy;
    }
}