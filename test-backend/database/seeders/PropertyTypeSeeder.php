<?php

namespace Database\Seeders;

use App\Models\Property\PropertyType;
use Illuminate\Database\Seeder;


class PropertyTypeSeeder extends Seeder
{
    public function run()
    {
        $types = ['Apartment', 'House', 'Cabin', 'Villa', 'Studio'];

        foreach ($types as $type) {
            PropertyType::create(['type_name' => $type]);
        }
    }
}
