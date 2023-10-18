import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, Validators,AbstractControl } from '@angular/forms';
import { Store } from '@ngrx/store';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { catchError } from 'rxjs';
import { ContactService } from '../contact.service';

@Component({
  selector: 'app-new-contact',
  templateUrl: './new-contact.component.html',
  styleUrls: ['./new-contact.component.css']
})
export class NewContactComponent {
  newContactForm:any
  response:any

  constructor(
    private fb: FormBuilder,
    private http:HttpClient,
    private store: Store,
    private authService: AuthService,
    private router: Router,
    private contactService: ContactService
  ){
    const token = this.authService.getAuthToken();
    if (!token) {
      this.router.navigate(['/login']);
    }
    this.newContactForm = this.fb.group({
      firstname: ['', Validators.required],
      lastname: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      mobileno: ['',[Validators.required, this.exactLengthValidator(10)]],
    })

  }

  exactLengthValidator(expectedLength: number) {
    return (control: AbstractControl): { [key: string]: any } | null => {
      const value = control.value.toString();
      const isValid = /^\d+$/.test(value) && value.length === expectedLength;
  
      return isValid ? null : { exactLength: true };
    };
  }

  onSubmit(){
   
    if(this.newContactForm.valid){
      const postData = {
        ...this.newContactForm.value
      }
      const url = 'http://localhost:3000/contact/addcontact';

      this.http
        .post(url, postData)
        .pipe(
          catchError((error) => {
            console.error('Error sending POST request', error);
            throw error;
          })
        )
        .subscribe((response) => {
          console.log('POST request successful', response);
          this.contactService.fetchContact()
        this.response = response
        console.log(this.response.next)
        if(this.response.next){
        alert(this.response.msg)
          this.router.navigate(['/'])
        }
        else{
          alert(this.response.msg)
        }
       
        });
      
    }
  }

}
