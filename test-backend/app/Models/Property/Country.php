<?php

namespace App\Models\Property;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Country extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = ['country_name'];

    protected $hidden = ['created_at', 'updated_at', 'deleted_at'];

    public function states()
    {
        return $this->hasMany(State::class);
    }

    public function locations()
    {
        return $this->hasMany(Location::class);
    }
}
