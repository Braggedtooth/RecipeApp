import { Component, OnInit } from '@angular/core';
import { AuthService } from './../../services/shared/auth.service';
import { BackendService } from 'src/app/services/backend.service';
import {FormControl} from '@angular/forms';



// User interface
export class User {
  name: String ="";
  email: String ="";

}

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})

export class UserProfileComponent implements OnInit {
 UserProfile: User = new User;
  favorites:any = [];
  errors:any 
  userLists:any
  tabs:any = [];
  defaultList:string =""
  selected = new FormControl();
  alert:string =""
  isLoaded = false;
  showDefault :any ;
  constructor(
    public authService: AuthService,
    private backend:BackendService
  ) {
  
    this.authService.profileUser().subscribe((data:any) => {
      this.UserProfile = data.user.original;
      
    })}
    

    
  setActiveList(){
    sessionStorage.setItem('default',this.defaultList)
    const sDv =this.tabs.indexOf(this.defaultList)
    this.selected.setValue(sDv)

  }
  

  getActiveList(){ 
    const data = sessionStorage.getItem('default') 
    if(this.defaultList===null){
      this.isLoaded= false;
      return
    }else{
      if(data){
      this.defaultList = data; 
      const sDv =this.tabs.indexOf(data)
      this.getList(data)
      this.selected.setValue(sDv)
     
    }
    
  }   
        
}
 

    newList(name:string){  
      return this.backend.newList(name).subscribe(
        result=>{
         this.getList(name)
      },
     error => {
       this.errors = error.error;
     })
  
    } 
    


    addTab($name:string) { 
      if(this.tabs.length <= 3){
        this.newList($name)
        this.tabs.push($name)
        this.selected.setValue(this.tabs.length - 1)
       return 
       }
        else{
          return this.alert="You can Only have 4 lists"
    } 
   
      }
      
   
   

    getList($name:string){
      this.isLoaded= false 
      return this.backend.getList($name).subscribe(
        result=>{   
          this.userLists =result 
          if(this.userLists.lists != undefined){
            this.favorites =this.userLists.lists.favorites;
          }
         
         this.isLoaded= true  

      },
     error => {
       this.errors = error.error;
       this.isLoaded= false
     })
    }
   


    getUserLists(){
      this.isLoaded= false 
     
      return this.backend.getAllLists().subscribe(
        result=>{
          this.userLists =result 
          this.userLists.lists.forEach((any: any) => {
            this.tabs.push(any.name)
            this.favorites =this.userLists.lists.favorites;
            this.isLoaded= true  
           
          });
        },
        error => {
          this.errors = error.error;
          this.isLoaded= false  
        })
      
    }

 
  
 

  removeTab(index: number) {
    if(this.tabs[index] === this.defaultList||this.tabs[index] === 'default'){
      this.alert="You cant delete Your Default List"
    } else {
      this.backend.delList(this.tabs[index]).subscribe(
        result=>{
          this.tabs.splice(index, 1); 
          this.alert="List Deleted"
        }, error => {
      this.errors = error.error;
      
    }
    )
    }   
   
  }
  deleteFav($id:number){
    return this.backend.delFavorite($id).subscribe(
      result=>{
        console.log(result);
        this.getList(this.defaultList)
        this.alert= 'Favorite Deleted';
      }
    )
   
  }

  
  ngOnInit() { 

 this.getUserLists() 
 this.getActiveList()
 
   


 

 this.selected.valueChanges.subscribe(
   result=>{
    this.getList(this.tabs[result])
    
  })


   
  
  }
 
  
  

}