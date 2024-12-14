<?php

namespace App\Services\Property;

use App\Models\Property\PropertyType;

class PropertyTypeService
{
    public function __construct(
        protected PropertyType $propertyType
    )
    {
        //
    }

    public function getPluck()
    {
        return $this->propertyType->pluck('type_name', 'id');
    }
}
