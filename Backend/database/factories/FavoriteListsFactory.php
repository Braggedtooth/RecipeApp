<?php

namespace Database\Factories;

use App\Models\FavoriteLists;
use Illuminate\Database\Eloquent\Factories\Factory;

class FavoriteListsFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var string
     */
    protected $model = FavoriteLists::class;

    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition()
    {
        return [
            'users_id' =>\App\Models\User::inRandomOrder()->value('id') ,
            'recipe_id' =>\App\Models\favorite::all()
            //
        ];
    }
}
