import { Component, OnInit } from '@angular/core';
import { DataService } from '../../services/data.service';
import { ActivatedRoute, Router } from '@angular/router';



@Component({
  selector: 'app-recipe-details',
  templateUrl: './recipe-details.component.html',
  styleUrls: ['./recipe-details.component.scss']
})
export class RecipeDetailsComponent implements OnInit {
  currentRecipe :any= [];
  id: any = ""
  errors :any;
  isFavorite= false
  
  constructor(private dataService: DataService,private activateRoute:ActivatedRoute,public router: Router) { }

  

  ngOnInit(): void {

   
  
    const getRecipes = (id:number) => {
      this.dataService.getRecipeById(id).subscribe((data)=>{
        console.log(data);
        this.currentRecipe= data;
      })
      
    }

    this.activateRoute.paramMap.subscribe(params=>{
      this.id= params.get('id')
      getRecipes( this.id)
    })

    
  }

}
