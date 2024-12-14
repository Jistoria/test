<?php

namespace Database\Seeders;

use App\Models\Property\State;
use Illuminate\Database\Seeder;


class StateSeeder extends Seeder
{
    public function run()
    {
        $states = [
            ['country_id' => 1, 'state_name' => 'California'],
            ['country_id' => 1, 'state_name' => 'New York'],
            ['country_id' => 2, 'state_name' => 'Catalonia'],
            ['country_id' => 2, 'state_name' => 'Andalusia'],
            ['country_id' => 3, 'state_name' => 'Jalisco'],
        ];

        foreach ($states as $state) {
            State::create($state);
        }
    }
}
