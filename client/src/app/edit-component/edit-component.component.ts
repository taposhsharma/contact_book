import { HttpClient } from '@angular/common/http';
import { Component, ContentChild, OnInit } from '@angular/core';
import { ActivatedRoute,  Router } from '@angular/router';
import { FormBuilder, AbstractControl } from '@angular/forms';
import { AuthService } from '../auth.service';
import { ContactService } from '../contact.service';
import { Validators } from '@angular/forms';
import { catchError } from 'rxjs';

@Component({
  selector: 'app-edit-component',
  templateUrl: './edit-component.component.html',
  styleUrls: ['./edit-component.component.css']
})
export class EditComponentComponent implements OnInit {
  editContactForm:any
  contactId: any
  contact :any


  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private router: Router,
    private route: ActivatedRoute,
    private authService:AuthService,
    private contactService : ContactService
  ){

    this.route.params.subscribe((params) => {
      console.log(params['id']);
      this.contactId = params['id'];
    });

    const token = this.authService.getAuthToken();
    if (!token) {
      this.router.navigate(['/login']);
    }


    this.editContactForm = this.fb.group({
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


  ngOnInit() {
    this.contactService.getcontact(this.contactId).subscribe(data=>{
      this.contact = data
      console.log(this.contact)
      this.editContactForm.patchValue({
        firstname: this.contact.firstname,
        lastname: this.contact.lastname,
        email: this.contact.email,
        mobileno: this.contact.mobileno,
      });
      

      console.log(this.editContactForm.value)
    })
  }


  onSubmit(){
   console.log(this.editContactForm.value)

   if(this.editContactForm.valid){
    const postData = {
      ...this.editContactForm.value,
      id:this.contact._id
    }
    const url = 'http://localhost:3000/contact/update';

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
        alert("Contact Updated Successfully")

        this.router.navigate(['/'])
        this.contactService.fetchContact()
        this.contactService.fetchcontactById(this.contactId)

     
      });
    
  }

   
  }
}
