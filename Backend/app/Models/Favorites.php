<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;


class Favorites extends Model
{
    use HasFactory;
    protected $fillable = [
        'recipe_id',
        'recipe_name',

    ];
   /*  public function addedBy(User $user)
    {
        return $this->favoritelist->contains('user_id', $user->id);
    } */
    public function user()
    {
        return $this->belongsTo(User::class);
    } 

    public static function isAdded($userId, $recipeId)
    {
        $isAdded = Favorites::where([
            ['user_id', $userId],
            ['recipe_id', $recipeId]])->first();

        return $isAdded;
    }

    public static function isFavorite($userId)
    {
        $isFavorite = Favorites::where(
            ['user_id', $userId])->first();

        return $isFavorite;
}
    /* public function addRecipes(){

        return $this->hasMany(\App\Models\AddRecipe::class);
    }
*/
    public function favoritelist()
    {
        return $this->belongsTo(\App\Models\Lists::class);
    } 
}
