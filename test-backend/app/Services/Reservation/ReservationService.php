<?php

namespace App\Services\Reservation;

use App\Models\Reservation\Reservation;

class ReservationService
{
    public function __construct(
        protected Reservation $reservation
    )
    {

    }

    public function create(array $data, $id): Reservation
    {
        return $this->reservation->create([
            'start_date' => $data['start_date'],
            'end_date' => $data['end_date'],
            'property_id' => $data['property_id'],
            'total_nights' => $data['total_nights'],
            'total_price' => $data['total_price'],
            'user_id' => $id
        ]);
    }

    public function fetchListByUser(int $id)
    {
        return $this->reservation->where('user_id', $id)->with(['property.location', 'property.propertyType', 'user'])->get();
    }



}
