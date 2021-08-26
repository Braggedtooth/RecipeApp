import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TokenService } from './shared/token.service';



@Injectable({
  providedIn: 'root'
})
export class BackendService {

  private BACKEND_API_URL =  'https://u08recipeapi.herokuapp.com/api/auth/' 


  constructor(private HttpClient: HttpClient, private tokenService: TokenService) {  }
    /**
     * register
     */ 
    
    
    public addFav(favorites:object) {
        console.log(favorites);
      const  accessToken = this.tokenService.getToken();
      return this.HttpClient.post(this.BACKEND_API_URL+'newFavorites', favorites,{
        headers:{'Authorization': `Bearer ${accessToken}`}
      } )
    }
    public newList(val:string){
      const obj = {
        name: val
      }
      const  accessToken = this.tokenService.getToken();
      return this.HttpClient.post(this.BACKEND_API_URL+'newList', obj,{
        headers:{'Authorization': `Bearer ${accessToken}`}
      } )
    }
    /**
     * .getList
     */
    public getList($id:any) {
      const  accessToken = this.tokenService.getToken();
      return this.HttpClient.get(this.BACKEND_API_URL+'list/'+$id,{
        headers:{'Authorization': `Bearer ${accessToken}`}
      } )

    } 
    public getAllLists(){
      const  accessToken = this.tokenService.getToken();
      return this.HttpClient.get(this.BACKEND_API_URL+'userLists',{
        headers:{'Authorization': `Bearer ${accessToken}`}
      } )
    }

    public delList(val:string){
      const obj = {
        id: val
      }
      const  accessToken = this.tokenService.getToken();
      return this.HttpClient.post(this.BACKEND_API_URL+'delList',obj,{
        headers:{'Authorization': `Bearer ${accessToken}`}
      } )
    }

    public delFavorite(val:number){
      const obj = {
        id: val
      }
      const  accessToken = this.tokenService.getToken();
      return this.HttpClient.post(this.BACKEND_API_URL+'delFav',obj,{
        headers:{'Authorization': `Bearer ${accessToken}`}
      } )
    }

   
 
}
