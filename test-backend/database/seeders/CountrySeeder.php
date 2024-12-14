<?php

namespace Database\Seeders;

use App\Models\Property\Country;
use Illuminate\Database\Seeder;

class CountrySeeder extends Seeder
{
    public function run()
    {
        $countries = ['United States', 'Spain', 'Mexico', 'France', 'Germany'];

        foreach ($countries as $country) {
            Country::create(['country_name' => $country]);
        }
    }
}
