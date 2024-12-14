<?php

namespace Database\Factories\Property;

use App\Models\Property\Location;
use App\Models\Property\Property;
use App\Models\Property\PropertyType;
use Illuminate\Database\Eloquent\Factories\Factory;

class PropertyFactory extends Factory
{
    protected $model = Property::class;

    public function definition()
    {
        return [
            'name' => $this->faker->sentence(3),
            'location_id' => Location::inRandomOrder()->first()->id,
            'property_type_id' => PropertyType::inRandomOrder()->first()->id,
            'price_per_night' => $this->faker->randomFloat(2, 50, 500),
            'description' => $this->faker->paragraph(3),
            'image_url' => $this->faker->imageUrl(),
        ];
    }
}
