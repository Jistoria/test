<?php

namespace App\Models\Reservation;

use App\Models\Property\Property;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Reservation extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = [
        'user_id',
        'property_id',
        'start_date',
        'end_date',
        'total_nights',
        'total_price',
    ];

    protected $hidden = ['created_at', 'updated_at', 'deleted_at'];

    // Relación con el modelo User
    public function user()
    {
        return $this->belongsTo(User::class);
    }

    // Relación con el modelo Property
    public function property()
    {
        return $this->belongsTo(Property::class);
    }
}
