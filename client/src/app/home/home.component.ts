import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { catchError } from 'rxjs';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { ContactService } from '../contact.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  contact:any
  resposneData:any
  constructor(
    private http:HttpClient,
    private authService:AuthService,
    private router : Router,
    private contactService: ContactService
    
  ){
    const token = this.authService.getAuthToken();
    if (!token) {
      this.router.navigate(['/login']);
    }
    
    this.contactService.getStoredcontacts().subscribe((data)=>{
      this.resposneData=data
    })
  

  }

  delete(id){
    console.log(id)
    this.resposneData = this.resposneData.filter((contact) => contact._id != id);
    const PostData = {
      id: id,
    };
    console.log(PostData);
    const url = 'http://localhost:3000/contact/delete';

    this.http
      .post(url, PostData)
      .pipe(
        catchError((error) => {
          console.error('Error sending POST request', error);
          throw error;
        })
      )
      .subscribe((response) => {
        console.log('POST request successful', response);
      });
  }


  edit(id){
    this.router.navigate(['/contact',id])
  }

  mymodel(contact){
    this.contact = contact
  }

}
