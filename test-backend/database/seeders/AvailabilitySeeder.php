<?php

namespace Database\Seeders;

use App\Models\Property\Availability;
use Illuminate\Database\Seeder;


class AvailabilitySeeder extends Seeder
{
    public function run()
    {
        Availability::factory()->count(1)->create();
    }
}
