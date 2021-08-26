<?php

namespace App\Http\Controllers;


use App\Models\Favorites;
use Illuminate\Auth\Events\Authenticated;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Tymon\JWTAuth;

class FavoriteController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    
    public function index()
    {
        if (Auth::guard('api')->check()) {
            $favorite =Favorites::where('users_id', auth()->user()->id)->all();
            return ['favourites' =>$favorite ];
        } else {
            return ['we could not validate you, please log in and try again' => 400];
        }
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)

    { 
        
      if (Auth::guard('api')->check()) { 
            $favorite = new Favorites();
            $favorite ->recipe_id= $request-> recipe_id;
            $favorite ->recipe_name = $request -> recipe_name;
            $favorite->users_id =  Auth::user()->id; 
            if($request ->list_name === null){
    
                $favorite->list_name = 'default';
            }else {
                $favorite->list_name = $request->list_name;
            }
            
            $favorite-> save(); 
            
           return ['favourites' =>$favorite ];
        } else {
            return ['we could not validate you, please log in and try again' => 400];
        } 
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\favorite  $favorite
     * @return \Illuminate\Http\Response
     */

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\favorite  $favorite
     * @return \Illuminate\Http\Response
     */
    public function edit(Favorites $favorite)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\favorite  $favorite
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Favorites $favorite)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\favorite  $favorite
     * @return \Illuminate\Http\Response
     */
    public function destroy(Request $request)
    {
        if (Auth::guard('api')->check()) {
            
            $favorite = Favorites::where('recipe_id', $request->id)->first();
            $favorite->delete();
            return ['message' => 'The favourite has been deleted', ];
        } else {
            return ['we could not validate you, please log in and try again' => 400];
        }
    }
}
