<?php

namespace App\Models\Property;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Availability extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = ['property_id', 'start_date', 'end_date'];

    protected $hidden = ['created_at', 'updated_at', 'deleted_at'];

    public function property()
    {
        return $this->belongsTo(Property::class);
    }
}
