<?php

namespace App\Models\Property;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class PropertyType extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = ['type_name'];

    protected $hidden = ['created_at', 'updated_at', 'deleted_at'];

    public function properties()
    {
        return $this->hasMany(Property::class);
    }
}
