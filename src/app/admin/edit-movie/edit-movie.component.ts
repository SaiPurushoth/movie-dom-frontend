import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MovieServiceService } from 'src/app/services/movie-service.service';
import { NotificationService } from 'src/app/services/notification.service';

@Component({
  selector: 'app-edit-movie',
  templateUrl: './edit-movie.component.html',
  styleUrls: ['./edit-movie.component.css']
})
export class EditMovieComponent implements OnInit {

  constructor(private movieservice:MovieServiceService,private route:Router,private notifyservice:NotificationService) { }
  list:any
  ngOnInit(): void {
    if(localStorage.getItem('role')!='admin')
    {
      this.notifyservice.showError("you are not admin", "ERROR")
      this.route.navigate(['/home'])
    }

    const id=this.movieservice.getMovieId()
    if(id==undefined)
    {
     this.notifyservice.showError("Try Again", "ERROR")
     this.route.navigate(['/home'])
    }
 this.movieservice.getMovie(id).subscribe(
   res=>{
      this.list=res
   },         err=>{
    this.notifyservice.showError("Try Again", "ERROR")
    this.route.navigate(['/home'])
   }
 )


  }
  submit(title:any,language:any,genere:any,cast:any,director:any,description:any,duration:any,releaseDate:any,image:any)
  {
    if(localStorage.getItem('role')=='admin'){
     this.movieservice.updateMovie(title,language,genere,cast,director,description,duration,releaseDate,image).subscribe(
       res=>{this.notifyservice.showSuccess("add movies done","SUCCESS")
         this.route.navigate(['/home'])},
         err=>{
          this.notifyservice.showError("Enter Details Correctly", "ERROR")
         }
         
     )
    }
    else{
      this.notifyservice.showError("You are not a admin", "ERROR")
      this.route.navigate(['/home'])
    }
  }
}
