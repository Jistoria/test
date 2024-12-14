<?php

namespace Database\Seeders;

use App\Models\Property\Property;
use Illuminate\Database\Seeder;

class PropertySeeder extends Seeder
{
    public function run()
    {
        Property::factory()->count(10)->create();
    }
}
