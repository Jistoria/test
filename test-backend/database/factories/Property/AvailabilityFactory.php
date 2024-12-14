<?php

namespace Database\Factories\Property;

use App\Models\Property\Availability;
use App\Models\Property\Property;
use Illuminate\Database\Eloquent\Factories\Factory;

class AvailabilityFactory extends Factory
{
    protected $model = Availability::class;

    public function definition()
    {
        $start_date = $this->faker->dateTimeBetween('now', '+1 month');
        $end_date = $this->faker->dateTimeBetween($start_date, '+2 months');

        return [
            'property_id' => Property::inRandomOrder()->first()->id,
            'start_date' => $start_date,
            'end_date' => $end_date,
        ];
    }
}
