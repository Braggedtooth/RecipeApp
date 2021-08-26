<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Lists extends Model
{
    use HasFactory;
    protected $fillable = [
     'name'
    ];
        
 /*    DB::statement('CREATE TABLE lists AS(SELECT recipe_id, recipe_name FROM favorites where user_id = $id ; */
 public function user()
 {
     return $this->belongsTo(\App\Models\User::class);
 }
     public function favorites()
    {
        return $this->hasMany(\App\Models\Favorites::class);
    }
}
