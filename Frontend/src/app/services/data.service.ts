import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class DataService {

    private REST_API_CATEGORIES = 'https://www.themealdb.com/api/json/v1/1/categories.php';
    private REST_API_SEARCH = 'https://www.themealdb.com/api/json/v1/1/search.php?s='
    private REST_API_RANDOM ='https://www.themealdb.com/api/json/v1/1/random.php'
    private REST_API_SEARCHBYID = 'https://www.themealdb.com/api/json/v1/1/lookup.php?i='
    private REST_API_FILTER = 'https://www.themealdb.com/api/json/v1/1/filter.php?'

    constructor(private httpClient: HttpClient) { }
    public sendCategoryRequest(){
      return this.httpClient.get(this.REST_API_CATEGORIES)
    }
    public sendRandomRequest(){
      return this.httpClient.get(this.REST_API_RANDOM)
    }
    public getRecipeFromCat(cat:string){
      return this.httpClient.get(this.REST_API_FILTER + 'c='+ cat)
    }
    public getRecipeById(id:number){
      return this.httpClient.get(this.REST_API_SEARCHBYID+id)

    }
    /**
     * homepageSearch
     */
    public getSearch(val:string) {
      return this.httpClient.get(this.REST_API_SEARCH+ val)
    }
    
}
