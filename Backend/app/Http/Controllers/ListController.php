<?php

namespace App\Http\Controllers;
use App\Models\Lists;
use App\Models\Favorites;
use Illuminate\Support\Facades\DB;
use Illuminate\Http\Request;

class ListController extends Controller
{
    //
    public function newlist(Request $request)
    { 
        if (auth()->check()) {
        $user_id = auth()->user()->id;
        $lists = new Lists();
        $lists->name = $request->name;
        $lists->users_id =$user_id;
        $favorites  =Favorites::where('users_id',1)->get(); 
       /*  $lists->favorites = Lists::where('id', $favorites->lists_id); */
        $lists->save();
        return ['list' => $lists];  }else {
            return ['we could not validate you, please log in and try again' => 400];
       
    }
}
 /*    DB::statement("ALTER TABLE 'favorites' WHERE('user_id' $user_id)ADD('list' $lists)"); */
        /* DB::statement("ALTER TABLE lists WHERE($lists)ADD(favorites  $favorites)");*/
        /* ->orWhere( 'users_id',auth()->user()->id) */
        public function getList($id){
            if (auth()->check()) {
            $lists = DB::table('lists')->where('name', $id)->first();
            $favorites = Favorites::where('list_name', $lists->name)->get();  
            $user = auth()->user();
            if( $lists->users_id != $user->id){
                return ['error'=> 'This list name is taken please Take another unique name'];
            } else return ['lists'=> ['list'=> $lists, 'favorites'=> $favorites]];
            } else {
                return ['error'=>['we could not validate you, please log in and try again' => 400]];
           
        }
        }
    
        public function userLists(){
            $lists = Lists::where('users_id',auth()->user()->id)->get(); 
            return ['lists'=> $lists];
           
         /*    $favorites  =Favorites::where('users_id',auth()->user()->id)->get();  */  
        }

        public function destroy(Request $request)
    {
        if (auth()->check()) {
            $lists = Lists::where('name', $request->id)->first();
            Favorites::where('list_id', $lists->id)->delete();
            $lists->delete();
            return ['message' => 'The List has been deleted'];
        } else {
            return ['we could not validate you, please log in and try again' => 400];
        }
    }
}
