<?php

namespace Database\Seeders;

use App\Models\Property\Location;
use Illuminate\Database\Seeder;


class LocationSeeder extends Seeder
{
    public function run()
    {
        $locations = [
            ['state_id' => 1, 'country_id' => 1, 'city' => 'Los Angeles', 'address' => '123 Sunset Blvd'],
            ['state_id' => 3, 'country_id' => 2, 'city' => 'Barcelona', 'address' => '456 La Rambla'],
            ['state_id' => 5, 'country_id' => 3, 'city' => 'Guadalajara', 'address' => '789 Avenida México'],
        ];

        foreach ($locations as $location) {
            Location::create($location);
        }
    }
}
