import { CategoriesComponent } from './Components/categories/categories.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RecipeDetailsComponent } from './Components/recipe-details/recipe-details.component';
import { RecipesComponent } from './Components/recipes/recipes.component';
import { HomeComponent } from './Components/home/home.component';
import { UserProfileComponent } from './Components/user-profile/user-profile.component';
import { SigninComponent } from './Components/signin/signin.component';
import { SignupComponent } from './Components/signup/signup.component';



const routes: Routes = [
  {path: '', component : HomeComponent},
  {path:'categories', component:CategoriesComponent},
  {path: 'categories/:id', component : RecipesComponent},
  {path: 'recipe/:id', component : RecipeDetailsComponent},
  {path: 'categories/:id/:id', component : RecipeDetailsComponent},
  { path: 'login', component: SigninComponent },
  { path: 'register', component: SignupComponent },
  {path : 'profile', component :UserProfileComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  
exports: [RouterModule]
})
export class AppRoutingModule { }
